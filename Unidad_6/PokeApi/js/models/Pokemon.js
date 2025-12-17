export class Pokemon {
  constructor(name, url, damage, health) {
    this.name = name;
    this.url = url;
    this.damage = damage;
    this.health = health;
  }
  restarVida(damage) {
    this.health -= damage;
  }
}
