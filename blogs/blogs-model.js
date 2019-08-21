const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findPostMessages,
  findMessageById,
  addMessage,
};

function find(query) {
  const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('posts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('posts')
    .where({ id })
    .first();
}

async function add(blog) {
  const [id] = await db('posts').insert(blog);

  return findById(id);
}

function remove(id) {
  return db('posts')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes, '*');
}

function findPostMessages(postId) {
  return db('messages as m')
    .join('posts as h', 'm.hub_id', 'h.id')
    .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as blog')
    .where({ post_id: postId });
}

// You Do
function findMessageById(id) {
  return db('messages')
    .where({ id })
    .first();
}

async function addMessage(message) {
  const [id] = await db('messages').insert(message);

  return findMessageById(id);
}
