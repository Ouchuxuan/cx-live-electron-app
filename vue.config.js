const path = require('path');
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: "public/index.html",
      filename: "index.html",
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "test"
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.cx.CXPlayer",
        copyright: "LEON", // 版权
        productName: "CXPlayer", // 项目名
        win: {
          // icon: 'build/icons/icon.ico',
          target: 'nsis',
          "target": [
            {
              "target": "nsis",//利用nsis制作安装程序
              "arch": [
                "x64",//64位
                "ia32"//32位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // "installerIcon": "./build/icons/aaa.ico",// 安装图标
          // "uninstallerIcon": "./build/icons/bbb.ico",//卸载图标
          // "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true // 创建开始菜单图标
          // "shortcutName": "xxxx", // 图标名称
          // "include": "build/script/installer.nsh", // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
        }
      }
    },
  },
  configureWebpack: {
    node: {
      __dirname: process.env.NODE_ENV !== "production",
      __filename: process.env.NODE_ENV !== "production"
    },
    plugins: [
      new webpack.DefinePlugin({
        // 解决fluent-ffmpeg的引入问题
        'process.env.FLUENTFFMPEG_COV': false
      })
    ]
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // 向所有 Sass 样式传入共享的全局变量
      sass: {
        prependData: `@import "@/style/variable.scss";`
      }
    }
  },
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080,
    https: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  }
}
