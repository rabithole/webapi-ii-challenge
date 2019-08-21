const express = require('express');

const Posts = require('./blogs-model.js');

const router = express.Router();
// URI: /api/blogs

// GET /api/blogs
// File paths are assumed to be the above stated URI. Only / is neccessary in the router file path...
// router.get('/', (req, res) => {
//   blogs.find(req.query)
//   .then(blogs => {
//     res.status(200).json(blogs);
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error retrieving the blogs',
//     });
//   });
// });

// Try Catch
router.get('/', async (req, res) => {
  try {
    // console.log('query', req.query);
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the damn posts',
    });
  }
});

// This is also a GET to /api/blogs/:id
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(posts => {
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: 'blog not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the damn blog',
    });
  });
});

router.post('/', (req, res) => {
  Blogs.add(req.body)
  .then(blog => {
    res.status(201).json(blog);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the blog',
    });
  });
});

router.delete('/:id', (req, res) => {
  Blogs.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The blog has been nuked' });
    } else {
      res.status(404).json({ message: 'The blog could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the blog',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Blogs.update(req.params.id, changes)
  .then(blog => {
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'The blog could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the blog',
    });
  });
});

// add an endpoint that returns all the message for a blog
// GET /api/blogs/:id/messages
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Posts.findPostMessages(id);
    res.status(200).json(comments);
  } catch (error) {
    // log error to database
    res.status(500).json({
      message: 'Error finding Post messages',
    });
  }
});

// add endpoint for adding new message to a blog
router.post('/:id/messages', async (req, res) => {
  const messageInfo = {...req.body, Blog_id: req.params.id };

  try {
    const savedMessage = await Blogs.addMessage(messageInfo);
    res.status(201).json(savedMessage);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error saving blog message',
    });
  }
});

module.exports = router;

router.post('/', (req, res) => {
  Blogs.add(req.body)
  .then(blog => {
    res.status(201).json(blog);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the blog',
    });
  });
});