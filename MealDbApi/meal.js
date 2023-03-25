document.getElementById("search_button").addEventListener("click", () => {
  const inputFliedText = document.getElementById("search_input_id");
  const searchFliedValue = inputFliedText.value;
  if (searchFliedValue) {
    inputFliedText.value = "";

    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFliedValue}`
    )
      .then((res) => res.json())
      .then((json) => displayFoodUi(json.meals));

    //---------------------
  } else {
    alert("Please  search by food input flied");
  }
});

function displayFoodUi(data) {
  const meal_container = document.getElementById("meal_container");
  //   old cart ""
  //   meal_container.innerHTML = "";
  meal_container.innerText = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="border p-3">
    <img width="300px" height="200px" src=${
      element.strMealThumb
    } class="img-fluid" alt="...">
    <p>${element.strCategory}</p>
    <p>${element.strInstructions.slice(0, 30)}</p>  
<button onClick="displayDetailsProduct('${
      element.idMeal
    }')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#simaModalSoiden">
  Details Product 
</button>

 
  <div>
        `;
    meal_container.appendChild(div);
  });
}
// details ===================
// function displayDetailsProduct(id) {
//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//     .then((res) => res.json())
//     .then((json) => loadIdDetailsProductUi(json.meals[0]));
// }

//======= details======async function ============
async function displayDetailsProduct(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();

  loadIdDetailsProductUi(data.meals[0]);
}
// ----------------------------------------------

// details ui  load
function loadIdDetailsProductUi({
  strCategory,
  strMealThumb,
  strMeal,
  strArea,
}) {
  const modalBodyContent_container = document.getElementById(
    "modal_body_id_content_container"
  );
  //
  document.getElementById("modal_tittle_id").innerHTML = strMeal;

  modalBodyContent_container.classList.add("p-5");
  modalBodyContent_container.innerHTML = `
  <img width="300px" height="200px" src=${strMealThumb} alt="" />
 <p>strCategory: ${strCategory}</p>
 <p>strCategory: ${strMeal}</p>
 <p>strCategory: ${strArea}</p>
 `;
}
