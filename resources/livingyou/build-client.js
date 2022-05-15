import { build } from 'esbuild';

build({
    watch: false,
    bundle: true,
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/livingyou/client-src/startup.ts'],
    outfile: './resources/livingyou/client-dist.js',
    external: ['alt-*', 'natives'],
});
