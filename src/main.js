import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import IndexComp from "components/plugins";
import STORE from "store";

ReactDOM.render(
  <Provider store={STORE}>
    <IndexComp />
  </Provider>,
  document.getElementById("root")
);
