const cssResources = {};
const appContainer = document.getElementById("app");

function loadResource(src) {
    if (src.endsWith(".js")) {
        return import(src);
    }
    if (src.endsWith(".css")) {
        if (!cssResources[src]) {
            const link = document.createElement('link');
            link.rel = "stylesheet";
            link.href = src;
            cssResources[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssResources[src];
    }
    return fetch(src).then(res => res.json());
}

renderPageForCurrentURL();

function renderPageForCurrentURL() {
    const searchParams = new URLSearchParams(location.search);
    const filmId = searchParams.get("filmId");

    if (filmId) {
        renderPage(
            "./film-details.js",
            `https://www.swapi.tech/api/films/${filmId}`,
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        );
    } else {
        renderPage(
            "./film-list.js",
            "https://www.swapi.tech/api/films",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        );
    }
}

function renderPage(moduleName, apiURL, css) {
    Promise.all([moduleName, apiURL, css].map(src => loadResource(src))).then(([pageModule, data]) => {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
    });
}

document.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName === 'A' && target.href) {
        event.preventDefault();
        const href = target.getAttribute('href');
        history.pushState(null, '', href);
        renderPageForCurrentURL();
    }
});

window.addEventListener('popstate', () => {
    renderPageForCurrentURL();
});

document.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName === 'A' && target.href) {
        event.preventDefault();
        const href = target.getAttribute('href');
        history.pushState(null, '', href);
        renderPageForCurrentURL();
    }
});