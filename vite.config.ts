import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 公共资源路径
  // 配置路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // 配置服务
  server: {
    port: 3000, // 设置服务启动端口号
    host: '0.0.0.0', // 解除局域网访问限制
  },
  // css配置
  css: {
    preprocessorOptions: {    // css预处理器 
      less: {
        charset: false,
        additionalData: '@import "@/assets/style/attribute.less";',
      },
    },
  },
})
