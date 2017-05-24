import "../dist/inputmask/inputmask.date.extensions";
import "../dist/inputmask/inputmask.extensions";
import "../dist/inputmask/inputmask.numeric.extensions";
import "../dist/inputmask/inputmask.phone.extensions";
import "../dist/inputmask/phone-codes/phone-be";
import "../dist/inputmask/phone-codes/phone-nl";
import "../dist/inputmask/phone-codes/phone-ru";
import "../dist/inputmask/phone-codes/phone-uk";
import "../dist/inputmask/phone-codes/phone";

import  Inputmask from "../dist/inputmask/inputmask";
import qunit from "qunitjs";

import "./prototypeExtensions.js";
import "./simulator.js";

//make global
window.$ = window.dependencyLib;
window.Inputmask = Inputmask;
window.qunit = qunit;


qunit.load();
qunit.start();
