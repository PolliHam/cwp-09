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


//TASK 1.4
//Возвращает обещание, которое выполняется, когда выполняются все свойства объекта или значения «карты».
Promise.props({
    greeceM: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Greece/male/0/today/`),
    turkeyM: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Turkey/male/0/today/`)
    greeceF: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Greece/female/0/today/`),
    turkeyF: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Turkey/female/0/today/`)
}).then((result) => {
    console.log("\tTASK 1.4\t   Greece, Turkey");

    let ageGM = 0;
    let mpGM = -100;
    result.greeceM.data["mortality_distribution"].forEach(element=>{
        if(element["mortality_percent"] > mpGM){
            mpGM =element["mortality_percent"];
            ageGM = element["age"];
        }
    });
    console.log(`Возраст наибольшей смертности мужчин Греции: ${ageGM}`);

    let ageGF = 0;
    let mpGF = -100;
    result.greeceF.data["mortality_distribution"].forEach(element=>{
        if(element["mortality_percent"] > mpGF){
            mpGF =element["mortality_percent"];
            ageGF = element["age"];
        }
    });
    console.log(`Возраст наибольшей смертности женщин Греции: ${ageGF}`);

    let ageTM = 0;
    let mpTM = -100;
    result.turkeyM.data["mortality_distribution"].forEach(element=>{
        if(element["mortality_percent"] > mpTM){
            mpTM =element["mortality_percent"];
            ageTM = element["age"];
        }
    });
    console.log(`Возраст наибольшей смертности мужчин Турции: ${ageTM}`);

    let ageTF = 0;
    let mpTF = -100;
    result.turkeyF.data["mortality_distribution"].forEach(element=>{
        if(element["mortality_percent"] > mpTF){
            mpTF =element["mortality_percent"];
            ageTF = element["age"];
        }
    });
    console.log(`Возраст наибольшей смертности женщин Турции: ${ageTF}`);
}).catch((err) => {
    console.log(`Error TASK 1.4 :${err}`);
});

