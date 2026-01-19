// docker run --name db_mongo_dwec -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Historial = require("../models/HistorialModel");
const { MongoClient, ObjectId } = require("mongodb");

class HistorialService {
  static async get() {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");
      const result = await historico.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");
      const filter = { _id: new ObjectId(id) };
      const result = await historico.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayHistoricos) {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");

      const results = [];
      for (const h of arrayHistoricos) {
        const newHistorico = new Historial(
          h.DateStart,
          h.DateEnd,
          h.PokeName,
          h.DamageDoneTrainer,
          h.DamageReceivedTrainer ?? h.DamageRecivedTrainer,
          h.DamageDonePokemon,
          h.Catch ?? h.captured
        );

        const r = await historico.insertOne(newHistorico);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("HistorialService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(
    id,
    dataStart,
    dataEnd,
    pokeName,
    damageDoneTrainer,
    damageRecivedTrainer,
    damageDonePokemon,
    captured
  ) {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");
      const filter = { _id: new ObjectId(id) };
      const newHistorico = new Historial(
        dataStart,
        dataEnd,
        pokeName,
        damageDoneTrainer,
        damageRecivedTrainer,
        damageDonePokemon,
        captured
      );
      const result = await historico.replaceOne(filter, newHistorico);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");
      const filter = { _id: new ObjectId(id) };
      const result = await historico.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    const uri = "mongodb://MarcosDB:mpwd@localhost:6969";
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("pokemon");
      const historico = database.collection("historico");
      const result = await historico.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = HistorialService;
