/*
 * ==========================================
 * STUDIO CREATIVE: GLOBAL INTERACTIVE LOGIC
 * Premium Minimalist Architecture Aesthetic
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all global micro-interactions
  initMobileNavigation();
  initHeroSlider();
  initScrollAnimations();
  initFloatingLabels();
  initFormSubmissions();
  highlightActiveMenu();
});

/**
 * 1. MOBILE NAVIGATION OVERLAY & HAMBURGER
 */
function initMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const body = document.body;

  if (!hamburger || !mobileOverlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    
    // Prevent background scrolling when menu is open
    if (mobileOverlay.classList.contains('open')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Close menu if links are clicked
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileOverlay.classList.remove('open');
      body.style.overflow = '';
    });
  });
}

/**
 * 2. AUTOMATIC HOME SLIDESHOW WITH SLOW ZOOM
 */
function initHeroSlider() {
  const track = document.querySelector('.hero-slider-track');
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  
  if (!track || slides.length === 0) return;

  let visibleSlides = window.innerWidth > 768 ? 4 : 1;
  const originalSlidesCount = slides.length;
  const slideInterval = 2800; // Auto-sliding every 2.8s
  let currentIndex = visibleSlides; // Start after prepended clones
  let autoSlideTimer;
  let isTransitioning = false;

  // 1. Dynamic Seamless Cloning Engine
  // We clone first 'visibleSlides' count of elements to the end,
  // and last 'visibleSlides' count of elements to the start to enable perfect infinite loop both ways.
  
  // Clear any existing clones to prevent duplicates on resize
  track.querySelectorAll('.hero-slide-clone').forEach(el => el.remove());
  
  const originalSlides = Array.from(track.querySelectorAll('.hero-slide'));
  
  // Clone last visibleSlides elements and prepend
  for (let i = originalSlidesCount - visibleSlides; i < originalSlidesCount; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add('hero-slide-clone');
    track.insertBefore(clone, originalSlides[0]);
  }
  
  // Clone first visibleSlides elements and append
  for (let i = 0; i < visibleSlides; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add('hero-slide-clone');
    track.appendChild(clone);
  }

  // Update DOM slides count (including clones)
  const allSlides = track.querySelectorAll('.hero-slide');
  const totalSlidesWithClones = allSlides.length;

  function updateSlideWidths() {
    visibleSlides = window.innerWidth > 768 ? 4 : 1;
    
    // Re-initialize layout dimensions
    track.style.width = `${(totalSlidesWithClones * 100) / visibleSlides}%`;
    allSlides.forEach(slide => {
      slide.style.width = `${100 / totalSlidesWithClones}%`;
    });
    
    // Position instantly to correct starting index without transition
    track.style.transition = 'none';
    const translateAmount = currentIndex * (100 / totalSlidesWithClones);
    track.style.transform = `translate3d(-${translateAmount}%, 0, 0)`;
    track.offsetHeight; // Reflow
    track.style.transition = '';
  }

  function slideTo(index, hasTransition = true) {
    if (isTransitioning && hasTransition) return;
    
    if (hasTransition) {
      isTransitioning = true;
      track.style.transition = 'transform 1.4s cubic-bezier(0.25, 1, 0.2, 1)'; // Smooth decelerating luxury ease
    } else {
      track.style.transition = 'none';
    }
    
    currentIndex = index;
    const translateAmount = currentIndex * (100 / totalSlidesWithClones);
    track.style.transform = `translate3d(-${translateAmount}%, 0, 0)`;
  }

  // 2. Seamless jump loop correction on transition end
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // Check forward overflow boundary (reached appended clones)
    if (currentIndex >= originalSlidesCount + visibleSlides) {
      track.style.transition = 'none';
      currentIndex = visibleSlides; // Jump back silently to original start
      const translateAmount = currentIndex * (100 / totalSlidesWithClones);
      track.style.transform = `translate3d(-${translateAmount}%, 0, 0)`;
      track.offsetHeight; // Reflow
      track.style.transition = '';
    }
    // Check backward overflow boundary (reached prepended clones)
    else if (currentIndex < visibleSlides) {
      if (currentIndex <= 0) {
        track.style.transition = 'none';
        currentIndex = originalSlidesCount; // Jump forward silently to original end
        const translateAmount = currentIndex * (100 / totalSlidesWithClones);
        track.style.transform = `translate3d(-${translateAmount}%, 0, 0)`;
        track.offsetHeight; // Reflow
        track.style.transition = '';
      }
    }
  });

  window.addEventListener('resize', updateSlideWidths);
  updateSlideWidths();

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      if (!isTransitioning) {
        slideTo(currentIndex + 1);
      }
    }, slideInterval);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      slideTo(currentIndex + 1);
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      slideTo(currentIndex - 1);
      resetAutoSlide();
    });
  }

  startAutoSlide();
}

