(() => {

function createElement(tag, props, ...children) {
  const element = document.createElement(tag)

  Object.keys(props).forEach(key => element[key] = props[key])

  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    })
  }
  return element
}

function createTodoItem(title) {
  let checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', onchange: toggleTodoItem });
  let label = createElement('label', { className: 'title' }, title);
  let editInput = createElement('input', { type: 'text', className: 'textfield' });
  let editButton = createElement('button', { className: 'edit', onclick: editTodoItem }, 'Изменить');
  let deleteButton = createElement('button', { className: 'delete', onclick: deleteTodoItem }, 'Удалить');
  let listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

   bindEvents(listItem)

   return listItem;
}

function bindEvents(todoItem) {
  const checkbox = todoItem.querySelectorAll('.checkbox')
  const editButton = todoItem.querySelectorAll('button.edit')
  const deleteButton = todoItem.querySelectorAll('button.delete')

  checkbox[0].addEventListener('change', toggleTodoItem)
  editButton[0].addEventListener('click', editTodoItem)
  deleteButton[0].addEventListener('click', deleteTodoItem)
}


function addTodoItem(event) {
  event.preventDefault()

  if (addInput.value === '') return alert('empty form')

  const todoItem = createTodoItem(addInput.value)

  todoList.appendChild(todoItem)
  addInput.value = ''
}

function toggleTodoItem({ target }) {
  const listItem = this.parentNode
  listItem.classList.toggle('completed')
}

function editTodoItem() {
  const listItem = this.parentNode
  const title = listItem.querySelector('.title')
  const editInput = listItem.querySelector('.textfield')
  const isEditing = listItem.classList.contains('editing')

    if (isEditing) {
      title.innerText = editInput.value
      this.innerText = 'Edit'
    } else {
      editInput.value = title.innerText;
      this.innerText = 'Save'
    }

  listItem.classList.toggle('editing')
}

function deleteTodoItem() {
  const listItem = this.parentNode
  todoList.removeChild(listItem)

}
const todoForm = document.getElementById('todo-form')
const addInput = document.getElementById('add-input')
const todoList = document.getElementById('todo-list')
const todoItems = document.querySelectorAll('.todo-item')

function main() {
  todoForm.addEventListener('submit', addTodoItem)
  todoItems.forEach(item => bindEvents(item))
}

main()
})()
