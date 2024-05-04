const BASE_URL = "http://localhost:3000/api/todos";

export async function getTodoList(owner) {
    const response = await fetch(`${BASE_URL}?owner=${owner}`);
    return await response.json();
}

export async function createTodoItem({ owner, name }) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

export function switchTodoItemDone({todoItem}) {
    todoItem.done = !todoItem.done;
    fetch(`${BASE_URL}/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({done: todoItem.done}),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function deleteTodoItem({element, todoItem}) {
    if (!confirm('Вы уверены?')) return;
    element.remove();
    fetch(`${BASE_URL}/${todoItem.id}`, {
        method: 'DELETE',
    })
}