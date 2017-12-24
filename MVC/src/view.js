import { createElement } from './helpers.js'

class View {
    constructor() {
      this.form = document.getElementById('todo-form')
      this.input = document.getElementById('add-input')
      this.list =  document.getElementById('todo-list')
    }

    createElement(todo) {
      const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
      const label = createElement('label', { className: 'title' }, todo.title);
      const editInput = createElement('input', { type: 'text', className: 'textfield' });
      const removeButton = createElement('button', { className: 'edit' }, 'Изменить');
      const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');
      const item = createElement('li', { className: `todo-item${todo.completed ? ' completed': ''}`, 'data-id': todo.id }, checkbox, label, editInput, editButton, removeButton);

      return this.addEventListeners(item);
  }

    addEventListeners(item) {
     const checkbox = item.querySelector('.checkbox');
     const editButton = item.querySelector('button.edit');
     const removeButton = item.querySelector('button.remove');

     checkbox.addEventListener('change', this.handleToggle.bind(this));
     editButton.addEventListener('click', this.handleEdit.bind(this));
     removeButton.addEventListener('click', this.handleRemove.bind(this));

      return item;
    }

    findListItem(id) {
      return this.list.querySelector(`[data-id="${id}"]`)
    }

    addItem(todo) {
      const listItem = this.createElement(todo)

      this.input.value = '';
      this.list.appendChild(listItem)
    }

    toggleItem(todo) {
      const listItem = this.findListItem(todo.id)
      const checkbox = listItem.querySelector('.checkbox')

      checkbox.checked = todo.completed;

        if (todo.completed) {
          listItem.classList.add('completed')
        } else {
          listItem.classList.remove('completed')
        }
    }

    editItem(todo) {
         const listItem = this.findListItem(todo.id);
         const label = listItem.querySelector('.title');
         const input = listItem.querySelector('.textfield');
         const editButton = listItem.querySelector('button.edit');

         label.textContent = todo.title;
         editButton.textContent = 'Изменить';
         listItem.classList.remove('editing');
     }

    removeItem(id) {
        const listItem = this.findListItem(todo.id);

        this.list.removeChild(listItem);
      }
}

export default View
