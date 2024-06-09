const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'api_key'

const diffKelvin = 273.15
document.getElementById('searchButton').addEventListener('click', () => {

    const city = document.getElementById('cityInput').value

    if(city){
        //llamar a la API que nos da la informacion del clima
        fetchWeather(city)
    } else {

        alert ('Ingrese una ciudad valida')
    }
})

//FUNCION PARA LLAMAR LOS DATOS DE LA API DEL CLIMA
function fetchWeather(city){
    //Esto sale desde la pagina del API y se reemplazan la variables city y API_KEY
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => showWeatherData(data))//esto mostrara en la pantalla via HTML los datos
    .catch(error => {
        alert(error.message);
    });
}

// Funcion para mostrar los datos del clima

function showWeatherData(data){

    const divResponsData = document.getElementById('responseData')
    divResponsData.innerHTML = ''

//se crea una variable para llamar a name que es la variable que almacena el nombre de la ciudad en la api
    const cityName = data.name
//se crea una variable para llamar a name que es la variable que almacena el nombre del pais en la api
    const countryName = data.sys.country
//se crea una variable para llamar a name que es la variable que almacena el nombre del temperatura en la api
    const temp = data.main.temp
//se crea una variable para llamar a name que es la variable que almacena el nombre del humedad en la api
    const humidity = data.main.humidity
//se crea una variable para llamar a name que es la variable que almacena el nombre de la descripción en la api
    const description = data.weather[0].description
//se crea una variable para llamar a name que es la variable que almacena del icono en la api
    const icon = data.weather[0].icon


//se crean elementos en el DOM para mostrar la información

const cityInfo = document.createElement('h2')
cityInfo.textContent = (`${cityName}, ${countryName}`)

const tempInfo = document.createElement('p')
// Dado que le temperatura de la api es dada en Kevin es necesario usar Math.floor para realizar 
//el redondeo por debajo y hacer la diferencia para que quede en grados centigrados
tempInfo.textContent = (`La temperatura es: ${Math.floor(temp-diffKelvin)}°C`)

const humidityInfo = document.createElement('p')
humidityInfo.textContent = `La humedad es del ${humidity}%`

//se crea un elemento de img y se utiliza el link de la documentación de la api para mostrar de la imagen
const icoInfo = document.createElement('img')
icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

const descriptionInfo = document.createElement('p')
descriptionInfo.textContent = `La descripción meteorológica es ${description}`


//se agregan los elementos al div(divResponsData) que creamos para mostrar la información utilizando appendChild

    divResponsData.appendChild(cityInfo)
    divResponsData.appendChild(tempInfo)
    divResponsData.appendChild(humidityInfo)
    divResponsData.appendChild(icoInfo)
    divResponsData.appendChild(descriptionInfo)
}

