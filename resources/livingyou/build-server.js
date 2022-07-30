import { build } from 'esbuild';
import * as build_options from '../../build-options';

build({
    watch: build_options.default.devMode,
    tsconfig: './resources/livingyou/tsconfig.json',
    bundle: true,
    platform: 'node',
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/livingyou/server-src/startup.ts'],
    outfile: './resources/livingyou/server-dist.js',
    external: ['alt-*', 'altv-xsync-entity-server', 'dotenv', '@stuyk', 'bson'],
});
