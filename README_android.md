#Android support

Have a read thought the different android issues. (Android Information #465)

Bottomline, the problem is the predictive text functionality.  There is no way to prevent or control the input, which gives undesired results
and side effects in the inputmask.  I tried several ways multiple times.  Compositionevents, inputevent only masking, all with partial success.
The behavior also changes with the keyboard used. (google keyboard, samsung keyboard, ...)

In general, masks which only accepts numeric input tend to work even with predictive text enabled.  Inputmasks with alphanumeric input will all fail.

The solution would be a way to control (or hint) the predictive text or to disable it.
When browsers would implement the inputmode attribute, disabling will be possible.
[Inputmode html spec](https://html.spec.whatwg.org/multipage/forms.html#input-modalities:-the-inputmode-attribute)
[Inputmode chromestatus](https://www.chromestatus.com/feature/6225984592281600)

##The workaround, the patchwork, the bad and ugly ;-)

This is not enabled by default, because I find that the developer should be aware of what it does and what you need to take into account when using this hack.

What it does.
- changes the input type to password => disabled predictive text
- enables the colorMask option which creates a div which is positioned above the input.
So we type in the hidden password input and render the mask in the created div.
Be aware that by changing the type to password that all css you targeted for type=text will not be applied anymore.
You will need to adapt your css for it.  It is possible that the div is not well positioned.  If so, open an issue for it with a jsfiddle.

To enable the workaround add the androidHack option to your individual masks or globally by setting defaults.
You should set the option to "rtfm".

```
Inputmask("myfancymask", {androidHack: "rtfm"}).mask(selector);

Inputmask.extendDefaults({ androidHack: "rtfm" });
```

##Reporting android related issues

Before you submit an issue related to Android.  Test the issue with and without predictive text enabled.

If the issue also occurs with predictive text disabled you may create an issue for it on Github.
Otherwise, retry the issue on a desktop browser and add the colorMask: true option.
If the problem is still there you may submit an issue.

Always include a jsfiddle or alike to ease reproducing the problem.

When the issue only occurs due to predictive text I cannot solve it, until browsers start implementing the inputmode attribute on inputs.
