// docker run --name db_carstore -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Car = require("../models/CarModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class CarService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("carstore");
      const car = database.collection("cars");
      const result = await car.find().toArray();
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
      const car = database.collection("cars");
      const filter = { _id: new ObjectId(id) };
      const result = await car.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayCars) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const car = database.collection("cars");

      const results = [];
      for (const h of arrayCars) {
        const newCar = new Car(
          h.brand,
          h.model,
          h.year,
          h.price,
          h.photo,
          h.user,
        );
        const r = await car.insertOne(newCar);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("CarService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, brand, model, year, price, photo, user) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const car = database.collection("cars");
      const filter = { _id: new ObjectId(id) };
      const newCar = new Car(brand, model, year, price, photo, user);
      const result = await car.replaceOne(filter, newCar);
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
      const car = database.collection("cars");
      const filter = { _id: new ObjectId(id) };
      const result = await car.deleteOne(filter);
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
      const car = database.collection("cars");
      const result = await car.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = CarService;
