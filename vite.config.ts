import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:"https://Emmanuel0722.github.io/TodoListReactTS",
  base:"/TodoListReactTS/",
})
