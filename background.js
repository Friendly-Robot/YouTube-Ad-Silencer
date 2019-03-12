'use strict';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-127582009-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function executeContent(reload) {
  chrome.tabs.getSelected(null, function(tab) {
    const { url } = tab;
    if (url && ((url[8] === 'y' && url[9] === 'o') || (url[12] === 'y' && url[13] === 'o')) && (url.includes('youtube') && url.includes('watch'))) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tab.id, {
          "file": "content.js"
        }, function() {
          chrome.tabs.sendMessage(tab.id, {});
        });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      executeContent();
    }
  });
});
