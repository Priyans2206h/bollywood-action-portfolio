// Cursor Follow Muzzle-Flash Effect
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// Scroll Reveal & Active Nav Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Background Music & Audio Controller
const bgAudio = document.getElementById('bg-audio');
const audioWidget = document.getElementById('audio-widget');
const audioStatus = document.getElementById('audio-status');
const audioBtnIcon = document.getElementById('audio-btn-icon');
const cinemaCurtain = document.getElementById('cinema-curtain');
const curtainEnterBtn = document.getElementById('curtain-enter-btn');

let isAudioPlaying = false;

function setPlayingUI() {
  isAudioPlaying = true;
  if (audioWidget) audioWidget.classList.add('playing');
  if (audioStatus) audioStatus.textContent = 'PLAYING';
  if (audioBtnIcon) audioBtnIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
}

function setPausedUI() {
  isAudioPlaying = false;
  if (audioWidget) audioWidget.classList.remove('playing');
  if (audioStatus) audioStatus.textContent = 'PAUSED';
  if (audioBtnIcon) audioBtnIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
}

function playAudio() {
  if (!bgAudio) return;
  bgAudio.volume = 0.5;
  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      setPlayingUI();
      // If audio successfully started on its own without user interaction, hide the curtain
      if (cinemaCurtain && !cinemaCurtain.classList.contains('opened')) {
        cinemaCurtain.classList.add('opened');
      }
    }).catch((err) => {
      // Browser blocked silent autoplay: curtain is ready for the single "Enter Cinema" gesture
      console.log("Browser requires 1 initial user gesture to enable unmuted audio:", err);
    });
  }
}

function pauseAudio() {
  if (!bgAudio) return;
  bgAudio.pause();
  setPausedUI();
}

function toggleAudio() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

// Enter Cinema button unlocks audio with full volume and opens curtain smoothly
if (curtainEnterBtn) {
  curtainEnterBtn.addEventListener('click', () => {
    playAudio();
    if (cinemaCurtain) {
      cinemaCurtain.classList.add('opened');
    }
  });
}

// Global gestures to unlock audio immediately if user clicks or touches anywhere
const autoUnlockEvents = ['click', 'touchstart', 'scroll', 'keydown'];
function handleGlobalUnlock() {
  playAudio();
  if (cinemaCurtain) {
    cinemaCurtain.classList.add('opened');
  }
  autoUnlockEvents.forEach(evt => window.removeEventListener(evt, handleGlobalUnlock));
}
autoUnlockEvents.forEach(evt => window.addEventListener(evt, handleGlobalUnlock, { once: true }));

// Try playing immediately as soon as DOM loads
document.addEventListener('DOMContentLoaded', () => {
  playAudio();
});
function openCertModal(imageSrc, title) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');

  modalImg.src = imageSrc;
  modalTitle.textContent = title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

console.log("Full-screen Bollywood Atmosphere: Active 🎬💥");
