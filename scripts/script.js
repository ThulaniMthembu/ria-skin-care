document.addEventListener('DOMContentLoaded', () => {
	// Hamburger menu
	const hamburgerBtn = document.getElementById('hamburger-btn');
	const links = document.querySelectorAll('.menu a');
	const carouselItems = document.querySelectorAll('.carousel-item');
	const navbar = document.querySelector('.navbar');
	const heroTitle = document.querySelector('.carousel-content h1');
	const heroText = document.querySelector('.carousel-content p');
	const heroButtons = document.querySelectorAll('.carousel-content .btn');

	let currentItem = 0;

	const toggleMenu = () => {
		document.body.classList.toggle('open');
		document.body.classList.toggle('no-scroll');
	};

	const closeMenu = () => {
		document.body.classList.remove('open');
		document.body.classList.remove('no-scroll');
	};

	hamburgerBtn.addEventListener('click', toggleMenu);

	// Closes the menu when a link is clicked
	links.forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	// Box-Shadow for nav
	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	});

	// Homepage carousel
	function showNextItem() {
		carouselItems[currentItem].classList.remove('active');
		currentItem = (currentItem + 1) % carouselItems.length;
		carouselItems[currentItem].classList.add('active');
	}
	setInterval(showNextItem, 7000);

	// Add animation classes to hero elements
	heroTitle.classList.add('animate-hero');
	heroText.classList.add('animate-hero');
	heroButtons.forEach((btn, index) => {
		btn.classList.add('animate-hero');
		btn.style.animationDelay = `${0.5 + index * 0.2}s`;
	});

	// Parallax effect and reveal for CTA section
	window.addEventListener('scroll', () => {
		const parallax = document.querySelector('.parallax-container');
		const parallaxContent = document.querySelector('.parallax-content');
		const scrollPosition = window.pageYOffset;
		const parallaxOffset = parallax.offsetTop;
		const windowHeight = window.innerHeight;

		// Reveal the image
		if (scrollPosition + windowHeight > parallaxOffset) {
			parallax.classList.add('reveal');
		} else {
			parallax.classList.remove('reveal');
		}

		// Reveal the content
		if (scrollPosition + windowHeight > parallaxOffset + 100) {
			parallaxContent.classList.add('reveal');
		} else {
			parallaxContent.classList.remove('reveal');
		}

		// Parallax effect
		if (
			scrollPosition + windowHeight > parallaxOffset &&
			scrollPosition < parallaxOffset + parallax.offsetHeight
		) {
			const yPos = (scrollPosition - parallaxOffset) / 5;
			parallax.style.backgroundPositionY = `${yPos}px`;
		}
	});
});
