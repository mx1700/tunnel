// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    externals: {
      _http_common: 'commonjs2 _http_common',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: 'prisma/schema.prisma', to: '.' },
          { from: 'prisma/tunnel.db', to: '.' },
          {
            from: 'node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node',
            to: '.',
          },
          // { from: 'other', to: 'public' },
        ],
      }),
    ],
  };
};
