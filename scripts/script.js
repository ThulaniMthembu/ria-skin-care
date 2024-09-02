document.addEventListener('DOMContentLoaded', () => {
	// Hamburger menu
	const hamburgerBtn = document.getElementById('hamburger-btn');
	const links = document.querySelectorAll('.menu a');
	const carouselItems = document.querySelectorAll('.carousel-item');
	const navbar = document.querySelector('.navbar');
	const heroTitle = document.querySelector('.carousel-content h1');
	const heroText = document.querySelector('.carousel-content p');
	const heroButtons = document.querySelectorAll('.carousel-content .btn');
	const faqQuestions = document.querySelectorAll('.faq-question');
	const newsletterForm = document.querySelector('.newsletter-form');
	const emailInput = newsletterForm.querySelector('input[type="email"]');
	const submitButton = newsletterForm.querySelector('button[type="submit"]');

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

	// Newsletter
	newsletterForm.addEventListener('submit', function (e) {
		e.preventDefault();

		// Basic email validation
		const email = emailInput.value.trim();
		if (!isValidEmail(email)) {
			showMessage('Please enter a valid email address.', 'error');
			return;
		}

		// Disable the submit button and show loading state
		submitButton.disabled = true;
		submitButton.textContent = 'Subscribing...';

		// Simulate an API call (replace this with your actual API call)
		setTimeout(() => {
			// Re-enable the submit button
			submitButton.disabled = false;
			submitButton.textContent = 'Subscribe';

			// Show success message
			showMessage('Thank you for subscribing!', 'success');

			// Clear the input field
			emailInput.value = '';
		}, 1500);
	});

	function isValidEmail(email) {
		// Basic email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function showMessage(message, type) {
		// Remove any existing message
		const existingMessage = newsletterForm.querySelector('.message');
		if (existingMessage) {
			existingMessage.remove();
		}

		// Create and append the new message
		const messageElement = document.createElement('div');
		messageElement.textContent = message;
		messageElement.classList.add('message', type);
		newsletterForm.appendChild(messageElement);

		// Remove the message after 5 seconds
		setTimeout(() => {
			messageElement.remove();
		}, 5000);
	}

	// FAQs
	faqQuestions.forEach((question) => {
		question.addEventListener('click', () => {
			const answer = question.nextElementSibling;
			const isOpen = answer.style.maxHeight;

			document.querySelectorAll('.faq-answer').forEach((item) => {
				item.style.maxHeight = null;
			});

			if (!isOpen) {
				answer.style.maxHeight = answer.scrollHeight + 'px';
			}
		});
	});
});
