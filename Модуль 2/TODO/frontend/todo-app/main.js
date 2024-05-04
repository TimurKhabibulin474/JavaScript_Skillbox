import { getCurrentStorage, createSwapStorageButton} from './swapStorage.js';
import { createTodoApp } from './view.js';

export default async function loadPage(owner, title){
    const currentStorage = getCurrentStorage(owner);
    createSwapStorageButton(currentStorage);
    let getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem;
    if(currentStorage === "server"){
        ({ getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = await import('./server.js'));
    } else {
        ({ getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = await import('./local.js'));
    }
    (async () => {
        const todoItemList = await getTodoList(owner);
        createTodoApp(document.getElementById('todo-app'), {
            title,
            owner,
            todoItemList,
            onCreateFormSubmit: createTodoItem,
            onDoneClick: switchTodoItemDone,
            onDeleteClick: deleteTodoItem,
        });
    })();
}
