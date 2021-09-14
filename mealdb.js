const  input = document.getElementById("search-field");
const button =document.getElementById('button');
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter"){
      // Trigger the button element with a click
       button.click();
    }
  });


const searchFood=() =>{
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    if(searchText ==''){
        searchResult="Please search your meal"
        console.log(searchResult)
    }
    else{
        console.log(searchText)
    }
    searchField.value="";
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaysearchfood(data.meals))
}

const displaysearchfood=meals =>{
    const searchResult =document.getElementById('search-result')
    searchResult.textContent='';
    if(meals.length ==0){
        console.log('show no result found')
    }
    meals.forEach(meal => {
        const div =document.createElement('div')
        div.classList.add('col');
        div.innerHTML=`
        <div onclick="loadMealId(${meal.idMeal})" class="card shadow-lg p-3 rounded">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
          </div>
        </div
        `;
        searchResult.appendChild(div);
    });
}

const loadMealId =mealId => {
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then (data => displayMealDetail(data.meals[0]));
}

const displayMealDetail =meal =>{
    const mealDetali =document.getElementById('meal-detailes ')
    const div =document.createElement('div')
    div.classList.add('card')
    div.innerHTML=`
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetali.appendChild(div);
}