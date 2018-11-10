import "./bundle";
import dependencyLib from "./lib/dependencyLibs/inputmask.dependencyLib";
import jQuery from "jquery";
if (dependencyLib === jQuery) {
    require("./lib/jquery.inputmask");
}


