export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-3/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"VueDining - Reservas de Restaurante"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-3/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Guía de Reservas VueDining"} }],
  ["/guide/mesas.html", { loader: () => import(/* webpackChunkName: "guide_mesas.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-3/docs/.vuepress/.temp/pages/guide/mesas.html.js"), meta: {"title":"Gestión de Mesas e Interactividad"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-3/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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
