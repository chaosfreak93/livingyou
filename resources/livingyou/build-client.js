import { build } from 'esbuild';
import * as build_options from '../../build-options';

build({
    watch: build_options.default.devMode,
    tsconfig: './resources/livingyou/tsconfig.json',
    bundle: true,
    platform: 'browser',
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/livingyou/client-src/startup.ts'],
    outfile: './resources/livingyou/client-dist.js',
    external: ['alt-*', 'natives'],
});
