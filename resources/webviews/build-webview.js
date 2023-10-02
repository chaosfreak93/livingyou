import { build } from 'esbuild';
import pluginVue from 'esbuild-plugin-vue-next';
import * as build_options from '../../build-options';

build({
    //watch: build_options.default.devMode,
    tsconfig: './resources/webviews/tsconfig.json',
    bundle: true,
    platform: 'browser',
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/webviews/client-src/main.ts'],
    outfile: './resources/webviews/assets/bundle.js',
    loader: { '.png': 'file' },
    plugins: [pluginVue()],
});
