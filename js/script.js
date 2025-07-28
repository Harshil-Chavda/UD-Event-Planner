document.addEventListener('DOMContentLoaded', function() {

    // --- Header / Navigation Logic ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navList = document.getElementById('navList');

    if (hamburgerMenu && navList) {
        hamburgerMenu.addEventListener('click', function() {
            navList.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (for single page or smooth scroll)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
            });
        });
    }

    // Optional: Add active class to current page link in navigation
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav .nav-list a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure only one is active
        }
    });


    // --- Gallery Photo Data ---
    // IMPORTANT: Replace these placeholder paths with your actual image paths!
    // Create an 'images/gallery/' folder in your project's root and place your images there.
    const allGalleryPhotos = [
        // Page 1 (12 photos)
        { src: "images/gallery/corporate-event-1.webp", alt: "Corporate Event 1", class: "gallery-item-square" },
        { src: "images/gallery/wedding-event-1.webp", alt: "Wedding Event 1", class: "gallery-item-tall" },
        { src: "images/gallery/social-event-1.webp", alt: "Social Event 1", class: "gallery-item-square" },
        { src: "images/gallery/gala-event-1.webp", alt: "Gala Event 1", class: "gallery-item-wide" },
        { src: "images/gallery/exhibition-event-1.webp", alt: "Exhibition Event 1", class: "gallery-item-square" },
        { src: "images/gallery/virtual-event-1.webp", alt: "Virtual Event 1", class: "gallery-item-square" },
        { src: "images/gallery/corporate-event-2.webp", alt: "Corporate Event 2", class: "gallery-item-tall" },
        { src: "images/gallery/social-event-2.webp", alt: "Social Event 2", class: "gallery-item-square" },
        { src: "images/gallery/party-event-1.webp", alt: "Party Event 1", class: "gallery-item-square" },
        { src: "images/gallery/concert-event-1.webp", alt: "Concert Event 1", class: "gallery-item-wide" },
        { src: "images/gallery/wedding-event-2.webp", alt: "Wedding Event 2", class: "gallery-item-square" },
        { src: "images/gallery/corporate-event-3.webp", alt: "Corporate Event 3", class: "gallery-item-tall" },

        // Page 2 (12 photos)
        { src: "images/gallery/social-event-3.webp", alt: "Social Event 3", class: "gallery-item-square" },
        { src: "images/gallery/wedding-event-3.webp", alt: "Wedding Event 3", class: "gallery-item-wide" },
        { src: "images/gallery/gala-event-2.webp", alt: "Gala Event 2", class: "gallery-item-tall" },
        { src: "images/gallery/exhibition-event-2.webp", alt: "Exhibition Event 2", class: "gallery-item-square" },
        { src: "images/gallery/virtual-event-2.webp", alt: "Virtual Event 2", class: "gallery-item-square" },
        { src: "images/gallery/party-event-2.webp", alt: "Party Event 2", class: "gallery-item-wide" },
        { src: "images/gallery/corporate-event-4.webp", alt: "Corporate Event 4", class: "gallery-item-square" },
        { src: "images/gallery/social-event-4.webp", alt: "Social Event 4", class: "gallery-item-tall" },
        { src: "images/gallery/concert-event-2.webp", alt: "Concert Event 2", class: "gallery-item-square" },
        { src: "images/gallery/wedding-event-4.webp", alt: "Wedding Event 4", class: "gallery-item-wide" },
        { src: "images/gallery/gala-event-3.webp", alt: "Gala Event 3", class: "gallery-item-square" },
        { src: "images/gallery/exhibition-event-3.webp", alt: "Exhibition Event 3", class: "gallery-item-tall" },

        // Add more photos here if you have more pages!
        // { src: "images/gallery/corporate-event-5.webp", alt: "Corporate Event 5", class: "gallery-item-square" },
        // { src: "images/gallery/wedding-event-5.webp", alt: "Wedding Event 5", class: "gallery-item-wide" },
        // { src: "images/gallery/social-event-5.webp", alt: "Social Event 5", class: "gallery-item-tall" },
    ];

    // --- Gallery Pagination Logic ---
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) { // Check if gallery grid exists on the page
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const pageInfoSpan = document.getElementById('pageInfo');

        const itemsPerPage = 12;
        let currentPage = 0;
        const totalPages = Math.ceil(allGalleryPhotos.length / itemsPerPage);

        function displayPage(page) {
            currentPage = page; // Update current page globally

            // Clear existing content
            galleryGrid.innerHTML = '';

            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const photosToDisplay = allGalleryPhotos.slice(startIndex, endIndex);

            photosToDisplay.forEach(photoData => {
                const galleryItemDiv = document.createElement('div');
                galleryItemDiv.classList.add('gallery-item');
                // Add the specific sizing class
                if (photoData.class) {
                    galleryItemDiv.classList.add(photoData.class);
                }

                const imgElement = document.createElement('img');
                imgElement.src = photoData.src;
                imgElement.alt = photoData.alt;
                // Add an event listener for error handling (e.g., if image not found)
                imgElement.onerror = function() {
                    console.error("Failed to load image: " + this.src);
                    this.src = "images/placeholder.webp"; // Fallback placeholder
                    // You might want to add a class to hide the broken image or show an error state
                    // this.classList.add('broken-image');
                };

                galleryItemDiv.appendChild(imgElement);
                galleryGrid.appendChild(galleryItemDiv);
            });

            // Update pagination button states
            prevPageBtn.disabled = (currentPage === 0);
            nextPageBtn.disabled = (currentPage >= totalPages - 1);

            // Update page info text
            pageInfoSpan.textContent = `Page ${currentPage + 1} of ${totalPages}`;

            // Scroll to the top of the gallery when page changes
            // Use requestAnimationFrame to ensure rendering is complete before scrolling
            requestAnimationFrame(() => {
                galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        // Event Listeners for pagination buttons
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (currentPage > 0) {
                    displayPage(currentPage - 1);
                }
            });
        }

        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    displayPage(currentPage + 1);
                }
            });
        }

        // Initial display of the first page
        displayPage(currentPage);
    }
});