class Historial {
  constructor(
    dataStart,
    dataEnd,
    pokeName,
    damageDoneTrainer,
    damageRecivedTrainer,
    damageDonePokemon,
    captured
  ) {
    this.dataStart = dataStart;
    this.dataEnd = dataEnd;
    this.pokeName = pokeName;
    this.damageDoneTrainer = damageDoneTrainer;
    this.damageRecivedTrainer = damageRecivedTrainer;
    this.damageDonePokemon = damageDonePokemon;
    this.captured = captured;
  }
}

module.exports = Historial;
