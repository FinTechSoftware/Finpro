const esbuild = require('esbuild');
const parseArgs = require('minimist');
const del = require('del');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  const { globby } = await import('globby');
  const destinationPath = 'dist';
  const isRelease = Boolean(process.env.RELEASE);

  const cssPluginOptions = {
    uglify: true,
    filter: /components\/.*\.css$/
  };

  if (!isRelease) {
    cssPluginOptions.transform = (content) => content.replace(/.*:hover[^{]*/g, matched => {
      // Replace :hover with special class. (There will be additional classes for focus, etc. Should be implemented in here.)
      const replacedWithNewClass = matched.replace(/:hover/, '.__ONLY_FOR_STORYBOOK_DEMONSTRATION_HOVER__')
      // Concat strings
      return matched.concat(', ', replacedWithNewClass)
    })
  }


  try {
    const buildOptions = {
      entryPoints: [
        'src/finpro.ts',
        'src/finpro-react.ts',
        ...(await globby([
          'src/components/**/!(*.(test|d)).ts',
          'src/themes/*.css',
          'src/components/**/*.svg',
        ])),
      ],
      loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.svg': 'file',
      },
      outdir: destinationPath,
      assetNames: 'assets/[name]',
      bundle: true,
      sourcemap: true,
      format: 'esm',
      target: ['es2020', 'chrome73', 'edge79', 'firefox63', 'safari12'],
      splitting: true,
      metafile: true,
      minify: true,
      external: ['react'],
      plugins: [
        litCssPlugin(cssPluginOptions),
      ],
    };


    if (args.serve) {
      const servedir = 'playground';

      let ctx = await esbuild.context({
        ...buildOptions,
        outdir: `${servedir}/dist`
      });

      const { host, port } = await ctx.serve(
        {
          servedir,
          host: 'localhost',
        }
      );

      console.log(`Playground is served on http://${host}:${port}`);

      return;
    }

    const { errors, warnings, metafile } = await esbuild.build(buildOptions);

    if (errors.length > 0) {
      console.error('Build Failed!', errors);
      return;
    }

    if (warnings.length > 0) {
      console.error('Build Failed!', errors);
    }

    const analyzeResult = Object.entries(metafile.outputs)
      .map(([fileName, data]) => ({
        fileName,
        size: `${(data.bytes / 1024).toFixed(2)} KB`,
      }))
      .filter(
        ({ fileName }) =>
          !/icon\/icons\/general-icons\/.*\.js/.test(fileName) &&
          (fileName.endsWith('.js') || fileName.endsWith('.css'))
      );

    await del(`${destinationPath}/components/icon/icons/general-icons`);

    console.table(analyzeResult, ['fileName', 'size']);

    console.info('Build Done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
