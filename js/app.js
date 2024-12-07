// js/app.js
import { routes } from './routes.js';

import { particleModule } from './particleModule.js';
import * as verticalDragScroll from './verticalDragScroll.js';

async function handleRouting() {
    const path = window.location.hash.slice(1) || '/';
    const spacontentDiv = document.getElementById('spacontent');

    if (routes[path]) {
        // Set content
        spacontentDiv.innerHTML = routes[path].spacontent;

        // Initialize functionality
        if (typeof routes[path].init === 'function') {
            await routes[path].init();
        }
    } else {
        // Fallback for unknown routes
        spacontentDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
        document.title = '404 - Page Not Found';
    }
}

function initGlobalFeatures() {
	
    // Initialize the particle background
    particleModule.init();
    particleModule.animate();

    // Initialize vertical drag scroll
    verticalDragScroll.init();
	
}


// Initial load
handleRouting();
initGlobalFeatures();

// Handle hash changes
window.addEventListener('hashchange', handleRouting);



/*function handleRouting() {
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
handleRouting();*/