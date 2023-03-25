function loadCountryData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((json) => displayCountry(json));
}

loadCountryData();

function displayCountry(data) {
  const country_container = document.getElementById("country_container_id");
  for (const country of data) {
    // console.log(country.cca2);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
         <div class="card">
         <img height="200px" src=${
           country.flags.png
         } class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${country.name.common}</h5>
           <p class="card-text">${country.timezones.slice(0, 5)}</p>
           <p class="card-text">population${country.population}</p>
           <p class="card-text">region: <span class="fs-3">${
             country.region
           }</span></p>
           <button onClick="displayClickDetails('${
             country.cca2
           }')"  class="btn btn-success">Details</button>
         </div>
       </div>
         `;
    country_container.appendChild(div);
  }
}

function displayClickDetails(countryId) {
  // console.log(countryId);
  fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
    .then((res) => res.json())
    .then((json) => clickDisplayCountryCode(json[0]));
}

function clickDisplayCountryCode(data) {
  const details_container = document.getElementById("details_id_container");
  details_container.innerHTML = `
   <div>
   <img width="250px" height="250px" src=${data.flags.png}  alt="...">
   </div>
         <div>
         <h5 class="card-title">${data.name.common}</h5>
         <p class="card-text">${data.timezones[0]}</p>
         <p class="card-text">population: ${data.population}</p>
         <p class="card-text">fifa: ${data.fifa}</p>
         <p class="card-text">startOfWeek: ${data.startOfWeek}</p>
         <p class="card-text">Languages: ${
           data.languages.spa ? data.languages.spa : "Not pond Languages"
         }</p>
         <p class="card-text">region: <span class="fs-3">${
           data.region
         }</span></p>
         </div>
        `;
}
