const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movielist');

const movieSchema = new mongoose.Schema({
  movieName: String,
  watched: false
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  save: (data) => {
    return new Movie({ movieName: data.movieName, watched: false }).save();
  },
  getAll: () => {
    return Movie.find();
  },
  search: (query) => {
    return Movie.find({movieName: {$regex: query, $options: 'i'}})
  },
  update: (query)  => {
    console.log(query);
    return Movie.updateOne({movieName: query.movieName}, { $set: {watched: query.watched}});
  }
}