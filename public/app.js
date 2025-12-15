// Infinite scroll
    let currentPage = 1;
    let isLoading = false;
    let hasMore = true;
    // Reading query values from the DOM (rendered by the server)
    const productsContainer = document.getElementById('products-container');
    const queryText = productsContainer?.dataset?.text || '';
    const queryCategory = productsContainer?.dataset?.category || '';

    const errorMessages = {
        'description': 'Invalid description length (must be 2-100 characters)',
        'review' : 'Invalid review length (minimum 2 characters)'
    };

    const defaultImageSrc = "";

    function ratingToArray(rating) {
        return Array.from({ length: 5 }, (_, i) => i < rating);
    }

    function buildQueryString() {
        let query = '';
        if (queryText) {
            query += 'text=' + encodeURIComponent(queryText);
        }
        if (queryCategory) {
            if (query) query += '&';
            query += 'category=' + encodeURIComponent(queryCategory);
        }
        return query;
    }

    function createGarmentCard(garment) {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 mb-4';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        card.innerHTML = `
            <div class="card">
                <img src="/garment/${garment._id}/image" class="card-img-top" alt="${garment.title}">
                <div class="card-body">
                    <h5 class="card-title">${garment.title}</h5>
                    <p class="card-text">${garment.price}€</p>
                    <a href="/detail/${garment._id}" class="btn btn-standard">More info</a>
                </div>
            </div>
        `;
        
        // Trigger reflow para que la animación funcione
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
        
        return card;
    }

    async function loadMoreGarments() {
        if (isLoading || !hasMore) return;

        isLoading = true;
        const loadingIndicator = document.getElementById('loading-indicator');
        loadingIndicator.style.display = 'block';

        try {
            const queryString = buildQueryString();
            let url = `/api/garments?page=${currentPage + 1}`;
            if (queryString) {
                url = `/api/garments?${queryString}&page=${currentPage + 1}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.garments.length > 0) {
                const container = document.getElementById('products-container');
                data.garments.forEach(garment => {
                    container.appendChild(createGarmentCard(garment));
                });

                currentPage = data.page;
                hasMore = data.hasMore;
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error('Error loading garments:', error);
        } finally {
            isLoading = false;
            loadingIndicator.style.display = 'none';
        }
    }

    // Detect when the user reaches the bottom of the page
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
            loadMoreGarments();
        }
    });

    function showError(input, message){
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.nextElementSibling.textContent = message;
    }

    function showSucces(input, message) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.nextElementSibling.textContent = message;
    }

    async function checkTitle(){

        const title = document.getElementById("title");
        const titleValue = title.value;

        if (!titleValue){
            showError(title, "Title value is required");
            return false;
        }

        if (titleValue[0] !== titleValue[0].toUpperCase()) {
            showError(title, "The garment name must start with a capital letter.");
            return false;
        }

        //const response = await fetch(`/checkUserName?username=${title}`);
        const response = await fetch(`/checkTitle?title=${encodeURIComponent(titleValue)}`);
        const userNameChecked = await response.json();

        const errorDiv = document.getElementById("title-error");

        if (userNameChecked.valid === false) {
            showError(title, userNameChecked.message);
            return false; 
        } else {
            showSucces(title, userNameChecked.message);
            return true; 
        }
    }

    function checkTextField(inputId, fieldName, errorMessages) {
        const input = document.getElementById(inputId);
        const value = input.value.trim();

        const message = errorMessages[fieldName] || "Invalid length";

        if (value.length < 2 || value.length > 100) {
            showError(input, message);
            return false;
        } else {
            showSucces(input, "");
            return true;
        }
    }

    function checkPrice() {
        const price = document.getElementById("price");
        const priceValue = parseFloat(price.value); 

        if(isNaN(priceValue)) {
            showError(price, "Price is required");
            return false;
        }

        if (priceValue <= 0) {
            showError(price, "The price cannot be negative or zero.");
            return false; 
        } else {
            showSucces(price, "");
            return true; 
        }

    }

    function checkSingleSelect(input){
        if (input.value === ""){
                showError(input, "Please select an option");
                return false;  
            } else {
                showSucces(input, "");
                return true; 
            }
    }

    function checkSelects(){
        let fields = ['type', 'size', 'color', 'fabric'];
        let isAllValid = true; 

        for (let field of fields){
            let input = document.getElementById(field);
            if(checkSingleSelect(input) === false){
                isAllValid = false; 
            }
        }

        return isAllValid; 
    }

    function checkImage(){
        const imageInput = document.getElementById("imageFilename");
        const previewImage = document.getElementById("previewImage");
    
        const isVisible = previewImage && previewImage.style.display !== 'none' && previewImage.src !== "" && !previewImage.src.endsWith(window.location.host + "/");
    
        if(imageInput.files.length === 0 && !isVisible) {
            showError(imageInput, "Image is required");
            return false; 
        } else {
            showSucces(imageInput, "");
            return true; 
        }
    }


    function checkDate(inputId) {
        const input = document.getElementById(inputId);
        const value = input.value.trim(); 

        if (!value) {
            showError(input, "The date cannot be empty.");
            return false;
        }

        const selectedDate = new Date(value);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0); 
        
        if (selectedDate > today) {
            showError(input, "The date cannot be in the future.");
            return false;
        }

        if (selectedDate.getFullYear() < 2000) {
            showError(input, "The year must be 2000 or later.");
            return false;
        }

        showSucces(input, "");
        return true;
    }

    async function addReview(reviewsList, review, garmentId) {
        const arrayRating = ratingToArray(review.rating);
        let htmlRating = ""
        for (let i = 0; i<arrayRating.length; i++) {
            if (arrayRating[i])  {
                htmlRating+= `<i class="bi bi-star-fill text-warning"></i>`
            }
            else {
                htmlRating+= `<i class="bi bi-star text-warning"></i>`
            }
        }
        reviewsList.innerHTML+= `
        <div class='col-12 p-3 border rounded shadow-sm bg-light mb-4 mt-4' data-review-id="${review._id.toString()}">
            <h4>${review.username}</h4>
            <div class="rating">
            ${htmlRating}
            </div>
            <p>${review.review}</p>
            <p>Date: ${review.date}</p>
            <a class="btn btn-standard delete-review" href="/garment/${garmentId}/customerReviews/${review._id.toString()}/delete" data-review-id="${review._id.toString()}">Delete</a>    
            <a class="btn btn-standard" id="editReviewButton" href="/detail/${garmentId}/${review._id.toString()}">Edit</a>  
      </div>
      `
    }

    async function validateReviewForm(event) {
        event.preventDefault();

        console.log('Submitting review form (AJAX)');

        const isReviewTextValid = checkTextField('reviewText', 'review', errorMessages);
        const isDateValid = checkDate('reviewDate'); 

        if (!isReviewTextValid || !isDateValid) {
            console.log('Review validation failed');
            return false;
        }

        const reviewForm = event.target;
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        const formData = new FormData(reviewForm);
        const urlEncoded = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            urlEncoded.append(key, value);
        }

        try {
            const response = await fetch(reviewForm.action, {
                method: 'POST',
                body: urlEncoded.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const garmentId = reviewForm.action.split("/")[2];

            const data = await response.json();
            if (data.valid) {
                if (data && data.location) {
                    const reviewsList = document.getElementById("reviewsList")
                    if (data.edit) {
                        const wrapper = reviewsList.querySelector(`[data-review-id="${data.review._id.toString()}"]`);
                        if (wrapper) wrapper.remove();
                    }
                    addReview(reviewsList, data.review, garmentId);
                    reviewForm.reset()
                    return;
                }
            } else {
                // server returned HTML (fallback) - replace document
                const text = await response.text();
                document.open();
                document.write(text);
                document.close();
                return;
            }
        } catch (error) {
            console.error('Error sending review:', error);
            alert('Error sending review. Check console for details.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const reviewDateInput = document.getElementById('reviewDate');
        const reviewForm = document.querySelector('form[action*="/customerReviews/new"]');
        const reviewsList = document.getElementById('reviewsList');

        const editImage = document.getElementById("previewImage");

        if (reviewDateInput) {
            reviewDateInput.addEventListener('change', () => checkDate('reviewDate'));
        }

        if (reviewForm) {
            reviewForm.addEventListener('submit', validateReviewForm);
        }

        // Delegate delete clicks for reviews to avoid re-binding
        if (reviewsList) {
            reviewsList.addEventListener('click', async (ev) => {
                const btn = ev.target.closest && ev.target.closest('.delete-review');
                if (!btn) return;
                ev.preventDefault();
                const reviewId = btn.dataset.reviewId;
                const href = btn.getAttribute('href');
                if (!confirm('Are you sure you want to delete this review?')) return;
                try {
                    const resp = await fetch(href, { method: 'GET', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
                    const contentType = resp.headers.get('content-type') || '';
                    if (contentType.includes('application/json')) {
                        const data = await resp.json();
                        if (data && data.ok) {
                            // remove from DOM
                            const wrapper = reviewsList.querySelector(`[data-review-id="${reviewId}"]`);
                            if (wrapper) wrapper.remove();
                        } else {
                            const list = document.getElementById('review-error-list');
                            if (list) {
                                list.innerHTML = (data.errors || ['Error deleting review']).map(e => `<li>${e}</li>`).join('');
                                const modalEl = document.getElementById('reviewErrorModal');
                                if (modalEl && typeof bootstrap !== 'undefined') new bootstrap.Modal(modalEl).show();
                                else alert((data.errors || ['Error deleting review']).join('\n'));
                            }
                        }
                    } else {
                        // fallback: reload page if server sent HTML
                        const text = await resp.text();
                        document.open(); document.write(text); document.close();
                    }
                } catch (err) {
                    console.error('Error deleting review', err);
                    alert('Error deleting review');
                }
            });
        }

        if (editImage) {
            defaulImgSrc=editImage.src;
        }
    });

    async function uploadImage(event) {
        const input = event.target; 
        if (input.files && input.files.length > 0) {
            input.classList.remove("is-invalid"); 
        } else {
            return; 
        }
        const formData = new FormData();
        formData.append("image", event.target.files?.[0], event.target.files?.[0].filename);
        const response = await fetch(`/upload_image`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.valid) {
            const previewImage = document.getElementById("previewImage");
            if (previewImage.style.display === 'none') {
                previewImage.style.display = 'block';
            }
            previewImage.src = "/image?filename=" + result.filename;
            checkImage();
        } else {
            alert(`Error: ${result.message}`);
        }
    }

    async function removeImage(event) {
        document.getElementById("imageFilename").value="";
        const previewImage = document.getElementById("previewImage")
        previewImage.style.display = "none";
        previewImage.src = "";

        checkImage();
    }
    async function removeImageEdit(event) {
        const id = window.location.pathname.split('/').pop();
        const previewImage = document.getElementById("previewImage")
        if (previewImage.src === "http://localhost:3000/garment/"+id+"/image") {
            await fetch('/drop_image/' + id);
        }
        document.getElementById("imageFilename").value="";
        previewImage.src = "" ;

        checkImage();
    }
