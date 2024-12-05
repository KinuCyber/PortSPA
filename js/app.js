function handleRouting() {
    const path = window.location.hash.slice(1) || '/';
    const spacontentDiv = document.getElementById('spacontent');

    if (routes[path]) {
        spacontentDiv.innerHTML = routes[path].spacontent;
        if (routes[path].init) routes[path].init();
    } else {
        spacontentDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
}



window.addEventListener('hashchange', handleRouting);
handleRouting();
