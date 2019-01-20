
// ref: https://umijs.org/config/
export default {
  base: '',
  publicPath: '/',
  define: {
    'process.env.API_URL': 'http://localhost:8088'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: true,
      title: 'Find Your Service',
      dll: true,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
}
