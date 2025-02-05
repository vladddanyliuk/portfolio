document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("fullgallery");
    const sliderContainer = document.querySelector(".slides");
    const sliderOuter = document.querySelector(".slider"); // Outer container for the slider
    
    // Wrap slider images in a container .slide
    function populateGallery() {
    sliderContainer.innerHTML = ""; // Clear slider content
    gallery.innerHTML = ""; // Clear gallery thumbnails
    
    artworks.forEach((artwork, index) => {
    // Create gallery thumbnail
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.innerHTML = `<img src="${artwork.src}" alt="${artwork.caption}" data-index="${index}">`;
    gallery.appendChild(galleryItem);
    
    galleryItem.addEventListener("click", () => {
      showSlide(index);
    });
    
    // Create a slide wrapper for the image
    const slide = document.createElement("div");
    slide.classList.add("slide");
    
    const sliderImg = document.createElement("img");
    sliderImg.src = artwork.src;
    sliderImg.alt = artwork.caption;
    
    slide.appendChild(sliderImg);
    sliderContainer.appendChild(slide);
    });
    
    // Start with the initial slide
    showSlide(currentSlide);
    }
    
    let currentSlide = 0;
    
    function showSlide(index) {
    const totalSlides = sliderContainer.children.length;
    currentSlide = (index + totalSlides) % totalSlides;
    
    // Use pixel translation based on the current width of the outer slider.
    const slideWidth = sliderOuter.clientWidth;
    sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    highlightAndScrollToFullGalleryImage(currentSlide);
    updateSliderSize(); // Adjust slider size based on current image
    }
    
   function nextSlide() {
  // Hide the header when moving forward
  document.querySelector('header').style.display = 'none';
  showSlide(currentSlide + 1);
}

function prevSlide() {
  // Optionally, show the header when moving backward
  document.querySelector('header').style.display = 'unset';
  showSlide(currentSlide - 1);
}
  
    function highlightAndScrollToFullGalleryImage(index) {
    const galleryItems = document.querySelectorAll("#fullgallery .gallery-item img");
    galleryItems.forEach(img => img.classList.remove("selected"));
    
    const selectedImage = document.querySelector(`#fullgallery .gallery-item img[data-index="${index}"]`);
    if (selectedImage) {
    selectedImage.classList.add("selected");
    }
    }
    
    // Update the slider outer container's size based on the current image's natural dimensions.
    // After resizing, update each slide's dimensions so they all match the outer container.
    function updateSliderSize() {
    const slideElements = sliderContainer.children;
    if (!slideElements[currentSlide]) return;
    
    // Get the image element from the current slide.
    const currentImg = slideElements[currentSlide].querySelector("img");
    if (!currentImg) return;
    
    if (!currentImg.complete) {
    currentImg.onload = function () {
      resizeSlider(currentImg);
    };
    } else {
    resizeSlider(currentImg);
    }
    }
    
    function resizeSlider(image) {
    // Get natural dimensions
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    
    // Define maximum allowed dimensions (80% of viewport dimensions)
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;
    
    // Calculate scale factor to keep image within bounds while preserving aspect ratio.
    let scaleFactor = 1;
    if (width > maxWidth) {
    scaleFactor = maxWidth / width;
    }
    if (height * scaleFactor > maxHeight) {
    scaleFactor = maxHeight / height;
    }
    
    // Scale the dimensions
    width = width * scaleFactor;
    height = height * scaleFactor;
    
    // Set the outer slider container (the .slider element) to the scaled dimensions.
    sliderOuter.style.width = width + "px";
    sliderOuter.style.height = height + "px";
    
    // Now update every slide's size so they all match the new outer container dimensions.
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => {
    slide.style.width = width + "px";
    slide.style.height = height + "px";
    });
    
    // After resizing, update the transform to account for the new width.
    sliderContainer.style.transform = `translateX(-${currentSlide * width}px)`;
    }
    
    // Initialize gallery and slider
    populateGallery();
    
    // Event listeners for navigation buttons
    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);
    });
    
    // Artworks array
    const artworks = [
    { src: '12.jpg', caption: 'Portrait 1' },
    { src: 'https://images.unsplash.com/photo-1735657061792-9a8221a7144b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Portrait 1' },
    { src: 'https://images.unsplash.com/photo-1737412358025-160a0c22e6c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Portrait 1' },
    { src: 'https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Portrait 1' },
    { src: 'https://images.unsplash.com/photo-1738432323553-b9471e2239b9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Client Order 1' },
    { src: 'https://images.unsplash.com/photo-1736523076173-dd6a33e76c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Client Order 1' }
    // Add more artworks as needed
    ];
    const actionBox2  = document.getElementById("calltoslider");
    
    actionBox2.addEventListener("click", function() {
  const actionBox = document.getElementById("calltoaction");

  // Toggle display between flex and none
  if (actionBox.style.display === "flex") {
    actionBox.style.display = "none";
    actionBox.classList.remove("visible"); // Remove the visible class when hiding
  } else {
    actionBox.classList.add("visible"); // Add the visible class when showing
    actionBox2.style.display = "none"; // Hide actionBox2
  }
});

     
    
    const gallery = document.getElementById('fullgallery');
    
    // Populate the gallery dynamically
    artworks.forEach(artwork => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');
      item.innerHTML = `<img src="${artwork.src}" alt="${artwork.caption}" />`;
      gallery.appendChild(item);
    
      // Add click event for the modal
      sliderContainer.addEventListener('click', () => {
        openModal(artwork.src, artwork.caption);
      });
    });
    
    // Modal functionality
    const modal = document.getElementById('artworkModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModalButton = document.querySelector('.modal .close');
    
    function openModal(src, caption) {
      modal.style.display = 'flex';
      modalImage.src = src;
      captionText.innerHTML = caption;
    }
    
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
