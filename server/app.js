const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(cors());
app.use(express.json({
  type: ['application.json']
}));

const port = process.env.PORT || 5501;

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const KEY = process.env.REACT_APP_API_KEY;
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let apiKey =`&appid=${KEY}`;
let units = '&units=imperial';
let searchLoc, apiLoc, apiUrl;

app.post('/search-loc', (req, res) => {
  console.log(req.body.loc)

  if (req.body.loc) {
      let locChrFilter = req.body.loc.toLowerCase().replace(/[^a-zA-Z -]/g, "");
      console.log(locChrFilter)
      searchLoc = locChrFilter
      res.json("Location Recieved")
  } else {
      res.json("Location NOT Recieved")
  }
});


app.get('/weather', (req, res) => {
    if(searchLoc) {
        apiLoc = `q=${searchLoc}`;
        apiUrl = baseUrl + apiLoc + apiKey + units;

        axios.get(apiUrl)
            .then(response => {
                console.log(response.data.cod)
                console.log(response.data)
                res.json(response);
            })
            .catch(error => {
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }

                res.json({ cod: '404', message: 'city not found' })
            });
    } else {
        res.json("Invalid Location")
    }
})





// let test = 'dub';
// let ret = cities.filter((cit) => {
//   return cit.name.slice(0, test.length - 1) === test;
// })

// console.log(por)