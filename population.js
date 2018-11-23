const Promise = require('bluebird');
const axios = require('axios'); //Axios — это JavaScript-библиотека для выполнения либо HTTP-запросов в Node.js, либо XMLHttpRequests в браузере

//TASK 1.1
axios.get('http://api.population.io:80/1.0/population/2017/Belarus/')
    .then((res) => {
        console.log("\t TASK 1.1 URL - http://api.population.io:80/1.0/population/2017/Belarus/\t");
        let count=0;
        res.data.forEach(element => {
            count+=element["total"];
        });
        console.log('Колличество всех людей: ' + count);

    }).catch((err) => {
    console.log(`Error TASK 1.1: ${err}`);
});

