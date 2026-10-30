# Inputmask NuGet packages

Two packages are published from this repository. Each ships the build that
matches how you instantiate Inputmask, under `Scripts/inputmask`:

| Package id        | Intended for                                        |
| ----------------- | --------------------------------------------------- |
| `inputmask`       | vanilla Inputmask, the general purpose package      |
| `jQuery.InputMask` | the jQuery flavour, for existing jQuery code bases  |

The javascript is also published on npm as [`inputmask`](https://www.npmjs.com/package/inputmask)
and is the recommended way to consume it. The NuGet packages exist for .NET web
projects that already manage their front end assets through NuGet.

## Installing

### .NET (Core / 5+, PackageReference)

```sh
dotnet add package jQuery.InputMask
```

The files are added as package content and show up in Solution Explorer under the
package. They are not copied into your project, so add a reference to the files
you need in your csproj:

```xml
<ItemGroup>
  <Content Include="node_modules\@inputmask\jquery\dist\jquery.inputmask.min.js" />
</ItemGroup>
```

Or copy them into `wwwroot` and reference them from your layout the way you
reference any other static file.

### ASP.NET MVC / WebForms (packages.config)

```
PM> Install-Package jQuery.InputMask
```

The files are copied into `Scripts/inputmask` on install. Reference them from
`App_Start/BundleConfig.cs`:

```csharp
bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
            "~/Scripts/inputmask/jquery.inputmask.min.js"));
```

and in your layout:

```html
@Scripts.Render("~/bundles/inputmask")
```

## What is in the package

`inputmask` (vanilla):

```
inputmask.js               vanilla UMD build
inputmask.min.js           vanilla UMD build, minified
colormask.js(.min).js      color mask extension
colormask.css              styling for the color mask
esm/                       ES modules
types/                     TypeScript declarations
```

`jQuery.InputMask` (jQuery plugin and bindings):

```
jquery.inputmask.js        jQuery UMD build
jquery.inputmask.min.js    jQuery UMD build, minified
jquery.inputmask.d.ts      TypeScript declaration
```

## Releasing

The packages are built and pushed from this repository, see `nuspecs/` and the
`nugetpack` / `nugetpush` grunt tasks in the `Gruntfile`.

```sh
npx grunt build        # build dist, the packages are built from it
npx grunt nugetpack    # pack both packages into build/
npx grunt nugetpush    # push them, needs NUGET_API_KEY
```

`NUGET_SOURCE` overrides the feed, which is handy to verify a package against a
local folder feed.
