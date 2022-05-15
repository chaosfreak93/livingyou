import { build } from 'esbuild';
import altvServerDev from 'esbuild-plugin-altv-dev-server';
let devMode = false;

build({
    watch: devMode,
    bundle: true,
    target: 'esnext',
    logLevel: 'info',
    format: 'esm',
    entryPoints: ['./resources/livingyou/server-src/startup.ts'],
    outfile: './resources/livingyou/server-dist.js',
    platform: 'node',
    external: ['alt-server', 'alt-shared', 'altv-xsync-entity-server', 'dotenv', '@stuyk', 'axios'],
    plugins: devMode
        ? [
              altvServerDev({
                  hotReload: {
                      clientPath: './resources/livingyou/client-dist.js',
                  },
                  reconnectPlayers: {
                      delay: 500,
                  },
              }),
          ]
        : [],
});
