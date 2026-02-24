import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/style.css'

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  initHeroPopup();
  initHeaderNavigationToggle();
  initOmesVideoPlayer();
  initOmensVideo();
  initHeroesList();
});

function initHeaderNavigationToggle() {
  const toggleButton = document.getElementById(
    "header-navigation-toggle-button",
  );
  const navigation = document.getElementById("header-navigation");
  const navigationItems = document.querySelectorAll("#header-navigation .header__navigation_item:has(.sub-menu) > a");  

  console.log('navigationItems', navigationItems);
  

  if (toggleButton && navigation) {
    toggleButton.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  }

  if(navigationItems.length > 0) {
    navigationItems.forEach(item => {
      item.addEventListener('click', () => {
        const parent = item.parentElement;
        const isOpen = parent.classList.contains('collapsed');

        if (isOpen) {
          parent.classList.remove('collapsed');
        } else {
          const collapsedItems = document.querySelectorAll("#header-navigation .header__navigation_item:has(.sub-menu).collapsed");
          collapsedItems.forEach((collapsedItem) => {
            collapsedItem.classList.remove('collapsed');
          });
          parent.classList.add('collapsed');
        }
      });
    });
  }
}


function initOmesVideoPlayer() {
	// Select main video player elements
	const video = document.getElementById('compendium-rathe-video-trailer');
	const preview = document.querySelector('.preview-video_wrapper');
	const videoWrapper = document.getElementById(
		'compendium-rathe-video-wrapper'
	);
	const videoEmbed = videoWrapper.querySelector('.player-video_embed');
	const playPauseButton = document.getElementById(
		'compendium-rathe-video-play-pause'
	);
	const soundButton = document.getElementById('compendium-rathe-video-sound');
	const timeSection = document.getElementById('compendium-rathe-video-time');
	const progressBar = document.getElementById(
		'compendium-rathe-video-progress'
	);

	// Ensure all required elements exist before initializing
	if (
		!video ||
		!preview ||
		!playPauseButton ||
		!soundButton ||
		!timeSection ||
		!progressBar
	) {
		return;
	}

	// Preview click logic: hide preview, show player, and start video
	preview.addEventListener('click', () => {
		gsap.timeline()
			.to(preview, { autoAlpha: 0, duration: 0.5 }) // Fade out preview
			.to(videoWrapper, { autoAlpha: 1, duration: 0.5 }, '<') // Fade in video player
			.call(() => {
				video.play();
			});
	});

	// Play/Pause button toggle
	playPauseButton.addEventListener('click', () => {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	});

	// Clicking the video itself also toggles play/pause
	videoEmbed.addEventListener('click', () => {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	});

	// Update play/pause icons when video starts playing
	video.addEventListener('play', () => {
		playPauseButton.classList.remove('played');
		playPauseButton.classList.add('paused');
	});

	// Update play/pause icons when video is paused
	video.addEventListener('pause', () => {
		playPauseButton.classList.remove('paused');
		playPauseButton.classList.add('played');
	});

	// Sound toggle logic (Mute/Unmute)
	soundButton.addEventListener('click', () => {
		video.muted = !video.muted;
	});

	// Visually update sound button state on volume change
	video.addEventListener('volumechange', () => {
		if (video.muted) {
			soundButton.classList.remove('unmuted');
			soundButton.classList.add('muted');
		} else {
			soundButton.classList.remove('muted');
			soundButton.classList.add('unmuted');
		}
	});

	// Time formatting helper (seconds -> 00:00)
	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	// Update timestamp and progress bar as video plays
	video.addEventListener('timeupdate', () => {
		const currentTime = video.currentTime;
		const duration = video.duration || 0;

		// Display current time vs total duration
		timeSection.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;

		// Update progress bar width based on current time
		const progress = (currentTime / duration) * 100;
		progressBar.style.width = `${progress}%`;
	});
}

function initOmensVideo() {
	const videoPlayer = document.querySelector('#video-player');  
  
	if (!videoPlayer) return;

	ScrollTrigger.matchMedia({
		// Only for screens larger than 576px
		'(min-width: 577px)': function () {
			gsap.fromTo(
				videoPlayer,
				{
					width: '60%',
				},
				{
					width: '100%',
					ease: 'none',
					scrollTrigger: {
						trigger: videoPlayer,
						start: 'top bottom',
						end: 'top 75px',
						invalidateOnRefresh: true,
						scrub: true,
					},
				}
			);
		},

		// For mobile devices (576px and less)
		'(max-width: 576px)': function () {
			// Reset width to 100%
			gsap.set(videoPlayer, { width: '100%' });
		},
	});
}

function initHeroesList() {
  const heroesListItems = document.querySelectorAll('#heroes-list .heroes__item');

  if (heroesListItems.length > 0) {    
    heroesListItems.forEach(item => {
      const button = item.querySelector('.heroes__item_button');
      button.addEventListener('click', () => {
        item.classList.toggle('collapsed');
      });
    });
  }
}

function initHeroPopup() {
  const heroPopup = document.getElementById('hero-popup');
  const heroPopupClose = document.getElementById('hero-popup-close');

  if (heroPopup && heroPopupClose) {
    heroPopupClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      gsap.to(heroPopup, {
        autoAlpha: 0,
        duration: 0.25,
      });      
    });
  }
}