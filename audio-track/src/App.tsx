import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { audioStore } from "./store/AudioStore";
import { Icon20MoreVertical } from "@vkontakte/icons";
import "./App.css";

const App: React.FC = observer(() => {
  useEffect(() => {
    audioStore.initAudio("../public/FROMSKYTOABYSS_-_After_Us.mp3");
  }, []);

  const renderTime = () => {
    if (audioStore.isPlaying) {
      return audioStore.formatTime(audioStore.currentTime);
    } else {
      return audioStore.formatTime(audioStore.duration);
    }
  };

  return (
    <div className="app">
      <div className="button-track-wrapper">
        <button
          className={`button ${audioStore.isPlaying ? "active" : ""}`}
          onClick={() => audioStore.togglePlay()}
        >
          {audioStore.isPlaying ? (
            <div className="equalizer">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            ""
          )}
        </button>
        <div className="track">
          <span className="track_name">After Us</span>
          <span className="track_author">FROMSKYTOABYSS </span>
        </div>
      </div>
      <div className="timer-dots-wrapper">
        <div className="timer">
          <div className="timer">{renderTime()}</div>
        </div>
        <Icon20MoreVertical fill={"blue"} />
      </div>
    </div>
  );
});

export default App;
