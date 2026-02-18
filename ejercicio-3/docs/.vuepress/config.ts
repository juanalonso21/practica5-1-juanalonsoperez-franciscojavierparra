import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'es-ES',
  title: 'Ejercicio 3: VueDining',
  description: 'Sistema de reservas de restaurante',
  theme: defaultTheme({
    navbar: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guía de Usuario',
          children: ['/guide/README.md', '/guide/mesas.md'],
        },
      ],
    },
  }),
})
