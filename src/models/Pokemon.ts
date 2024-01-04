// Comentario 1: Define una clase que representa a un Pokémon con varias características.
export default class Pokemon {
  id: number;
  name: string;
  image?: string;
  height?: number;
  weight?: number;
  type?: string;
  move?: string;
  stats?: Stats;

  // Comentario 2: Constructor para inicializar las características del Pokémon.
  constructor(
    id: number,
    name: string,
    image?: string,
    height?: number,
    weight?: number,
    type?: string,
    move?: string,
    stats?: Stats,
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.height = height;
    this.weight = weight;
    this.type = type;
    this.move = move;
    this.stats = stats;
  }
}

// Comentario 3: Define una clase que representa las estadísticas de un Pokémon, como HP, ataque, defensa, etc.
export class Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

  // Comentario 4: Constructor para inicializar las estadísticas del Pokémon.
  constructor(
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
  ) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
    this.speed = speed; // Comentario 5: Asignación duplicada, considera eliminar esta línea.
  }
}
