import "./index.html";
import "./index.scss";
import { DATA } from "./modules/data";

console.log(DATA[1]);
import { App } from "./pages/app/index-app";
// import { Header } from "./pages/header";

const app = new App();
app.run();

// const header = new Header();
// header.run();
