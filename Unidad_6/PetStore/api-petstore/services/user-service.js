// docker run --name db_mongo_dwec -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

require("dotenv").config();
const User = require("../models/UserModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const client = new MongoClient(uri);

class UserService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("userstore");
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
      const database = client.db("userstore");
      const user = database.collection("users");
      const filter = { _id: new ObjectId(id) };
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
      const database = client.db("userstore");
      const user = database.collection("users");

      const results = [];
      for (const h of arrayUsers) {
        const newUser = new User(h.name, h.password);
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

  static async put(id, name, password) {
    try {
      await client.connect();
      const database = client.db("userstore");
      const user = database.collection("users");
      const filter = { _id: new ObjectId(id) };
      const newUser = new User(name, password);
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
      const database = client.db("userstore");
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
      const database = client.db("userstore");
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
