<template><div><h1 id="implementacion-tecnica" tabindex="-1"><a class="header-anchor" href="#implementacion-tecnica"><span>Implementación Técnica</span></a></h1>
<p>El checkout utiliza un patrón de diseño de &quot;Asistente&quot; (Wizard).</p>
<h2 id="gestion-del-estado" tabindex="-1"><a class="header-anchor" href="#gestion-del-estado"><span>Gestión del Estado</span></a></h2>
<p>Utilizamos <strong>Pinia</strong> para mantener los datos a lo largo de los diferentes pasos:</p>
<ul>
<li><code v-pre>checkoutStore</code>: Almacena la información de envío y pago.</li>
<li><code v-pre>cartStore</code>: Gestiona los artículos del carrito.</li>
</ul>
<h2 id="enrutamiento" tabindex="-1"><a class="header-anchor" href="#enrutamiento"><span>Enrutamiento</span></a></h2>
<p>El <code v-pre>Vue Router</code> se encarga de cambiar entre las vistas de cada paso, manteniendo una URL limpia y permitiendo la navegación hacia atrás del navegador.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">'/checkout/envio'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> ShippingStep <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


