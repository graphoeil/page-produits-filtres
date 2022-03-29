//////////////////////////////////////////////// Afficher les produits
//
// Conteur produits
const productsContainer = document.querySelector('.products-container');

// Copie de products, pas de référence mémoire, pour ne pas modifier l'original,
// cela permet de revenir à l'original durant le tri ,-)
let filteredProducts = [ ...products ];

// Affichage des produits
const displayProducts = () => {
	if (filteredProducts.length > 0){
		productsContainer.innerHTML = filteredProducts.map((product) => {
			const { id, title, company, image, price } = product;
			return(
				`<article data-id="${ id }" class="product">
					<img src="${ image }" class="product-img img" alt="${ title }">
					<footer>
						<h5 class="product-name">${ title }</h5>
						<span class="product-price">$${ price }</span>
					</footer>
				</article>`
			);
		}).join('');
	} else {
		productsContainer.innerHTML = `<h6>Sorry, no products matched your search...</h6>`;
	}
};
displayProducts();

//////////////////////////////////////////////// Filtrer via l'input
//
// Variables
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

// Auto complétion
let timerSearch;
form.addEventListener('keyup', () => {
	if (timerSearch){ clearTimeout(timerSearch); }
	timerSearch = setTimeout(() => {
		const inputValue = searchInput.value.toLowerCase();
		filteredProducts = products.filter((product) => {
			return product.title.toLowerCase().includes(inputValue);
		});
		displayProducts();
	},100);
});

//////////////////////////////////////////////// Filtrer via les companies
//
// Variables
const companiesDOM = document.querySelector('.companies');

// Afficher les boutons
const displayButtons = () => {
	const companies = products.map((product) => {
		return product.company;
	});
	const buttons = [ 'all', ...new Set(companies) ];
	companiesDOM.innerHTML = buttons.map((button) => {
		return(
			`<button class="company-btn" data-id="${ button }">${ button }</button>`
		);
	}).join('');
};
displayButtons();

// Events
companiesDOM.addEventListener('click', (e) => {
	if (e.target.classList.contains('company-btn')){
		if (e.target.dataset.id === 'all'){
			filteredProducts = [ ...products ];
		} else {
			filteredProducts = products.filter((product) => {
				return product.company === e.target.dataset.id;
			});
		}
	}
	// Clear search input
	searchInput.value = '';
	// Show products
	displayProducts();
});