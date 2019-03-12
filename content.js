(function() {
  chrome.extension.onMessage.addListener(exec);
})();

let YAS_GLOBAL_VOLUME = 1;

function exec(message) {
  // Call this on load for the initial page that is loaded with the ad.
  handleVideoPlayerMutation();

  setupMutationObserver();
}

function setupMutationObserver() {
  var mut = new MutationObserver(handleVideoPlayerMutation);
  const html5 = document.getElementsByClassName('html5-video-player');
  mut.observe(html5[0], { childList: true });
}

function handleVideoPlayerMutation() {
  const adShowing = checkForAds();
  if (adShowing) {
    silenceVolume();
  } else {
    turnUpVolume();
  }
}

function checkForAds() {
  const ads = document.getElementsByClassName('ad-showing');
  if (ads[0]) return true;
  return false;
}

function silenceVolume() {
  var all = document.getElementsByTagName("*");
  for (let i = 0, max = all.length; i < max; i += 1) {
    if (all[i].volume && typeof all[i].volume === 'number') {
      YAS_GLOBAL_VOLUME = all[i].volume;
      all[i].volume = 0;
    }
  }
}

function turnUpVolume() {
  var all = document.getElementsByTagName("*");
  for (let i = 0, max = all.length; i < max; i += 1) {
    if (all[i].volume && typeof all[i].volume === 'number') {
      all[i].volume = YAS_GLOBAL_VOLUME;
    }
  }
}
