// docker run --name db_examen_apis -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Log = require("../models/LogModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class LogService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("examen");
      const log = database.collection("logs");
      const result = await log.find().toArray();
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
      const log = database.collection("logs");
      const filter = { _id: new ObjectId(id) };
      const result = await log.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getByTime(time) {
    try {
      await client.connect();
      const database = client.db("examen");
      const log = database.collection("logs");
      const filter = { time: time };
      const result = await log.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayLogs) {
    try {
      await client.connect();
      const database = client.db("examen");
      const log = database.collection("logs");

      const results = [];
      for (const h of arrayLogs) {
        const newLog = new Log(h.message, h.level, h.time);
        const r = await log.insertOne(newLog);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("LogService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, message, level, time) {
    try {
      await client.connect();
      const database = client.db("examen");
      const log = database.collection("logs");
      const filter = { _id: new ObjectId(id) };
      const newLog = new Log(message, level, time);
      const result = await log.replaceOne(filter, newLog);
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
      const log = database.collection("logs");
      const filter = { _id: new ObjectId(id) };
      const result = await log.deleteOne(filter);
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
      const log = database.collection("logs");
      const result = await log.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = LogService;
