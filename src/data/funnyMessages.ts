/**
 * Mensajes graciosos que aparecen cada X rondas durante el juego
 * Personalizados con el nombre del jugador que más tragos lleva
 */

import { Player } from '../types';

/**
 * Mensajes que se personalizan con el jugador
 * {name} se reemplaza por el nombre del jugador
 * {drinks} se reemplaza por el número de tragos
 */
export const FUNNY_MESSAGES = [
  "{name} es un descarado, lleva {drinks} tragos 😈",
  "Cuidado con {name}, esta noche folla con la almohada 🛏️",
  "{name} va a despertar con resaca nivel Dios ☠️",
  "{name} está revelando todos sus secretos 🤐",
  "¿Alguien ha visto la dignidad de {name}? Se perdió hace {drinks} tragos 🔍",
  "{name} está más suelto que la moral de un político 🤣",
  "Houston, tenemos un problema: {name} lleva {drinks} tragos 🚀",
  "{name} es oficialmente el turbio del grupo 😏",
  "Aplausos para {name}, el más salvaje de la noche 👏",
  "{name} está confesando más que un cura 🙏",
  "¿{name} tiene límites? Spoiler: NO 🚫",
  "{name} va a necesitar mucha agua mañana 💧",
  "Recordatorio: {name} recordará esto... o no 🤔",
  "{name} está en fuego 🔥 (literalmente {drinks} tragos)",
  "La vida loca de {name}: {drinks} tragos y contando 🎉",
  "{name} es la prueba viviente de que la honestidad emborracha 🍺",
  "¿Quién necesita terapia teniendo a {name} con {drinks} tragos? 🛋️",
  "{name} está regalando su curriculum de pecados gratis 📜",
  "Momento de silencio por la sobriedad de {name} 🕊️",
  "{name} es un libro abierto... y picante 📖🌶️",
  "Netflix debería hacer una serie sobre {name} 🎬",
  "¿{name} tiene filtro? Claramente hace {drinks} tragos que no 🎭",
  "{name} está dando clase magistral de cómo vivir sin límites 🎓",
  "Alerta roja: {name} alcanzó los {drinks} tragos ⚠️",
  "La noche es joven, pero {name} ya lleva {drinks} tragos 🌙",
  "{name} eligió la violencia (alcohólica) esta noche 🥊",
  "Plot twist: {name} es el protagonista de la noche 🎭",
  "{name}, rey/reina de la sinceridad etílica 👑",
  "Breaking news: {name} no tiene vergüenza, lleva {drinks} tragos 📰",
  "El FBI quiere reclutar a {name} después de estas confesiones 🕵️",
];

/**
 * Obtiene un mensaje gracioso aleatorio personalizado
 * @param player Jugador objetivo (el que más tragos lleva)
 * @returns Mensaje formateado con nombre y tragos
 */
export function getRandomFunnyMessage(player: Player): string {
  const randomIndex = Math.floor(Math.random() * FUNNY_MESSAGES.length);
  const template = FUNNY_MESSAGES[randomIndex];

  return template
    .replace('{name}', player.name)
    .replace('{drinks}', player.drinks.toString());
}

/**
 * Verifica si debe mostrarse un mensaje gracioso
 * @param phrasesPlayed Número de frases jugadas
 * @param interval Intervalo de frases (default: 5)
 * @returns true si debe mostrarse
 */
export function shouldShowFunnyMessage(
  phrasesPlayed: number,
  interval: number = 5
): boolean {
  return phrasesPlayed > 0 && phrasesPlayed % interval === 0;
}
