// js/routes.js
export const routes = {
    '/': {
        spacontent: '<h1>Welcome to My Portfolio</h1>',
        init: async () => {
            document.title = 'Home - Portfolio';

            // Dynamically load verSectionNav.js
            const verSectionNavModule = await import('./verSectionNav.js');
            verSectionNavModule.init();

            // Dynamically load carouselDragScroll.js
            // const carouselDragScrollModule = await import('./carouselDragScroll.js');
            // carouselDragScrollModule.init();
        },
    },
    '/projects': {
        spacontent: '<h1>My Projects</h1>',
        init: () => {
            document.title = 'Projects - Portfolio';;
        },
    },
    '/lab': {
        spacontent: '<h1>Lab</h1>',
        init: () => {
            document.title = 'Lab - Portfolio';
        },
    },
};
