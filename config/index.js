const config = {
  projectName: 'taro-msparis',
  date: '2018-9-27',
  // 设计稿尺寸
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  // 通用插件配置
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    },
    uglify: {
      enable: true,
      config: {
        // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
      }
    },
    csso: {
      enable: true,
      config: {
        // 配置项同 https://github.com/css/csso#minifysource-options
      }
    }
  },
  // 全局变量设置
  defineConstants: {},
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          limit: 10240
        }
      }
    },
    // 替换 JSX 中的属性名，参考：
    // https://github.com/NervJS/taro/issues/2077
    jsxAttributeNameReplace: {}
  },
  // H5 端专用配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    },
    // 自定义 Webpack 配置
    webpackChain: {},
    devServer: {}
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
