const options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];

const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const menuList = document.querySelector('#side-menu ul');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const recipesContainer = document.getElementById('recipes-container');
const recipeDetailContainer = document.getElementById('recipe-detail-container');
const closeBtn = document.getElementById('close-btn');
const recipeImg = document.getElementById('recipe-img');
const recipeTitle = document.getElementById('recipe-title');
const recipePublisher = document.getElementById('recipe-publisher');
const ingredientsList = document.getElementById('ingredients-list');

// Toggle side menu
menuToggle.addEventListener('click', () => {
  sideMenu.style.left = sideMenu.style.left === '-100%' ? '0' : '-100%';
  menuToggle.classList.toggle('text-white-50');
  menuToggle.classList.toggle('text-white');
});

// Populate side menu
options.forEach(option => {
  const listItem = document.createElement('li');
  listItem.classList.add('py-3', 'ps-3', 'border-bottom', 'fs-3', 'position-relative', 'hover-effect');
  listItem.setAttribute('id', option);
  listItem.innerHTML = `<span></span> <p>${option}</p>`;
  menuList.appendChild(listItem);
});

// Menu click event
menuList.addEventListener('click', event => {
  if (event.target.tagName === 'P') {
    fetchRecipes(event.target.innerText);
  }
  sideMenu.style.left = '-100%';
});

// Fetch recipes from API
const fetchRecipes = async query => {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    const data = await response.json();
    displayRecipes(data.recipes, query);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

// Display fetched recipes
const displayRecipes = (recipes, query) => {
  recipesContainer.innerHTML = '';
  recipesContainer.parentElement.classList.remove('d-none');

  recipes.forEach(recipe => {
    const recipeBox = document.createElement('div');
    recipeBox.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'recipe-box');
    recipeBox.innerHTML = `
      <div class="card h-100 bg-dark text-light">
        <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">${recipe.publisher}</p>
        </div>
      </div>
    `;
    recipeBox.addEventListener('click', () => fetchRecipeDetails(recipe.recipe_id));
    recipesContainer.appendChild(recipeBox);
  });
};

// Fetch recipe details
const fetchRecipeDetails = async id => {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    const data = await response.json();
    displayRecipeDetails(data.recipe);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
};

// Display recipe details
const displayRecipeDetails = recipe => {
  recipeImg.src = recipe.image_url;
  recipeTitle.innerText = recipe.title;
  recipePublisher.innerText = `Publisher: ${recipe.publisher}`;
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.innerText = ingredient;
    ingredientsList.appendChild(listItem);
  });
  recipeDetailContainer.classList.remove('d-none');
};

// Close recipe details
closeBtn.addEventListener('click', () => {
  recipeDetailContainer.classList.add('d-none');
});

// Search functionality
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  } else {
    searchInput.classList.add('is-invalid');
  }
});

// Remove invalid class on input change
searchInput.addEventListener('input', () => {
  if (searchInput.classList.contains('is-invalid')) {
    searchInput.classList.remove('is-invalid');
  }
});
