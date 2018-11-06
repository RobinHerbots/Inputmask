## .NET Nuget Package Install

PM> Install-Package InputMask

In App_Start, BundleConfig.cs

bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
            "~/Scripts/inputmask/jquery.inputmask.js"));

In Layout

@Scripts.Render("~/bundles/inputmask")
