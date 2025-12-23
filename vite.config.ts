import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, readFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

export default defineConfig({
  base: '/welcome-page/',
  plugins: [
    tailwindcss(),
    {
      name: 'vite-plugin-serve-404',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const url = (req.url || '').split('?')[0]
            if (!url) return next()

            // Ignorar peticiones internas de Vite y assets
            if (url.startsWith('/@vite') || url.startsWith('/__vite') || url.startsWith('/node_modules')) return next()

            // Ignorar rutas que terminan con / (van a ser servidas por Vite)
            if (url.endsWith('/')) return next()

            // Si la petición tiene extensión, dejar pasar (assets estáticos)
            if (url.includes('.')) return next()

            // Para cualquier otra ruta sin extensión, servir 404.html
            const notFoundPath = resolve(server.config.root, '404.html')
            if (existsSync(notFoundPath)) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(readFileSync(notFoundPath))
              return
            }

            return next()
          } catch (err) {
            return next()
          }
        })
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        animationportfolio: resolve(__dirname, 'portafolio/animation_portfolio/index.html'),
        'animation_portfolio/script': resolve(__dirname, 'portafolio/animation_portfolio/js/script.js'),
        creditcardpage: resolve(__dirname, 'portafolio/credit_card_page/creditcardpage.html'),
        'credit_card_page/main': resolve(__dirname, 'portafolio/animation_portfolio/js/script.js'),
        juegocienpersonas: resolve(__dirname, 'portafolio/act_100personasdijeron/act_100personasdijeron.html'),
      }
    }
  }
})