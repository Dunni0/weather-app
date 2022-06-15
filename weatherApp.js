const api = {
    key: "e414e5241b82d4b85a23ff0ce42a66e7",
    base: "https://api.openweathermap.org/data/2.5/",
}

const search = document.querySelector(".search");

(function(){
    
    const btn = document.querySelector(".button");
    btn.addEventListener("click", getInput);

    function getInput(event){
        event.preventDefault();
        if(event.type == "click"){
               getData(search.value);
        }
    }

    document.addEventListener("keypress",function(){
       if(event.charCode==13|| event.which==13){
          event.preventDefault();
          getData(search.value);
        }
    })
    
})();

function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }) .then(displayData)
}

function displayData(response){
      if(response.cod == "404"){
        const error = document.querySelector(".error");
        error.textContent = "please, enter a valid city.";
        search.value="";
      } else{
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;
        
        search.value="";

        document.querySelector(".error").textContent ="";
        
        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunc(today);

        const icon = document.querySelector("#icon");
        icon.innerHTML= `<i class="fas fa-cloud-moon"></i>`;

        const temp = document.querySelector("#temp");
        const temp2 = document.querySelector("#temperature");


        temp.innerHTML = `${Math.round(response.main.temp)}℃ `;
        temp2.innerHTML = `Temperature: ${Math.round(response.main.temp)} <span> ℃ </span>`;

        const weather = document.querySelector("#weather2");
        const weather2 = document.querySelector(".weather");
        
        weather.innerHTML = `Weather: ${response.weather[0].main}`;
        weather2.innerHTML = `${response.weather[0].main}`;

        const tempRange = document.querySelector(".tempRange")
        tempRange.innerHTML = `Temperature Range: ${Math.round(response.main.temp_min)}℃ /
                              ${Math.round(response.main.temp_max)}℃`;
      }
}

function dateFunc(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
                  "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday"];
    
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    
    return `${day},  ${date} ${month} ${year}`;
}

