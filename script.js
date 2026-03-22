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
    //Close modal when "X" is clicked
    closeBtn.onclick = () => modal.style.display = "none";

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
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strCategory} | ${meal.strArea}</p>
            <button class="view-btn">View Recipe</button>
        `;

        card.querySelector('.view-btn').addEventListener('click',()=>{
            showRecipeModal(meal);
        });


        recipeContainer.appendChild(card);
    });
}

function showRecipeModal(meal){
    modalBody.innerHTML=`
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" style="width:100%; border-radius:10px;" >
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    `;
}
