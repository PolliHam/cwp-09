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

//TASK 1.2
const countries = ["Canada", "Germany", "France"]
let allPromises = [];
let nMale = 0;
let nFemale = 0;
for (let i=0; i<3; i++)
{
    allPromises.push(axios.get(`http://api.population.io:80/1.0/population/2017/${countries[i]}/`));
}

//Этот промис выполняется тогда, когда выполнены всего его элементы
Promise.all(allPromises)
    .then((res) => {
        console.log("\tTASK 1.2   Canada, Germany, France\t");
        res.forEach((element) => {
            element.data.forEach(group =>{
                nMale += group["males"];
                nFemale += group["females"];
            });
        });
        console.log("Суммарное количество мужчин: " + nMale);
        console.log("Суммарное колличество женщин: " + nFemale);
    }).catch((err) => {
    console.log(`Error TASK 1.2: ${err}`);
});

//TASK 1.3
let anyPromises = [];
const year= ["2014", "2015"];
for (let i=0; i<year.length; i++)
{
    anyPromises.push(axios.get(`http://api.population.io:80/1.0/population/${year[i]}/Belarus/`));
}

//обрабатывает "первый попавшийся"  промис
Promise.any(anyPromises).then((res) => {
    console.log("\tTASK 1.3\t  2014, 2015");
    res.data.forEach((element) => {
        if(element["age"] === 25){
            console.log(`Year: ${element["year"]}, males: ${element["males"]}, females: ${element["females"]}`);
        }
    });
}).catch((err) => {
    console.log(`Error TASK 1.3: ${err}`);
});


