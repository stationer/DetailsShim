details-shim
============

A pure JavaScript (no dependencies) solution to make HTML5 
Details/Summary tags work in unsupportive browsers

Usage
=====

Include details-shim.js anywhere in your page, it runs on load.  
Include details-shim.css (or its contents) in your styles.

Support
=======

Tested successfully in FireFox Win/Mac/Lin.  
Non-interfering in Chrome Win/Mac/Lin, which supports details/summary.  
Non-interfering in Safari Win/Mac, which supports details/summary.  
Tested successfully in Internet Explorer 9.  
Tested mostly successfully in Internet Explorer 8 with html5shiv.  
 (IE doesn't like the unicode css :before content)  


Known Issues
============

FireFox changes &lt;details open> to &lt;details open="">  
Safari supports &lt;details> natively, but treats `open=""` as `open="open"`


License
=======

Released under MIT license, see included LICENSE.txt
or http://opensource.org/licenses/MIT
