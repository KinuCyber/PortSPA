export function init() {
    console.log("verticalDragScrollModule Initialized!");

    // Wait until the DOM is fully rendered
    window.addEventListener("load", () => {
        // Select all elements with the class 'scrollDeck'
        const scrollDecks = document.querySelectorAll(".scrollDeck");

        scrollDecks.forEach((scrollDeck) => {
            // Check if the scrollDeck has overflow content
            const scrollHeight = scrollDeck.scrollHeight;
            const clientHeight = scrollDeck.clientHeight;

            console.log(`ScrollDeck Height Check - scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

            if (scrollHeight <= clientHeight) {
                console.warn(`ScrollDeck with ID "${scrollDeck.id}" does not have overflow content.`);
                return;
            }

            let isDragging = false;
            let startY = 0;
            let scrollTop = 0;

            // Drag-to-scroll for desktop (mouse)
            scrollDeck.addEventListener("mousedown", (e) => {
                isDragging = true;
                startY = e.clientY;
                scrollTop = scrollDeck.scrollTop;
                scrollDeck.style.cursor = "grabbing"; // Visual feedback
                e.preventDefault();
            });

            scrollDeck.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                const y = e.clientY;
                const walk = (y - startY) * 2;
                scrollDeck.scrollTop = scrollTop - walk;
                console.log(
                    `scrollTop: ${scrollDeck.scrollTop}, walk: ${walk}, y: ${y}, startY: ${startY}`
                );
            });

            scrollDeck.addEventListener("mouseup", () => {
                isDragging = false;
                scrollDeck.style.cursor = "default";
            });

            scrollDeck.addEventListener("mouseleave", () => {
                isDragging = false;
                scrollDeck.style.cursor = "default";
            });

            // Touch-to-scroll for mobile devices
            scrollDeck.addEventListener("touchstart", (e) => {
                isDragging = true;
                startY = e.touches[0].clientY;
                scrollTop = scrollDeck.scrollTop;
                e.preventDefault();
            });

            scrollDeck.addEventListener("touchmove", (e) => {
                if (!isDragging) return;
                const y = e.touches[0].clientY;
                const walk = (y - startY) * 2;
                scrollDeck.scrollTop = scrollTop - walk;
                e.preventDefault();
            });

            scrollDeck.addEventListener("touchend", () => {
                isDragging = false;
            });

            scrollDeck.addEventListener("touchcancel", () => {
                isDragging = false;
            });
        });

        // Sync page scroll with all scrollDecks' scrolls
        document.addEventListener("wheel", (e) => {
            scrollDecks.forEach((scrollDeck) => {
                scrollDeck.scrollTop += e.deltaY * 2;
            });
        });
    });
}
