import "../node_modules/qunitjs/qunit/qunit.css";
import "../css/inputmask.css";

//extensions
import "../js/inputmask.date.extensions";
import "../js/inputmask.extensions";
import "../js/inputmask.numeric.extensions";
import "../js/inputmask.phone.extensions";
import "../js/phone-codes/phone-be";
import "../js/phone-codes/phone-nl";
import "../js/phone-codes/phone-ru";
import "../js/phone-codes/phone-uk";
import "../js/phone-codes/phone";
import "../js/jquery.inputmask";

import  Inputmask from "../js/inputmask";
import dependencyLib from "../js/dependencyLibs/inputmask.dependencyLib";
import jQuery from "jquery";
if (dependencyLib === jQuery)
    window.jQuery = dependencyLib;

import qunit from "qunitjs";
import "./prototypeExtensions.js";
import simulator from "./simulator.js";


// android testing
// Inputmask.extendDefaults({
//    inputEventOnly: true
// });

window.Inputmask = Inputmask; //inject globally for the simulator to detect inputeventonly

import tests_alternations from "./tests_alternations";
import tests_attributes from "./tests_attributes";
import tests_base from "./tests_base";
import tests_date from "./tests_date";
import tests_dynamic from "./tests_dynamic";
import tests_escape from "./tests_escape";
import tests_formatvalidate from "./tests_formatvalidate";
import tests_initialvalue from "./tests_initialvalue";
import tests_inputeventonly from "./tests_inputeventonly";
import tests_ip from "./tests_ip";
import tests_jitmasking from "./tests_jitmasking";
import tests_jquery_inputmask from "./tests_jquery_inputmask";
import tests_keepStatic from "./tests_keepStatic";
import tests_multi from "./tests_multi";
import tests_numeric from "./tests_numeric";
import tests_numericinput from "./tests_numericinput";
import tests_option from "./tests_option";
import tests_optional from "./tests_optional";
import tests_paste from "./tests_paste";
import tests_phone from "./tests_phone";
import tests_regex from "./tests_regex";
import tests_setvalue from "./tests_setvalue";
import tests_phone_world from "./tests_phone_world";
import tests_phonebe from "./tests_phonebe";
import tests_phonenl from "./tests_phonenl";
import tests_phoneru from "./tests_phoneru";

//inject simulater code
simulator(dependencyLib, Inputmask);
simulator(jQuery, Inputmask);

//load tests
tests_alternations(qunit, dependencyLib, Inputmask);
tests_attributes(qunit, dependencyLib, Inputmask);
tests_base(qunit, dependencyLib, Inputmask);
tests_date(qunit, dependencyLib, Inputmask);
tests_dynamic(qunit, dependencyLib, Inputmask);
tests_escape(qunit, dependencyLib, Inputmask);
tests_formatvalidate(qunit, dependencyLib, Inputmask);
tests_initialvalue(qunit, dependencyLib, Inputmask);
tests_inputeventonly(qunit, dependencyLib, Inputmask);
tests_ip(qunit, dependencyLib, Inputmask);
tests_jitmasking(qunit, dependencyLib, Inputmask);
tests_jquery_inputmask(qunit, jQuery, Inputmask);
tests_keepStatic(qunit, dependencyLib, Inputmask);
tests_multi(qunit, dependencyLib, Inputmask);
tests_numeric(qunit, dependencyLib, Inputmask);
tests_numericinput(qunit, dependencyLib, Inputmask);
tests_option(qunit, dependencyLib, Inputmask);
tests_optional(qunit, dependencyLib, Inputmask);
tests_paste(qunit, dependencyLib, Inputmask);
tests_phone(qunit, dependencyLib, Inputmask);
tests_regex(qunit, dependencyLib, Inputmask);
tests_setvalue(qunit, dependencyLib, Inputmask);

//phone
// tests_phone_world(qunit, dependencyLib, Inputmask);
// tests_phonebe(qunit, dependencyLib, Inputmask);
// tests_phonenl(qunit, dependencyLib, Inputmask);
// tests_phoneru(qunit, dependencyLib, Inputmask);

qunit.load();
// qunit.start();
