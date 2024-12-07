export function init() {

    // Function to initialize drag-scroll behavior
    const initializeScrollDecks = () => {
        const scrollDecks = document.querySelectorAll(".scrollDeck");

        scrollDecks.forEach((scrollDeck) => {
            const scrollHeight = scrollDeck.scrollHeight;
            const clientHeight = scrollDeck.clientHeight;
			
			let isDragging = false;
            let startY = 0;
            let scrollTop = 0;

            scrollDeck.addEventListener("mousedown", (e) => {
                isDragging = true;
                startY = e.clientY;
                scrollTop = scrollDeck.scrollTop;
                scrollDeck.style.cursor = "default";
                e.preventDefault();
            });

            scrollDeck.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                const y = e.clientY;
                const walk = (y - startY) * 4;
                scrollDeck.scrollTop = scrollTop - walk;
            });

            scrollDeck.addEventListener("mouseup", () => {
                isDragging = false;
                scrollDeck.style.cursor = "default";
            });

            scrollDeck.addEventListener("mouseleave", () => {
                isDragging = false;
                scrollDeck.style.cursor = "default";
            });

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

        document.addEventListener("wheel", (e) => {
            scrollDecks.forEach((scrollDeck) => {
                scrollDeck.scrollTop += e.deltaY * 2;
            });
        });
    };

    // Check if spacontent exists, and initialize
    const spacontent = document.getElementById("spacontent");
    if (spacontent) {
        initializeScrollDecks(); // Initialize immediately if spacontent is already loaded
    } else {
        console.warn("spacontent not found; waiting for dynamic content.");
    }

    // Optionally, listen for custom events when dynamic content is loaded
    document.addEventListener("content-loaded", initializeScrollDecks);
}
