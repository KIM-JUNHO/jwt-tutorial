require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { fakeDB } = require('./fakeDB');

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // support URL-encoded bodies

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

// 1. Register a user
server.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Check if user exist
    const user = fakeDB.find(user => user.email == email);
    if (user) throw new Error('User already exist');

    // 2. If not user exist, hash the password
    const hashedPassword = await hash(password, 10);

    // 3. Insert the user in "database"
    fakeDB.push({
      id: fakeDB.length,
      email,
      password: hashedPassword
    });

    res.send({ message: 'User Created' });
    console.log(fakeDB);
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});
