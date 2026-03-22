const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');
const spinner = document.getElementById('loading-spinner');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {

    spinner.style.display = 'block';
    recipeContainer.innerHTML = "";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch(error){
        console.error("Fetch error:", error);
        recipeContainer.innerHTML ="<p>Something went wrong.Please try again later.</p>"
    } finally {
        spinner.style.display = 'none';
    }
    
}


function displayRecipes(meals) {
    
    if (!meals) {
        recipeContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
        return;
    }
    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strCategory} | ${meal.strArea}</p>
            <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
        `;
        recipeContainer.appendChild(card);
    });
}
