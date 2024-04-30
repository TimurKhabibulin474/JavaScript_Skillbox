export function render(data) {
    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "flex-column", "gap-4", "my-4");
    const pageTitle = document.createElement("h1");
    pageTitle.textContent = "Episodes"
    pageTitle.classList.add("mb-3");
    container.append(pageTitle);
    let i = 1;
    for(const film of data.result) {
        const cardFilm = document.createElement("div");
        const title = document.createElement("h3");
        const number = document.createElement("p");
        const detailsLink = document.createElement("a");

        cardFilm.classList.add("d-flex", "align-items-center", "p-3", "gap-5", "position-relative","border-info", "border");
        title.classList.add("card-title");
        number.classList.add("display-4");
        detailsLink.classList.add("position-absolute", "top-0", "start-0", "w-100", "h-100", "pe-auto", "btn");

        title.textContent = film.properties.title;
        number.textContent = i;
        detailsLink.href = `?filmId=${i}`;

        cardFilm.append(number, title, detailsLink);
        container.append(cardFilm);
        i++;
    }
    return container;
}