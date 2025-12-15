export class Pokemon {
  constructor(url, damage, health) {
    this.url = url;
    this.damage = damage;
    this.health = health;
  }
  restarVida(damage) {
    this.health -= damage;
  }
}
