import { CodeTabs } from "/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-2/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-2/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-2/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
