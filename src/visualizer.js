const isAudioPlaying = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.state === 'running';
}

export const handlePlayback = () => {
  // eslint-disable-next-line no-console
  console.debug("handlePlayback");
  if (isAudioPlaying()) {
    visualizerIsOn();
  } else {
    visualizerIsOff();
  }
}

const visualizerIsOn = () => {
  document.body.classList.add("breathing-visualizer");
}

const visualizerIsOff = () => {
  document.body.classList.remove("breathing-visualizer");
}
