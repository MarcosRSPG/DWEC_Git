// docker run --name db_carstore -e MONGO_INITDB_ROOT_USERNAME=MarcosDB -e MONGO_INITDB_ROOT_PASSWORD=mpwd -e MONGO_INITDB_DATABASE=TaskDB -p 6969:27017 -v VolumenContainer:/data/db -d mongo:8-noble

const Message = require("../models/MessageModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://MarcosDB:mpwd@localhost:6969`;
const client = new MongoClient(uri);

class MessageService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("carstore");
      const message = database.collection("messages");
      const result = await message.find().toArray();
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
      const message = database.collection("messages");
      const filter = { _id: new ObjectId(id) };
      const result = await message.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayMessages) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const message = database.collection("messages");

      const results = [];
      for (const h of arrayMessages) {
        const newMessage = new Message(h.gmail, h.subject, h.mensage, h.user);
        const r = await message.insertOne(newMessage);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("MessageService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, gmail, subject, mensage, user) {
    try {
      await client.connect();
      const database = client.db("carstore");
      const message = database.collection("messages");
      const filter = { _id: new ObjectId(id) };
      const newMessage = new Message(gmail, subject, mensage, user);
      const result = await message.replaceOne(filter, newMessage);
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
      const message = database.collection("messages");
      const filter = { _id: new ObjectId(id) };
      const result = await message.deleteOne(filter);
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
      const message = database.collection("messages");
      const result = await message.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = MessageService;
