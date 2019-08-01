if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/a4a0d6f83bdbc66b011d32692b4fe253/${req.body.latitude},${req.body.longitude}?units=auto`;
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
    .catch(err => console.log('Something went wrong'));
})
app.listen(3000, () => {
    console.log('Server Started');
})