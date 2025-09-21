import { createRoot } from "react-dom/client";

import App from "./app/App";

import "@/app/styles/index.scss";

const container = document.getElementById("root");

const root = createRoot(container ?? document.body);
root.render(<App />);
