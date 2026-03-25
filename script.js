const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');
const spinner = document.getElementById('loading-spinner');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

searchInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        const query  = searchInput.value.trim();
        if(query) fetchRecipes(query);
    }
});

async function fetchRecipes(query) {

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
    //Close modal when "X" is clicked
    closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

    // Close modal if user clicks outside the white box
    window.onclick = (event) =>{
        if(event.target == modal) modal.style.display = "none";
    }

function displayRecipes(meals) {
    recipeContainer.innerHTML = ""; 
    if (!meals) {
        recipeContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
        return;
    }
    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img" >
            <h3>${meal.strMeal}</h3>
            <p>${meal.strCategory} | ${meal.strArea}</p>
            <button class="view-btn">View Recipe</button>
        `;

         // Click events for both image and button
        card.querySelector('.view-btn').onclick = () => showRecipeModal(meal);
        card.querySelector('.recipe-img').onclick = () => showRecipeModal(meal);

        recipeContainer.appendChild(card);
    });
}

function showRecipeModal(meal){

     let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }

    modalBody.innerHTML=`
     <div class="modal-header">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="modal-main-content">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-info">
                <h3>Category: ${meal.strCategory}</h3>
                <h3>Origin: ${meal.strArea}</h3>
            </div>
        </div>
        <div class="modal-details">
            <h3>Instructions:</h3>
            <p style="white-space: pre-line;">${meal.strInstructions}</p>
        </div>
    `;
    modal.style.display = 'flex'; 
}
// Close modal logic
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};
