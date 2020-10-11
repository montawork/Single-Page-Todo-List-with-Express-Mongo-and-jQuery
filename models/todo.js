const mongoose = require('mongoose');

const todoShema = mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be empty!!',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoShema);

module.exports = Todo;
