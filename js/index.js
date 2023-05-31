const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('result');

let search = "";
let recipes = [];

const fetchRecipes = async () => {
	recipes = await fetch(
	`https://api.edamam.com/api/recipes/v2?type=public&app_id=54520d7e&app_key=e3b4bb13f78c2fa59d808b03bba5c284&imageSize=REGULAR&q=${search}`
	).then((res) => res.json());
	console.log(recipes);
	
};

const RecipesDisplay = async () => {
	await fetchRecipes();
	
	recipes.hits.length = 12;

	result.innerHTML = recipes.hits.map((Recipe) => 
	`
		<li>
			<h2>${Recipe.recipe.label}</h2>
			<div class="card-content">
				<img src=${Recipe.recipe.image}></img>
				<div class="infos">
					<p>${Recipe.recipe.ingredientLines}</p>
					<p><a href=${Recipe.recipe.url.replace(/"/g, '')}" target="_blank">Recipe</a> </p>
				</div>
			</div>
		</li>
	`
).join("");

};
fetchRecipes();

form.addEventListener('submit', (e) => {
	e.preventDefault();
	search = searchInput.value;
	RecipesDisplay();
});