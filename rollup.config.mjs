import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy-assets";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import resolve from '@rollup/plugin-node-resolve'
import license from "rollup-plugin-license"
import path from "path";
import glslify from 'rollup-plugin-glslify';
import {default as babel} from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
const meta = JSON.parse(fs.readFileSync('./package.json'));

const production = !process.env.ROLLUP_WATCH;
const dest = path.join(__dirname,production ? "dist/" : "dev/");

export default [
  {
    input: `${__dirname}/src/sketch.js`,
    output: {
      file: `${dest}/bundle.js`,
      sourcemap: !production,
      format: "iife",
      // dir: dest,
    },
    plugins: [
      del({ targets: dest, runOnce: true }),
      copy({ 
        // targets: [{ src: "src/*.html", dest: dest }],
        assets: ['./src/index.html'],
      }),
      resolve(),
      commonjs(),
      babel.babel({
        babelHelpers: 'bundled',
      }),
      glslify({
        include: [
          '**/*.vert',
          '**/*.frag',
        ],
      }),
      license({
        sourcemap: true,
        cwd: __dirname, // Default is process.cwd()
        thirdParty: {
          includePrivate: true, // Default is false.
          output: `${dest}/dependencies.txt`,
        },
      }), 
      !production && serve({ contentBase: "./dev", }),
      !production && livereload({
        delay: 500,
        verbose: true,
        extraExts: ["glsl", "mjs"],
      }),
    ]
  },
];
