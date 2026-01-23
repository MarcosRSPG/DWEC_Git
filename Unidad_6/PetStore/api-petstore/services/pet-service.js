// docker run --name db_examen_mongo -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Pet = require("../models/PetModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class PetService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");
      const result = await pet.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");
      const filter = { _id: new ObjectId(id) };
      const result = await pet.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayPets) {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");

      const results = [];
      for (const h of arrayPets) {
        const newPet = new Pet(
          h.name,
          h.owner,
          h.race,
          h.state,
          h.age,
          h.photo,
        );
        const r = await pet.insertOne(newPet);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("PetService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, name, owner, race, state, age, photo) {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");
      const filter = { _id: new ObjectId(id) };
      const newPet = new Pet(name, owner, race, state, age, photo);
      const result = await pet.replaceOne(filter, newPet);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");
      const filter = { _id: new ObjectId(id) };
      const result = await pet.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("petstore");
      const pet = database.collection("pets");
      const result = await pet.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = PetService;
