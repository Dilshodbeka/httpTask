// imports
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const http = require('http');
const readline = require('readline')
const myKey = require('dotenv').config().parsed.KEY_ACCESS
// console.log(myKey);


//asking from user
rl.setPrompt('Name Of your City - ')
rl.prompt()
rl.on('line', (cityUser) => { 

    // variables
    const defaultCity = cityUser.toUpperCase()
    const url = `http://api.weatherstack.com/forecast?access_key=${myKey}&query=${defaultCity}`

    // error
    if (!cityUser) console.error('PLZ write the City')
    else {
        // http things
        http.get(url, (res) => {
            const statCod = res.statusCode
            if (statCod !== 200) {
                console.error(`Status code: ${statCod}`)
                return;
            }
            res.setEncoding('utf-8')
            let rawData = ''
            res.on('data', (chunk) => rawData += chunk)
            res.on('end', ()=> {
                let parsedData = JSON.parse(rawData)
                console.log('City',parsedData.location.name ,parsedData.forecast);
            }).on('error', (e) => console.error(`Got error : ${e.message}`))
        });
        rl.close(); 
    }
})