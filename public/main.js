$(document).ready(() => {
  $.getJSON('/api/todos').then(addTodos);

  $('#todoInput').keypress((e) => {
    if (e.which === 13) {
      createTask();
    }
  });

  $('.list').on('click', 'li', function () {
    updateTask($(this));
  });

  $('.list').on('click', 'span', function (e) {
    e.stopPropagation();
    removeTask($(this).parent());
  });
});

function addTodos(todos) {
  // add todos to page
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

// add todo
function addTodo(todo) {
  const task = $(`<li class='task'>${todo.name}<span>X</span></li>`);

  task.data('id', todo._id);

  task.data('completed', todo.completed);

  if (todo.completed) {
    task.addClass('done');
  }
  $('.list').append(task);
}

// create new task
function createTask() {
  // send request to create new task
  let inputValue = $('#todoInput').val();

  $.post('/api/todos', { name: inputValue })
    .then((newTask) => {
      $('#todoInput').val('');
      addTodo(newTask);
    })
    .catch((err) => {
      console.log(err);
    });
}

// update task
function updateTask(task) {
  const clickedId = task.data('id');
  const isDone = !task.data('completed');
  const updateTsk = { completed: isDone };

  $.ajax({
    method: 'PUT',
    url: '/api/todos/' + clickedId,
    data: updateTsk,
  }).then((updatedTask) => {
    task.toggleClass('done');
    task.data('completed', isDone);
  });
}

// remove task
function removeTask(task) {
  const clickedId = task.data('id');
  task.remove();
  $.ajax({
    method: 'DELETE',
    url: '/api/todos/' + clickedId,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
