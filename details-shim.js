/**
 * details-shim.js
 * A pure JavaScript (no dependencies) solution to make HTML5
 *  Details/Summary tags work in unsupportive browsers
 *
 * Copyright (c) 2013 Tyler Uebele
 * Released under the MIT license.  See included LICENSE.txt
 *  or http://opensource.org/licenses/MIT
 *
 * latest version available at https://github.com/tyleruebele/details-shim
 */

/**
 * Enable proper operation of <details> tags in unsupportive browsers
 */
function details_shim() {
	//Because <details> must include a <summary>,
	// collecting <summary> tags collects *valid* <details> tags
	var Summaries = document.getElementsByTagName('summary');
	for (var i = 0; i < Summaries.length; i++) {
		if (!Summaries[i].parentNode
			//sanity check, parent node should be a <details> tag
			|| 'details' != Summaries[i].parentNode.tagName.toLowerCase()
			//only run in browsers that don't support <details> natively
			|| 'boolean' == typeof Summaries[i].parentNode.open
		) {
			continue;
		}

		var Details = Summaries[i].parentNode;

		//Set initial class according to `open` attribute
		var state = Details.outerHTML
			// OR older firefox doesn't have .outerHTML
			|| new XMLSerializer().serializeToString(Details);
		state = state.substring(0, state.indexOf('>'));
		//Read: There is an open attribute, and it's not explicitly empty
		state = (-1 != state.indexOf('open') && -1 == state.indexOf('open=""'))
			? 'open'
			: 'closed'
			;
		Details.setAttribute('data-open', state);
		Details.className += ' ' + state;

		//Add onclick handler to toggle visibility class
		Summaries[i].onclick = function () {
			//current state
			var state = this.parentNode.getAttribute('data-open');
			//new state
			state = state == 'open' ? 'closed' : 'open';
			this.parentNode.setAttribute('data-open', state);
			//replace previous open/close class
			this.parentNode.className = this.parentNode.className
				.replace(/\bopen\b|\bclosed\b/g, ' ') + ' ' + state;
		};

		//wrap text nodes in span to expose them to css
		for (var j = 0; j < Details.childNodes.length; j++) {
			if (Details.childNodes[j].nodeType == 3
				&& /[^\s]/.test(Details.childNodes[j].data)
			) {
				var span = document.createElement('span');
				var text = Details.childNodes[j];
				Details.insertBefore(span, text);
				Details.removeChild(text);
				span.appendChild(text);
			}
		}
	} // for(Summaries)
} // details_shim()

//Run details_shim() when the page loads
window.addEventListener
	? window.addEventListener('load', details_shim, false)
	: window.attachEvent && window.attachEvent('onload', details_shim)
	;
