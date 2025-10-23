/**
 * Frases graciosas para el modal del botón "CAGÓN"
 * Se muestran aleatoriamente cuando alguien intenta seleccionar esta categoría troll
 */

export const cagonPhrases: string[] = [
  "¿En serio? ¿Eres tan cagón? 🐔",
  "Esta categoría es para bebés con pañales 👶",
  "Tu madre juega más fuerte que tú 😂",
  "Vuelve cuando crezcas un par 🥚🥚",
  "Ni para jugar tienes huevos 🐓",
  "¿Acaso tu abuela eligió esta categoría? 👵",
  "Esto es más suave que un algodón 🧸",
  "¿Vienes de un convento o qué? 🙏",
  "Hasta los niños de primaria juegan más fuerte 🎒",
  "¿Te da miedo la verdad? Qué pena... 😢",
  "Esta categoría es más aburrida que ver pintura secarse 🎨",
  "¿Vas a pedir permiso a mamá también? 👶",
  "Cobarde detected 🚨",
  "¿Te hace falta valor o testosterona? 💊",
  "Qué flojito has salido, chaval 🍼",
  "Esta opción es para los que beben zumo en vez de cerveza 🧃",
  "¿Tienes miedo de la verdad? Patético 🙈",
  "Tu ex jugaba más duro que tú 💔",
  "Esto es para gente que se ruboriza con un 'hola' 😳",
  "¿Acaso estás en modo ultra religioso hoy? ⛪",
  "Ni borracho te atreverías con las buenas 🍺",
  "¿Vienes de misa o qué te pasa? 📿",
  "Esta categoría es más sosa que la personalidad de un contable 📊",
  "Tu mejor amigo se reiría de ti ahora mismo 😂",
  "¿Y vas a casa a las 10 de la noche también? 🏠",
  "Menuda decepción... esperaba más de ti 😔",
  "Esto es para los que piden 'sin alcohol' en un bar 🚫🍺",
  "¿Te asusta la idea de divertirte de verdad? 😱",
  "Hasta tu sombra es más atrevida que tú 👥",
  "Esta opción es tan suave que podría ser un anuncio de Dove 🕊️",
];

/**
 * Obtiene una frase aleatoria del array
 */
export function getRandomCagonPhrase(): string {
  const randomIndex = Math.floor(Math.random() * cagonPhrases.length);
  return cagonPhrases[randomIndex];
}
