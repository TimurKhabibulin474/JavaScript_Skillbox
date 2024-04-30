export function render(data){
    const properties = data.result.properties;
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const backButton = document.createElement("a");
    const desc = document.createElement("p");

    title.textContent = `${properties.title} ${properties.episode_id}`
    backButton.textContent = "Back to episodes";
    backButton.href = 'index.html';
    desc.textContent = `${properties.opening_crawl}`;

    container.classList.add("container", "my-4");
    backButton.classList.add("btn", "btn-dark", "mb-4");
    desc.classList.add("lead");

    container.append(title, backButton, desc);
    addElements(container, properties);
    return container;
}

function addElements(container, properties) {
    Promise.all([
        loadData(properties.planets),
        loadData(properties.species),
        loadData(properties.characters)
    ]).then(([planets, species, characters]) => {
        renderData(container, planets, "Planets");
        renderData(container, species, "Species");
        renderData(container, characters, "Characters");
    });
}

function loadData(sourceArray) {
    return Promise.all(sourceArray.map(source => fetch(source).then(response => response.json())));
}

function renderData(container, elements, title){
    const subtitle = document.createElement("h2");
    const list = document.createElement("ul");
    subtitle.textContent = title;
    list.classList.add("mx-2", "mb-4");
    for(const el of elements){
        const item = document.createElement("li");
        item.textContent = el.result.properties.name;
        list.append(item);
    }
    container.append(subtitle, list);
}