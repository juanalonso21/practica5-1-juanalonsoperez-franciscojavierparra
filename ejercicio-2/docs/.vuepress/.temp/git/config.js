import { GitContributors } from "/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-2/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "/Users/franparra/Documents/2DAW/DWEC/practica5-1-juanalonsoperez-franciscojavierparra/ejercicio-2/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
