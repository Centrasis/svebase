import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: 'dist/svebase.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/svebase.js'
      }
    ],
    plugins: [
      vue(),
      peerDepsExternal(),
      typescript()
    ]
  }
]
