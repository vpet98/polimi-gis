import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  base: '/polimi-gis/',

  publicDir: 'public',

  build: {
    target: 'ES2022',
    outDir: 'docs',

    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(
          globSync('pages/*.html').map(file => [
            path.relative(
              'pages',
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
      },
    },
  },
};
