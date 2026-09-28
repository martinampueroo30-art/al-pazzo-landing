# Encargo - Landing page de Al Pazzo

Copia este encargo en la herramienta que construirá la página. Antes de comenzar, deben estar en la misma carpeta el archivo `AGENTS-Al-Pazzo.md`, el menú oficial y el logo de la marca.

## Encargo - La landing de Al Pazzo (modo planificar)

```text
# Rol

Eres diseñador y desarrollador web de Al Pazzo, una banquetería boutique de pizzas artesanales para celebraciones y eventos privados en Santiago.

## Datos

- AGENTS-Al-Pazzo.md, en esta carpeta: guía oficial de marca, público, tono, diseño, contenido y reglas de trabajo.
- Menu_Al_Pazzo_Completo(1).pdf, en esta carpeta: fuente oficial de pizzas e ingredientes. Utiliza únicamente su sección Le Pizze.
- a5da8755-34f3-4fb4-977d-754bab0fa19e.png, en esta carpeta: logo oficial y referencia de colores de la marca.

## Qué quiero

Crea una landing `index.html` de una sola página para Al Pazzo, pensada primero para celular, responsive y sin librerías externas. Todo debe funcionar dentro del archivo, salvo el destino final de los datos del formulario.

La página debe sentirse italiana, cálida, artesanal, elegante y cercana. Usa la paleta del logo: fondo crema o marfil, negro como base, rojo terracota como color principal y verde italiano solo como acento secundario.

La landing debe incluir:

1. Una portada visual con el logo, el nombre Al Pazzo, una frase breve que invite a celebrar y un botón principal que lleve al formulario de inscripción.
2. Una sección que explique qué es Al Pazzo: una experiencia de pizzas artesanales para compartir en cumpleaños, aniversarios, celebraciones familiares, encuentros con amigos y eventos de empresa.
3. Una sección breve de Le Pizze, usando exclusivamente los nombres e ingredientes del menú oficial.
4. Una sección “Cómo funciona” con un recorrido simple para conocer la propuesta, inscribirse y recibir contacto de Al Pazzo. No inventes condiciones comerciales, plazos ni disponibilidad.
5. Un formulario de inscripción claro, atractivo y fácil de completar desde el celular con estos campos obligatorios:
   - Nombre
   - Apellido
   - Dirección de domicilio
   - Comuna
   - Teléfono
   - Correo electrónico
6. Un cierre con una frase de celebración, el logo y un nuevo acceso al formulario.

## Comportamiento del formulario

- El formulario representa una inscripción de contacto; no crea todavía una cuenta con contraseña.
- Todos los campos son obligatorios.
- Usa etiquetas visibles encima de cada campo; no dependas únicamente de placeholders.
- Valida que nombre, apellido, dirección y comuna no estén vacíos.
- Usa `type="tel"` para teléfono y `type="email"` para correo electrónico.
- Acepta teléfonos chilenos escritos con espacios, guiones o prefijo `+56`, sin exigir un único formato visual.
- Muestra errores específicos junto al campo correspondiente y conserva lo que la persona ya escribió.
- El botón de envío debe decir “Inscribirme”.
- Incluye un texto breve que indique que los datos se utilizarán para contactar a la persona por su inscripción. No inventes una política de privacidad ni enlaces legales inexistentes.
- Antes de conectar el formulario, pregúntame dónde deben recibirse o almacenarse las inscripciones.
- No envíes datos personales a servicios externos, correos, planillas, bases de datos ni WhatsApp sin aprobación expresa y configuración real.
- Mientras no exista un destino confirmado, deja la interfaz y sus validaciones terminadas, pero no muestres una confirmación falsa de envío ni guardes los datos en `localStorage`.
- Cuando el destino esté configurado, muestra un mensaje de éxito claro y evita envíos duplicados mientras la solicitud está en proceso.

## Dirección visual

- Respeta el logo sin redibujarlo, deformarlo, recortarlo ni cambiar sus colores.
- Usa el rojo terracota del logo para botones y acciones principales.
- Usa el verde con moderación en detalles pequeños, separadores o estados positivos.
- Usa negro o carbón para textos y títulos.
- Mantén fondos crema o marfil y suficiente contraste para lectura.
- Combina una tipografía con aire editorial italiano en títulos y una sans serif legible en textos, formularios y botones.
- Da protagonismo al horno, al fuego, a las curvas y a los detalles artesanales de manera sutil.
- Usa espacios amplios, bordes suaves y una composición limpia.
- Evita la estética de delivery, cadenas de comida rápida, banderas italianas repetidas y decoraciones de trattoria recargadas.
- Si no hay fotografías oficiales, crea una página tipográfica y elegante con el logo; no inventes testimonios ni uses fotos falsas o no autorizadas.

## Experiencia móvil y accesibilidad

- Diseña primero para pantallas móviles y comprueba también la versión de escritorio.
- El botón principal debe ser fácil de tocar y llevar con desplazamiento suave al formulario.
- Cada campo debe tener `label`, nombre comprensible y atributos de autocompletado cuando correspondan.
- Usa `autocomplete="given-name"`, `family-name`, `street-address`, `address-level2`, `tel` y `email` según el campo.
- El formulario debe poder completarse usando teclado y lector de pantalla.
- Los estados de foco, error, carga y éxito deben ser visibles y no depender solo del color.
- Respeta `prefers-reduced-motion` si agregas transiciones.
- Optimiza el logo y cualquier imagen para que la página cargue rápido.

## Reglas

- Sigue `AGENTS-Al-Pazzo.md` en todas las decisiones de marca y contenido.
- Para este encargo específico, la acción principal es **Inscribirse** y reemplaza a “Cotiza tu evento” como CTA principal. Si ambas acciones fueran necesarias, pregúntame antes de agregarlas.
- Usa únicamente la sección Le Pizze del menú y los archivos oficiales; no agregues otras categorías de productos ni inventes precios, promociones, porciones, cobertura, horarios, disponibilidad, testimonios, fotografías o condiciones del servicio.
- La marca se escribe Al Pazzo, en dos palabras.
- Usa tuteo y un tono cercano, apetitoso, elegante y relajado.
- No agregues librerías, frameworks, trackers, cookies ni servicios externos por tu cuenta.
- No recolectes más datos personales que los seis campos solicitados, salvo un consentimiento necesario y previamente aprobado.
- No incluyas casillas de marketing premarcadas.
- Muéstrame el plan antes de generar la página.
- Si falta información para hacer funcionar la inscripción, detente y pregúntame antes de conectar o publicar el formulario.
- Cuando termines, abre la página en el navegador y comprueba el formulario en vista móvil y escritorio.
- Al finalizar, dime en una línea qué debo revisar y enumera cualquier integración que siga pendiente.
```

## Dato pendiente antes de publicar

Para que las personas puedan inscribirse realmente, falta elegir el destino de los datos: correo, Google Sheets, una plataforma de formularios o una base de datos. La landing puede diseñarse y validarse antes, pero no debe publicarse como formulario operativo hasta que ese destino y el aviso de privacidad estén definidos.
