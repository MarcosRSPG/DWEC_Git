// docker run --name movie_tracker_db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -e MONGO_INITDB_DATABASE=movie_tracker_db -p 27017:27017 -v examenfinal:/data/db -d mongo:8-noble

const Movie = require("../models/MovieModel");
const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb://mongoadmin:secret@localhost:27017`;
const client = new MongoClient(uri);

class MovieService {
  static async get() {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const result = await movie.find().toArray();
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getPlatforms() {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const platforms = await movie.distinct("platform");
      return platforms;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getGenres() {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const result = await movie.distinct("genre");
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async getById(id) {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const filter = { _id: new ObjectId(id) };
      const result = await movie.findOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async post(arrayMovies) {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");

      const results = [];
      for (const h of arrayMovies) {
        const newMovie = new Movie(
          h.title,
          h.genre,
          h.year,
          h.rating,
          h.platform,
          h.photo,
        );
        const r = await movie.insertOne(newMovie);
        results.push(r);
      }
      return results;
    } catch (error) {
      console.error("MovieService.post error:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async put(id, title, genre, year, rating, platform, photo) {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const filter = { _id: new ObjectId(id) };
      const newMovie = new Movie(title, genre, year, rating, platform, photo);
      const result = await movie.replaceOne(filter, newMovie);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async delete(id) {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const filter = { _id: new ObjectId(id) };
      const result = await movie.deleteOne(filter);
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
  static async deleteAll() {
    try {
      await client.connect();
      const database = client.db("movie_tracker_db");
      const movie = database.collection("movies");
      const result = await movie.deleteMany({});
      return result;
    } catch (error) {
    } finally {
      await client.close();
    }
  }
}

module.exports = MovieService;
