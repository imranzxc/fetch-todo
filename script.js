const todosBlock = document.getElementById('todos');
const input = document.querySelector('.input');
const add = document.querySelector('.add');
console.log(todos);

fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const list = document.createElement('div');
      const checkbox = document.createElement('input');
      const text = document.createElement('p');
      const deleteButton = document.createElement('button');

      list.classList.add('list');
      checkbox.classList.add('checkbox');
      text.classList.add('text');
      deleteButton.classList.add('deleteButton');

      checkbox.type = 'checkbox';
      if (data[i].completed) {
        checkbox.checked = 'checked';
        text.style.textDecoration = 'line-through';
      }

      text.textContent = data[i].title;
      deleteButton.textContent = 'x';

      list.append(checkbox, text, deleteButton);
      todosBlock.append(list);

      deleteButton.addEventListener('click', () => {
        deleteList(data[i].id, deleteButton.parentNode);
      });

      checkbox.addEventListener('click', () => {
        pathTitle(data[i].id, data[i].completed, checkbox, checkbox.nextElementSibling);
      });
    }
  });

add.addEventListener('click', () => {
  if (input.value) {
    const value = input.value;
    const add = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ title: value }),
    };
    fetch('https://jsonplaceholder.typicode.com/todos', add).then((response) => {
      if (response.ok) {
        const list = document.createElement('div');
        const checkbox = document.createElement('input');
        const text = document.createElement('p');
        const deleteButton = document.createElement('button');

        list.classList.add('list');
        checkbox.classList.add('checkbox');
        text.classList.add('text');
        deleteButton.classList.add('deleteButton');

        checkbox.type = 'checkbox';
        text.textContent = value;
        deleteButton.textContent = 'x';

        deleteButton.addEventListener('click', () => {
          deleteButton.parentNode.remove();
        });

        checkbox.addEventListener('click', () => {
          if (checkbox.checked) {
            text.style.textDecoration = 'line-through';
          } else {
            text.style.textDecoration = 'none';
          }
        });

        list.append(checkbox, text, deleteButton);
        todosBlock.prepend(list);
      }
    });

    input.value = '';
  } else {
    console.log('input is empty');
  }
});

function deleteList(id, node) {
  const rem = {
    method: 'DELETE',
  };
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, rem).then((response) => {
    if (response.ok) {
      node.remove();
    }
  });
}

function patchTitle(id, completed, checkbox, node) {
  const patch = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: !completed,
    }),
  };
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, patch).then((response) => {
    if (response.ok) {
      if (checkbox.checked) {
        node.style.textDecoration = 'line-through';
      } else {
        node.style.textDecoration = 'none';
      }
    }
  });
}
