# Conectar los quizzes a Google Sheets

Los quizzes son HTML estático (no tienen base de datos). Para guardar las respuestas
usamos **Google Apps Script**, que crea un "endpoint" gratis al que el quiz le manda
los datos. Cada envío se agrega como una fila nueva en tu hoja de cálculo.

---

## Paso a paso (una sola vez, ~5 min)

### 1. Crea la hoja
1. Entra a https://sheets.google.com y crea una hoja nueva.
2. Nómbrala, por ejemplo, **Legionarios – Leads Quiz**.
3. No hace falta poner encabezados: el script los crea solo la primera vez.

### 2. Abre el editor de Apps Script
1. En la hoja: menú **Extensiones → Apps Script**.
2. Borra todo lo que aparezca en el editor.
3. Pega **todo** el código del archivo [`apps-script.gs`](apps-script.gs) (está junto a este documento).
4. Guarda (ícono del disquete o Ctrl/Cmd + S).

### 3. Publica el Web App
1. Arriba a la derecha: botón **Implementar → Nueva implementación**.
2. En "Tipo", elige el engrane ⚙️ → **Aplicación web**.
3. Configura:
   - **Descripción:** `Legionarios quiz`
   - **Ejecutar como:** `Yo` (tu cuenta)
   - **Quién tiene acceso:** `Cualquier usuario` ← IMPORTANTE
4. **Implementar.** Te va a pedir autorizar permisos → acepta con tu cuenta.
   (Si sale "Google no verificó la app", entra en *Configuración avanzada → Ir a (nombre) → Permitir*. Es tuya, es seguro.)
5. Copia la **URL del Web App** (termina en `/exec`).

### 4. Pega la URL en el quiz
En [`../paginas/quiz-diagnostico.html`](../paginas/quiz-diagnostico.html), busca esta línea
(cerca del inicio del `<script>`, en el bloque CONFIG):

```js
const SHEETS_URL = "";
```

Y pega tu URL entre las comillas:

```js
const SHEETS_URL = "https://script.google.com/macros/s/AAA.../exec";
```

Guarda, haz `commit` y `push`. ¡Listo! Cada quiz completado escribe una fila.

---

## Cómo probar que funciona
1. Abre el quiz y complétalo hasta ver un resultado.
2. Ve a tu hoja de Google Sheets → debe aparecer una fila nueva con la fecha, el
   resultado, la etapa, la **Palabra** (REVISIÓN/SOPORTE), el lead score, el tier
   (ICP_ALTO/MEDIO/BAJO) y las respuestas (una columna por pregunta, con el texto
   de la pregunta como encabezado).
3. Si no aparece: abre la consola del navegador (F12) y revisa si hay un aviso.

---

## Si cambias el código del Apps Script
Cada vez que edites el script tienes que **volver a implementar**:
**Implementar → Gestionar implementaciones → (editar, ícono lápiz) → Versión: Nueva → Implementar.**
Así la URL se mantiene igual.

---

## Notas
- Usar **varios quizzes** con la misma hoja funciona: agrega un campo `origen` en el
  payload de cada quiz para saber de cuál vino (te lo puedo dejar armado).
- Los datos viajan con `no-cors`, así que el navegador no lee la respuesta: es normal.
  Lo que importa es que la fila llegue a la hoja.
