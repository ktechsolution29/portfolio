document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    // Toggle Navbar on Mobile
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        // Toggle menu icon between ☰ and ✖
        menuToggle.innerHTML = navLinks.classList.contains("active") ? "&times;" : "&#9776;";
    });

    // Smooth Scroll
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });

            // Close menu on mobile after clicking a link
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            }
        });
    });

    // Highlight Active Section in Navbar
    function highlightNav() {
        let scrollPosition = window.scrollY + 150; // Adjusted for better accuracy

        sections.forEach(section => {
            let id = section.getAttribute("id");
            let navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                navItems.forEach(link => link.classList.remove("active-nav"));
                if (navLink) {
                    navLink.classList.add("active-nav");
                }
            }
        });
    }

    window.addEventListener("scroll", highlightNav);
});


// Lightbox Functionality
function openLightbox(imageSrc) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox.querySelector("img");

    lightboxImage.src = imageSrc;
    lightbox.classList.add("active");
}

// Close Lightbox
function closeLightbox() {
    document.querySelector(".lightbox").classList.remove("active");
}

// Add event listeners to portfolio images
document.querySelectorAll(".project-card img").forEach(img => {
    img.addEventListener("click", function () {
        openLightbox(this.src);
    });
});

// Close lightbox when clicking outside the image
document.querySelector(".lightbox").addEventListener("click", function (e) {
    if (e.target !== this.querySelector("img")) {
        closeLightbox();
    }
});
