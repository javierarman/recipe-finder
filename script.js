const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    // Correct API URL structure for TheMealDB
    
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);


    const data = await response.json();
    displayRecipes(data.meals);
}


function displayRecipes(meals) {
    recipeContainer.innerHTML = ""; // Clear old results
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
