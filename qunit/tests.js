test( "inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function() {
  $('body').append('<input type="text" id="testmask" value="007:20" />');
  $("#testmask").inputmask("999:99", { placeholder: "0"});
  
  equal( $("#testmask").val(), "007:20");
  
  $("#testmask").remove();
});