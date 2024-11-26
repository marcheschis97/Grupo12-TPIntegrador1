document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "../assets/image/Carroussel.jpg",
        "../assets/image/Carroussel1.jpg",
        "../assets/image/Carroussel2.jpg"
    ];

    let currentIndex = 0;
    const carruselImage = document.querySelector(".carrusel-image");
    const prevButton = document.querySelector(".carrusel-button.prev");
    const nextButton = document.querySelector(".carrusel-button.next");

    function updateImage() {
        carruselImage.src = images[currentIndex];
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", prevImage);

    setInterval(nextImage, 5000);

    updateImage();
});