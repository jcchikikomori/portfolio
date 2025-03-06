import $ from "jquery";

const isAudioPlaying = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.state === 'running';
}

export const handlePlayback = () => {
  console.debug("handlePlayback");
  if (isAudioPlaying()) {
    visualizerIsOn();
  } else {
    visualizerIsOff();
  }
}

const visualizerIsOn = () => {
  $("body").addClass("breathing-visualizer");
}

const visualizerIsOff = () => {
  $("body").removeClass("breathing-visualizer");
}
