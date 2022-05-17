import { build } from 'esbuild';
import pluginVue from 'esbuild-plugin-vue-next';
import * as build_options from '../../build-options';

build({
    watch: build_options.default.devMode,
    bundle: true,
    target: 'esnext',
    logLevel: 'info',
    format: 'cjs',
    entryPoints: ['./resources/webviews/client-src/main.ts'], // your entry file
    outfile: './resources/webviews/assets/bundle.js',
    loader: { '.png': 'file' },
    plugins: [pluginVue()],
});
