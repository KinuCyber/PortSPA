const eventManager = (function () {
    const state = {
        mousePosition: { x: 0, y: 0 },
        isMouseDown: false,
    };

    window.addEventListener('mousemove', (event) => {
        state.mousePosition.x = event.clientX;
        state.mousePosition.y = event.clientY;
    });

    window.addEventListener('mousedown', () => {
        state.isMouseDown = true;
    });

    window.addEventListener('mouseup', () => {
        state.isMouseDown = false;
    });

    return {
        getMousePosition: () => ({ ...state.mousePosition }),
        isMouseDown: () => state.isMouseDown,
    };
})();

// Export the functions
export const getMousePosition = eventManager.getMousePosition;
export const isMouseDown = eventManager.isMouseDown;
