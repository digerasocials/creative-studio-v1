/*
 * ==========================================
 * STUDIO CREATIVE: DYNAMIC GALLERY & LIGHTBOX
 * Premium Minimalist Architecture Aesthetic
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const residentialContainer = document.getElementById('residential-gallery');
  const commercialContainer = document.getElementById('commercial-gallery');
  const productsContainer = document.getElementById('products-gallery');

  if (residentialContainer) {
    buildGallery(residentialContainer, 'residential');
  } else if (commercialContainer) {
    buildGallery(commercialContainer, 'commercial');
  } else if (productsContainer) {
    buildGallery(productsContainer, 'products');
  }
});

// Cache for valid loaded images to support seamless lightbox navigation
let activeGalleryImages = [];
let currentLightboxIndex = 0;

/**
 * DYNAMIC PATH CONFIGURATOR
 * Detects running environment and handles fallbacks automatically
 */
function getAssetPrefix() {
  // Check if we are inside a subfolder (e.g. /projects/residential.html or similar)
  const path = window.location.pathname;
  
  // If the path includes /projects/ or we are in a nested directory structure
  // This is highly flexible to match sub-routing on both local servers and relative file systems
  const isSubfolder = path.includes('/projects/') || (path.split('/').length > 2 && !path.startsWith('file:///C:'));
  
  // Local file systems (file:///) require a robust depth check
  if (window.location.protocol === 'file:') {
    // If the path has 'projects' before the file name
    return path.toLowerCase().includes('/projects/') ? '../' : '';
  }
  
  return isSubfolder ? '../' : '';
}

/**
 * BUILDS THE 12-IMAGE PORTFOLIO GALLERY
 */
