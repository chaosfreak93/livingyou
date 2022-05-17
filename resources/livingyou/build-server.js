import { build } from 'esbuild';
import * as build_options from '../../build-options';

build({
    watch: build_options.default.devMode,
    bundle: true,
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/livingyou/server-src/startup.ts'],
    outfile: './resources/livingyou/server-dist.js',
    platform: 'node',
    external: ['alt-server', 'alt-shared', 'altv-xsync-entity-server', 'dotenv', '@stuyk', 'axios'],
});
