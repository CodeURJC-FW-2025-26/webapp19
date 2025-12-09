// Scroll infinito
    let currentPage = 1;
    let isLoading = false;
    let hasMore = true;
    // Leer valores de consulta desde el DOM (renderizados por el servidor)
    const productsContainer = document.getElementById('products-container');
    const queryText = productsContainer?.dataset?.text || '';
    const queryCategory = productsContainer?.dataset?.category || '';

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