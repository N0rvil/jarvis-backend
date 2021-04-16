const axios = require("axios").default;

exports.getSelectedCrypto = async (req, res, next) => {
  const options = {
      method: 'GET',
      url: `https://coingecko.p.rapidapi.com/coins/${req.body.crypto}/market_chart`,
      params: {vs_currency: 'usd', days: req.body.time },
      headers: {
        'x-rapidapi-key': '31b538c6cdmsh1d0f0d9c7588b1dp11f8d7jsn9f3f66e3ebc1',
        'x-rapidapi-host': 'coingecko.p.rapidapi.com'
      }
    };
    
    axios.request(options)
    .then(response => {
      let prices = []
      let times = []
      response.data.prices.map((data, i) => {
        const price = data[1]
        const microtime = data[0]
        const date = new Date(microtime);
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()

        if (req.body.crypto === 'bitcoin' || req.body.crypto === 'ethereum') {
          prices.push(price.toFixed(2))
        } else {
          prices.push(price.toFixed(5))
        }
        if (req.body.time === 1 || req.body.time === '1') {
          let time = `${hour}:${minutes}--${day}.${month}.`
          times.push(time)
        } else {
          let time = `${day}.${month}.${year}`
          times.push(time)
        }
      })
      res.json({ prices: prices, times: times })
    }).catch(err => {
         console.error(err);
    });
}

exports.getCryptoData = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${req.body.crypto}/market_chart`,
    params: {vs_currency: 'usd', days: 1 },
    headers: {
      'x-rapidapi-key': '31b538c6cdmsh1d0f0d9c7588b1dp11f8d7jsn9f3f66e3ebc1',
      'x-rapidapi-host': 'coingecko.p.rapidapi.com'
    }
  };

  axios.request(options)
  .then(response => {
      let price = response.data[Object.keys(response.data)[0]].slice(-1)[0][1]
      let oldPrice =  Math.round(response.data[Object.keys(response.data)[0]][0][1] * 100) / 100 
      if (req.body.crypto === 'dogecoin') {
        oldPrice = oldPrice.toFixed(5)
        price = price.toFixed(5)
      } else {
        oldPrice = oldPrice.toFixed(2)
        price = price.toFixed(2)
      }
      const change =  (((price - oldPrice) / oldPrice) * 100).toFixed(2)
      
      console.log('crypto fetched')
             
      res.json({ price: price, change: change })
  }).catch(err => { 
       console.error(err);
  });
}