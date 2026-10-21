# AERA VOYAGES — Réplica e Adaptação do Design System

Este projeto é uma réplica completa do site da **AERA**, reimaginado e transformado em um **Atelier de Viagens de Luxo e Expedições Sob Medida** (**AERA Voyages**), construído estritamente a partir dos componentes, fundações visuais e diretrizes do **AERA Design System** (`C:\Users\David\Downloads\aera-design-system\aera-design-system`).

---

## 🧭 Nova Funcionalidade: Scroll Horizontal Pinned dos Destinos

Ao navegar pela página com o **scroll do mouse**:
1. A tela fixa (*sticky viewport*) na seção **Destinos Singulares**.
2. Conforme você gira a roda do mouse para baixo, os cartões de destinos deslizam suavemente da **esquerda para a direita** (percorrendo Santorini, Malta, Tóquio, Paris e Berlim).
3. Uma barra de progresso inferior acompanha o percurso (`01 / 05` até `05 / 05`).
4. Ao concluir a galeria horizontal de destinos, a página desengata automaticamente e retoma o scroll vertical natural para as próximas seções (*Expedições POV, Atelier de Roteiro, Cinema da Viagem e Rodapé*).

---

## 📸 Destinos e Imagens Utilizadas

As imagens fornecidas em `C:\Users\David\OneDrive\Imagens\imagens site` foram integradas aos cartões do catálogo:

1. **Santorini & Domos Azuis de Oia (Grécia)**
   - Arquivo: `assets/images/lugares-mais-lindos-do-mundo-4-scaled.jpg`
   - Categoria: *Mediterrâneo Exclusivo*
2. **Blue Lagoon & Ilhas Maltesas (Malta)**
   - Arquivo: `assets/images/o-que-fazer-malta-Blue_Lagoon.jpg`
   - Categoria: *Costas & Ilhas Secretas*
3. **Tóquio Futurista & Monte Fuji (Japão)**
   - Arquivo: `assets/images/INSPIR-M-0524-Japan-Tokyo-JMelgoza3.jpg`
   - Categoria: *Cultura & Vanguarda*
4. **Paris de Alta Costura & Vale do Loire (França)**
   - Arquivo: `assets/images/guia-destinos-voesimples-europa-franca-paris-400x400.jpg`
   - Categoria: *Alta Gastronomia & Arte*
5. **Berlim Contemporânea & Bauhaus (Alemanha)**
   - Arquivo: `assets/images/images.jpg`
   - Categoria: *Arquitetura & Design*

---

## 🧩 Componentes do Design System Reutilizados

1. **Floating Navigation Island (`.nav-island`)**:
   - Barra de navegação suspensa em vidro fosco (`backdrop-filter: blur(24px)`), logotipo `AERA™`, links de ancoragem e pílula de consultoria.
2. **Pinned Horizontal Scroll Track (`.horizontal-scroll-section`, `.horizontal-cards-track`)**:
   - Translação horizontal responsiva acionada pelo scroll do mouse com indicador de progresso e controles auxiliares.
3. **Destinations Showcase (Spectrum Product Cards)**:
   - Cartões com visual imersivo, zoom fotográfico ao passar o mouse, badges, investimento e itinerário.
4. **Expedições POV (Cinematic Story Cards)**:
   - Cartões fotográficos de documentação visual com marcadores de capítulos documentais.
5. **Atelier de Roteiro Interativo (`.atelier-window` / `.home-window`)**:
   - Janela com barra de ferramentas, perfil de concierge chefe (*Sofia Laurent*), rail de navegação lateral e simulador interativo em tempo real para os 5 destinos.
6. **Cinema da Viagem (`.cinema-player-wrapper`)**:
   - Player imersivo com vídeo real embutido (`expedition-preview.mp4`), timeline interativa, timecode, som e tela cheia.
7. **Modal de Consultoria Privativa (`.modal-backdrop`, `.modal-card`, `.dialog-close-btn`)**:
   - Diálogo flutuante para agendamento de roteiro com feedback imediato.
8. **Fundações de Cores & Tipografia**:
   - Paleta escura: `--paper: #08090c`, `--ink: #f0f1f4`, `--blue: #5a68c9`, `--grey: #9c9da7`, `--line: #ffffff21`.
   - Tipografia contrastando cabeçalhos sans-serif contemporâneos com citações editoriais em *Georgia Serif*.

---

## 🚀 Como Visualizar

O projeto é 100% autônomo e não depende de servidores:

👉 [**Abrir AERA Voyages (`index.html`)**](./index.html)
