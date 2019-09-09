import Inputmask from "../index";
import jQuery from "jquery";

if (Inputmask.dependencyLib === jQuery)
    window.jQuery = Inputmask.dependencyLib;

import qunit from "qunit";
import "./prototypeExtensions.js";
import simulator from "./simulator.js";


// android testing
Inputmask.extendDefaults({
    inputEventOnly: false
});

// window.Inputmask = Inputmask; //inject globally for the simulator to detect inputeventonly

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
import tests_regex from "./tests_regex";
import tests_setvalue from "./tests_setvalue";

//inject simulater code in the dependencies
simulator(Inputmask.dependencyLib, Inputmask);
simulator(jQuery, Inputmask);

//load tests
tests_alternations(qunit, Inputmask);
tests_attributes(qunit, Inputmask);
tests_base(qunit, Inputmask);
tests_date(qunit, Inputmask);
tests_dynamic(qunit, Inputmask);
tests_escape(qunit, Inputmask);
tests_formatvalidate(qunit, Inputmask);
tests_initialvalue(qunit, Inputmask);
tests_inputeventonly(qunit, Inputmask);
tests_ip(qunit, Inputmask);
tests_jitmasking(qunit, Inputmask);
tests_jquery_inputmask(qunit, jQuery, Inputmask);
tests_keepStatic(qunit, Inputmask);
tests_multi(qunit, Inputmask);
tests_numeric(qunit, Inputmask);
tests_numericinput(qunit, Inputmask);
tests_option(qunit, Inputmask);
tests_optional(qunit, Inputmask);
tests_paste(qunit, Inputmask);
tests_regex(qunit, Inputmask);
tests_setvalue(qunit, Inputmask);

qunit.load();
// qunit.start();
