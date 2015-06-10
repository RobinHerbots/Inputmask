## .NET Nuget Package Install

```html
PM> Install-Package jQuery.InputMask
```

In App_Start, BundleConfig.cs

```c#
bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
            "~/Scripts/jquery.inputmask/inputmask.js",
            "~/Scripts/jquery.inputmask/jquery.inputmask.js",
                        "~/Scripts/jquery.inputmask/inputmask.extensions.js",
                        "~/Scripts/jquery.inputmask/inputmask.date.extensions.js",
                        //and other extensions you want to include
                        "~/Scripts/jquery.inputmask/inputmask.numeric.extensions.js"));
```

In Layout

```html
@Scripts.Render("~/bundles/inputmask")
```
