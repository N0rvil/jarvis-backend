const unirest = require("unirest");
const axios = require('axios');

exports.getWeather = (req, res, next) => {
    const lat = req.body.lat
    const lng = req.body.lng

    // NOT MY CONDE !!!
    englishCityName = (strAccents) => {
        var strAccents = strAccents.split('');
        var strAccentsOut = new Array();
        var strAccentsLen = strAccents.length;
        var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        for (var y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) != -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            } else
                strAccentsOut[y] = strAccents[y];
        }
        strAccentsOut = strAccentsOut.join('');
        return strAccentsOut;
    }

     axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=777184c58d364f3fa3c3e21e18f75e27`)
     .then(response => {

         if (response) {
             let town = '';
             if(response.data.results[0].components.town) {
                town = englishCityName(response.data.results[0].components.town);
             } else {
                town = englishCityName(response.data.results[0].components.village);
             }
            
            var request = unirest("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json");

         request.query({
             "q": town,
             "days": "3"
         });
         
         request.headers({
             "x-rapidapi-key": "31b538c6cdmsh1d0f0d9c7588b1dp11f8d7jsn9f3f66e3ebc1",
             "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
             "useQueryString": true
         });
         
         request.end((response) => {
             if (response.error) {
                console.log(response.error)
             } else  {
                res.json({ 
                    town: response.body.location.name,
                    temperature: response.body.current.temp_c,
                    icon: response.body.current.condition.icon,
                    windspeed: response.body.current.wind_kph,
                    pressure: response.body.current.pressure_mb
                })
             }
             // console.log(response.body.forecast.forecastday) // forecast for 3 days foreward very interesting could be use for weather prediction page                  
         });
         } else {
             console.log(response.error)
         }       
     })
}



