// docker run --name music_library_db -e MONGO_INITDB_ROOT_USERNAME=usemongo -e MONGO_INITDB_ROOT_PASSWORD=secretoarab -e MONGO_INITDB_DATABASE=music_library_db -p 27017:27017 -v examenFinal:/data/db -d mongo:8-noble

const Album = require("../models/AlbumModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://usemongo:secretoarab@localhost:27017`;
const client = new MongoClient(uri);

class AlbumService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const album = database.collection("albums");
      const result = await album.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getNumSongs(id) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const album = database.collection("songs");
      const resultado = await album
        .find({ albumId: new ObjectId(id) })
        .toArray();
      const result = resultado.length;
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
      const album = database.collection("albums");
      const filter = { _id: new ObjectId(id) };
      const result = await album.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayAlbums) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const album = database.collection("albums");

      const results = [];
      for (const h of arrayAlbums) {
        const newAlbum = new Album(
          h.title,
          h.artist,
          h.year,
          h.genre,
          h.coverUrl,
        );
        const r = await album.insertOne(newAlbum);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("AlbumService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, title, artist, year, genre, coverUrl) {
    try {
      await client.connect();
      const database = client.db("music_library_db");
      const album = database.collection("albums");
      const filter = { _id: new ObjectId(id) };
      const newAlbum = new Album(title, artist, year, genre, coverUrl);
      const result = await album.replaceOne(filter, newAlbum);
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
      const album = database.collection("albums");
      const filter = { _id: new ObjectId(id) };
      const result = await album.deleteOne(filter);
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
      const album = database.collection("albums");
      const result = await album.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = AlbumService;
