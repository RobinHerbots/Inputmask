module("Initial value setting");

test( "inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function() {
  $('body').append('<input type="text" id="testmask" value="007:20" />');
  $("#testmask").inputmask("999:99", { placeholder: "0"});
  
  equal( $("#testmask").val(), "007:20", "Result " + $("#testmask").val());
  
  $("#testmask").remove();
});

test( "inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"01 650 103 002 0001 DE101 5170\"", function() {
  $('body').append('<input type="text" id="testmask" value="01 650 103 002 0001 DE101 5170" />');
  $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
  equal( $("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());
  
  $("#testmask").remove();
});

test( "inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\"", function() {
  $('body').append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
  $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
  equal( $("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());
  
  $("#testmask").remove();
});

test( "inputmask(\"\\D\\E***\") ~ value=\"DE001\"", function() {
  $('body').append('<input type="text" id="testmask" value="DE001" />');
  $("#testmask").inputmask("\\D\\E***");
  equal( $("#testmask").val(), "DE001", "Result " + $("#testmask").val());
  
  $("#testmask").remove();
});

module("Simple masking");

test( "inputmask(\"999.999.999\")", function() {
  $('body').append('<input type="text" id="testmask" />');
  $("#testmask").inputmask("999.999.999");
  
  $("#testmask")[0].focus();
  
  //need keystrokes
  
  equal( $("#testmask").val(), "123.___.___", "Result " + $("#testmask").val());
  
  $("#testmask").remove();
});