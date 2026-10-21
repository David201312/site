/**
 * AERA VOYAGES — Interactive Script
 * High-performance UI interactions, Horizontal Pinned Scroll & Travel Atelier
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. HERO AMBIENT BACKGROUND SLIDER
     ------------------------------------------------------------------------ */
  const heroBgs = document.querySelectorAll('.hero-bg-image');
  let currentBgIndex = 0;

  if (heroBgs.length > 1) {
    setInterval(() => {
      heroBgs[currentBgIndex].classList.remove('active');
      currentBgIndex = (currentBgIndex + 1) % heroBgs.length;
      heroBgs[currentBgIndex].classList.add('active');
    }, 7000);
  }

  /* ------------------------------------------------------------------------
     2. HORIZONTAL SCROLL DRIVEN BY VERTICAL MOUSE SCROLL
     ------------------------------------------------------------------------ */
  const scrollSection = document.getElementById('destinos-scroll-section');
  const stickyBox = document.getElementById('destinos-sticky-box');
  const cardsTrack = document.getElementById('destinos-cards-track');
  const progressFill = document.getElementById('destinos-progress-fill');
  const progressCount = document.getElementById('destinos-progress-count');
  const prevBtn = document.getElementById('dest-prev-btn');
  const nextBtn = document.getElementById('dest-next-btn');

  function updateHorizontalScroll() {
    if (!scrollSection || !cardsTrack) return;

    const rect = scrollSection.getBoundingClientRect();
    const sectionHeight = scrollSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Total distance the section stays pinned while scrolling down
    const maxScrollDistance = sectionHeight - windowHeight;
    // Current scrolled distance into this section
    const currentScroll = -rect.top;

    // Total horizontal travel needed so all cards pass through view
    const trackWidth = cardsTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + (viewportWidth * 0.1));

    if (currentScroll <= 0) {
      cardsTrack.style.transform = 'translateX(0px)';
      if (progressFill) progressFill.style.width = '0%';
      if (progressCount) progressCount.textContent = '01 / 05';
    } else if (currentScroll >= maxScrollDistance) {
      cardsTrack.style.transform = `translateX(-${maxTranslate}px)`;
      if (progressFill) progressFill.style.width = '100%';
      if (progressCount) progressCount.textContent = '05 / 05';
    } else {
      const progress = currentScroll / maxScrollDistance;
      const translateX = progress * maxTranslate;
      cardsTrack.style.transform = `translateX(-${translateX}px)`;

      if (progressFill) progressFill.style.width = `${progress * 100}%`;

      // Active card index estimation
      const cardCount = 5;
      const activeIdx = Math.min(cardCount, Math.floor(progress * cardCount) + 1);
      if (progressCount) progressCount.textContent = `0${activeIdx} / 0${cardCount}`;
    }
  }

  window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
  window.addEventListener('resize', updateHorizontalScroll);
  updateHorizontalScroll();

  // Manual Arrow Navigation for convenience
  if (prevBtn && nextBtn && scrollSection) {
    prevBtn.addEventListener('click', () => {
      const rect = scrollSection.getBoundingClientRect();
      const currentSectionScroll = -rect.top;
      const step = (scrollSection.offsetHeight - window.innerHeight) / 4;
      window.scrollBy({ top: -step, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const rect = scrollSection.getBoundingClientRect();
      const currentSectionScroll = -rect.top;
      const step = (scrollSection.offsetHeight - window.innerHeight) / 4;
      window.scrollBy({ top: step, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     3. CINEMA VIDEO PLAYER CONTROLS
     ------------------------------------------------------------------------ */
  const video = document.getElementById('cinema-video');
  const playCenterBtn = document.getElementById('cinema-play-center');
  const playControlBtn = document.getElementById('cinema-play-ctrl');
  const playControlIcon = document.getElementById('cinema-play-icon');
  const timelineFill = document.getElementById('cinema-timeline-fill');
  const timelineTrack = document.getElementById('cinema-timeline-track');
  const timecodeDisplay = document.getElementById('cinema-timecode');
  const muteBtn = document.getElementById('cinema-mute-btn');
  const fullscreenBtn = document.getElementById('cinema-fullscreen-btn');

  function togglePlay() {
    if (!video) return;
    if (video.paused || video.ended) {
      video.play();
      if (playCenterBtn) playCenterBtn.style.opacity = '0';
      if (playControlIcon) {
        playControlIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      }
    } else {
      video.pause();
      if (playCenterBtn) playCenterBtn.style.opacity = '1';
      if (playControlIcon) {
        playControlIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
    }
  }

  if (playCenterBtn) playCenterBtn.addEventListener('click', togglePlay);
  if (playControlBtn) playControlBtn.addEventListener('click', togglePlay);
  if (video) video.addEventListener('click', togglePlay);

  if (video) {
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        if (timelineFill) timelineFill.style.width = `${progress}%`;

        const curMin = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
        const curSec = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        const durMin = Math.floor(video.duration / 60).toString().padStart(2, '0');
        const durSec = Math.floor(video.duration % 60).toString().padStart(2, '0');
        if (timecodeDisplay) {
          timecodeDisplay.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;
        }
      }
    });

    video.addEventListener('ended', () => {
      if (playCenterBtn) playCenterBtn.style.opacity = '1';
      if (playControlIcon) {
        playControlIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
    });
  }

  if (timelineTrack && video) {
    timelineTrack.addEventListener('click', (e) => {
      const rect = timelineTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      video.currentTime = pct * video.duration;
    });
  }

  if (muteBtn && video) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.style.color = video.muted ? '#9c9da7' : '#fff';
    });
  }

  if (fullscreenBtn && video) {
    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });
  }

  const heroPlayTrigger = document.getElementById('hero-play-trigger');
  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', () => {
      const cinemaSection = document.getElementById('cinema');
      if (cinemaSection) {
        cinemaSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (video && video.paused) togglePlay();
        }, 800);
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. INTERACTIVE ATELIER (ITINERARY SIMULATOR FOR 5 DESTINATIONS)
     ------------------------------------------------------------------------ */
  const destinationOptions = document.querySelectorAll('[data-dest-option]');
  const durationOptions = document.querySelectorAll('[data-duration-option]');
  const styleOptions = document.querySelectorAll('[data-style-option]');

  const summaryDest = document.getElementById('summary-dest');
  const summaryDays = document.getElementById('summary-days');
  const summaryStyle = document.getElementById('summary-style');
  const summaryInclusions = document.getElementById('summary-inclusions');
  const summaryPrice = document.getElementById('summary-price');

  const destinationData = {
    'santorini': {
      title: 'Santorini & Domos de Oia',
      country: 'Grécia',
      basePrice: 5800,
      inclusions: 'Vila na caldeira, piscina infinita e catamarã ao pôr do sol'
    },
    'malta': {
      title: 'Blue Lagoon & Ilhas Maltesas',
      country: 'Malta',
      basePrice: 4900,
      inclusions: 'Iate privativo pelas lagoas, palacete histórico em Valletta'
    },
    'toquio': {
      title: 'Tóquio Futurista & Monte Fuji',
      country: 'Japão',
      basePrice: 8600,
      inclusions: 'Ryokan de luxo, onsen com vista Fuji e jantar kaiseki 3★'
    },
    'paris': {
      title: 'Paris Alta Costura & Castelos',
      country: 'França',
      basePrice: 7200,
      inclusions: 'Suíte vista Torre Eiffel, tour noturno privado no Louvre'
    },
    'berlim': {
      title: 'Berlim Contemporânea & Bauhaus',
      country: 'Alemanha',
      basePrice: 4600,
      inclusions: 'Penthouse no Mitte, curadoria de arte e cruzeiro no Spree'
    }
  };

  let selectedDestKey = 'santorini';
  let selectedDays = 7;
  let selectedStyleMultiplier = 1.0;
  let selectedStyleName = 'Aventura & Natureza';

  function updateAtelierSummary() {
    const dest = destinationData[selectedDestKey];
    if (!dest) return;

    if (summaryDest) summaryDest.textContent = dest.title;
    if (summaryDays) summaryDays.textContent = `${selectedDays} Dias / ${selectedDays - 1} Noites`;
    if (summaryStyle) summaryStyle.textContent = selectedStyleName;
    if (summaryInclusions) summaryInclusions.textContent = dest.inclusions;

    const calculatedPrice = Math.round((dest.basePrice * (selectedDays / 7)) * selectedStyleMultiplier);
    if (summaryPrice) summaryPrice.textContent = `$${calculatedPrice.toLocaleString('en-US')}`;
  }

  destinationOptions.forEach(pill => {
    pill.addEventListener('click', () => {
      destinationOptions.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedDestKey = pill.getAttribute('data-dest-option');
      updateAtelierSummary();
    });
  });

  durationOptions.forEach(pill => {
    pill.addEventListener('click', () => {
      durationOptions.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedDays = parseInt(pill.getAttribute('data-duration-option'), 10);
      updateAtelierSummary();
    });
  });

  styleOptions.forEach(pill => {
    pill.addEventListener('click', () => {
      styleOptions.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedStyleMultiplier = parseFloat(pill.getAttribute('data-multiplier') || '1.0');
      selectedStyleName = pill.textContent.trim();
      updateAtelierSummary();
    });
  });

  /* ------------------------------------------------------------------------
     5. MODAL BOOKING / INQUIRY
     ------------------------------------------------------------------------ */
  const modalBackdrop = document.getElementById('concierge-modal');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const closeModalButtons = document.querySelectorAll('[data-close-modal]');
  const modalDestInput = document.getElementById('modal-dest-input');

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const destParam = btn.getAttribute('data-dest-title');
      if (destParam && modalDestInput) {
        modalDestInput.value = destParam;
      } else if (modalDestInput && summaryDest) {
        modalDestInput.value = summaryDest.textContent;
      }
      if (modalBackdrop) modalBackdrop.classList.add('open');
    });
  });

  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }

  const inquiryForm = document.getElementById('concierge-form');
  const formSuccess = document.getElementById('form-success-message');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      inquiryForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      setTimeout(() => {
        if (modalBackdrop) modalBackdrop.classList.remove('open');
        setTimeout(() => {
          inquiryForm.reset();
          inquiryForm.style.display = 'block';
          if (formSuccess) formSuccess.style.display = 'none';
        }, 500);
      }, 3500);
    });
  }

  /* ------------------------------------------------------------------------
     6. SCROLL SPY FOR NAVIGATION
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id], div[id="destinos-scroll-section"]');
  const navLinks = document.querySelectorAll('.nav-island nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        if (section.id === 'destinos-scroll-section') {
          current = 'destinos';
        } else {
          current = section.getAttribute('id');
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
