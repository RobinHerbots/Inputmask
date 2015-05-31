## regex extensions
With the regex extension you can use any regular expression as a mask.  Currently this does only input restriction.<br>There is no further masking visualization.

Example simple email regex:

```javascript
$(document).ready(function(){
   $(selector).inputmask('Regex', { regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}" });
});
```
