// Scroll infinito
    let currentPage = 1;
    let isLoading = false;
    let hasMore = true;
    // Leer valores de consulta desde el DOM (renderizados por el servidor)
    const productsContainer = document.getElementById('products-container');
    const queryText = productsContainer?.dataset?.text || '';
    const queryCategory = productsContainer?.dataset?.category || '';

    const errorMessages = {
        'description': 'Invalid description length',
        'review' : 'Invalid review length'
    };

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
            title.classList.remove("is-invalid", "is-valid");
            return;
        }

        if (titleValue[0] !== titleValue[0].toUpperCase()) {
            showError(title, "El nombre de la prenda debe empezar por Mayúsucla.");
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
        }

        showSucces(input, "");
        return true;
    }