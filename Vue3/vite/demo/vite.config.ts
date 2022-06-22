import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  resolve:{
    alias:{
      '@':resolve(__dirname,'src'),
      '/icon':'./src/assets/images/icon'
    }
  },
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        // 生产环境移除console
        drop_console :true,
        drop_debugger:true
    }
      }
  },
  plugins: [
    vue(), 
    Components({
    resolvers: [AntDesignVueResolver()],
  }),
  viteMockServe({
    // default
    mockPath: 'mock',
  }),
]
})
