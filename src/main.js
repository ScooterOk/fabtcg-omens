import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/style.css'

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  initHeroPopup();
  initHeaderNavigationToggle();
  // initOmesVideoPlayer();
  initOmensVideo();
  initHeroesList();
  initLightningFlow();
  initArmoryDeck();
  initStoreCards();
});

function initHeaderNavigationToggle() {
  const toggleButton = document.getElementById(
    "header-navigation-toggle-button",
  );
  const navigation = document.getElementById("header-navigation");
  const navigationItems = document.querySelectorAll("#header-navigation .header__navigation_item:has(.sub-menu) > a");   
  

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

  if (heroesListItems.length === 0) return;

  // Toggle mobile description
  heroesListItems.forEach(item => {
    const button = item.querySelector('.heroes__item_button');
    button.addEventListener('click', () => {
      item.classList.toggle('collapsed');
    });
  });

  // Animations for desktop
  const mm = gsap.matchMedia();
  mm.add('(min-width: 577px)', () => {
    const timelines = [];

    heroesListItems.forEach((item, index) => {
      const name = item.dataset.name;
      const wrapper = item.querySelector('.heroes__item_wrapper');
      const card = item.querySelector('.heroes__item_card');
      const head = card.querySelector('.heroes__item_card_head');
      const description = card.querySelector('.heroes__item_card_description');
      const h3 = item.querySelectorAll('.heroes__item_content h3.heading-h2');
      const subheader = item.querySelectorAll('.heroes__item_content .subheader-lg');
      const p = item.querySelectorAll('.heroes__item_content p');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 60%',
          invalidateOnRefresh: true,
        }
      }).timeScale(1)
        .fromTo(wrapper, {
          clipPath: 'inset(15% 15% round 32px)',
          yPercent: 85,
        }, {
          clipPath: 'inset(0% 0% round 32px)',
          yPercent: 0,
          duration: 1.3,
          ease: 'power4.out',
        }, 'start')
        .from(card, {
          scale: 2.4,
          xPercent: name === 'zyggy' ? 70 : -70,
          yPercent: 45,
          duration: 1.3,
          ease: 'power3.out',
        }, 'start')
        .from(head, {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.3')
        .from(description, {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        }, '<')
        .fromTo(h3, {
          immediateRender: true,
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '<')
        .fromTo(subheader, {
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '<+=0.3')
        .fromTo(p, {
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '<+=0.2');

      timelines.push(tl);




      item.addEventListener('mousemove', (e) => {
        const card = item.querySelector('.heroes__item_illustration');
        
        // Coordinate normalization (-1 to 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 4;
        const y = (e.clientY / window.innerHeight - 0.5) * 4;

        const direction = index % 2 === 0 ? 1 : -1;

        gsap.to(card, {
          rotationY: x * 3 * direction,
          rotationX: -y * 3 * direction,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      item.addEventListener('mouseleave', () => {
        const card = item.querySelector('.heroes__item_illustration');
        
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    });

    

    return () => timelines.forEach(tl => tl.kill());
  });
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

function initLightningFlow() {
  const lightningFlowGrid = document.getElementById('lightning-flow-grid');
  const imageLeft = lightningFlowGrid?.querySelector('img:first-child');
  const imageCenter = lightningFlowGrid?.querySelector('img:nth-child(2)');
  const imageRight = lightningFlowGrid?.querySelector('img:last-child');

  console.log('lightningFlowGrid!!!!', lightningFlowGrid);

  if (!lightningFlowGrid) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 577px)', () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#lightning-flow-grid-wrapper',
        start: 'top 60%',
        invalidateOnRefresh: true,
        markers: true,
      }
    }).timeScale(1)
      .fromTo(lightningFlowGrid, {
        clipPath: 'inset(15% 15% round 32px)',
        yPercent: 85,
      }, {
        clipPath: 'inset(0% 0% round 32px)',
        yPercent: 0,
        duration: 1.5,
        ease: 'power4.out',
      }, 'start')
      .from(imageCenter, {
        scale: 2.6,
        duration: 1.5,
        ease: 'power4.out',
      }, '<')
      .from(imageLeft, {
        xPercent: 100,
        duration: 1.5,
        ease: 'power4.out',
      }, '-=0.9')
      .from(imageRight, {
        xPercent: -100,
        duration: 1.5,
        ease: 'power4.out',
      }, '<');
  });
}

function initArmoryDeck() {
  const armoryDeck = document.querySelector('.armory-deck__illustration');
  const armoryDeckBg = armoryDeck?.querySelector('.armory-deck__illustration_bg');

  if (!armoryDeck) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 577px)', () => {
    armoryDeck.addEventListener('mousemove', (e) => {
      // Coordinate normalization (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;

      gsap.to(armoryDeckBg, {
        rotationY: x * 3,
        rotationX: -y * 3,
        scale: 1.15,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    armoryDeck.addEventListener('mouseleave', () => {
      gsap.to(armoryDeckBg, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  });
}

function initStoreCards() {
  const storeCards = document.querySelectorAll('.store__card');

  if (storeCards.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 577px)', () => {
    storeCards.forEach((card) => {
      const cardBg = card.querySelector('.store__card_bg');

      if (!cardBg) return;

      card.addEventListener('mousemove', (e) => {
        // Coordinate normalization (-1 to 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 5;
        const y = (e.clientY / window.innerHeight - 0.5) * 5;

        gsap.to(cardBg, {
          rotationY: x * 3,
          rotationX: -y * 3,
          scale: 1.1,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(cardBg, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    });
  });
}