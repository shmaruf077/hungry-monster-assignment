const searchBtn = document.getElementById("search-btn");
const resultBox = document.getElementById("result-container");
const detailsBox = document.getElementById("meal-details-box");

function getMealItems () {
    let searchInputText = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {

                html += `
                <div class="meal-container col-md-3 my-3">
                    <div class="card shadow-lg" style="width: 16rem; height:25rem">
                        <img src=" ${meal.strMealThumb} " class="card-img-top"  alt="...">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title text-center"> ${meal.strMeal} </h5>
                            <a id="${meal.idMeal}" href="#" class="btn btn-danger btn-details d-block w-50 mx-auto mt-3">Details</a>
                        </div>
                    </div>
                </div>
                `
                resultBox.innerHTML = html;
            })
        } else {
            resultBox.innerHTML = ` <h3 class="text-center text-danger">Sorry no Items found ... 🙏 </h3> `
        }

    } )
}

searchBtn.addEventListener('click', getMealItems);
document.getElementById("search-input").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getMealItems();
      }
    });



function getDetails (event) {
    event.preventDefault();
    if ( !isNaN(event.target.id) ) {
        document.getElementById("meal-search-result-box").style.display= "none";
        document.getElementById("search-area").style.display= "none";
        targetId = event.target.id ;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${targetId}`)
        .then( response => response.json())
        .then( data => {
            let detailObj = data.meals[0] ;

            let html = `
            <div class="container">
                <div class=" d-block w-50 mx-auto shadow-lg rounded-3">
        
                    <img id="meal-img-lg" src="${detailObj.strMealThumb}" alt="meal-image"
                        class="img img-fluid rounded-top" >
        
                    <div class="details-list p-4">
                        <h3>${detailObj.strMeal}</h3>
                        <h5 class="text-muted mt-4">Ingredients</h5>
                        <ul class="list-unstyled mt-3">
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient1}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient2}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient3}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient4}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient5}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient6}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient7}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient8}</li>
                            <li><i class="fas fa-check-square"></i>${detailObj.strIngredient9}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `
            detailsBox.innerHTML = html ;
        });

        document.getElementById("meal-details-box").style.display= "block";

    } else {
        
    }
}


resultBox.addEventListener('click', getDetails);