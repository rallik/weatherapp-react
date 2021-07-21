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
                res.json(response.data);
            })
            .catch(error => {
                res.json(response.data.cod);
                console.log(error);
                console.log('search location error');
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