import React, { useRef, useState } from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from "video-react";

function VideoPlayer() {
  const inputFile = useRef(null);
  const [localVideo, setLocalVideo] = useState(null);

  function handleOnChange(event: any) {
    const file = event.target.files[0];
    setLocalVideo(URL.createObjectURL(file));
    inputFile.current.value = null;
  }

  return (
    <div>
      <input type="file" id="file" ref={inputFile} onChange={handleOnChange} />
      <Player poster="/assets/poster.png" src={localVideo}>
        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton disabled={true} />
        </ControlBar>
      </Player>
    </div>
  );
}

export default VideoPlayer;
