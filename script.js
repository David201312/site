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
     2.5 RESORT SCROLL-DRIVEN RESERVATIONS EXPERIENCE
     ------------------------------------------------------------------------ */
  const resortSection = document.getElementById('resort-reservas');
  const resortBgImg = document.getElementById('resort-bg-img');
  const resortProgressBar = document.getElementById('resort-progress-bar');
  const resortStepPills = document.querySelectorAll('.resort-step-pill');
  const resortStatusIndicator = document.getElementById('resort-status-indicator');
  const resortStages = [
    document.getElementById('resort-stage-1'),
    document.getElementById('resort-stage-2'),
    document.getElementById('resort-stage-3'),
    document.getElementById('resort-stage-4')
  ];

  const statusTexts = [
    'Etapa 1 de 4 • Visão Geral & Localização • Role o mouse para descobrir acomodações e valores',
    'Etapa 2 de 4 • Suítes de Luxo & Acomodações • Continue descendo o scroll para ver garantias',
    'Etapa 3 de 4 • Serviços Inclusos & Políticas • Role o mouse para simular a reserva',
    'Etapa 4 de 4 • Simulador de Reserva Imediata • Clique em Solicitar Reserva para confirmar'
  ];

  function updateResortScroll() {
    if (!resortSection || resortStages.length === 0) return;

    const rect = resortSection.getBoundingClientRect();
    const sectionHeight = resortSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScrollDistance = sectionHeight - windowHeight;
    const currentScroll = -rect.top;

    let progress = 0;
    if (currentScroll <= 0) {
      progress = 0;
    } else if (currentScroll >= maxScrollDistance) {
      progress = 1;
    } else {
      progress = currentScroll / maxScrollDistance;
    }

    // Dynamic camera dolly zoom and pan
    if (resortBgImg) {
      const zoom = 1 + progress * 0.12;
      const panY = -progress * 25;
      resortBgImg.style.transform = `scale(${zoom.toFixed(3)}) translateY(${panY.toFixed(1)}px)`;
    }

    // Progress bar fill
    if (resortProgressBar) {
      resortProgressBar.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Active stage determination (4 equal stages with smooth window)
    let activeIndex = 0;
    if (progress < 0.25) {
      activeIndex = 0;
    } else if (progress < 0.50) {
      activeIndex = 1;
    } else if (progress < 0.75) {
      activeIndex = 2;
    } else {
      activeIndex = 3;
    }

    resortStages.forEach((stage, idx) => {
      if (!stage) return;
      if (idx === activeIndex) {
        stage.classList.add('active');
      } else {
        stage.classList.remove('active');
      }
    });

    resortStepPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === activeIndex);
    });

    if (resortStatusIndicator && statusTexts[activeIndex]) {
      resortStatusIndicator.textContent = statusTexts[activeIndex];
    }
  }

  window.addEventListener('scroll', updateResortScroll, { passive: true });
  window.addEventListener('resize', updateResortScroll);
  updateResortScroll();

  // Click on step pills to jump to that stage
  resortStepPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      if (!resortSection) return;
      const sectionTop = resortSection.getBoundingClientRect().top + window.pageYOffset;
      const sectionHeight = resortSection.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScrollDistance = sectionHeight - windowHeight;
      const targetRatios = [0.05, 0.35, 0.62, 0.90];
      const targetScroll = sectionTop + (maxScrollDistance * targetRatios[idx]);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  // Interactive Booking Simulator in Stage 4
  const villaPills = document.querySelectorAll('#resort-villa-options .booking-pill');
  const nightsPills = document.querySelectorAll('#resort-nights-options .booking-pill');
  const guestsPills = document.querySelectorAll('#resort-guests-options .booking-pill');
  const resortCalcPrice = document.getElementById('resort-summary-price');
  const resortCalcNightsText = document.getElementById('resort-summary-nights-text');
  const resortModalBtn = document.getElementById('resort-modal-btn');

  let selectedVillaRate = 2450;
  let selectedVillaName = 'Overwater Grand Sunset';
  let selectedNights = 7;
  let selectedGuests = 2;

  function updateResortCalculator() {
    let discount = 1.0;
    if (selectedNights === 7) discount = 0.90; // 10% discount
    if (selectedNights === 10) discount = 0.85; // 15% discount

    const guestsMultiplier = selectedGuests === 4 ? 1.35 : 1.0;
    const total = Math.round(selectedVillaRate * selectedNights * discount * guestsMultiplier);

    if (resortCalcPrice) {
      resortCalcPrice.textContent = `$${total.toLocaleString('en-US')}`;
    }

    if (resortCalcNightsText) {
      resortCalcNightsText.textContent = `${selectedNights} noites • ${selectedVillaName} • ${selectedGuests} hóspedes`;
    }

    if (resortModalBtn) {
      const titleAttr = `Reserva Resort Maldivas — ${selectedVillaName} (${selectedNights} Noites, ${selectedGuests} Hóspedes) — Est. $${total.toLocaleString('en-US')}`;
      resortModalBtn.setAttribute('data-dest-title', titleAttr);
    }
  }

  villaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      villaPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedVillaRate = parseInt(pill.getAttribute('data-rate'), 10) || 2450;
      const nameElem = pill.querySelector('.b-pill-name');
      selectedVillaName = nameElem ? nameElem.textContent.trim() : 'Overwater Grand Sunset';
      updateResortCalculator();
    });
  });

  nightsPills.forEach(pill => {
    pill.addEventListener('click', () => {
      nightsPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedNights = parseInt(pill.getAttribute('data-nights'), 10) || 7;
      updateResortCalculator();
    });
  });

  guestsPills.forEach(pill => {
    pill.addEventListener('click', () => {
      guestsPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedGuests = parseInt(pill.getAttribute('data-guests'), 10) || 2;
      updateResortCalculator();
    });
  });

  updateResortCalculator();

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
