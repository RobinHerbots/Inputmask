// import "./css/inputmask.css";

import "./js/inputmask.extensions";
import "./js/inputmask.date.extensions";
import "./js/inputmask.numeric.extensions";

import im from "./js/inputmask.js";
import dependencyLib from "./js/dependencyLibs/inputmask.dependencyLib";
import jQuery from "jquery";
if (dependencyLib === jQuery) {
    require("./js/jquery.inputmask");
}
window.Inputmask = im;


