// docker run --name db_mongo_dwec -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

require("dotenv").config();
const Pokemon = require("../models/PokemonModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const client = new MongoClient(uri);

class TeamService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");
      const result = await equipo.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");
      const filter = { _id: new ObjectId(id) };
      const result = await equipo.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayEquipos) {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");

      const results = [];
      for (const h of arrayEquipos) {
        const newEquipo = new Pokemon(h.name, h.url, h.damage, h.health);
        const r = await equipo.insertOne(newEquipo);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("TeamService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, name, url, damage, health) {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");
      const filter = { _id: new ObjectId(id) };
      const newEquipo = new Pokemon(name, url, damage, health);
      const result = await equipo.replaceOne(filter, newEquipo);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");
      const filter = { _id: new ObjectId(id) };
      const result = await equipo.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("pokemon");
      const equipo = database.collection("equipo");
      const result = await equipo.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = TeamService;