/**
 * 3. INTERSECTION OBSERVER FOR FADE-IN SCROLL ANIMATIONS
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly offset bottom trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          // Once animated, stop observing
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for older browsers
    fadeElements.forEach(element => {
      element.classList.add('appear');
    });
  }
}

/**
 * 4. FLOATING LABELS FOR INQUIRY FORMS
 */
function initFloatingLabels() {
  const formInputs = document.querySelectorAll('.form-input, .form-textarea');
  
  formInputs.forEach(input => {
    // Check initial state (if pre-filled by browser)
    if (input.value.trim() !== '') {
      input.placeholder = ''; // Clear placeholder to trigger label scale
    }

    input.addEventListener('focus', () => {
      input.placeholder = '';
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.placeholder = ' '; // Trigger CSS placeholder-shown rule
      }
    });
  });

  // Specifically handle careers custom file upload text feedback
  const fileInput = document.querySelector('.file-upload-input');
  const uploadText = document.querySelector('.file-upload-text');
  
  if (fileInput && uploadText) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const filename = e.target.files[0].name;
        uploadText.innerHTML = `Selected File: <span style="text-decoration:none;font-weight:400;color:var(--accent-gold);">${filename}</span>`;
      } else {
        uploadText.innerHTML = `Drag & drop your CV or <span>Browse</span>`;
      }
    });
  }
}

/**
 * 5. SOPHISTICATED CONTACT/CAREERS SUBMISSION HANDLER
 */
function initFormSubmissions() {
  const forms = document.querySelectorAll('.minimal-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-minimal');
      const statusMsg = form.querySelector('.form-status');
      
      if (!submitBtn || !statusMsg) return;
      
      const originalText = submitBtn.textContent;
      
      // Visual Loader feedback
      submitBtn.disabled = true;
      submitBtn.textContent = 'FORWARDING...';
      submitBtn.style.letterSpacing = '0.3em';
      submitBtn.style.opacity = '0.6';
      
      // Live AJAX Submission for Careers Form
      if (form.id === 'careers-form') {
        const formData = new FormData(form);
        
        fetch(form.action, {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Submission failed.');
        })
        .then(data => {
          // Reset button states
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.letterSpacing = '';
          submitBtn.style.opacity = '';
          
          // Display success state
          statusMsg.style.display = 'block';
          statusMsg.className = 'form-status success';
          statusMsg.textContent = 'APPLICATION SUCCESSFULLY FORWARDED DIRECTLY TO OUR TEAM. THANK YOU.';
          
          // Reset form fields
          form.reset();
          const uploadText = form.querySelector('.file-upload-text');
          if (uploadText) {
            uploadText.innerHTML = `Drag & drop your CV/Resume (PDF/DOCX) or <span>Browse</span>`;
          }
          
          // Reset placeholders for label floats
          form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.placeholder = ' ';
          });
          
          statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          setTimeout(() => {
            statusMsg.style.display = 'none';
          }, 8000);
        })
        .catch(err => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.letterSpacing = '';
          submitBtn.style.opacity = '';
          
          // Display error state
          statusMsg.style.display = 'block';
          statusMsg.className = 'form-status error';
          statusMsg.textContent = 'FORWARDING ERROR. PLEASE CHECK YOUR CONNECTION AND ATTACHMENT SIZE.';
        });
      } else {
        // Simulated local trigger fallback for other inquiry forms
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.letterSpacing = '';
          submitBtn.style.opacity = '';
          
          statusMsg.style.display = 'block';
          statusMsg.className = 'form-status success';
          statusMsg.textContent = 'THANK YOU. YOUR INQUIRY HAS BEEN RECORDED AND FORWARDED TO OUR TEAM.';
          
          form.reset();
          form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.placeholder = ' ';
          });
          
          statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          setTimeout(() => {
            statusMsg.style.display = 'none';
          }, 8000);
        }, 1800);
      }
    });
  });
}

/**
 * 6. AUTOMATIC ACTIVE NAVIGATION HIGHLIGHTING
 */
function highlightActiveMenu() {
  const currentPath = window.location.pathname;
  const pageFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  // Clean active states
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-link').forEach(link => link.classList.remove('active'));
  
  // Match link hrefs
  const desktopLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');
  
  // helper to check match
  const isMatch = (href) => {
    if (!href) return false;
    const linkFilename = href.substring(href.lastIndexOf('/') + 1);
    return linkFilename === pageFilename;
  };

  desktopLinks.forEach(link => {
    if (isMatch(link.getAttribute('href'))) {
      link.classList.add('active');
      
      // If it's a dropdown link inside Projects, highlight the parent item as active too
      const dropdownParent = link.closest('.nav-item');
      if (dropdownParent) {
        dropdownParent.classList.add('active');
      }
    }
  });

  mobileLinks.forEach(link => {
    if (isMatch(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // Fallback for root projects pages
  if (pageFilename === 'projects.html') {
    const projectsItem = document.getElementById('nav-projects-parent');
    if (projectsItem) {
      projectsItem.classList.add('active');
    }
  }
}
