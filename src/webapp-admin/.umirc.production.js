
// ref: https://umijs.org/config/
export default {
  base: '/admin',
  publicPath: '/admin/',
  define: {
    'process.env.API_URL': 'https://find-your-service.herokuapp.com'
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
