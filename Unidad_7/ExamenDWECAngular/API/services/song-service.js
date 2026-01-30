// docker run --name music_library_db -e MONGO_INITDB_ROOT_USERNAME=usemongo -e MONGO_INITDB_ROOT_PASSWORD=secretoarab -e MONGO_INITDB_DATABASE=music_library_db -p 27017:27017 -v examenFinal:/data/db -d mongo:8-noble

const Song = require("../models/SongModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://usemongo:secretoarab@localhost:27017`;
const client = new MongoClient(uri);

class SongService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const result = await song.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getByAlbum(id) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const filter = { albumId: new ObjectId(id) };
      const result = await song.find(filter).toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const filter = { _id: new ObjectId(id) };
      const result = await song.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arraySongs) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");

      const results = [];
      for (const h of arraySongs) {
        const newSong = new Song(
          h.title,
          h.duration,
          h.rating,
          new ObjectId(h.albumId),
          h.listened,
        );
        const r = await song.insertOne(newSong);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("SongService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, title, duration, rating, albumId, listened) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const filter = { _id: new ObjectId(id) };
      const newSong = new Song(
        title,
        duration,
        rating,
        new ObjectId(albumId),
        listened,
      );
      const result = await song.replaceOne(filter, newSong);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const filter = { _id: new ObjectId(id) };
      const result = await song.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const song = database.collection("songs");
      const result = await song.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = SongService;
