new function() {
	const todoInput = document.getElementById('todoInput'),
		todoAddBtn = document.getElementById('todoAddBtn'),
		todos = document.getElementById('todos');

	//Adding functionaliy to filters
	document.querySelector('select').addEventListener('change', function() {
		if (this.value === 'all') {
			Object.values(todos.children).forEach((child) => {
				child.style.display = 'flex';
			});
		} else if (this.value === 'completed') {
			Object.values(todos.children).forEach((child) => {
				if (child.children[0].classList.contains('completed')) {
					child.style.display = 'flex';
				} else {
					child.style.display = 'none';
				}
			});
		} else {
			Object.values(todos.children).forEach((child) => {
				if (child.children[0].classList.contains('completed')) {
					child.style.display = 'none';
				} else {
					child.style.display = 'flex';
				}
			});
		}
	});

	//Load Contents from Local Storage
	document.addEventListener('DOMContentLoaded', () => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		Object.keys(todos).forEach((key) => {
			addTodo(key, todos[key]);
		});
		if (isMobile()) {
			document.getElementById('todos').setAttribute('data', 'mobile');
		}
	});

	//Add new Todo when add button is clicked
	todoAddBtn.addEventListener('click', (e) => {
		e.preventDefault();
		addTodo(todoInput.value);
		saveToLocalStorage(todoInput.value);
		todoInput.value = '';
	});

	//Function to display todo passed as argument
	function addTodo(todo, status = false) {
		if (todo != '') {
			//Create Elements
			const newTodo = document.createElement('li'),
				newTodoText = document.createElement('span'),
				newTodoCheckBtn = document.createElement('button'),
				newTodoDelBtn = document.createElement('button');

			//Append Elements
			todos.appendChild(newTodo);
			newTodo.appendChild(newTodoText);
			newTodo.appendChild(newTodoCheckBtn);
			newTodo.appendChild(newTodoDelBtn);

			//Add Class to Elements
			newTodo.classList.add('todo');
			newTodoText.classList.add('todo-text');
			newTodoCheckBtn.classList.add('todo-check', 'btn');
			newTodoDelBtn.classList.add('todo-del', 'btn');

			//Adding todo Text
			newTodoText.innerText = todo;

			//Adding Event Listeners
			newTodoDelBtn.addEventListener('click', deleteTodo);
			newTodoCheckBtn.addEventListener('click', checkTodo);

			//check todo if status is true
			if (status) newTodoCheckBtn.parentElement.children[0].classList.add('completed');
		}
	}

	function deleteTodo(e) {
		e.target.parentElement.classList.add('delete');
		e.target.parentElement.addEventListener('transitionend', function() {
			this.remove();
		});
		deleteFromLocalStorage(e.target.parentElement.children[0].innerText);
	}

	function checkTodo(e) {
		const todo = e.target.parentElement.children[0];
		if (todo.classList.contains('completed')) {
			todo.classList.remove('completed');
			saveToLocalStorage(todo.innerText, false);
		} else {
			todo.classList.add('completed');
			saveToLocalStorage(todo.innerText, true);
		}
	}

	function saveToLocalStorage(todo, status = false) {
		var todos = JSON.parse(localStorage.getItem('todos'));
		if (todos === null) todos = {};
		todos[todo] = status;
		localStorage.setItem('todos', JSON.stringify(todos));
	}
	function deleteFromLocalStorage(todo) {
		var todos = JSON.parse(localStorage.getItem('todos'));
		if (todos === null) todos = {};
		delete todos[todo];
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function isMobile() {
		return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	}
}();
