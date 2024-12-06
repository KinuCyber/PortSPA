export function init () {
	// Select all elements with the class 'scrollDeck'
	const scrollDecks = document.querySelectorAll(".scrollDeck");

	// Function to handle drag-scroll and touch-scroll
	scrollDecks.forEach((scrollDeck) => {
	  let isDragging = false;
	  let startY = 0;
	  let scrollTop = 0;

	  // Drag-to-scroll for desktop (mouse)
	  scrollDeck.addEventListener("mousedown", (e) => {
		isDragging = true;
		startY = e.clientY;
		scrollTop = scrollDeck.scrollTop;
		scrollDeck.style.cursor = "default";
		e.preventDefault(); // Prevent text selection
	  });

	  scrollDeck.addEventListener("mousemove", (e) => {
		if (!isDragging) return;
		const y = e.clientY;
		const walk = (y - startY) * 4; // Adjust sensitivity as needed
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


	  // Touch-to-scroll for mobile devices
	  scrollDeck.addEventListener("touchstart", (e) => {
		isDragging = true;
		startY = e.touches[0].clientY;
		scrollTop = scrollDeck.scrollTop;
		e.preventDefault(); // Prevent default touch behavior
	  });

	  scrollDeck.addEventListener("touchmove", (e) => {
		if (!isDragging) return;
		const y = e.touches[0].clientY;
		const walk = (y - startY) * 2; // Adjust sensitivity as needed
		scrollDeck.scrollTop = scrollTop - walk;
		e.preventDefault(); // Prevent scrolling the page
	  });

	  scrollDeck.addEventListener("touchend", () => {
		isDragging = false;
	  });

	  scrollDeck.addEventListener("touchcancel", () => {
		isDragging = false;
	  });
	});

	// Sync page scroll with all scrollDecks' scrolls
	document.addEventListener("wheel", function (e) {
	  scrollDecks.forEach((scrollDeck) => {
		scrollDeck.scrollTop += e.deltaY * 5; // Adjust scroll sensitivity
	  });
	});
}