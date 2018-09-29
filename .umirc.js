export default {
  publicPath: '/h5/',
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true
    }],
  ],
  proxy: {
    "/api": {
      "target": "https://api.tuexing.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
