const routes = {
    '/': {
        spacontent: '<h1>Welcome to My Portfolio</h1>',
        init: () => {
            document.title = 'Home - Portfolio';
            particleModule.init();
            particleModule.animate();
        },
    },
    '/projects': {
        spacontent: '<h1>My Projects</h1>',
        init: () => {
            document.title = 'Projects - Portfolio';
        },
    },
    '/lab': {
        spacontent: '<h1>Lab</h1>',
        init: () => {
            document.title = 'Lab - Portfolio';
        },
    },
};
