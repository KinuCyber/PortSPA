export function init() {
    const carouselContainer = document.querySelector('.carousel-container');
    const modals = document.querySelectorAll('.modal');
    let currentIndex = 1; // The index of the centered modal
    let isDragging = false;
    let startX, scrollLeft;

    const updateCarousel = () => {
        modals.forEach((modal, index) => {
            modal.classList.remove('center', 'left', 'right', 'hidden');
            if (index === currentIndex) {
                modal.classList.add('center');
            } else if (index === (currentIndex - 1 + modals.length) % modals.length) {
                modal.classList.add('left');
            } else if (index === (currentIndex + 1) % modals.length) {
                modal.classList.add('right');
            } else {
                modal.classList.add('hidden');
            }
        });
    };

    const handleMouseDown = (e) => {
		isDragging = true;
		if (e.type === 'touchstart') {
			startX = e.touches[0].pageX; // For touch events
		} else {
			startX = e.pageX; // For mouse events
		}
		scrollLeft = currentIndex;
		carouselContainer.style.cursor = 'grabbing';
	};


    const handleMouseMove = (e) => {
		if (!isDragging) return;
		let x;
		if (e.type === 'touchmove') {
			x = e.touches[0].pageX; // For touch events
		} else {
			x = e.pageX; // For mouse events
		}
		const walk = (x - startX) / 2000; // Adjust sensitivity
		if (Math.abs(walk) > 0.2) {
			if (walk > 0) {
				currentIndex = (currentIndex - 1 + modals.length) % modals.length;
			} else {
				currentIndex = (currentIndex + 1) % modals.length;
			}
			updateCarousel();
			startX = x; // Reset startX for smoother dragging
		}
	};

    const handleMouseUp = () => {
        isDragging = false;
        carouselContainer.style.cursor = 'default';
    };

	function disabledPages() {
		console.log("Checking Disabled Pages");
		const disabledPages = ['#/test', '#/projects', '#/lab'];
		const currentPage = window.location.hash || '/'; // Default to '/' if no hash

		// Check if the current hash matches any of the disabled pages
		if (disabledPages.some(page => currentPage.startsWith(page))) {
			console.log(`${currentPage} is disabled.`);
			return true; // Indicate that the function should return
		}
		console.log(`${currentPage} is not disabled, proceed.`);
		return false; // Indicate that the function can proceed
	}

    const handleContainerClick = (e) => {
        if (isDragging) return; // Prevent conflict with dragging
//		if (disabledPages()) return;
		
        const containerWidth = carouselContainer.offsetWidth;
        const clickX = e.clientX - carouselContainer.getBoundingClientRect().left;

		console.log(clickX);
		// Return early if the click occurred on the right side
		if (clickX > containerWidth / 13 && disabledPages()) return;

        if (clickX < containerWidth / 3) {
            currentIndex = (currentIndex - 1 + modals.length) % modals.length;
        } else if (clickX > (2 * containerWidth) / 3) {
            currentIndex = (currentIndex + 1) % modals.length;
        }
        updateCarousel();
    };

    // Add event listeners for drag functionality
    carouselContainer.addEventListener('mousedown', handleMouseDown);
    carouselContainer.addEventListener('mousemove', handleMouseMove);
    carouselContainer.addEventListener('mouseup', handleMouseUp);
    carouselContainer.addEventListener('mouseleave', handleMouseUp);
    carouselContainer.addEventListener('touchstart', handleMouseDown);
    carouselContainer.addEventListener('touchmove', handleMouseMove);
    carouselContainer.addEventListener('touchend', handleMouseUp);

    // Add event listener for click-to-navigate functionality
    carouselContainer.addEventListener('click', handleContainerClick);

    // Initialize carousel
    updateCarousel();
}
