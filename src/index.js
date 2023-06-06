const express = require('express');
const app = express();
const connect = require('./config/db');
const { register, loginuser } = require('./controllers/user_controllers');
const User = require('./models//users_models');
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/home', (req, res) => {
  res.send('I am on home page');
});

const auth = async (req, res, next) => {
  try {

  } catch (error) {

  }
  next();
};

app.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email:req.body.email });
    if (!user) {
      res.send('Oooops, user not registered!');
    }
   
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
app.post('/register', auth, async (req, res) => {
  try {
    let user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

app.listen(8080 , async () => {
  try {
    await connect();
    console.log('I am able to listen on port 8080');
  } catch (error) {
    console.log({ error: error.message });
  }
});
