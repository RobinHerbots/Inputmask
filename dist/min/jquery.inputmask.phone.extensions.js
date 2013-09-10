$.extend($.inputmask.defaults.aliases,{phone:{url:"phone-codes.json",mask:function(a){var b=[];$.ajax({url:a.url,async:!1,dataType:"json",success:function(a){b=a}});return b}}});
