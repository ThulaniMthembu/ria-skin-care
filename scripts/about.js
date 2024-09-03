document.addEventListener('DOMContentLoaded', function () {
	const carouselItems = document.querySelectorAll('.carousel-item');
	const prevButton = document.querySelector('.carousel-button.prev');
	const nextButton = document.querySelector('.carousel-button.next');
	const caption = document.querySelector('.carousel-caption');
	let currentIndex = 0;

	const productInfo = [
		{ title: 'Lavender', description: 'Freshly cooked batch of Lavender' },
		{ title: 'Lavender cut', description: 'Cut sample of Lavender' },
		{ title: 'Goat Milk', description: 'Freshly cooked batch of Goat Milk' },
		{ title: 'Goat Milk cut', description: 'Cut sample of Goat Milk' },
		{ title: 'Premium cream', description: 'Sample of our creams' },
	];

	function showItem(index) {
		carouselItems.forEach((item) => item.classList.remove('active'));
		carouselItems[index].classList.add('active');
		caption.innerHTML = `<h3>${productInfo[index].title}</h3><p>${productInfo[index].description}</p>`;
	}

	function nextItem() {
		currentIndex = (currentIndex + 1) % carouselItems.length;
		showItem(currentIndex);
	}

	function prevItem() {
		currentIndex =
			(currentIndex - 1 + carouselItems.length) % carouselItems.length;
		showItem(currentIndex);
	}

	nextButton.addEventListener('click', nextItem);
	prevButton.addEventListener('click', prevItem);

	// Initialize the carousel
	showItem(currentIndex);
});
