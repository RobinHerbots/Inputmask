(function($) {
  $.caret = function(input, begin, end) {
    var npt = input.jquery && input.length > 0 ? input[0] : input,
      range;
    if (typeof begin == 'number') {
      if (!$(input).is(':visible')) {
        return;
      }
      end = (typeof end == 'number') ? end : begin;
      if (npt.setSelectionRange) {
        npt.selectionStart = begin;
        npt.selectionEnd = end;

      } else if (npt.createTextRange) {
        range = npt.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    } else {
      if (!$(input).is(':visible')) {
        return {
          "begin": 0,
          "end": 0
        };
      }
      if (npt.setSelectionRange) {
        begin = npt.selectionStart;
        end = npt.selectionEnd;
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }
      return {
        "begin": begin,
        "end": end
      };
    }
  };
  $.fn.SendKey = function(keyCode, modifier) {
    var sendDummyKeydown = false;
    if (Object.prototype.toString.call(keyCode) == '[object String]') {
      keyCode = keyCode.charCodeAt(0);
      sendDummyKeydown = true;
    }

    switch (keyCode) {
      case inputmask.keyCode.LEFT:
        {
          if (modifier == undefined) {
            var pos = $.caret(this);
            $.caret(this, pos.begin - 1);
            break;
          }
        }
      case inputmask.keyCode.RIGHT:
        {
          if (modifier == undefined) {
            var pos = $.caret(this);
            $.caret(this, pos.begin + 1);
            break;
          }
        }
      default:
        {
          var keydown = $.Event("keydown"),
            keypress = $.Event("keypress"),
            keyup = $.Event("keyup");

          if (!sendDummyKeydown) {
            keydown.keyCode = keyCode;
            if (modifier == inputmask.keyCode.CONTROL)
              keydown.ctrlKey = true;
          }
          $(this).trigger(keydown);
          if (!keydown.isDefaultPrevented()) {
            keypress.keyCode = keyCode;
            if (modifier == inputmask.keyCode.CONTROL)
              keypress.ctrlKey = true;
            $(this).trigger(keypress);
            //if (!keypress.isDefaultPrevented()) {
            keyup.keyCode = keyCode;
            if (modifier == inputmask.keyCode.CONTROL)
              keyup.ctrlKey = true;
            $(this).trigger(keyup);
            //}
          }
        }
    }
  }
  $.fn.Type = function(inputStr) {
    var $input = $(this);
    $.each(inputStr.split(''), function(ndx, lmnt) {
      $input.SendKey(lmnt);
    });
  }
  $.fn.paste = function(inputStr) {
    var input = this.jquery && this.length > 0 ? this[0] : this,
      $input = $(input),
      isRTL = input.inputmask.isRTL;
    window.clipboardData ? window.clipboardData.setData("Text", inputStr) : $input[0]._valueSet(isRTL ? inputStr.split('').reverse().join('') : inputStr);
    $input.trigger('paste');
  }
})(jQuery);
