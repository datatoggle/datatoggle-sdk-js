// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

export default [{
    input: './src/index.ts',
    plugins: [
        commonjs(),
        resolve(),
        typescript()
    ],
    output: {
        name: 'datatoggle_mixpanel',
        dir: 'dist',
        format: 'umd',
        plugins: [terser({ format: { comments: false } })]
    },
}
]
