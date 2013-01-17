/* https://github.com/tyleruebele/details-shim */
function details_shim(){
	//Because <details> must include a <summary>,
	// collecting <summary> tags collects *valid* <details> tags
	var a = document.getElementsByTagName('summary');
	for (f in a) {
		if (a[f].parentNode) {
			var details = a[f].parentNode;
			//only run in browsers that don't support <details> natively
			if ('boolean' != typeof details.open) {

				//Set initial class according to `open` attribute
				var s = details.outerHTML;
				s = s.substring(0, s.indexOf('>'));
				s = (-1 != s.indexOf('open') && -1 == s.indexOf('open=""'))
					? 'open' : 'closed';
				details.setAttribute('data-open', s);
				details.className += ' ' + s;

				//Add onclick handler to toggle visibility class
				a[f].onclick = function() {
					//current state
					var s = this.parentNode.getAttribute('data-open');
					//new state
					s = s == 'open' ? 'closed' : 'open';
					this.parentNode.setAttribute('data-open', s);
					//replace previous open/close class
					this.parentNode.className = this.parentNode.className
						.replace(/\bopen\b|\bclosed\b/g, ' ') + ' ' + s;
				};

				//wrap text nodes in span to expose them to css
				var sibs = details.childNodes;
				for (ff in sibs) {
					if (sibs[ff].nodeType == 3
						&& /[^\s]/.test(sibs[ff].data)
					) {
						var span = document.createElement('span');
						var text = sibs[ff];
						details.insertBefore(span, text);
						details.removeChild(text);
						span.appendChild(text);
					}
				}
			}
		}
	}
}

window.addEventListener
? window.addEventListener('load', details_shim, false)
: window.attachEvent && window.attachEvent('onload', details_shim)
;
