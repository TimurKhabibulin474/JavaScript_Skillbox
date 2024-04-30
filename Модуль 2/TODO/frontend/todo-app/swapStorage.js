export function getCurrentStorage() {
    if(localStorage.getItem("storage") === null) {
        localStorage.setItem("storage", "local");
    }
    return localStorage.getItem("storage");
}

export function createSwapStorageButton(currentStorage) {
    const wrapper = document.getElementById('wrapper-btn-swap');
    const button = document.createElement('button');

    button.classList.add('btn', 'btn-outline-primary');
    button.textContent = currentStorage === "local" ? "Перейти на серверное хранилище" : "Перейти на локальное хранилище";

    button.addEventListener('click', () => {
        const newStorage = localStorage.getItem("storage") === "local" ? "server" : "local";
        localStorage.setItem("storage", newStorage);
        window.location.reload();
    });

    wrapper.append(button);
}