function buildGallery(container, category) {
  const assetPrefix = getAssetPrefix();
  
  // Current complete lists of files in folders to guarantee immediate out-of-the-box loading
  const residentialImages = [
    "1.jpeg",
    "2.jpg",
    "3.jpeg",
    "4.jpeg",
    "5.jpg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg",
    "9.jpeg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpeg",
    "20.jpeg",
    "21.jpeg",
    "22.jpeg",
    "23.jpeg",
    "24.jpeg",
    "25.jpeg",
    "26.jpeg",
    "27.jpeg",
    "28.jpeg",
    "29.jpeg",
    "30.jpeg",
    "31.jpeg",
    "32.jpeg",
    "33.jpeg",
    "34.jpeg",
    "35.jpeg",
    "36.jpeg",
    "37.png",
    "38.png",
    "39.jpeg",
    "40.jpeg"
  ];

  const commercialImages = [
    "_C5A2897as.jpg.jpeg",
    "01.1.jpg",
    "01.2.jpg",
    "01.jpg",
    "02.jpg",
    "03.1.jpg",
    "03.jpg",
    "3d-view-2022-05-17-c.jpg.jpeg",
    "3d-view-2022-05-17-e.jpg.jpeg",
    "3d-view-2022-08-03-a.jpg.jpeg",
    "3d-view-2022-08-03-b.jpg.jpeg",
    "3d-view-2022-08-04-a.jpg.jpeg",
    "3d-view-2022-08-04-b.jpg.jpeg",
    "3d-view-2022-10-31-c.jpg.jpeg",
    "3d-view-2022-10-31-e.jpg.jpeg",
    "3d-view-20220513-a.jpg.jpeg",
    "3d-view-20220513-b.jpg.jpeg",
    "3d-view-20220513-c.jpg.jpeg",
    "6.jpeg",
    "7.jpeg",
    "08.1.jpeg",
    "08.jpeg",
    "8.jpeg",
    "9.jpeg",
    "coorg-1.jpg.jpeg",
    "coorg-2.jpg.jpeg",
    "coorg-3.jpg.jpeg",
    "coorg-4.jpg.jpeg",
    "forte-kochi-1.jpg.jpeg",
    "forte-kochi-2.jpg.jpeg",
    "IMG_0784.jpg.jpeg",
    "IMG_0897.jpg.jpeg",
    "IMG_6953.jpg.jpeg",
    "IMG_6973 (2).jpg.jpeg",
    "IMG_6980.jpg.jpeg",
    "IMG_7000.jpg.jpeg",
    "IMG_7020.jpg.jpeg",
    "IMG_7043.jpg.jpeg",
    "IMG_7077.jpg.jpeg",
    "IMG_7110.jpg.jpeg",
    "IMG_7200.jpg.jpeg",
    "IMG_7225.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-12.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-13.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-14.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-15.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-16.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-17.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-18.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-19.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-20.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-21.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-22.jpg.jpeg",
    "jasa-design-interior-bandung-rekai-commercial-23.jpg.jpeg",
    "mandapa-1.jpg.jpeg",
    "mandapa-2.jpg.jpeg",
    "mandapa-3.jpg.jpeg",
    "mandapa-4.jpg.jpeg",
    "rekai-designers-3d-view-4.jpg.jpeg",
    "tdcfg.jpeg"
  ];

  const productsImages = [
    "_C5A3265.JPG.jpeg",
    "_C5A3297.JPG.jpeg",
    "_C5A3298.JPG.jpeg",
    "_C5A3313.jpg.jpeg"
  ];

  // High-end metadata captions to make the gallery feel premium
  const projectMetadata = {
    residential: [
      { title: "Pavilion House", loc: "Geneva, Switzerland" },
      { title: "Concrete Monolith", loc: "Kyoto, Japan" },
      { title: "Desert Sanctuary", loc: "Palm Springs, USA" },
      { title: "Forest Frame Villa", loc: "Oslo, Norway" },
      { title: "Minimalist Loft", loc: "Tribeca, NYC" },
      { title: "Ocean Edge Residence", loc: "Big Sur, California" },
      { title: "The Courtyard Residence", loc: "Melbourne, Australia" },
      { title: "Brutalist Hideaway", loc: "Sintra, Portugal" },
      { title: "Stone Walls Villa", loc: "Tuscany, Italy" },
      { title: "Glass House Retreat", loc: "Reykjavik, Iceland" },
      { title: "Canyon Crest Estate", loc: "Auckland, New Zealand" },
      { title: "Subterranean Sanctuary", loc: "Athens, Greece" }
    ],
    commercial: [
      { title: "Vanguard Studio Headquarters", loc: "London, UK" },
      { title: "Apex Retail Pavilion", loc: "Milan, Italy" },
      { title: "Ethereal Gallery Space", loc: "Paris, France" },
      { title: "The Grid Coworking Hub", loc: "Tokyo, Japan" },
      { title: "Monochrome Boutique Hotel", loc: "Copenhagen, Denmark" },
      { title: "Zenith Showroom", loc: "Seoul, South Korea" },
      { title: "Symmetry Design Lab", loc: "Berlin, Germany" },
      { title: "Echo Concert Hall", loc: "Helsinki, Finland" },
      { title: "Linear Corporate Center", loc: "Singapore" },
      { title: "Horizon Exhibition Pavilions", loc: "Dubai, UAE" },
      { title: "Raw Concrete Creative Hub", loc: "São Paulo, Brazil" },
      { title: "Minimal Museum of Modern Art", loc: "Stockholm, Sweden" }
    ]
  };

  const metadataList = projectMetadata[category] || [];

  // Clear container
  container.innerHTML = '';
  activeGalleryImages = [];

  // Unified lists of files to load
  const baseFiles = category === 'residential' ? residentialImages : (category === 'commercial' ? commercialImages : productsImages);
  const filesToTry = [...baseFiles];

  // 1. Automatically append numerical files up to 100 to catch future additions dynamically!
  for (let i = 1; i <= 100; i++) {
    const iStr = String(i);
    const padStr = iStr.padStart(2, '0');
    
    const candidates = [
      `${iStr}.jpg`, `${iStr}.jpeg`, `${iStr}.png`,
      `${padStr}.jpg`, `${padStr}.jpeg`, `${padStr}.png`
    ];

    candidates.forEach(c => {
      if (!filesToTry.includes(c)) {
        filesToTry.push(c);
      }
    });
  }

  // Set up Cache Buster query ONLY if we are serving on HTTP/HTTPS (local file:// protocols will not include queries as they break directory loading)
  const isLocal = window.location.protocol === 'file:';
  const versionQuery = isLocal ? '' : '?v=' + Date.now();

  // 2. Loop and load each file in exact array order
  filesToTry.forEach((filename) => {
    // Create card element
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';
    item.style.transitionDelay = '0s'; // Load immediately without stagger delay
    
    const img = document.createElement('img');
    img.alt = "Bespoke Spatial Design - Creative Studio";
    
    // Hybrid Loading Strategy: Eagerly load the first 6 above-the-fold images; lazy-load everything else to avoid network queue choke on massive raw images.
    const fileIndex = filesToTry.indexOf(filename);
    if (fileIndex !== -1 && fileIndex < 6) {
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }
    img.decoding = 'async';  // Asynchronous background decoding to prevent page freezes
    
    // Register successfully loaded image to active lightbox array
    img.onload = function() {
      img.onload = null; // Clean up
      
      const fileIndexInArray = baseFiles.indexOf(filename);
      const titleText = (fileIndexInArray !== -1 && metadataList[fileIndexInArray]) ? metadataList[fileIndexInArray].title : "Bespoke Architectural Form";
      const locText = (fileIndexInArray !== -1 && metadataList[fileIndexInArray]) ? metadataList[fileIndexInArray].loc : "Creative Studio";
      
      const imgObj = {
        src: img.src,
        title: titleText,
        loc: locText,
        filename: filename,
        element: img
      };
      
      // Prevent duplicates and keep array strictly sorted in filesToTry order (guarantees perfect gallery sequence)
      if (!activeGalleryImages.some(g => g.filename === filename)) {
        activeGalleryImages.push(imgObj);
        activeGalleryImages.sort((a, b) => filesToTry.indexOf(a.filename) - filesToTry.indexOf(b.filename));
      }
      
      // Remap click listeners for lightbox matching
      activeGalleryImages.forEach((gImg, idx) => {
        gImg.element.parentNode.onclick = () => {
          openLightbox(idx);
        };
      });
    };

    // Establish multi-level loading path handlers (Direct root category folder vs Legacy assets fallbacks)
    const primaryPath = `${assetPrefix}${category}/${filename}${versionQuery}`;
    const fallbackPath = `${assetPrefix}assets/${category}/${filename}${versionQuery}`;
    const rootProjectsFallback = `${assetPrefix}assets/projects/${category}/${filename}${versionQuery}`;

    img.src = primaryPath;
    img.onerror = function() {
      img.src = fallbackPath;
      img.onerror = function() {
        img.src = rootProjectsFallback;
        img.onerror = function() {
          // If all paths fail, the image does not physically exist in directory.
          // Remove the empty card from the DOM
          item.remove();
          
          // Remove from active lightbox array and re-index
          activeGalleryImages = activeGalleryImages.filter(gImg => gImg.filename !== filename);
          activeGalleryImages.forEach((gImg, idx) => {
            gImg.element.parentNode.onclick = () => {
              openLightbox(idx);
            };
          });
        };
      };
    };

    item.appendChild(img);
    container.appendChild(item);
  });

  // Trigger instant fade-ins once grid is rendered
  setTimeout(() => {
    const fadeElements = container.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      element.classList.add('appear');
    });
  }, 50);
}

