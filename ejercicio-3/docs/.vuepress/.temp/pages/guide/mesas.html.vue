<template><div><h1 id="gestion-de-mesas-e-interactividad" tabindex="-1"><a class="header-anchor" href="#gestion-de-mesas-e-interactividad"><span>Gestión de Mesas e Interactividad</span></a></h1>
<p>El sistema utiliza componentes dinámicos para representar el restaurante.</p>
<h2 id="logica-de-seleccion" tabindex="-1"><a class="header-anchor" href="#logica-de-seleccion"><span>Lógica de Selección</span></a></h2>
<p>La selección de mesas se gestiona mediante un estado centralizado que verifica:</p>
<ul>
<li>Capacidad de la mesa vs Número de comensales.</li>
<li>Conflictos de horario con otras reservas.</li>
</ul>
<h2 id="componentes" tabindex="-1"><a class="header-anchor" href="#componentes"><span>Componentes</span></a></h2>
<ul>
<li><code v-pre>TimeSlotSelector</code>: Maneja el tramo horario.</li>
<li><code v-pre>RestaurantLayout</code>: Renderiza el mapa SVG de las mesas.</li>
<li><code v-pre>TableIcon</code>: Representa individualmente cada mesa y su estado.</li>
</ul>
</div></template>


