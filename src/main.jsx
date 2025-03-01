import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GroupContextProvider } from "./Context/GroupContext.jsx";

createRoot(document.getElementById("root")).render(
  <GroupContextProvider>
    <App />
  </GroupContextProvider>
);
