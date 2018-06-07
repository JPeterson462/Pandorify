var download = function(obj) {
	console.log("Downloading: " + obj)
  return new Promise((resolve, reject) => {
	const id = window.setTimeout(() => reject(Error('fetch timeout')), 10000);

	const request = this.request;
	const indices = this.indices;

	fetch(obj.src).then(response => {
	  window.clearTimeout(id);
	  if (response.ok) {
		const disposition = response.headers.get('Content-Disposition');
		let name = obj.filename;
		if (disposition && !name) {
		  const tmp = /filename=([^;]*)/.exec(disposition);
		  if (tmp && tmp.length) {
			name = tmp[1].replace(/["']$/, '').replace(/^["']/, '');
		  }
		}
		if (!name) {
		  const url = obj.src.replace(/\/$/, '');
		  const tmp = /(title|filename)=([^&]+)/.exec(url);
		  if (tmp && tmp.length) {
			name = tmp[2];
		  }
		  else {
			name = url.substring(url.lastIndexOf('/') + 1);
		  }
		  name = decodeURIComponent(name.split('?')[0].split('&')[0]) || 'image';
		}
		name = name.slice(-30);
		if (name.indexOf('.') === -1) {
		  const type = response.headers.get('Content-Type');
		  if (type) {
			name += '.' + type.split('/').pop().split(/[+;]/).shift();
		  }
		}
		if (request.addJPG && name.indexOf('.') === -1) {
		  name += '.jpg';
		}
		if (name in indices) {
		  const index = name.lastIndexOf('.') || name.length;
		  const tmp = name.substr(0, index) + ' - ' + indices[name] + name.substr(index);
		  indices[name] += 1;
		  name = tmp;
		}
		else {
		  indices[name] = 1;
		}
		return response.blob().then(blob => this.zip.file(name, blob)).then(resolve);
	  }
	  else {
		reject(Error('fetch failed'));
	  }
	});
  });
};

function downloadSong(tab) {
	browser.tabs.executeScript(tab.id, {
		file: "",
		runAt: "",
		allFrames: false
	}, () => {
		url = "https://www.google.com/logos/doodles/2018/dr-virginia-apgars-109th-birthday-5785281331462144.2-law.gif";
		Promise.all([
			download(url)
		]).then(() => {

		})
	});
}

browser.browserAction.onClicked.addListener(downloadSong);
console.error("Loaded Pandorify");