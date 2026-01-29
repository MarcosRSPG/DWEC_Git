// docker run --name db_carstore -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const User = require("../models/UserModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class UserService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const result = await user.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const filter = { _id: new ObjectId(id) };
      const result = await user.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async comprobarCredenciales(usuario) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const filter = { name: usuario.name, password: usuario.password };
      const result = await user.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayUsers) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");

      const results = [];
      for (const h of arrayUsers) {
        const newUser = new User(h.name, h.password, h.admin);
        const r = await user.insertOne(newUser);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("UserService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, name, password, admin) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const filter = { _id: new ObjectId(id) };
      const newUser = new User(name, password, admin);
      const result = await user.replaceOne(filter, newUser);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const filter = { _id: new ObjectId(id) };
      const result = await user.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("carstore");
      const user = database.collection("users");
      const result = await user.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = UserService;
