import React from "react";
import Weather from "./components/Weather";

const App = () =>
{
  return(
    <>
      <div id="page_wrapper">
        <div className="body_wrapper">
          <Weather/>
        </div>
      </div>
    </>
  )
}

export default App;
