/**
 * AERA VOYAGES — 3D Travel Pamphlet / Brochure Engine
 * Built with Three.js — Fully interactive 3D rotation with mouse/touch drag,
 * realistic trifold folding/unfolding, and smooth scroll-driven zoom transition
 * directly into the travel destinations gallery.
 */

(function () {
  'use strict';

  // Wait for Three.js and DOM
  function initWhenReady() {
    if (typeof THREE === 'undefined') {
      setTimeout(initWhenReady, 50);
      return;
    }
    initPamphlet3D();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

  function initPamphlet3D() {
    const container = document.getElementById('top') || document.querySelector('.pamphlet-scroll-section');
    const canvas = document.getElementById('pamphlet-canvas');
    if (!container || !canvas) return;

    // --- Texture Generator via Canvas 2D ---
    const TEX_W = 1024;
    const TEX_H = 1700;

    function createBaseCanvas() {
      const c = document.createElement('canvas');
      c.width = TEX_W;
      c.height = TEX_H;
      return c;
    }

    // Helper: draw luxury double gold border
    function drawGoldBorder(ctx, inset = 36) {
      ctx.save();
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 3;
      ctx.strokeRect(inset, inset, TEX_W - inset * 2, TEX_H - inset * 2);

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(inset + 12, inset + 12, TEX_W - (inset + 12) * 2, TEX_H - (inset + 12) * 2);

      // Corner diamonds
      const corners = [
        [inset, inset],
        [TEX_W - inset, inset],
        [inset, TEX_H - inset],
        [TEX_W - inset, TEX_H - inset]
      ];
      ctx.fillStyle = '#dfba73';
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // 1. FRONT COVER (Outside of Right Flap)
    function buildFrontCoverCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      // Dark obsidian background gradient
      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#0a0c14');
      bg.addColorStop(0.5, '#121626');
      bg.addColorStop(1, '#08090f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      // Subtle background diagonal watermark lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      for (let i = -TEX_H; i < TEX_W + TEX_H; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + TEX_H, TEX_H);
        ctx.stroke();
      }

      drawGoldBorder(ctx, 40);

      // Top Tag
      ctx.fillStyle = '#bfa168';
      ctx.font = '600 24px "Cinzel", "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('✦  ÉDITION PRIVÉE 2026/2027  ✦', TEX_W / 2, 140);

      // Main Brand Name
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 86px "Cinzel", "Times New Roman", serif';
      ctx.letterSpacing = '12px';
      ctx.fillText('A E R A', TEX_W / 2, 260);

      ctx.fillStyle = '#dfba73';
      ctx.font = '500 28px "Cinzel", "Times New Roman", serif';
      ctx.letterSpacing = '10px';
      ctx.fillText('VOYAGES RARES', TEX_W / 2, 315);

      // Divider line
      const divGrad = ctx.createLinearGradient(160, 0, TEX_W - 160, 0);
      divGrad.addColorStop(0, 'rgba(197, 160, 89, 0)');
      divGrad.addColorStop(0.5, 'rgba(197, 160, 89, 0.8)');
      divGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.strokeStyle = divGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(180, 360);
      ctx.lineTo(TEX_W - 180, 360);
      ctx.stroke();

      // Framed photo area placeholder (Santorini)
      const photoX = 120;
      const photoY = 410;
      const photoW = TEX_W - 240;
      const photoH = 720;

      ctx.fillStyle = '#161927';
      ctx.fillRect(photoX, photoY, photoW, photoH);

      // Placeholder gradient
      const pGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
      pGrad.addColorStop(0, '#1c284e');
      pGrad.addColorStop(0.5, '#324a87');
      pGrad.addColorStop(1, '#0e162b');
      ctx.fillStyle = pGrad;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      // Gold frame around photo
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 3;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // Inner title
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 42px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('PASSAPORTE DE EXPEDIÇÕES', TEX_W / 2, 1220);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '300 26px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('COLEÇÃO AUTORAL • 5 HORIZONTES RAROS', TEX_W / 2, 1270);

      // Feature bullet points
      ctx.fillStyle = '#dfba73';
      ctx.font = '500 22px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('SANTORINI  •  MALTA  •  TÓQUIO  •  MALDIVAS  •  PARIS', TEX_W / 2, 1340);

      // Wax Seal / Crest Emblem at Bottom
      const sealY = 1480;
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(TEX_W / 2, sealY, 55, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(TEX_W / 2, sealY, 46, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#dfba73';
      ctx.font = '700 28px serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('✦', TEX_W / 2, sealY + 10);

      // Document stamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '400 18px monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText('DOC. Nº 2026-AERA • CONCIERGE CONFIDENTIEL', TEX_W / 2, 1610);

      return { canvas: c, photoX, photoY, photoW, photoH };
    }

    // 2. BACK COVER (Outside of Center Panel)
    function buildBackCoverCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#08090f');
      bg.addColorStop(0.5, '#0e111d');
      bg.addColorStop(1, '#06070a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      drawGoldBorder(ctx, 40);

      // Compass Star
      const starY = 400;
      ctx.fillStyle = '#dfba73';
      ctx.font = '800 64px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✧', TEX_W / 2, starY);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 52px "Cinzel", serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('AERA VOYAGES', TEX_W / 2, starY + 90);

      ctx.fillStyle = '#bfa168';
      ctx.font = '500 24px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('ATELIER DE ALTA EXPLORAÇÃO', TEX_W / 2, starY + 135);

      // Information block
      const infoY = 720;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '400 26px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('EXPEDIÇÕES PRIVADAS SOB MEDIDA', TEX_W / 2, infoY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '300 22px sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('Logística de Alta Fidelidade • Concierge 24/7', TEX_W / 2, infoY + 45);

      // Global presence
      const cityY = 920;
      ctx.fillStyle = '#dfba73';
      ctx.font = '600 22px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('PARIS  •  ZÜRICH  •  TOKYO  •  SÃO PAULO', TEX_W / 2, cityY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '300 20px monospace';
      ctx.fillText('Rue Saint-Honoré  •  Bahnhofstrasse  •  Ginza  •  Jardins', TEX_W / 2, cityY + 38);

      // Security / luxury QR stamp graphic
      const stampY = 1200;
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
      ctx.strokeRect(TEX_W / 2 - 70, stampY, 140, 140);
      ctx.fillStyle = 'rgba(197, 160, 89, 0.2)';
      ctx.fillRect(TEX_W / 2 - 60, stampY + 10, 120, 120);

      ctx.fillStyle = '#dfba73';
      ctx.font = '700 20px monospace';
      ctx.letterSpacing = '2px';
      ctx.fillText('AERA-PASS', TEX_W / 2, stampY + 80);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '400 18px monospace';
      ctx.fillText('© 2026 AERA VOYAGES INC. TOUS DROITS RÉSERVÉS.', TEX_W / 2, 1540);

      return { canvas: c };
    }

    // 3. OUTSIDE FLAP (Outside of Left Flap)
    function buildOutsideFlapCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#090b12');
      bg.addColorStop(0.5, '#101320');
      bg.addColorStop(1, '#07080d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      drawGoldBorder(ctx, 40);

      ctx.fillStyle = '#bfa168';
      ctx.font = '600 24px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('MANIFESTO AERA', TEX_W / 2, 260);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 34px "Times New Roman", serif';
      ctx.letterSpacing = '1px';
      const lines = [
        '“Não elaboramos apenas itinerários.',
        'Desenhamos experiências sensoriais',
        'e memórias indeléveis',
        'nos recantos mais sublimes da Terra.”'
      ];
      lines.forEach((l, i) => {
        ctx.fillText(l, TEX_W / 2, 440 + i * 60);
      });

      // Signature line
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(340, 780);
      ctx.lineTo(TEX_W - 340, 780);
      ctx.stroke();

      ctx.fillStyle = '#dfba73';
      ctx.font = '600 22px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('DIRECTION GÉNÉRALE', TEX_W / 2, 825);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '300 20px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('Atelier Privé • Paris 2026', TEX_W / 2, 865);

      return { canvas: c };
    }

    // 4. INSIDE LEFT SPREAD (Santorini Focus)
    function buildInsideLeftCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#0b0e18');
      bg.addColorStop(1, '#080911');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      drawGoldBorder(ctx, 36);

      // Header Tag
      ctx.fillStyle = '#6e7ff2';
      ctx.font = '700 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText('01 • MEDITERRÂNEO EXCLUSIVO', TEX_W / 2, 120);

      // Destination Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 54px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('SANTORINI', TEX_W / 2, 190);

      ctx.fillStyle = '#dfba73';
      ctx.font = '500 24px "Cinzel", serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('DOMOS AZUIS & CALDEIRA DE OIA', TEX_W / 2, 235);

      // Photo Box
      const pX = 80;
      const pY = 290;
      const pW = TEX_W - 160;
      const pH = 740;

      ctx.fillStyle = '#17223b';
      ctx.fillRect(pX, pY, pW, pH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(pX, pY, pW, pH);

      // Description text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '300 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1px';
      ctx.fillText('Vila privativa sobre os penhascos da caldeira', TEX_W / 2, 1100);
      ctx.fillText('vulcânica com piscina infinita aquecida, cruzeiro', TEX_W / 2, 1140);
      ctx.fillText('privativo em catamarã e degustações assyrtiko.', TEX_W / 2, 1180);

      // Price block
      ctx.fillStyle = '#dfba73';
      ctx.font = '700 36px "Cinzel", serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('$5.800 / pessoa', TEX_W / 2, 1270);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '400 20px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('7 DIAS / 6 NOITES', TEX_W / 2, 1315);

      // Bottom stamp
      ctx.strokeStyle = 'rgba(110, 127, 242, 0.4)';
      ctx.strokeRect(TEX_W / 2 - 160, 1400, 320, 56);
      ctx.fillStyle = '#6e7ff2';
      ctx.font = '600 20px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('EXPEDIÇÃO MARÍTIMA 4K', TEX_W / 2, 1436);

      return { canvas: c, pX, pY, pW, pH };
    }

    // 5. INSIDE CENTER SPREAD (Malta & Tokyo Panoramic Spread)
    function buildInsideCenterCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#0c101d');
      bg.addColorStop(1, '#080a12');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      drawGoldBorder(ctx, 36);

      ctx.fillStyle = '#dfba73';
      ctx.font = '700 24px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('COLEÇÃO AUTORAL DE EXPEDIÇÕES', TEX_W / 2, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 58px "Cinzel", serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('DESTINOS SINGULARES', TEX_W / 2, 195);

      // Section 1: Malta photo box
      const mX = 80;
      const mY = 260;
      const mW = TEX_W - 160;
      const mH = 430;

      ctx.fillStyle = '#112233';
      ctx.fillRect(mX, mY, mW, mH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(mX, mY, mW, mH);

      // Section 2: Tokyo photo box
      const tX = 80;
      const tY = 740;
      const tW = TEX_W - 160;
      const tH = 430;

      ctx.fillStyle = '#1c152a';
      ctx.fillRect(tX, tY, tW, tH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(tX, tY, tW, tH);

      // Call-to-action prompt at bottom
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 32px "Cinzel", serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('ROLE PARA ENTRAR NESTES DESTINOS', TEX_W / 2, 1290);

      ctx.fillStyle = '#6e7ff2';
      ctx.font = '600 22px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('O ZOOM CONDUZ DIRETO AO CATÁLOGO COMPLETO', TEX_W / 2, 1340);

      // Animated arrow indicator
      ctx.fillStyle = '#dfba73';
      ctx.font = '800 48px sans-serif';
      ctx.fillText('↓', TEX_W / 2, 1420);

      return { canvas: c, mX, mY, mW, mH, tX, tY, tW, tH };
    }

    // 6. INSIDE RIGHT SPREAD (Maldives Sanctuary & European Capitals)
    function buildInsideRightCanvas() {
      const c = createBaseCanvas();
      const ctx = c.getContext('2d');

      const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
      bg.addColorStop(0, '#0b0e18');
      bg.addColorStop(1, '#080911');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      drawGoldBorder(ctx, 36);

      ctx.fillStyle = '#34d399';
      ctx.font = '700 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText('04 • SANTUÁRIO PRIVADO', TEX_W / 2, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 54px "Cinzel", serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('MALDIVAS', TEX_W / 2, 190);

      ctx.fillStyle = '#dfba73';
      ctx.font = '500 24px "Cinzel", serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('ATOL DE BAA & OCEAN VILLAS', TEX_W / 2, 235);

      // Photo Box (Maldives)
      const pX = 80;
      const pY = 290;
      const pW = TEX_W - 160;
      const pH = 740;

      ctx.fillStyle = '#0f2930';
      ctx.fillRect(pX, pY, pW, pH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(pX, pY, pW, pH);

      // Description text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '300 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1px';
      ctx.fillText('Voo cênico de hidroavião sobre os atóis de coral,', TEX_W / 2, 1100);
      ctx.fillText('mordomo privativo 24/7 e vilas construídas sobre', TEX_W / 2, 1140);
      ctx.fillText('as águas azul-turquesa do Oceano Índico.', TEX_W / 2, 1180);

      ctx.fillStyle = '#dfba73';
      ctx.font = '700 36px "Cinzel", serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('Desde $2.450 / noite', TEX_W / 2, 1270);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '400 20px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('RESORT & OCEAN SANCTUARY', TEX_W / 2, 1315);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.strokeRect(TEX_W / 2 - 160, 1400, 320, 56);
      ctx.fillStyle = '#34d399';
      ctx.font = '600 20px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('VILLAS EXCLUSIVAS 2026', TEX_W / 2, 1436);

      return { canvas: c, pX, pY, pW, pH };
    }

    // Build the 6 canvases
    const frontData = buildFrontCoverCanvas();
    const backData = buildBackCoverCanvas();
    const flapData = buildOutsideFlapCanvas();
    const insideLeftData = buildInsideLeftCanvas();
    const insideCenterData = buildInsideCenterCanvas();
    const insideRightData = buildInsideRightCanvas();

    // Create Three.js textures
    const texFront = new THREE.CanvasTexture(frontData.canvas);
    const texBack = new THREE.CanvasTexture(backData.canvas);
    const texFlap = new THREE.CanvasTexture(flapData.canvas);
    const texInLeft = new THREE.CanvasTexture(insideLeftData.canvas);
    const texInCenter = new THREE.CanvasTexture(insideCenterData.canvas);
    const texInRight = new THREE.CanvasTexture(insideRightData.canvas);

    [texFront, texBack, texFlap, texInLeft, texInCenter, texInRight].forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace || THREE.LinearSRGBColorSpace;
      t.anisotropy = 4;
    });

    texBack.center.set(0.5, 0.5);
    texBack.rotation = Math.PI;

    // Asynchronously load real images into the canvases for photorealism!
    function loadAndDrawImage(imgUrl, canvasData, drawFn, texture) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasData.canvas.getContext('2d');
        drawFn(ctx, img, canvasData);
        texture.needsUpdate = true;
      };
      img.src = imgUrl;
    }

    // Draw Santorini photo on Front Cover & Inside Left
    loadAndDrawImage('assets/images/lugares-mais-lindos-do-mundo-4-scaled.jpg', frontData, (ctx, img, d) => {
      ctx.save();
      ctx.drawImage(img, d.photoX, d.photoY, d.photoW, d.photoH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 3;
      ctx.strokeRect(d.photoX, d.photoY, d.photoW, d.photoH);
      ctx.restore();
    }, texFront);

    loadAndDrawImage('assets/images/lugares-mais-lindos-do-mundo-4-scaled.jpg', insideLeftData, (ctx, img, d) => {
      ctx.save();
      ctx.drawImage(img, d.pX, d.pY, d.pW, d.pH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(d.pX, d.pY, d.pW, d.pH);
      ctx.restore();
    }, texInLeft);

    // Draw Malta & Tokyo on Inside Center
    loadAndDrawImage('assets/images/o-que-fazer-malta-Blue_Lagoon.jpg', insideCenterData, (ctx, img, d) => {
      ctx.save();
      ctx.drawImage(img, d.mX, d.mY, d.mW, d.mH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(d.mX, d.mY, d.mW, d.mH);
      ctx.restore();
    }, texInCenter);

    loadAndDrawImage('assets/images/INSPIR-M-0524-Japan-Tokyo-JMelgoza3.jpg', insideCenterData, (ctx, img, d) => {
      ctx.save();
      ctx.drawImage(img, d.tX, d.tY, d.tW, d.tH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(d.tX, d.tY, d.tW, d.tH);
      ctx.restore();
    }, texInCenter);

    // Draw Maldives on Inside Right
    loadAndDrawImage('assets/images/resort-hero.jpg', insideRightData, (ctx, img, d) => {
      ctx.save();
      ctx.drawImage(img, d.pX, d.pY, d.pW, d.pH);
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2;
      ctx.strokeRect(d.pX, d.pY, d.pW, d.pH);
      ctx.restore();
    }, texInRight);

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.15);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Gilded paper edge material (luxury metallic gold edges)
    const goldEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25
    });

    // Panel Geometry & Materials
    const pW = 1.35;
    const pH = 2.35;
    const pD = 0.014;
    const panelGeo = new THREE.BoxGeometry(pW, pH, pD);

    // Center Panel Materials: Front (+Z) is Inside Center, Back (-Z) is Back Cover
    const matInsideCenter = new THREE.MeshStandardMaterial({ map: texInCenter, roughness: 0.45, metalness: 0.1 });
    const matBackCover = new THREE.MeshStandardMaterial({ map: texBack, roughness: 0.45, metalness: 0.1 });
    const centerMats = [goldEdgeMat, goldEdgeMat, goldEdgeMat, goldEdgeMat, matInsideCenter, matBackCover];
    const centerMesh = new THREE.Mesh(panelGeo, centerMats);

    // Left Panel Materials: Front (+Z) is Inside Left, Back (-Z) is Outside Left Flap
    const matInsideLeft = new THREE.MeshStandardMaterial({ map: texInLeft, roughness: 0.45, metalness: 0.1 });
    const matOutsideFlap = new THREE.MeshStandardMaterial({ map: texFlap, roughness: 0.45, metalness: 0.1 });
    const leftMats = [goldEdgeMat, goldEdgeMat, goldEdgeMat, goldEdgeMat, matInsideLeft, matOutsideFlap];
    const leftMesh = new THREE.Mesh(panelGeo, leftMats);
    leftMesh.position.set(-pW / 2, 0, 0);

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-pW / 2, 0, pD * 0.6);
    leftHinge.add(leftMesh);

    // Right Panel Materials: Front (+Z) is Inside Right, Back (-Z) is FRONT COVER!
    const matInsideRight = new THREE.MeshStandardMaterial({ map: texInRight, roughness: 0.45, metalness: 0.1 });
    const matFrontCover = new THREE.MeshStandardMaterial({ map: texFront, roughness: 0.45, metalness: 0.1 });
    const rightMats = [goldEdgeMat, goldEdgeMat, goldEdgeMat, goldEdgeMat, matInsideRight, matFrontCover];
    const rightMesh = new THREE.Mesh(panelGeo, rightMats);
    rightMesh.position.set(pW / 2, 0, 0);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(pW / 2, 0, pD * 1.4);
    rightHinge.add(rightMesh);

    // Root pamphlet group
    const pamphletGroup = new THREE.Group();
    pamphletGroup.add(centerMesh);
    pamphletGroup.add(leftHinge);
    pamphletGroup.add(rightHinge);
    scene.add(pamphletGroup);

    // Ambient floating dust particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdfba73,
      size: 0.025,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Subtle drop shadow plane underneath pamphlet
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.6, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    scene.add(shadowPlane);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffae8, 1.8);
    dirLight1.position.set(3, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x738aff, 1.2);
    dirLight2.position.set(-4, -2, 3);
    scene.add(dirLight2);

    const backRimLight = new THREE.PointLight(0xdfba73, 2.0, 10);
    backRimLight.position.set(0, 2, -3);
    scene.add(backRimLight);

    // --- INTERACTIVE DRAG TO ROTATE IN 3D ---
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotY = 0; // Front cover facing camera
    let targetRotX = 0.05;
    let currentRotY = 0;
    let currentRotX = 0.05;
    let velX = 0;
    let velY = 0;

    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    // Track pointer
    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.005;

        // Clamp vertical pitch so it doesn't flip completely upside down
        targetRotX = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.35, targetRotX));

        velX = deltaX * 0.007;
        velY = deltaY * 0.005;
      } else {
        // Subtle cursor parallax
        mouseParallaxX = (e.clientX / window.innerWidth - 0.5) * 0.25;
        mouseParallaxY = (e.clientY / window.innerHeight - 0.5) * 0.18;
      }
    });

    function endDrag(e) {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
        try {
          if (e && e.pointerId) canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // --- SCROLL DRIVEN UNFOLD & ZOOM TO DESTINATIONS ---
    const introOverlay = document.getElementById('pamphlet-intro-overlay');
    const hintPill = document.getElementById('pamphlet-hint-pill');
    let scrollProgress = 0;

    function updateScrollProgress() {
      const rect = container.getBoundingClientRect();
      const containerH = container.offsetHeight;
      const winH = window.innerHeight;
      const maxScroll = containerH - winH;
      const currentScroll = -rect.top;

      if (maxScroll <= 0) {
        scrollProgress = 0;
      } else {
        scrollProgress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScrollProgress();
    });
    updateScrollProgress();

    // Quick jump button to skip directly to destinations
    const skipBtn = document.getElementById('pamphlet-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        const destSection = document.getElementById('destinos-scroll-section');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Reset 3D view button
    const resetBtn = document.getElementById('pamphlet-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        targetRotX = 0;
        targetRotY += Math.PI * 2;
        velX = 0;
        velY = 0;
      });
    }

    // --- ANIMATION RENDER LOOP ---
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Inertia decay when user released drag
      if (!isDragging) {
        velX *= 0.92;
        velY *= 0.92;
        targetRotY += velX;
        targetRotX += velY;

        // When at the very top (scrollProgress < 0.05), give subtle floating sway
        if (scrollProgress < 0.05) {
          targetRotY += 0.0015; // Slow ambient spin
        }
      }

      // --- SCROLL PROGRESS BEHAVIORS ---
      // Phase 1 (0 -> 0.45): Unfolding flaps & aligning to front view (0 degrees)
      // Phase 2 (0.45 -> 0.88): Deep zoom in into the inside destinations spread
      // Phase 3 (0.88 -> 1.0): Plunging through into the destinations catalog

      let activeRotY = targetRotY;
      let activeRotX = targetRotX;

      // Unfold angles:
      // When closed (scrollProgress = 0):
      // Left flap folded inward over center (+Math.PI * 0.88)
      // Right flap folded over left flap (-Math.PI * 0.92)
      // When unfolded (scrollProgress >= 0.4): both 0
      const unfoldRatio = Math.min(1, Math.max(0, scrollProgress / 0.40));
      // Ease out cubic
      const easedUnfold = 1 - Math.pow(1 - unfoldRatio, 3);

      const leftAngle = (Math.PI * 0.998) * (1 - easedUnfold);
      const rightAngle = (-Math.PI * 0.999) * (1 - easedUnfold);
      leftHinge.rotation.y = leftAngle;
      rightHinge.rotation.y = rightAngle;

      // When unfolding, smoothly blend user rotation so it faces forward (Inside spread facing camera = rotation.y = 0)
      if (scrollProgress > 0.02) {
        const alignRatio = Math.min(1, scrollProgress / 0.35);
        const easedAlign = 1 - Math.pow(1 - alignRatio, 3);
        // Desired target orientation when opening: rotation.y = 0, rotation.x = 0
        activeRotY = targetRotY * (1 - easedAlign) + 0;
        activeRotX = targetRotX * (1 - easedAlign) + 0;
      }

      // Smooth lerp to current rotation
      currentRotY += (activeRotY - currentRotY) * 0.1;
      currentRotX += (activeRotX - currentRotX) * 0.1;

      pamphletGroup.rotation.y = currentRotY + mouseParallaxX * (1 - Math.min(1, scrollProgress * 2));
      pamphletGroup.rotation.x = currentRotX + mouseParallaxY * (1 - Math.min(1, scrollProgress * 2));

      // Floating bobbing effect
      if (scrollProgress < 0.2) {
        const floatAmp = (1 - scrollProgress / 0.2) * 0.05;
        pamphletGroup.position.y = Math.sin(time * 1.6) * floatAmp;
      } else {
        pamphletGroup.position.y = 0;
      }

      // Camera Zoom on Scroll (0.40 -> 0.95)
      // Normal camera distance: 4.4
      // Zoomed in distance: 1.15 (super close, filling screen with destination details)
      let targetCameraZ = 4.4;
      if (scrollProgress > 0.25) {
        const zoomRatio = Math.min(1, Math.max(0, (scrollProgress - 0.25) / 0.65));
        const easedZoom = zoomRatio * zoomRatio * (3 - 2 * zoomRatio); // Smoothstep
        targetCameraZ = 4.4 - (easedZoom * 3.25); // Drops to 1.15!
      }
      camera.position.z += (targetCameraZ - camera.position.z) * 0.1;

      // Fading UI elements on scroll
      if (introOverlay) {
        const fadeRatio = Math.max(0, 1 - scrollProgress * 3.5);
        introOverlay.style.opacity = fadeRatio.toString();
        introOverlay.style.pointerEvents = fadeRatio < 0.1 ? 'none' : 'auto';
        introOverlay.style.transform = `translateY(-${(1 - fadeRatio) * 40}px)`;
      }

      if (hintPill) {
        const fadeHint = Math.max(0, 1 - scrollProgress * 4.0);
        hintPill.style.opacity = fadeHint.toString();
        hintPill.style.pointerEvents = fadeHint < 0.1 ? 'none' : 'auto';
      }

      // Viewport opacity fade as it merges into live destinations gallery
      const viewport = document.getElementById('pamphlet-sticky-box');
      if (viewport) {
        if (scrollProgress > 0.90) {
          const exitRatio = (scrollProgress - 0.90) / 0.10;
          viewport.style.opacity = Math.max(0, 1 - exitRatio).toString();
        } else {
          viewport.style.opacity = '1';
        }
      }

      // Animate background particles
      const pos = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] -= delta * 0.15;
        if (pos[i] < -3) pos[i] = 3;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    }

    animate();
  }
})();
