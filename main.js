const conutiresURL = 'https://restcountries.com/v2/all'

function fetchingCapitalsAndCountries(data) {
    for (let i = 0; i < data.length; i++) {

        //adding flag
        let flagDiv = document.createElement('div')
        flagDiv.className = 'gallery'
        document.getElementsByClassName('contain')[0].appendChild(flagDiv)
        let img = new Image()
        img.src = data[i].flags.svg
        document.getElementsByClassName('gallery')[i].appendChild(img)

        // adding capital
        let capitalSpan = document.createElement('div')
        let capital = document.createTextNode(data[i].capital)
        capitalSpan.className = 'desc'
        capitalSpan.appendChild(capital)
        document.getElementsByClassName('gallery')[i].appendChild(capitalSpan)

        //adding get data button
        let button = document.createElement('button')
        let btnText = document.createTextNode('Get Data')
        button.className = 'dataButton'
        button.appendChild(btnText)
        document.getElementsByClassName('gallery')[i].appendChild(button)

        //function to fetch weather data
        document.getElementsByClassName('dataButton')[i].addEventListener("click", function () {
            let apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + data[i].capital + '&appid=42f39e3e2ac68bc692555095220b7567'
            let weatherData = (apiCall) => {
                fetch(apiCall, {
                    method: "GET"
                })
                    .then((wData) => wData.json())
                    .then((response) => {
                        alert("Country : " + data[i].name + "\nDescription : " + response.weather[0].description + "\nCityName : " + response.name + "\nTemperature : " + response.main.temp + "\nPressure : " + response.main.pressure + "\nHumidity : " + response.main.humidity);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            weatherData(apiCall);
        })
    }
}

let fetchWeather = (url) => {
    fetch(url, {
        method: "GET",
    })
        .then((data) => data.json())
        .then((response) => {
            fetchWeather(response)
        })
        .catch((error) => {
            console.log(error);
        });
}

//function to fetch capital data
let fetchCapitalsAndCountries = (url) => {
    fetch(url, {
        method: "GET",
    })
        .then((data) => data.json())
        .then((response) => {
            fetchingCapitalsAndCountries(response)
        })
        .catch((error) => {
            console.log(error);
        });
}

fetchCapitalsAndCountries(conutiresURL)