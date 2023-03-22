const express = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Sample post data
let posts = [
  { id: 1, title: "Post 1", body: "Lorem ipsum dolor sit amet." },
  { id: 2, title: "Post 2", body: "Consectetur adipiscing elit." },
  { id: 3, title: "Post 3", body: "Sed do eiusmod tempor incididunt." },
];

// GET all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// GET a specific post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.send(post);
});

// CREATE a new post
app.post("/posts", (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body,
  };
  posts.push(post);
  res.send(post);
});

// UPDATE an existing post by ID
app.put("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  post.title = req.body.title;
  post.body = req.body.body;
  res.send(post);
});

// Delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Post not found");
  }
});

// Mock user database
const users = [
  { id: 1, username: "alice", password: "password1" },
  { id: 2, username: "bob", password: "password2" },
];

// JWT secret key
const secret = "mysecretkey";

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, secret);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

// Protected endpoint
app.get("/protected", authenticateUser, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});


