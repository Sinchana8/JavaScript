const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Author = require('./models/author');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/backend_blog', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/authors', async (req, res) => {
  try {
    const { name, email, publishedDate } = req.body;
    const author = new Author({ name, email, publishedDate });
    await author.save();
    res.status(201).json({ message: 'Author created successfully', author });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/blogs', async (req, res) => {
  try {
    const { title, blogContent, authorName } = req.body;
    const blog = new Blog({ title, blogContent, authorName });
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
