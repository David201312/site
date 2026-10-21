# AERA VOYAGES — Réplica e Adaptação do Design System

Este projeto é uma réplica completa do site da **AERA**, reimaginado e transformado em um **Atelier de Viagens de Luxo e Expedições Sob Medida** (**AERA Voyages**), construído estritamente a partir dos componentes, fundações visuais e diretrizes do **AERA Design System** (`C:\Users\David\Downloads\aera-design-system\aera-design-system`).

---

## 🧭 Conceito: AERA Voyages

A **AERA Voyages** combina a estética minimalista, espacial e de alta fidelidade da AERA com o universo do turismo de luxo, expedições remotas e viagens ultracuradas.

### 🧩 Componentes do Design System Reutilizados

1. **Floating Navigation Island (`.nav-island`)**:
   - Barra de navegação suspensa em vidro fosco (`backdrop-filter: blur(24px)`), logotipo `AERA™`, links de ancoragem suave e pílulas de ação rápida.
2. **Category Dock Filter (`.category-dock`, `.dock-pill`)**:
   - Filtro dinâmico com abas em formato de pílula e ícones vetoriais inline 24x24 (`Todas as Jornadas`, `Costas & Ilhas`, `Desertos & Dunas`, `Ártico & Auroras`, `Expedições Alpinas`).
3. **Destinations Showcase (Spectrum Product Cards)**:
   - Adaptação dos cartões de hardware da AERA para coleções de viagens exclusivas (Noruega, Costa Amalfitana, Deserto do Saara, Zermatt nos Alpes, Maldivas e Patagônia), com zoom fotográfico sutil, valores por pessoa e itinerário.
4. **Expedições POV (Cinematic Story Cards)**:
   - Cartões com visual imersivo e marcadores de capítulos documentais (`CAPÍTULO 01 • COSTA SELVAGEM`, etc.).
5. **Atelier de Roteiro Interativo (`.atelier-window` / `.home-window`)**:
   - Adaptação da janela de trabalho desktop com rail de navegação lateral, perfil de concierge e simulador em tempo real de investimento e perfil de viagem.
6. **Cinema da Viagem (`.cinema-player-wrapper`)**:
   - Sala de projeção cinematográfica completa com vídeo real embutido (`expedition-preview.mp4`), timeline interativa (*scrubber*), contador de tempo (*timecode*), mudo/som e modo tela cheia.
7. **Modal de Consultoria Privativa (`.modal-backdrop`, `.modal-card`, `.dialog-close-btn`)**:
   - Diálogo flutuante para agendamento de roteiro com feedback imediato.
8. **Fundações de Cores & Tipografia**:
   - Paleta escura de alta fidelidade: `--paper: #08090c`, `--ink: #f0f1f4`, `--blue: #5a68c9`, `--grey: #9c9da7`, `--line: #ffffff21`.
   - Tipografia contrastando cabeçalhos sans-serif contemporâneos com citações editoriais em *Georgia Serif*.

---

## 📁 Estrutura de Arquivos

```text
site/
├── index.html                  # Página principal do site da agência
├── styles.css                  # Estilos fieis ao AERA Design System
├── script.js                   # Interatividade, filtros, player e simulador
├── README.md                   # Documentação do repositório
└── assets/
    ├── expedition-preview.mp4  # Vídeo cinematográfico de alta definição
    └── images/                 # Fotografias e ícones de alta resolução
        ├── coast.webp
        ├── dunes.webp
        ├── aurora.webp
        ├── alpine.webp
        ├── world.webp
        ├── expedition-coast.jpg
        ├── expedition-dunes.jpg
        ├── expedition-aurora.jpg
        ├── cinema-stage.jpg
        ├── planner-desk.jpg
        ├── concierge-avatar.jpg
        └── favicon.svg
```

---

## 🚀 Como Executar

O projeto é 100% autônomo e não depende de empacotadores ou servidores:

1. **Navegador direto via `file://`**:
   - Basta abrir o arquivo [`index.html`](./index.html) no seu navegador favorito (Google Chrome, Edge, Firefox, Safari).
2. **Via Servidor Local (opcional)**:
   - Com Node.js: `npx serve .`
   - Com Python: `python -m http.server 8000`
