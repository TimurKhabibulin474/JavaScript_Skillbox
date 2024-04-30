let todoItemList = [];

export function getTodoList(owner) {
    todoItemList = JSON.parse(localStorage.getItem(owner + "List")) ?? [];
    return todoItemList;
}

export function createTodoItem({ owner, name, done = false }) {
    const todoItem = { owner, name, done, id: getNewId() };
    todoItemList.push(todoItem);
    localStorage.setItem(owner + "List", JSON.stringify(todoItemList));
    return todoItem;
}

function getNewId() {
    return Math.round(Math.random() * 100000);
}

export function switchTodoItemDone({ todoItem }) {
    todoItem.done = !todoItem.done;
    localStorage.setItem(todoItem.owner + "List", JSON.stringify(todoItemList));
}

export function deleteTodoItem({ element, todoItem }) {
    if (!confirm('Вы уверены?')) return;
    todoItemList = todoItemList.filter((item) => item.id !== todoItem.id);
    localStorage.setItem(todoItem.owner + "List", JSON.stringify(todoItemList));
    element.remove();
}