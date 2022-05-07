# Minimal working example demonstrating need to manually include license

## Instructions

```sh
npm run install
npm run build
```

Note that GLSL code from the npm module `glsl-noise` is included in the bundle. However rollup-plugin-license does not include the license for this module in `distribution.txt`. It's code is processed by GLSL and does not appear in any javascript files.

If one were to import code from `glsl-noise` directly into a JS file (e.g. using rollup-plugin-string) then the license would be included.

## Proposal

In a case like this, it would be useful for rollup-plugin-license to include an option to remedy the situation. Possibilities are:

- An option that lets you manually specify npm modules whose licenses should be included
- An option that requests all licenses in the `dependencies` section (but not `devDependencies`) are included in the generated `distribution.txt`.