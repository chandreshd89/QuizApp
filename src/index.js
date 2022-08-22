import reactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

reactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
