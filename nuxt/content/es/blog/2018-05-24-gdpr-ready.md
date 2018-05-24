---
layout: blog
title: "Bienvenido a nuestra nueva web. Cumple con el RGPD, habla 3 idiomas y huele a pintura fresca"
linktitle: "Nuestra nueva web cumple con RGPD y i18n"
img: paint.jpg
caption: "El cambio más importante es obviamente que hemos cambiado el morado por el negro como nuestro color principal"
author: joost
category: site
blurb: "Aquí está nuestra nueva web. Cumple con el RGPD, viene en tres idiomas y desde luego tiene un montón de cosas que necesitan más trabajo"
---

Mañana, 25 de mayo, el Reglamento General de Protección de Datos (RGPD, o GDPR en sus siglas en inglés) de la Unión Europea (UE) entra en vigor.
A partir de entonces, los negocios que no respeten la privacidad de los ciudadanos de la UE se exponen a multas de hasta el 4% de su volumen de negocio anual.

La fecha marca nada menos que un momento decisivo para la privacidad online, ya que la ley de protección de datos más estricta del mundo se aplicará de pronto a quinientos millones de personas.

## Ahora se requiere tu consentimiento

Para freesewing, cumplir con RGPD no es un problema en sí mismo.
Teníamos un plan sólido, y lo único que hemos tenido que añadir a la web es *consentimiento*.
Ya no se nos permite procesar tus datos sin tu permiso.
Un permiso que tenemos que pedir explícitamente y con detalle.

Así que ahora tenemos dos tipos de preguntas que hacerte:

 - ¿Das tu consentimiento para procesar los datos de tu perfil?
 - ¿Das tu consentimiento para procesar los datos de tu modelo?

Hacemos la distinción porque son dos cosas diferentes.
Un perfil/cuenta se requiere para usar la web, publicar comentarios y demás.
Los datos de los modelos se necesitan para generar patrones de costura a medida.

Te haremos estas preguntas cuando sean relevantes
(como cuando necesitemos acceso a esos datos específicos),
y puedes verlas de nuevo en cualquier momento [en las opciones de tu cuenta](/account).

## Es nuestro deber informarte

Bajo el RGPD, debemos informarte sobre cómo manejamos asuntos de privacidad.
Hemos escrito acerca de [nuestro enfoque a la privacidad](/blog/privacy-choices) antes,
pero esto requiere algo (un poco) más formal.

Así que hemos esbozado una [advertencia de privacidad](/privacy) que resume estas cosas.

Además de la advertencia de privacidad, hemos preparado [una página que enumera todos tus derechos](/rights),
y que explica cómo ejercitarlos.

Con estos cambios, cumplimos con tu derecho a ser informado.

## Privacidad por diseño

Uno de los requisitos más vagos pero más importantes del RGPD es lo que se llama *privacidad-por-diseño*.
Hemos tomado el consejo al pie de la letra y hemos hecho dos cambios inspirados por ello:

 -Encriptación de datos en reposo
 -Eliminación de cuentas inactivas

Ahora encriptamos los datos de tu perfil en reposo.
En otras palabras, nuestra base de datos recoge tu informaición, pero está encriptada.
Sólo la desencriptamos cuando la necesitamos.

También eliminaremos las cuentas que hayan estado inactivas durante 12 meses.
En otras palabras, si no inicias sesión en la web durante un año, tu cuenta y todos tus datos serán eliminados.

De todas maneras, respecto a esto último, habrá un pequeño periodo de gracia, ya que todavía no hemos implementado todos los cambios.
Lo que me lleva al siguiente punto:

## Nuevo además: todo el resto

Estos cambios relacionados con el RGPD parecían una buena oportunidad para volver sobre alguna de las elecciones que hemos hecho, y ver si había margen de mejora.
De todos modos esa era la idea inicial. Al final, hemos reescrito completamente la web desde cero.

Nuestra web anterior usaba [Jekyll](https://jekyllrb.com/) como generador de sitio estático,
con una pila de código JavaScript para añadir los elementos dinámicos.
Aunque esto hacía el papel, había dos desventajas importantes:

 -Jekyll usa el lenguage de progamación Ruby. Eso hace otro lenguage de programación, otro administrador de paquetes y otro ecosistema con los que los colaboradores potenciales tienen que lidiar. Queríamos evitar esto.
 -Esa *pila* de código JavaScript era bastante literal. Estaba empezando a ser problemática de mantener, sin mencionar que sería difícil para nuevos desarrolladores lanzarse y entender qué está pasando.
 
Así que, para matar dos pájaros de un tiro, hemos reescrito el sitio entero usando [Vue.js](https://vuejs.org/) y [Nuxt](https://nuxtjs.org/).
Nuestra interfaz entera está escrita en JavaScript (no necesita más Ruby) y gracias a la naturaleza modular de Vue y su enfoque basado en componentes debería ser mucho más fácil de mantener.

## Internacionalización, alias i18n

Obviamente, ya que hemos estado reescribiendo cosas, hemos lanzado un par de nuevas características.
La más obvia es que ahora damos soporte completo a i18n (internacionalización):

Aunque la traducción es una tarea en progreso, lo tenemos todo listo para implementarla.
Empezando hoy, freesewing no está disponible únicamente en inglés, sino también en Holandés y Español.

Me gustaría agradecer a [@AnnekeCaramin](/users/annekecaramin) y a [@AlfaLyr](/users/alfalyr), nuestros cordinadores de idiomas para Holandés y Español respectivamente, así como a todas las demás personas que han colaborado en la traducción.

Una vista general del estado de traducción a los diferentes idiomas está disponible [aquí](/i18n), 
y espero que pronto podamos añadir más idiomas.

## Cuidado con la pintura fresca

Se puede argumentar que este lanzamiento es prematuro.
Todavía tenemos [un par de problemas por solucionar](https://github.com/freesewing/site/issues), 
y falta buena parte de la documentación. 

Sin embargo, dado que la fecha límite nos ha sido impuesta, no teníamos mucha elección en esto.
Esto es, si queremos cumplir completamente con el RGPD, y queremos.

Así que, por favor, ten paciencia mientras continuamos construyendo esta web y nuestra plataforma.
Y no dudes en informarnos cuando algo vaya mal.
