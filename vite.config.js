import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


const defineAlisConfig = () => {
  return {
    // Update this paths to ./submodules/re
    '@': path.resolve(__dirname,'.'),
    '@api': path.resolve(__dirname,'./api'),
    '@core': path.resolve(__dirname,'./core'),
    '@components': path.resolve(__dirname,'./components'),
    '@hooks': path.resolve(__dirname,'./hooks'),
    '@pages': path.resolve(__dirname,'./pages'),
    '@theme': path.resolve(__dirname,'./theme')
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: defineAlisConfig()
  }
})
