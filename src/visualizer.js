import $ from "jquery";

export const isAudioPlaying = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.state === 'running';
}

export const visualizerIsOn = () => {
    $("body").addClass("breathing-visualizer");
}

export const visualizerIsOff = () => {
    $("body").removeClass("breathing-visualizer");
}
