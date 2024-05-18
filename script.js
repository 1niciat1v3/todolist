const todoForm = document.getElementById('todoform');
const todoInput = document.getElementById('todoinput');
const todoList = document.getElementById('todolist')

todoForm.addEventListener('submit', function(event){
    event.preventDefault();
    const newTask = todoInput.value;

    if (newTask === ''){
        alert('Enter the new task');
        return;
    }

    todoInput.value = '';

    addTask(newTask)
})
function addTask(task){
    const listItem = document.createElement('li');
    const taskText =  document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkBox);
    checkBox.addEventListener('change',function (){
        if (this.checked) taskText.style.textDecoration = 'line-through';
        else taskText.style.textDecoration = 'none';
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', function (){
        todoList.removeChild(listItem)
    })

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit'
    listItem.appendChild(editButton);
    todoList.appendChild(listItem);

    editButton.addEventListener('click', function (){
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            taskText.textContent = this.previousSibling.value;
            listItem.classList.remove('editing');
            editButton.textContent = 'Edit';
        }

        else{
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;

            listItem.insertBefore(input, taskText);
            listItem.removeChild(taskText);
            listItem.classList.add('editing');
            editButton.textContent = 'Save';
        }
    })
    saveTasksToLocalStorage();
}
function saveTasksToLocalStorage(){
    const tasks = [];
    document.querySelectorAll('#todolist li' ).forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({text: taskText, completed: isCompleted});
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener("DOMContentLoaded", function (){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    })
})

