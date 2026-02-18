export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-1/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Reserva de Eventos"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-1/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Guía de Usuario"} }],
  ["/guide/instalacion.html", { loader: () => import(/* webpackChunkName: "guide_instalacion.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-1/docs/.vuepress/.temp/pages/guide/instalacion.html.js"), meta: {"title":"Instalación"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-1/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
