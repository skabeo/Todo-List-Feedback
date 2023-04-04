let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  { description: 'wash the dishes', completed: false, index: 0 },
  { description: 'complete To Do list project', completed: false, index: 1 },
];

function populateTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-container');

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('edit');

    const label = document.createElement('label');
    const span = document.createElement('span');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    if (checkbox.checked) {
      console.log(index);
      taskDescription.style.textDecoration = 'line-through';
    } else {
      taskDescription.style.textDecoration = 'none';
    }
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      populateTodoList();
    });
    span.appendChild(checkbox);

    taskDescription.textContent = task.description;
    taskDescription.setAttribute('contentEditable', 'true');

    taskDescription.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newDescription = taskDescription.textContent.trim();
        editTask(index, newDescription);
        populateTodoList();
      }
    });

    taskDescription.addEventListener('input', () => {
      saveTasks();
    });

    label.addEventListener('click', (event) => {
      if (event.target === taskDescription) {
        event.preventDefault();
      }
    });

    const img = document.createElement('img');
    img.src = 'img/menu.png';
    img.alt = 'menu';
    img.classList.add('menu');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('list-alignment');

    img.addEventListener('click', () => {
      const dust = new Image();
      dust.src = 'img/trash.png';
      dust.classList.add('dust');

      const listItems = document.querySelectorAll('.list-container');
      listItems.forEach((item) => {
        item.style.backgroundColor = '';
      });

      listItem.style.backgroundColor = '#fff9a6';
      listItem.style.margin = 0;

      dust.addEventListener('load', () => {
        imgContainer.removeChild(img);
        imgContainer.appendChild(dust);

        dust.addEventListener('click', () => {
          deleteTask(index);
          populateTodoList();
          saveTasks();
        });
      });
    });

    span.appendChild(taskDescription);
    label.appendChild(span);
    imgContainer.appendChild(label);
    imgContainer.appendChild(img);

    const hr = document.createElement('hr');
    hr.classList.add('list-line');
    listItem.appendChild(imgContainer);
    listItem.appendChild(hr);

    todoList.appendChild(listItem);
  });
}

function addTask(description) {
  tasks.push({ description, completed: false, index: tasks.length });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  populateTodoList();
}

function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

const input = document.getElementById('add-list');
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const description = input.value.trim();
    if (description !== '') {
      addTask(description);
      input.value = '';
      saveTasks();
      populateTodoList();
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
    populateTodoList();
  });
  
const arrow = document.querySelector('#left-arrow');
arrow.classList.add('left-arrow');
arrow.src = 'img/left.png';

function markTaskCompleted(taskIndex) {
  tasks[taskIndex].completed = true;
  saveTasks();
  populateTodoList()
}

function markTaskIncompleted(taskIndex) {
  tasks[taskIndex].completed = false;
  saveTasks();
  populateTodoList()
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearTask);

function clearTask() {
  console.log('hello')
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  populateTodoList();
}
  