/**
 * HIGH-END CUSTOM LIGHTBOX ENGINE
 */
function getOrCreateLightbox() {
  let lightbox = document.querySelector('.lightbox');
  
  if (!lightbox) {
    // Dynamically inject Lightbox modal to keep HTML pages extremely clean
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-control lightbox-close" aria-label="Close Lightbox">
        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <button class="lightbox-control lightbox-prev" aria-label="Previous Project">
        <svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="Architectural Portfolio Space">
        <div class="lightbox-caption">
          <div class="lightbox-counter">01 / 12</div>
          <div class="lightbox-title">Minimalist Pavilion</div>
        </div>
      </div>
      <button class="lightbox-control lightbox-next" aria-label="Next Project">
        <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    `;
    
    document.body.appendChild(lightbox);
    setupLightboxListeners(lightbox);
  }
  
  return lightbox;
}

function openLightbox(index) {
  const lightbox = getOrCreateLightbox();
  currentLightboxIndex = index;
  
  updateLightboxContent(lightbox);
  
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock scrolling
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scrolling
  }
}

function updateLightboxContent(lightbox) {
  const imgElement = lightbox.querySelector('.lightbox-img');
  const counterElement = lightbox.querySelector('.lightbox-counter');
  const titleElement = lightbox.querySelector('.lightbox-title');
  
  if (!imgElement || activeGalleryImages.length === 0) return;
  
  const project = activeGalleryImages[currentLightboxIndex];
  
  // Pre-load logic for smooth crossfade
  imgElement.style.opacity = '0';
  imgElement.style.transform = 'scale(0.97)';
  
  setTimeout(() => {
    imgElement.src = project.src;
    imgElement.alt = `Portfolio Slide ${String(currentLightboxIndex + 1).padStart(2, '0')}`;
    counterElement.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} / ${String(activeGalleryImages.length).padStart(2, '0')}`;
    titleElement.textContent = ''; // Stripped description title to keep the entire site completely clean and focused on images
    
    imgElement.onload = () => {
      imgElement.style.opacity = '1';
      imgElement.style.transform = 'scale(1)';
    };
  }, 150);
}

function navigateLightbox(direction) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  if (direction === 'next') {
    currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryImages.length;
  } else if (direction === 'prev') {
    currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
  }
  
  updateLightboxContent(lightbox);
}

/**
 * LIGHTBOX DESKTOP HOTKEYS & SWIPE ERGONOMICS
 */
function setupLightboxListeners(lightbox) {
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  closeBtn.addEventListener('click', closeLightbox);
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox('prev');
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox('next');
    });
  }
  
  // Close when clicking empty black glass overlay area
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });
  
  // Desktop Keyboard Arrow Keys Support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    }
  });

  // Mobile Swipe Gesture Support (Apple & Android)
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const threshold = 50; // Min drag distance in pixels
    const deltaX = touchEndX - touchStartX;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        // Swiped Left -> Load Next
        navigateLightbox('next');
      } else {
        // Swiped Right -> Load Prev
        navigateLightbox('prev');
      }
    }
  }
}
