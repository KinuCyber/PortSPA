export function init() {
    // Select all navigation items and content sections
    const navbarItems = document.querySelectorAll(".verSectionNav-item");
    const sections = document.querySelectorAll(".content");

    // Function to clear active states and set items as inactive
    const setInactiveStates = () => {
        navbarItems.forEach((item) => {
            item.classList.remove("active");
//            item.classList.add("inactive"); // Set as inactive
        });
    };

    // Function to set active state for a specific navbar item
    const setActiveState = (item) => {
//        item.classList.remove("inactive"); // Remove inactive
        item.classList.add("active"); // Add active
    };

    // Smooth scroll to the corresponding section
    const scrollToModal = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" }); // Align with top
        }
    };

    // Attach click event listeners to navbar items
    navbarItems.forEach((item) => {
        const sectionId = item.id.replace("verSectionNav-", ""); // Extract section ID
        item.addEventListener("click", () => {
            scrollToModal(sectionId);
        });
    });

    // Intersection Observer to detect when a section is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const sectionId = entry.target.id;
                const navItem = document.querySelector(`#verSectionNav-${sectionId}`);
                if (entry.isIntersecting) {
                    setInactiveStates(); // Set all items to inactive
                    setActiveState(navItem); // Activate the current one
                }
            });
        },
        {
            root: null, // Viewport as root
            threshold: 0.1, // 50% of the section visible to trigger
        }
    );

    // Observe each section
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Handle resizing to recalculate positions if needed
    window.addEventListener("resize", () => {
        setInactiveStates();
        observer.disconnect();
        sections.forEach((section) => observer.observe(section));
    });
}
