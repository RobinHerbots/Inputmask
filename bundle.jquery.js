import "./bundle";
import dependencyLib from "./js/dependencyLibs/inputmask.dependencyLib";
import jQuery from "jquery";
if (dependencyLib === jQuery) {
    require("./js/jquery.inputmask");
}


