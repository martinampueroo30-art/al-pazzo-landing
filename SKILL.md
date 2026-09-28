---
name: landing-page
description: Construye landings que convierten, con un molde ya diseñado. Úsala siempre que te pidan crear, hacer, rehacer o mejorar una landing, una página de presentación, un sitio de una sola página o la portada de un negocio, servicio o institución, en Next.js o en HTML.
---

# Cómo se hace una landing en este proyecto

Una landing no es un folleto con toda la información: es una página que lleva a
**una sola acción**. Aquí no la diseñas de cero. Esta carpeta trae el molde ya
resuelto y tu trabajo es rellenarlo con los datos reales.

## Cómo se hace

1. **Lee la fuente de datos** que declara el `AGENTS.md` del proyecto y anota qué
   sección del molde puede llenarse con ella. Si un dato no está, **no lo inventes**:
   dilo antes de escribir.
2. **Decide LA acción** de la página, una sola: postular, cotizar, reservar, escribir.
   Todos los botones van a decir eso mismo.
3. **Copia el molde**, sin rediseñarlo:
   - `resources/page.tsx` → `app/page.tsx` (en un proyecto Next.js)
   - `resources/tokens.css` → reemplaza **completo** `app/globals.css`
   - Si el encargo pide un solo archivo HTML, replica el mismo orden de secciones,
     los mismos colores y la misma barra fija en celular.
4. **Rellena solo la primera mitad** de `page.tsx`, la que dice `1. LOS DATOS`.
   La segunda mitad no se toca. Si el encargo pide más secciones de las que trae el
   molde, **repite un bloque que ya existe** con otro título y otros datos; no inventes
   un diseño nuevo.
5. **Ajusta la marca**: cambia `--primary` y `--primary-ink` en `tokens.css` por los
   colores del negocio. Nada más. Sin fotos ni logos que no existan: el molde usa
   bloques de color a propósito.
6. **Revisa con `resources/checklist.md`** antes de decir que está lista, y arregla
   lo que falle.

Si dudas de cómo mapear un dato a una sección, mira `examples/mapa-natacion.md`.

## Lo que no se negocia

- **Un solo llamado a la acción**, repetido: arriba, en la portada, en el formulario
  y en la barra fija del celular. Nunca cinco acciones compitiendo.
- **El orden de las secciones es fijo**, porque es el orden en que una persona decide:
  promesa → prueba → oferta → cómo se hace → formulario.
- **Un título grande por sección** y aire alrededor. Nada de muros de texto.
- **Celular primero**: tiene que leerse a 375 px de ancho sin hacer zoom y sin que
  aparezca una barra de desplazamiento horizontal.
- **Los datos salen de la fuente oficial.** Ningún precio, horario, nombre ni
  testimonio inventado.

## Al terminar

Di en una línea qué datos usaste, qué secciones quedaron con información real y
**qué le faltó a la fuente**. Eso último es lo más útil para quien te encargó la página.
