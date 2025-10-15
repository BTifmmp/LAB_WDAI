document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-enlarge]");
  const imageDisplay = document.getElementById("image-display");
  const enlargedImage = document.getElementById("enlarged-image");
  const closeBtn = document.getElementById("close-btn");

  // Add click event to every image with data-enlarge
  images.forEach(img => {
    img.addEventListener("click", () => {
      enlargedImage.src = img.src;
      imageDisplay.style.display = "flex";
    });
  });

  // Close when clicking the close button
  closeBtn.addEventListener("click", () => {
    imageDisplay.style.display = "none";
  });

  // Also close when clicking outside the image
  imageDisplay.addEventListener("click", (e) => {
    if (e.target === imageDisplay) {
      imageDisplay.style.display = "none";
    }
  });
});