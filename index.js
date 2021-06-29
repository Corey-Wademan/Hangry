const express = require('express')
const PORT = 5001;
const axios = require('axios')
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT || PORT); 
console.log(`Server is listening on ${PORT}`); 

app.get()