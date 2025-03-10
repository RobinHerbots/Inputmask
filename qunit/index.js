import jQuery from "jquery";
import qunit from "qunit";

import Inputmask from "../bundle";

import "./prototypeExtensions.js";
import simulator from "./simulator.js"; // inject globally for the simulator to detect inputeventonly
import testsAlternations from "./tests_alternations";
import testsAttributes from "./tests_attributes";
import testsBase from "./tests_base";
import testsDate from "./tests_date";
import testsDynamic from "./tests_dynamic";
import testsEscape from "./tests_escape";
import testsFormatvalidate from "./tests_formatvalidate";
import testsInitialvalue from "./tests_initialvalue";
import testsInputeventonly from "./tests_inputeventonly";
import testsIp from "./tests_ip";
import testsJitmasking from "./tests_jitmasking";
import testsJqueryInputmask from "./tests_jquery_inputmask";
import testsKeepStatic from "./tests_keepStatic";
import testsMulti from "./tests_multi";
import testsNumeric from "./tests_numeric";
import testsNumericinput from "./tests_numericinput";
import testsOption from "./tests_option";
import testsOptional from "./tests_optional";
import testsPaste from "./tests_paste";
import testsRegex from "./tests_regex";
import testsSetvalue from "./tests_setvalue";

if (Inputmask.dependencyLib === jQuery) window.jQuery = Inputmask.dependencyLib;

// android testing
Inputmask.extendDefaults({
  inputEventOnly: false
});

window.Inputmask = Inputmask;

// inject simulater code in the dependencies
simulator(Inputmask.dependencyLib, Inputmask);
simulator(jQuery, Inputmask);

// load tests
if (qunit) {
  testsAlternations(qunit, Inputmask);
  testsAttributes(qunit, Inputmask);
  testsBase(qunit, Inputmask);
  testsDate(qunit, Inputmask);
  testsDynamic(qunit, Inputmask);
  testsEscape(qunit, Inputmask);
  testsFormatvalidate(qunit, Inputmask);
  testsInitialvalue(qunit, Inputmask);
  testsInputeventonly(qunit, Inputmask);
  testsIp(qunit, Inputmask);
  testsJitmasking(qunit, Inputmask);
  testsJqueryInputmask(qunit, jQuery, Inputmask);
  testsKeepStatic(qunit, Inputmask);
  testsMulti(qunit, Inputmask);
  testsNumeric(qunit, Inputmask);
  testsNumericinput(qunit, Inputmask);
  testsOption(qunit, Inputmask);
  testsOptional(qunit, Inputmask);
  testsPaste(qunit, Inputmask);
  testsRegex(qunit, Inputmask);
  testsSetvalue(qunit, Inputmask);

  qunit.load();
  // qunit.start();
}
