import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig, loadEnv } from 'vite'

// https://github.com/honojs/vite-plugins/blob/main/packages/ssg/test/app.ts
// https://hono.dev/docs/getting-started/aws-lambda
// https://hono.dev/docs/helpers/ssg

//const isDev = import.meta.env.PROD != true;

export default ({ mode }) => {
    const root = process.cwd().replace(/\\/g, '/');

    // Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    //if (isDev) console.log(`\n[ DEV ]`);
    console.log(`[ CONFIG = ${mode} ]\n`);
    
    return defineConfig({
        define: {
            //__APP__: `"${process.env.VITE_KIT}"`
        },
        logLevel: 'error', // info | error | silent
        resolve: {
            alias: {
                '@': `${root}/src`
            },
        },
        plugins: [
            build({
                outputDir: './dist',
                minify: true,
                emptyOutDir: false,
            }),
            devServer({
                adapter,
                entry: 'src/index.ts',
            })
        ]
    });
}
