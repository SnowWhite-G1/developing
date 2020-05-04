import React from "react";
import ReactDOM from "react-dom";
import IndexComp from "components/index";
import STORE from "store";

const IndexContext = React.createContext(STORE);
ReactDOM.render(
  <IndexContext.Provider>
    <IndexComp />
  </IndexContext.Provider>,
  document.getElementById("root")
);
