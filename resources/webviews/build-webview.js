import { build } from 'esbuild';
import pluginVue from 'esbuild-plugin-vue-next';

build({
    watch: true,
    bundle: true,
    target: 'esnext',
    logLevel: 'info',
    format: 'cjs',
    entryPoints: ['./resources/webviews/client-src/main.ts'], // your entry file
    outfile: './resources/webviews/assets/bundle.js',
    loader: { '.png': 'file' },
    plugins: [pluginVue()],
});
