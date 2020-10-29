import React from "react";
import ItemContainer from "./components/item-container"
import "./global.css"
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

function App() {
  
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center", margin: "50px 0" }}>OSRS Item Icon Downloader</h1>
      <ItemContainer />
    </div>
  );
}

export default App;
