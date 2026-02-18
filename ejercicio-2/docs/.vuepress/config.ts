import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'es-ES',
  title: 'Ejercicio 2: Checkout de Tienda',
  description: 'Documentación del asistente de checkout',
  theme: defaultTheme({
    navbar: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guía de Usuario',
          children: ['/guide/README.md', '/guide/pasos.md'],
        },
      ],
    },
  }),
})
