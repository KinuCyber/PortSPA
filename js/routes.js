// js/routes.js
export const routes = {
    '/': {
        spacontent: `
            <div class="scrollDeck" id="scrollDeck" style="margin-left: 20%; width: 60%;">
			<div style="height: 2000px; background: linear-gradient(to bottom, #fff, #ccc);">
                <!-- Land Transition Section -->
                <section id="landTrans" class="content" style="background: transparent">
                    <section>
                        <h2>Main Visuals</h2>
                        <p>
                            Particle array background that subtly moves with mouse interaction.
                            3D vector elements.
                        </p>
                    </section>

                    <h2>Content</h2>    
                    <p style="white-space: pre-line;">
                        Brand Tagline: Brief introduction or mission statement.

                        Call-to-Action (CTA) Buttons:
                        - "View My Work" (anchors to the My Work section).
                        - "Learn More About Me" (anchors to About Me).
                    </p>
                </section>
                
                <!-- Work Section -->
                <section id="work" class="content">
                    <p style="white-space: pre-line;">
                        Button: "Explore All Projects" (links to the Projects Page).
                    </p>
                    <div class="carousel-container">
                        <section class="modal left">1</section>
                        <section class="modal center">2</section>
                        <section class="modal right">3</section>
                        <section class="modal hidden">4</section>
                        <section class="modal hidden">5</section>
                        <section class="modal hidden">6</section>
                        <section class="modal hidden">7</section>
                    </div>
                </section>
                
                <!-- Contact Section -->
                <section id="contact" class="content">
                    <p style="white-space: pre-line;">
                        Contact Information:

                        Email (with a "Click to Copy" feature).
                        Phone (optional).

                        Social Media Links: Compact and neatly designed icons/buttons.
                    </p>
                </section>
                
                <!-- About Section -->
                <section id="about" class="content">
                    <p style="white-space: pre-line;">
                        Introduction:

                        Brief overview of your journey and specialization in low-poly 3D modeling.
                        Focus on expertise, adaptability, and brand ethos.

                        Call-to-Action Button: "Explore My Labs" (links to the Labs Page).
                    </p>
                </section>
            </div>
			</div>
        `,
        init: async () => {
            document.title = 'Home - Kinu 3D';

            // Initialize shared modules
            const [carouselDragScrollModule, verticalDragScrollModule] = await Promise.all([
                import('./carouselDragScroll.js'),
                import('./verticalDragScroll.js'),
            ]);

            // Initialize specific features
            carouselDragScrollModule.init();
            verticalDragScrollModule.init();
        },
    },
    '/projects': {
        spacontent: `
            <h1>My Projects</h1>
            <div class="carousel-container">
                <section class="modal left">1</section>
                <section class="modal center">2</section>
                <section class="modal right">3</section>
                <section class="modal hidden">4</section>
                <section class="modal hidden">5</section>
                <section class="modal hidden">6</section>
                <section class="modal hidden">7</section>
            </div>
        `,
        init: async () => {
            document.title = 'Projects - Kinu 3D';

            // Load carousel drag-scroll module for projects
            const carouselDragScrollModule = await import('./carouselDragScroll.js');
            carouselDragScrollModule.init();
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
