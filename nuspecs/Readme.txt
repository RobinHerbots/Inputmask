## .NET Nuget Package Install

PM> Install-Package InputMask

In App_Start, BundleConfig.cs

bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
            //~/Scripts/inputmask/dependencyLibs/inputmask.dependencyLib.js",  //if not using jquery
            "~/Scripts/inputmask/inputmask.js",
            "~/Scripts/inputmask/jquery.inputmask.js",
            "~/Scripts/inputmask/inputmask.extensions.js",
            "~/Scripts/inputmask/inputmask.date.extensions.js",
            //and other extensions you want to include
            "~/Scripts/inputmask/inputmask.numeric.extensions.js"));

In Layout

@Scripts.Render("~/bundles/inputmask")
