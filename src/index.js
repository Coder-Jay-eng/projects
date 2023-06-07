const express = require('express');
const app = express();
const connect = require('./config/db');
const { register, loginuser } = require('./controllers/user_controllers');
const User = require('./models//users_models');
const bcrypt = require('bcrypt');
const Movie = require('./models/movie_models');
const { body, validationResult } = require('express-validator');

app.use(express.json());

app.get('/home', (req, res) => {
  res.send('I am on home page');
});

const auth = async (req, res, next) => {
  try {
  } catch (error) {}
  next();
};

app.post('/login', async (req, res) => {
  try {
    const compare = bcrypt.compareSync(req.body.password, user.password);

    if (!compare) {
      res.send('Password is incorrect!');
    }

    // console.log('compare', compare);
    return res.send('Logged in successfully!');
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
app.post(
  '/register',
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .isLength({ min: 4, max: 80 })
    .withMessage(
      'Name should have minimum of 4 letters and maximum of 80 letters'
    ),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newError;
        newError = errors.array().map((err) => {
          return { key: err.param, message: err.msg };
        });
        return res.send({ errors: newError });
      }

      let register = await User.findOneAndDelete({ email: req.body.email });

      console.log(register);

      if (register) {
        return res.send('User is already registered!');
      }
      let user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
);

app.post('/movie', async (req, res) => {
  try {
    let movie = await Movie.create(req.body);

    return res.send(movie);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

app.get('/movies', async (req, res) => {
  try {
    let movie = await Movie.find().populate('actor', { password: 0 });

    res.send(movie);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

app.listen(8080, async () => {
  try {
    await connect();
    console.log('Wow, I am able to listen on port 8080');
  } catch (error) {
    console.log({ error: error.message });
  }
});
