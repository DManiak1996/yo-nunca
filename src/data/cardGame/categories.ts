/**
 * 📚 CATEGORÍAS PARA "EL REY DE COPAS" - CARTA SOTA
 *
 * 40 categorías variadas para el juego de la Sota
 * Por turnos, los jugadores dicen ejemplos de la categoría
 * Quien repita o no sepa, bebe
 */

import { Category } from '../../types/cardGame';

export const categories: Category[] = [
  // ============================================
  // CULTURA GENERAL (10 categorías)
  // ============================================
  {
    id: 'cat_001',
    name: 'Países de Europa',
    examples: [
      'España', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 'Portugal',
      'Grecia', 'Polonia', 'Países Bajos', 'Bélgica', 'Suiza', 'Austria',
      'Suecia', 'Noruega', 'Dinamarca', 'Finlandia', 'Irlanda', 'Croacia'
    ],
  },
  {
    id: 'cat_002',
    name: 'Capitales del mundo',
    examples: [
      'Madrid', 'París', 'Londres', 'Roma', 'Berlín', 'Tokio', 'Pekín',
      'Washington', 'Moscú', 'El Cairo', 'Buenos Aires', 'Ottawa', 'Canberra',
      'Lisboa', 'Atenas', 'Oslo', 'Estocolmo', 'Helsinki'
    ],
  },
  {
    id: 'cat_003',
    name: 'Ríos de España',
    examples: [
      'Ebro', 'Tajo', 'Duero', 'Guadalquivir', 'Guadiana', 'Júcar',
      'Segura', 'Miño', 'Genil', 'Ter', 'Llobregat', 'Turia'
    ],
  },
  {
    id: 'cat_004',
    name: 'Islas famosas',
    examples: [
      'Ibiza', 'Mallorca', 'Menorca', 'Tenerife', 'Gran Canaria', 'Lanzarote',
      'Manhattan', 'Sicilia', 'Creta', 'Malta', 'Cuba', 'Jamaica',
      'Madagascar', 'Hawái', 'Bali', 'Islandia'
    ],
  },
  {
    id: 'cat_005',
    name: 'Monumentos históricos',
    examples: [
      'Torre Eiffel', 'Coliseo Romano', 'Taj Mahal', 'Sagrada Familia',
      'Torre de Pisa', 'Estatua de la Libertad', 'Pirámides de Giza',
      'Gran Muralla China', 'Stonehenge', 'Cristo Redentor', 'Machu Picchu',
      'Acrópolis de Atenas', 'Alhambra de Granada'
    ],
  },
  {
    id: 'cat_006',
    name: 'Premios Nobel',
    examples: [
      'Gabriel García Márquez', 'Albert Einstein', 'Marie Curie',
      'Malala Yousafzai', 'Nelson Mandela', 'Barack Obama',
      'Pablo Neruda', 'Octavio Paz', 'Mario Vargas Llosa'
    ],
  },
  {
    id: 'cat_007',
    name: 'Planetas del sistema solar',
    examples: [
      'Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter',
      'Saturno', 'Urano', 'Neptuno'
    ],
  },
  {
    id: 'cat_008',
    name: 'Mares y océanos',
    examples: [
      'Océano Atlántico', 'Océano Pacífico', 'Océano Índico',
      'Mar Mediterráneo', 'Mar Caribe', 'Mar Rojo', 'Mar Negro',
      'Mar del Norte', 'Mar Báltico', 'Mar de China'
    ],
  },
  {
    id: 'cat_009',
    name: 'Montañas famosas',
    examples: [
      'Everest', 'Mont Blanc', 'Kilimanjaro', 'Aconcagua',
      'Matterhorn', 'Monte Fuji', 'Mulhacén', 'Aneto',
      'Teide', 'K2', 'Denali'
    ],
  },
  {
    id: 'cat_010',
    name: 'Continentes y subcontinentes',
    examples: [
      'Europa', 'Asia', 'África', 'América del Norte', 'América del Sur',
      'Oceanía', 'Antártida', 'Subcontinente Indio', 'Oriente Medio'
    ],
  },

  // ============================================
  // ENTRETENIMIENTO (10 categorías)
  // ============================================
  {
    id: 'cat_011',
    name: 'Películas de Disney',
    examples: [
      'El Rey León', 'La Sirenita', 'Frozen', 'Mulan', 'Aladdin',
      'Pocahontas', 'Toy Story', 'Buscando a Nemo', 'Los Increíbles',
      'Moana', 'Enredados', 'Vaiana', 'Encanto', 'Coco'
    ],
  },
  {
    id: 'cat_012',
    name: 'Series de Netflix',
    examples: [
      'Stranger Things', 'La Casa de Papel', 'The Crown', 'Narcos',
      'Black Mirror', 'The Witcher', 'Elite', 'Las Chicas del Cable',
      'Dark', 'Ozark', 'Squid Game', 'Wednesday'
    ],
  },
  {
    id: 'cat_013',
    name: 'Personajes de Marvel',
    examples: [
      'Iron Man', 'Capitán América', 'Thor', 'Hulk', 'Viuda Negra',
      'Spider-Man', 'Doctor Strange', 'Black Panther', 'Ant-Man',
      'Capitana Marvel', 'Loki', 'Thanos', 'Wanda'
    ],
  },
  {
    id: 'cat_014',
    name: 'Películas de terror',
    examples: [
      'El Exorcista', 'Halloween', 'El Resplandor', 'Scream',
      'El Conjuro', 'Paranormal Activity', 'It', 'Rec',
      'El Orfanato', 'Insidious', 'Annabelle', 'The Ring'
    ],
  },
  {
    id: 'cat_015',
    name: 'Actores españoles',
    examples: [
      'Javier Bardem', 'Penélope Cruz', 'Antonio Banderas',
      'Pedro Almodóvar', 'Anya Taylor-Joy', 'Belén Rueda',
      'Eduardo Noriega', 'Maribel Verdú', 'Miguel Ángel Silvestre'
    ],
  },
  {
    id: 'cat_016',
    name: 'Cantantes latinos',
    examples: [
      'Shakira', 'Bad Bunny', 'J Balvin', 'Rosalía', 'Maluma',
      'Daddy Yankee', 'Marc Anthony', 'Enrique Iglesias',
      'Luis Fonsi', 'Nicky Jam', 'Ozuna', 'Karol G'
    ],
  },
  {
    id: 'cat_017',
    name: 'Grupos de música rock',
    examples: [
      'Queen', 'The Beatles', 'Rolling Stones', 'Led Zeppelin',
      'AC/DC', 'Metallica', 'Nirvana', 'Guns N Roses',
      'Pink Floyd', 'The Doors', 'U2', 'Radiohead'
    ],
  },
  {
    id: 'cat_018',
    name: 'Películas ganadoras de Oscar',
    examples: [
      'Titanic', 'Gladiator', 'El Padrino', 'Schindler\'s List',
      'Forrest Gump', 'Parasite', 'The Shape of Water',
      'Moonlight', 'Birdman', 'La La Land', 'CODA'
    ],
  },
  {
    id: 'cat_019',
    name: 'Videojuegos famosos',
    examples: [
      'Minecraft', 'Fortnite', 'Grand Theft Auto', 'FIFA',
      'Call of Duty', 'League of Legends', 'The Legend of Zelda',
      'Super Mario', 'Pokémon', 'Valorant', 'Apex Legends'
    ],
  },
  {
    id: 'cat_020',
    name: 'Programas de TV españoles',
    examples: [
      'El Hormiguero', 'La Resistencia', 'MasterChef', 'Operación Triunfo',
      'Gran Hermano', 'La Voz', 'Sálvame', 'Pasapalabra',
      'First Dates', 'Antena 3 Noticias', 'El Intermedio'
    ],
  },

  // ============================================
  // MARCAS Y PRODUCTOS (10 categorías)
  // ============================================
  {
    id: 'cat_021',
    name: 'Marcas de coches',
    examples: [
      'Toyota', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen',
      'Honda', 'Nissan', 'Chevrolet', 'Ferrari', 'Lamborghini',
      'Porsche', 'Tesla', 'Seat', 'Renault', 'Peugeot'
    ],
  },
  {
    id: 'cat_022',
    name: 'Marcas de ropa deportiva',
    examples: [
      'Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour',
      'New Balance', 'Asics', 'Fila', 'Converse', 'Vans',
      'Decathlon', 'The North Face', 'Columbia'
    ],
  },
  {
    id: 'cat_023',
    name: 'Redes sociales',
    examples: [
      'Facebook', 'Instagram', 'Twitter', 'TikTok', 'Snapchat',
      'LinkedIn', 'YouTube', 'WhatsApp', 'Telegram', 'Pinterest',
      'Reddit', 'Discord', 'Twitch', 'BeReal'
    ],
  },
  {
    id: 'cat_024',
    name: 'Marcas de refrescos',
    examples: [
      'Coca-Cola', 'Pepsi', 'Fanta', 'Sprite', 'Seven Up',
      'Red Bull', 'Monster', 'Aquarius', 'Nestea', 'Lipton',
      'Schweppes', 'Mirinda', 'Dr Pepper'
    ],
  },
  {
    id: 'cat_025',
    name: 'Compañías de tecnología',
    examples: [
      'Apple', 'Microsoft', 'Google', 'Amazon', 'Meta',
      'Samsung', 'Sony', 'Intel', 'AMD', 'Nvidia',
      'IBM', 'Oracle', 'Adobe', 'Netflix', 'Spotify'
    ],
  },
  {
    id: 'cat_026',
    name: 'Marcas de cerveza',
    examples: [
      'Heineken', 'Corona', 'Budweiser', 'Stella Artois',
      'Guinness', 'Carlsberg', 'San Miguel', 'Mahou',
      'Cruzcampo', 'Estrella Galicia', 'Alhambra', 'Amstel'
    ],
  },
  {
    id: 'cat_027',
    name: 'Cadenas de comida rápida',
    examples: [
      'McDonald\'s', 'Burger King', 'KFC', 'Subway', 'Domino\'s',
      'Pizza Hut', 'Taco Bell', 'Five Guys', 'Wendy\'s',
      'Starbucks', 'Dunkin\' Donuts', 'Papa John\'s'
    ],
  },
  {
    id: 'cat_028',
    name: 'Aerolíneas',
    examples: [
      'Iberia', 'Ryanair', 'Vueling', 'Air Europa', 'Lufthansa',
      'British Airways', 'Air France', 'KLM', 'Emirates',
      'Qatar Airways', 'American Airlines', 'Delta'
    ],
  },
  {
    id: 'cat_029',
    name: 'Marcas de móviles',
    examples: [
      'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus',
      'Google Pixel', 'Oppo', 'Vivo', 'Motorola', 'Sony',
      'Nokia', 'LG', 'Realme'
    ],
  },
  {
    id: 'cat_030',
    name: 'Tiendas de ropa',
    examples: [
      'Zara', 'H&M', 'Pull & Bear', 'Bershka', 'Mango',
      'Primark', 'Stradivarius', 'Massimo Dutti', 'Gap',
      'Uniqlo', 'Forever 21', 'C&A', 'Springfield'
    ],
  },

  // ============================================
  // COMIDA Y BEBIDA (5 categorías)
  // ============================================
  {
    id: 'cat_031',
    name: 'Frutas tropicales',
    examples: [
      'Mango', 'Piña', 'Papaya', 'Maracuyá', 'Coco',
      'Guayaba', 'Kiwi', 'Plátano', 'Chirimoya', 'Lichi',
      'Carambola', 'Pitaya', 'Aguacate'
    ],
  },
  {
    id: 'cat_032',
    name: 'Tipos de queso',
    examples: [
      'Manchego', 'Cheddar', 'Mozzarella', 'Parmesano', 'Gouda',
      'Brie', 'Camembert', 'Roquefort', 'Gorgonzola', 'Feta',
      'Emmental', 'Edam', 'Cabrales', 'Idiazábal'
    ],
  },
  {
    id: 'cat_033',
    name: 'Platos italianos',
    examples: [
      'Pizza', 'Pasta Carbonara', 'Lasaña', 'Risotto', 'Ravioli',
      'Gnocchi', 'Tiramisu', 'Panna Cotta', 'Ossobuco',
      'Bruschetta', 'Carpaccio', 'Caprese', 'Pesto'
    ],
  },
  {
    id: 'cat_034',
    name: 'Cócteles con alcohol',
    examples: [
      'Mojito', 'Margarita', 'Piña Colada', 'Daiquiri', 'Caipirinha',
      'Cosmopolitan', 'Manhattan', 'Negroni', 'Old Fashioned',
      'Gin Tonic', 'Cuba Libre', 'Tequila Sunrise', 'Bloody Mary'
    ],
  },
  {
    id: 'cat_035',
    name: 'Tipos de pasta',
    examples: [
      'Espagueti', 'Penne', 'Fusilli', 'Farfalle', 'Linguini',
      'Tagliatelle', 'Fettuccine', 'Rigatoni', 'Macarrones',
      'Tortellini', 'Ravioli', 'Lasaña', 'Ñoquis'
    ],
  },

  // ============================================
  // MISCELÁNEA (5 categorías)
  // ============================================
  {
    id: 'cat_036',
    name: 'Deportes olímpicos',
    examples: [
      'Atletismo', 'Natación', 'Gimnasia', 'Baloncesto', 'Fútbol',
      'Tenis', 'Voleibol', 'Ciclismo', 'Boxeo', 'Judo',
      'Esgrima', 'Taekwondo', 'Remo', 'Halterofilia'
    ],
  },
  {
    id: 'cat_037',
    name: 'Instrumentos musicales',
    examples: [
      'Guitarra', 'Piano', 'Batería', 'Bajo', 'Violín',
      'Trompeta', 'Saxofón', 'Flauta', 'Clarinete', 'Acordeón',
      'Arpa', 'Ukelele', 'Banjo', 'Armónica'
    ],
  },
  {
    id: 'cat_038',
    name: 'Profesiones',
    examples: [
      'Médico', 'Profesor', 'Ingeniero', 'Arquitecto', 'Abogado',
      'Enfermero', 'Policía', 'Bombero', 'Chef', 'Periodista',
      'Programador', 'Diseñador', 'Electricista', 'Fontanero'
    ],
  },
  {
    id: 'cat_039',
    name: 'Animales marinos',
    examples: [
      'Tiburón', 'Delfín', 'Ballena', 'Pulpo', 'Calamar',
      'Medusa', 'Estrella de mar', 'Cangrejo', 'Langosta',
      'Tortuga marina', 'Foca', 'Orca', 'Pez payaso'
    ],
  },
  {
    id: 'cat_040',
    name: 'Colores en inglés',
    examples: [
      'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple',
      'Pink', 'Black', 'White', 'Gray', 'Brown', 'Beige',
      'Turquoise', 'Violet', 'Indigo', 'Magenta'
    ],
  },
];

/**
 * Obtiene una categoría aleatoria
 */
export function getRandomCategory(): Category {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

/**
 * Obtiene N categorías aleatorias sin repetir
 */
export function getRandomCategories(count: number): Category[] {
  const shuffled = [...categories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, categories.length));
}
