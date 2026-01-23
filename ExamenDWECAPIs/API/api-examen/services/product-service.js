// docker run --name db_examen_apis -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Product = require("../models/ProductModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class ProductService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");
      const result = await product.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");
      const filter = { _id: new ObjectId(id) };
      const result = await product.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getByName(name) {
    try {
      await client.connect();
      const database = client.db("examen");
      const pet = database.collection("products");
      const filter = { name: name };
      const result = await pet.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayProducts) {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");

      const results = [];
      for (const h of arrayProducts) {
        const newProduct = new Product(h.name, h.description, h.price, h.user);
        const r = await product.insertOne(newProduct);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("ProductService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, name, description, price, user) {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");
      const filter = { _id: new ObjectId(id) };
      const newProduct = new Product(name, description, price, user);
      const result = await product.replaceOne(filter, newProduct);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");
      const filter = { _id: new ObjectId(id) };
      const result = await product.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("examen");
      const product = database.collection("products");
      const result = await product.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = ProductService;
