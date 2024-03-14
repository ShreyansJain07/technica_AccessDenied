import React from "react";
import VoiceButton from "../components/VoiceButton";
import SpeechSynthesizer from "../components/SpeechSynthesizer";

import { useContext } from "react";


import LandingTop from "../components/LandingTop";
export default function RootLayout() {

  return (
    <>
      <LandingTop />
      {/* <Carousel/>
      <FeatureList/> */}
      <SpeechSynthesizer/>
      <div className="App">
      <div className="container">
        <div
        >
          <h1>Hover over me</h1>
        </div>
      </div>
      <div className="container" style={{ background: "peachpuff" }}></div>
    </div>

    </>
  );
}
