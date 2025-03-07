// import { useState } from "react";
import { GeneralInfo } from "./GeneralInfo";
import { Education } from "./Education";
import { Experience } from "./Experience";
import "../styles/App.css";

function App() {
  return (
    <div className="app">
      <GeneralInfo />
      <Education />
      <Experience />
    </div>
  );
}

export default App;
