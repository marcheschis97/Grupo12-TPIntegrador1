document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "../assets/image/Carroussel.jpg",
        "../assets/image/Carroussel1.jpg",
        "../assets/image/Carroussel2.jpg"
    ];

    let currentIndex = 0;
    const carouselImage = document.querySelector(".carousel-image");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");

    function updateImage() {
        carouselImage.src = images[currentIndex];
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Event listeners for buttons
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", prevImage);

    // Automatic image change every 5 seconds
    setInterval(nextImage, 5000);

    // Initialize with the first image
    updateImage();
});