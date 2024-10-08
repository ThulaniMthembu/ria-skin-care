document.addEventListener('DOMContentLoaded', function () {
	const cartContainer = document.getElementById('cart-container');
	const productsContainer = document.getElementById('products-container');
	const dessertCards = document.getElementById('dessert-card-container');
	const cartBtn = document.getElementById('cart-btn');
	const clearCartBtn = document.getElementById('clear-cart-btn');
	const totalNumberOfItems = document.getElementById('total-items');
	const cartSubTotal = document.getElementById('subtotal');
	const cartTaxes = document.getElementById('taxes');
	const cartTotal = document.getElementById('total');
	const cartCount = document.getElementById('cart-count');
	const closeCartBtn = document.getElementById('close-cart-btn');
	const searchInput = document.getElementById('search-input');
	const sortSelect = document.getElementById('sort-select');
	const categorySelect = document.getElementById('category-select');
	const modal = document.getElementById('checkout-modal');
	const closeBtn = document.getElementsByClassName('close')[0];
	const checkoutForm = document.getElementById('checkout-form');
	const orderDetailsInput = document.getElementById('order-details');
	const checkoutBtns = document.querySelectorAll('.checkout-btn');
	const faqQuestions = document.querySelectorAll('.faq-question');
	const newsletterForm = document.querySelector('.newsletter-form');
	const emailInput = newsletterForm.querySelector('input[type="email"]');
	const submitButton = newsletterForm.querySelector('button[type="submit"]');

	let isCartShowing = false;

	function showLoader() {
		document.querySelector('.loader-wrapper').style.display = 'flex';
	}

	function hideLoader() {
		document.querySelector('.loader-wrapper').style.display = 'none';
	}

	window.addEventListener('scroll', () => {
		const header = document.querySelector('header');
		if (window.scrollY > 0) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	function toggleCart() {
		isCartShowing = !isCartShowing;
		cartContainer.classList.toggle('show', isCartShowing);

		if (isCartShowing) {
			document.body.classList.add('body-no-scroll');
		} else {
			document.body.classList.remove('body-no-scroll');
		}
	}

	const products = [
		// Flawless Complexion
		{
			id: 1,
			name: 'Anti-aging Radiance Cream',
			price: {
				'50ml': 160,
				'125ml': 380,
				'250ml': 680,
			},
			category: 'Flawless Complexion',
			image: '../real-products/cream.jpg',
		},
		{
			id: 2,
			name: 'Even Tone Cream',
			price: {
				'50ml': 160,
				'125ml': 380,
				'250ml': 680,
			},
			category: 'Flawless Complexion',
			image: '../real-products/cream2.jpg',
		},

		// Brightening and Lightening
		{
			id: 3,
			name: 'Brightening Face Cream',
			price: {
				'50ml': 150,
				'125ml': 300,
				'250ml': 480,
			},
			category: 'Brightening and Lightening',
			image: '../products/cream-even-tone1.jpeg',
		},
		{
			id: 4,
			name: 'Brightening and Clarifying Cleanser',
			price: {
				'200ml': 120,
			},
			category: 'Brightening and Lightening',
			image: '../products/cream-even-tone2.jpeg',
		},
		{
			id: 5,
			name: 'Lightening Body Cream',
			price: {
				'50ml': 150,
				'125ml': 300,
				'250ml': 480,
			},
			category: 'Brightening and Lightening',
			image: '../products/cream-even-tone3.jpeg',
		},
		{
			id: 6,
			name: 'Strong Body Lighter',
			price: {
				'200ml': 380,
			},
			category: 'Brightening and Lightening',
			image: '../real-products/cream2.jpg',
		},
		{
			id: 7,
			name: 'Pigments Serum',
			price: {
				'120ml': 190,
				'200ml': 290,
			},
			category: 'Brightening and Lightening',
			image: '../products/serum.jpeg',
		},
		{
			id: 8,
			name: 'Anti-aging Whitening Cream',
			price: {
				'50ml': 160,
				'125ml': 360,
				'250ml': 760,
			},
			category: 'Brightening and Lightening',
			image: '../products/treatment1.jpeg',
		},

		// Handmade Soaps
		{
			id: 9,
			name: 'Turmeric Soap',
			price: 50,
			category: 'Handmade Soaps',
			image: '../products/soap-turmeric.jpeg',
		},
		{
			id: 10,
			name: 'Goat Milk Soap',
			price: 45,
			category: 'Handmade Soaps',
			image: '../real-products/goatmilk-cut.jpg',
		},
		{
			id: 11,
			name: 'Lavender Soap',
			price: 40,
			category: 'Handmade Soaps',
			image: '../real-products/lavender-cut.jpg',
		},
		{
			id: 12,
			name: 'Turmeric Soap',
			price: 60,
			category: 'Handmade Soaps',
			image: '../real-products/goatmilk-cut2.jpg',
		},
		{
			id: 13,
			name: 'Vitamin C Soap',
			price: 60,
			category: 'Handmade Soaps',
			image: '../products/lemon-soap.jpeg',
		},
		{
			id: 14,
			name: 'Aloe Vera Soap',
			price: 50,
			category: 'Handmade Soaps',
			image: '../products/treatment2.jpeg',
		},
		{
			id: 15,
			name: 'Lemon and Basil Soap',
			price: 50,
			category: 'Handmade Soaps',
			image: '../products/lemon-soap.jpeg',
		},

		// Rose Water
		{
			id: 16,
			name: 'Rose Water',
			price: {
				'50ml': 50,
			},
			category: 'Rose Water',
			image: '../products/rose-water.jpeg',
		},
	];

	class ShoppingCart {
		constructor() {
			this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
			this.total = 0;
			this.taxRate = 0;
			this.updateCartDisplay();
		}

		addItem(id, products) {
			const product = products.find((item) => item.id === id);
			const selectedSize = document.getElementById(`size-${id}`);
			const size = selectedSize ? selectedSize.value : null;
			const itemPrice = size ? product.price[size] : product.price;

			if (!size && typeof product.price === 'object') {
				showPopover('Please select a size before adding to cart.');
				return;
			}

			const existingItem = this.items.find(
				(item) => item.id === id && item.size === size
			);

			if (existingItem) {
				existingItem.quantity += 1;
				showPopover(`Added another ${product.name} to your cart!`);
			} else {
				this.items.push({ ...product, size, price: itemPrice, quantity: 1 });
				showPopover(`${product.name} added to your cart!`);
			}

			this.updateLocalStorage();
			this.updateCartDisplay();
		}

		removeItem(id, size) {
			this.items = this.items.filter(
				(item) => !(item.id === id && item.size === size)
			);
			this.updateLocalStorage();
			this.updateCartDisplay();
		}

		updateQuantity(id, size, quantity) {
			const item = this.items.find(
				(item) => item.id === id && item.size === size
			);
			if (item) {
				item.quantity = quantity;
				if (item.quantity <= 0) {
					this.removeItem(id, size);
				} else {
					this.updateLocalStorage();
					this.updateCartDisplay();
				}
			}
		}

		clearCart(skipConfirmation = false) {
			if (!this.items.length) {
				showPopover('Your shopping cart is already empty');
				return;
			}

			if (
				skipConfirmation ||
				confirm(
					'Are you sure you want to clear all items from your shopping cart?'
				)
			) {
				this.items = [];
				this.updateLocalStorage();
				this.updateCartDisplay();
			}
		}

		calculateTaxes(amount) {
			return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
		}

		calculateTotal() {
			const subTotal = this.items.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
			const tax = this.calculateTaxes(subTotal);
			this.total = subTotal + tax;
			cartSubTotal.textContent = `R${subTotal.toFixed(2)}`;
			cartTaxes.textContent = `R${tax.toFixed(2)}`;
			cartTotal.textContent = `R${this.total.toFixed(2)}`;
			return this.total;
		}

		updateCartDisplay() {
			productsContainer.innerHTML = this.items
				.map(
					(item) => `
            <div class="product">
                <div class="product-info">
                    <p>${item.name}${item.size ? ` - ${item.size}` : ''}</p>
                    <p>R${item.price}</p>
                </div>
                <div class="product-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${
											item.id
										}, '${item.size}', ${item.quantity - 1})">-</button>
                    <span class="product-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${
											item.id
										}, '${item.size}', ${item.quantity + 1})">+</button>
                </div>
            </div>
        `
				)
				.join('');

			const totalItems = this.items.reduce(
				(sum, item) => sum + item.quantity,
				0
			);
			totalNumberOfItems.textContent = totalItems;
			cartCount.textContent = totalItems;
			this.calculateTotal();
		}

		updateLocalStorage() {
			localStorage.setItem('cartItems', JSON.stringify(this.items));
		}
	}

	const cart = new ShoppingCart();

	function displayProducts(productsToDisplay) {
		dessertCards.innerHTML = productsToDisplay
			.map(({ name, id, price, category, image }) => {
				let sizeOptions = '';
				if (typeof price === 'object') {
					sizeOptions = Object.keys(price)
						.map(
							(size) =>
								`<option value="${size}" data-price="${price[size]}">${size} - R${price[size]}</option>`
						)
						.join('');
				}

				return `
            <div class="dessert-card">
                <img src="${
									image || 'placeholder.jpg'
								}" alt="${name}" class="product-image">
                <h2>${name}</h2>
                <p class="product-category">${category}</p>
                ${
									sizeOptions
										? `
                    <select id="size-${id}" class="size-select">
                        <option value="">Select size</option>
                        ${sizeOptions}
                    </select>
                `
										: `<p class="dessert-price">R${price}</p>`
								}
                <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
            </div>
        `;
			})
			.join('');
	}

	function filterProducts() {
		const searchTerm = searchInput.value.toLowerCase();
		const selectedCategory = categorySelect.value;

		let filteredProducts = products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm) &&
				(selectedCategory === '' || product.category === selectedCategory)
		);

		const sortMethod = sortSelect.value;
		switch (sortMethod) {
			case 'price-low-high':
				filteredProducts.sort(
					(a, b) =>
						(typeof a.price === 'object'
							? Object.values(a.price)[0]
							: a.price) -
						(typeof b.price === 'object' ? Object.values(b.price)[0] : b.price)
				);
				break;
			case 'price-high-low':
				filteredProducts.sort(
					(a, b) =>
						(typeof b.price === 'object'
							? Object.values(b.price)[0]
							: b.price) -
						(typeof a.price === 'object' ? Object.values(a.price)[0] : a.price)
				);
				break;
			case 'name-a-z':
				filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'name-z-a':
				filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
				break;
		}

		displayProducts(filteredProducts);
	}

	dessertCards.addEventListener('click', function (event) {
		if (event.target.classList.contains('add-to-cart-btn')) {
			const productId = parseInt(event.target.getAttribute('data-id'));
			cart.addItem(productId, products);
		}
	});

	cartBtn.addEventListener('click', toggleCart);
	closeCartBtn.addEventListener('click', toggleCart);
	clearCartBtn.addEventListener('click', () => cart.clearCart());
	searchInput.addEventListener('input', filterProducts);
	sortSelect.addEventListener('change', filterProducts);
	categorySelect.addEventListener('change', filterProducts);

	searchInput.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			filterProducts();
		}
	});

	displayProducts(products);

	function handleCheckout() {
		if (cart.items.length === 0) {
			showPopover('Your cart is empty. Add some items before checking out.');
		} else {
			const orderDetails = cart.items
				.map(
					(item) =>
						`${item.name} (${item.size || 'N/A'}) - Quantity: ${
							item.quantity
						} - Price: R${item.price * item.quantity}`
				)
				.join('\n');
			orderDetailsInput.value = `Order Details:\n${orderDetails}\n\nTotal: R${cart.total.toFixed(
				2
			)}`;

			modal.style.display = 'block';
		}
	}

	closeBtn.onclick = function () {
		modal.style.display = 'none';
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	checkoutForm.onsubmit = function (event) {
		event.preventDefault();

		if (validateForm()) {
			showLoader();

			var templateParams = {
				name: this.name.value,
				email: this.email.value,
				address: this.address.value,
				phone: this.phone.value,
				order_details: this.order_details.value,
			};

			// Send the email using EmailJS
			emailjs.send('service_rj59y92', 'template_fsn2ake', templateParams).then(
				function (response) {
					console.log('Email sent successfully:', response);
					console.log('Recipient email:', templateParams.email);
					hideLoader();
					showPopover(
						"Thank you for your purchase! You will receive an email confirmation shortly. If you don't see it, please check your spam folder."
					);
					cart.clearCart(true);
					modal.style.display = 'none';
					toggleCart();

					checkoutForm.reset();
					orderDetailsInput.value = '';

					document.body.classList.add('body-no-scroll');
				},
				function (error) {
					console.error('Email sending failed:', error);
					hideLoader();
					showPopover(
						'There was an error processing your order. Please try again. Error: ' +
							JSON.stringify(error)
					);
				}
			);
		}
	};

	function validateForm() {
		const inputs = checkoutForm.getElementsByTagName('input');
		for (let input of inputs) {
			if (input.hasAttribute('required') && input.value.trim() === '') {
				showPopover(`Please fill out the ${input.placeholder} field.`);
				return false;
			}
			if (input.name === 'email' && !validateEmail(input.value)) {
				showPopover('Please enter a valid email address.');
				return false;
			}
			if (input.name === 'phone' && !validatePhone(input.value)) {
				showPopover('Please enter a valid phone number.');
				return false;
			}
		}
		return true;
	}

	function validateEmail(email) {
		const re =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return re.test(email.toLowerCase());
	}

	function validatePhone(phone) {
		const re = /^\+?[\d\s-]{10,}$/;
		return re.test(phone);
	}

	checkoutBtns.forEach((button) => {
		button.addEventListener('click', (event) => {
			handleCheckout();
		});
	});

	function showPopover(message, duration = 3000) {
		const existingPopover = document.querySelector('.popover');
		if (existingPopover) {
			existingPopover.remove();
		}

		const popover = document.createElement('div');
		popover.className = 'popover';
		popover.textContent = message;
		document.body.appendChild(popover);

		document.body.classList.add('body-no-scroll');
		popover.style.zIndex = '10000';

		setTimeout(() => {
			popover.remove();
			document.body.classList.remove('body-no-scroll');
		}, duration);
	}

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
