// In-memory store: array of user objects (username, email)
// Each item has: id, username, email

let users = [
  { id: 1, username: 'john_doe', email: 'john@example.com' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com' },
];

let nextId = 3;

function getAll() {
  return users;
}

function getById(id) {
  const numId = Number(id);
  return users.find((u) => u.id === numId);
}

function create(data) {
  const user = {
    id: nextId++,
    username: data.username,
    email: data.email,
  };
  users.push(user);
  return user;
}

function update(id, data) {
  const numId = Number(id);
  const index = users.findIndex((u) => u.id === numId);
  if (index === -1) return null;
  users[index] = { ...users[index], username: data.username, email: data.email };
  return users[index];
}

function remove(id) {
  const numId = Number(id);
  const index = users.findIndex((u) => u.id === numId);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
