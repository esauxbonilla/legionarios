/* ============================================================
   LEGIONARIOS — BANCO DE RECURSOS
   ------------------------------------------------------------
   Cada objeto de este array = una tarjeta en el index.
   Para agregar un recurso nuevo, copia un bloque y edítalo.

   Campos:
     tags     -> etiquetas superiores (array). Ej: ["FITNESS","PROPUESTA"]
     estado   -> "BORRADOR" | "EN VIVO" | "ENVIADA"
     titulo   -> nombre grande de la tarjeta
     desc     -> descripción corta
     fecha    -> texto libre. Ej: "Jul 2026"
     url      -> ruta al archivo (ej: "paginas/lv4lft.html"). "" o "#" = sin link aún
   ============================================================ */

const RECURSOS = [
  {
    tags: ["FITNESS", "QUIZ", "LEAD MAGNET"],
    estado: "BORRADOR",
    titulo: "¿DEFINIR, SUBIR O RECOMPONER?",
    desc: "Diagnóstico interactivo de 5 minutos. Detecta la etapa física del prospecto (definir / subir / recomponer / ordenar sistema) y califica al lead con scoring interno.",
    fecha: "Jul 2026",
    url: "paginas/quiz-diagnostico.html",
  },
];
