// js/routes.js

// Store the currently loaded stylesheets
let currentStylesheets = [];

function loadCSS(...files) {
    // First, remove all currently loaded stylesheets that are not in the new argument list
    currentStylesheets.forEach(file => {
        if (!files.includes(file)) {
            removeCSS(file);
        }
    });

    // Load the new stylesheets
    files.forEach(file => {
        // Only load the stylesheet if it's not already loaded
        if (!currentStylesheets.includes(file)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file;
            link.id = file; // Set a unique id for the link (to make removal easier)
            document.head.appendChild(link);
            currentStylesheets.push(file); // Add the loaded file to the list of current styles
        }
    });
}

// Function to remove a CSS file by its ID
function removeCSS(file) {
    const link = document.getElementById(file);
    if (link) {
        document.head.removeChild(link);
        currentStylesheets = currentStylesheets.filter(f => f !== file); // Remove the file from the current list
    }
}



export const routes = {
    '/': {
		init: async () => {
		
			try {
				document.title = 'Home - Kinu 3D';
				
				// Load core styles and home-specific styles
                loadCSS('../css/styles.css'); // Always load the core styles
				
				// Fetch and set the spacontent dynamically
				const response = await fetch ('./spacontent/home.html');
				const content = await response.text();
				document.getElementById('spacontent').innerHTML = content;

				// Initialize shared modules
				const [carouselDragScrollModule, verticalDragScrollModule] = await Promise.all([
					import('./carouselDragScroll.js'),
					import('./verticalDragScroll.js'),
				]);
				
				// Dispatch the custom event (goes to verticalDragScroll's "content-loaded" thing, last line. Learn about it
				const event = new Event('content-loaded');
				document.dispatchEvent(event);

				// Initialize specific features
				carouselDragScrollModule.init();
				verticalDragScrollModule.init();
			} catch (error) {
				console.error('Error loading home content:', error);
			}
		},
    },
    '/projects': {
        init: async () => {
			
			try {
				document.title = 'Projects - Kinu 3D';
				
				// Load core styles and projects-specific styles
                loadCSS('../css/styles.css', '../css/projects.css');   // Load prjoects-specific styles
				
				// Fetch and set the spacontent dynamically
				const response = await fetch ('./spacontent/projects.html');
				const content = await response.text();
				document.getElementById('spacontent').innerHTML = content;

				// Initialize shared modules
				const [carouselDragScrollModule, verticalDragScrollModule] = await Promise.all([
					import('./carouselDragScroll.js'),
					import('./verticalDragScroll.js'),
				]);
				
				
				// Initialize specific features
				carouselDragScrollModule.init();
				verticalDragScrollModule.init();
				
				// Dispatch the custom event (goes to verticalDragScroll's "content-loaded" thing, last line. Learn about it
				const event = new Event('content-loaded');
				document.dispatchEvent(event);
			
			} catch (error) {
				console.error('Error loading home content:', error);
			}
        },
    },
    '/lab': {
        spacontent: `
            <h1>Lab</h1>
            <p>Explore my experiments and design iterations in this section.</p>
        `,
        init: () => {
            document.title = 'Lab - Kinu 3D';
        },
    },
};
