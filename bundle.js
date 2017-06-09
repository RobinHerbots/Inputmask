import "./css/inputmask.css";

import "./js/inputmask.date.extensions";
import "./js/inputmask.extensions";
import "./js/inputmask.numeric.extensions";
import "./js/inputmask.phone.extensions";

// import "./js/phone-codes/phone-be";
// import "./js/phone-codes/phone-nl";
// import "./js/phone-codes/phone-ru";
// import "./js/phone-codes/phone-uk";
// import "./js/phone-codes/phone";

import im from "./js/inputmask.js";
import dependencyLib from "./js/dependencyLibs/inputmask.dependencyLib";
import jQuery from "jquery";
if (dependencyLib === jQuery) {
    require("./js/jquery.inputmask");
}
window.Inputmask = im;


