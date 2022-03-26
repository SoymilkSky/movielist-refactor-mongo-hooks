const mongobongo = require('./db.js');

module.exports = {
  get: (req, res) => {
    if(!Object.keys(req.query).length) {
      mongobongo.getAll()
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
    } else {
      console.log(req.query.term)
      mongobongo.search(req.query.term)
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
    }
  },
  post: (req, res) => {
    mongobongo.save(req.body)
      .then(() => res.status(201).send('successfully added a movie'))
      .catch(err => console.log(err));
  },
  put: (req, res) => {
    console.log('this is inside put', req.body);
    mongobongo.update(req.body)
      .then(() => res.send('successful update'))
      .catch(err => console.log(err));
    }

}