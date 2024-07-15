document.addEventListener('DOMContentLoaded', () => {
    const productsData = [
        { 
            id: 1, 
            name: 'Stylish Shirt', 
            category: 'clothing', 
            image: 'product1.png', 
            rating: 4.3, 
            designer: 'John Doe',
            collaboration: 'XYZ Apparel' 
        },
        { 
            id: 2, 
            name: 'Casual Shoes', 
            category: 'shoes', 
            image: 'product2.png', 
            rating: 4.0, 
            designer: 'Jane Smith',
            collaboration: 'ABC Footwear' 
        },
        { 
            id: 3, 
            name: 'Leather Bag', 
            category: 'bags', 
            image: 'product3.png', 
            rating: 4.5, 
            designer: 'Michael Johnson',
            collaboration: 'DEF Accessories' 
        },
        { 
            id: 4, 
            name: 'Elegant Watch', 
            category: 'accessories', 
            image: 'product4.png', 
            rating: 4.8, 
            designer: 'Emily Brown',
            collaboration: 'GHI Timepieces' 
        },
        { 
            id: 5, 
            name: 'Summer Dress', 
            category: 'clothing', 
            image: 'product5.png', 
            rating: 4.2, 
            designer: 'Alex Turner',
            collaboration: 'JKL Fashion' 
        },
        // Add more products here
    ];

    const voteButtons = document.querySelectorAll('.stars span');
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    const submitFeedbackButtons = document.querySelectorAll('.submit-feedback-btn');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const requestCollaborationButtons = document.querySelectorAll('.request-collaboration-btn');
    const votedProducts = new Set();

    const productsContainer = document.querySelector('.products');
    const trendingSection = document.querySelector('.trending-products');
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar .search-btn');
    const categories = document.querySelectorAll('.categories a');

    const collaborationOverlay = document.getElementById('collaborationOverlay');
    const collaborationForm = document.getElementById('collaborationForm');
    const closeModal = document.getElementById('closeModal');

    function renderProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-id', product.id);
            productCard.setAttribute('data-category', product.category);

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="stars">
                    <span data-value="1">&#9733;</span>
                    <span data-value="2">&#9733;</span>
                    <span data-value="3">&#9733;</span>
                    <span data-value="4">&#9733;</span>
                    <span data-value="5">&#9733;</span>
                </div>
                <p class="votes">Average Rating: ${product.rating.toFixed(1)}</p>
                <button class="feedback-btn">Give Feedback</button>
                <div class="feedback-section">
                    <textarea placeholder="Write your feedback here..."></textarea>
                    <button class="submit-feedback-btn">Submit</button>
                </div>
                <button class="wishlist-btn">Add to Wishlist</button>
                <button class="details-btn">View Details</button>
                <div class="product-detail">
                    <button class="close">Close</button>
                    <p>Product details for ${product.name}...</p>
                </div>
                <button class="review-btn">Reviews</button>
                <div class="review-section">
                    <button class="close">Close</button>
                    <p>No reviews yet.</p>
                </div>
                <button class="request-collaboration-btn">Request Collaboration</button>
            `;

            productsContainer.appendChild(productCard);
        });
    }

    function updateTrendingProducts() {
        const products = Array.from(document.querySelectorAll('.product-card'));
        trendingSection.innerHTML = '';

        products.sort((a, b) => {
            const votesA = parseFloat(a.querySelector('.votes').innerText.split(': ')[1]);
            const votesB = parseFloat(b.querySelector('.votes').innerText.split(': ')[1]);
            return votesB - votesA;
        });

        products.slice(0, 3).forEach(product => {
            const clonedProduct = product.cloneNode(true);
            trendingSection.appendChild(clonedProduct);
        });
    }

    function handleVotes() {
        voteButtons.forEach(star => {
            star.addEventListener('click', () => {
                const productCard = star.closest('.product-card');
                const productId = productCard.getAttribute('data-id');
                if (!votedProducts.has(productId)) {
                    const rating = star.getAttribute('data-value');
                    const votesElement = productCard.querySelector('.votes');
                    let currentRating = parseFloat(votesElement.innerText.split(': ')[1]);
                    let newRating = (currentRating + parseInt(rating)) / 2;
                    votesElement.innerText = `Average Rating: ${newRating.toFixed(1)}`;
                    votedProducts.add(productId);
                    updateTrendingProducts();
                } else {
                    alert('You have already rated this product.');
                }
            });
        });
    }

    function handleFeedback() {
        feedbackButtons.forEach(button => {
            button.addEventListener('click', () => {
                const feedbackSection = button.nextElementSibling;
                feedbackSection.style.display = feedbackSection.style.display === 'none' ? 'block' : 'none';
            });
        });

        submitFeedbackButtons.forEach(button => {
            button.addEventListener('click', () => {
                const feedbackText = button.previousElementSibling.value;
                if (feedbackText.trim()) {
                    alert('Feedback submitted: ' + feedbackText);
                    button.previousElementSibling.value = '';
                    button.parentElement.style.display = 'none';
                } else {
                    alert('Please enter feedback before submitting.');
                }
            });
        });
    }

    function handleWishlist() {
        wishlistButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                const productName = productCard.querySelector('h3').innerText;
                alert(`${productName} added to wishlist!`);
            });
        });
    }

    function handleProductDetails() {
        const detailButtons = document.querySelectorAll('.details-btn');
        const closeDetailButtons = document.querySelectorAll('.product-detail .close');

        detailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productDetail = button.nextElementSibling;
                productDetail.style.display = 'block';
            });
        });

        closeDetailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productDetail = button.parentElement;
                productDetail.style.display = 'none';
            });
        });
    }

    function handleReviews() {
        const reviewButtons = document.querySelectorAll('.review-btn');
        const closeReviewButtons = document.querySelectorAll('.review-section .close');

        reviewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const reviewSection = button.nextElementSibling;
                reviewSection.style.display = 'block';
            });
        });

        closeReviewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const reviewSection = button.parentElement;
                reviewSection.style.display = 'none';
            });
        });
    }

    function handleSearch() {
        searchButton.addEventListener('click', () => {
            const query = searchBar.value.toLowerCase();
            const products = Array.from(document.querySelectorAll('.product-card'));

            products.forEach(product => {
                const productName = product.querySelector('h3').innerText.toLowerCase();
                if (productName.includes(query)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    function handleCategoryFilter() {
        categories.forEach(category => {
            category.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryFilter = category.getAttribute('data-category');
                const products = Array.from(document.querySelectorAll('.product-card'));

                products.forEach(product => {
                    if (categoryFilter === 'all' || product.getAttribute('data-category') === categoryFilter) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    function handleCollaborationRequest() {
        requestCollaborationButtons.forEach(button => {
            button.addEventListener('click', () => {
                collaborationOverlay.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            collaborationOverlay.style.display = 'none';
        });

        collaborationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const collaborationName = document.getElementById('collaborationName').value;
            const collaborationMessage = document.getElementById('collaborationMessage').value;

            // Here you can implement the logic to handle the collaboration request submission
            alert(`Collaboration request submitted:\nName: ${collaborationName}\nMessage: ${collaborationMessage}`);

            // Close the modal after submission
            collaborationOverlay.style.display = 'none';
            collaborationForm.reset();
        });
    }

    function init() {
        renderProducts(productsData);
        handleVotes();
        handleFeedback();
        handleWishlist();
        handleProductDetails();
        handleReviews();
        handleSearch();
        handleCategoryFilter();
        handleCollaborationRequest();
        updateTrendingProducts();
    }

    init();
});
