const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req,res) {
    const query = req.body.cityName
    const appKey = "df295e826dbfa677096fb9772bb376a7"
    const units = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&id=524901&appid="+appKey+"&units="+units
    
    https.get(url, function(response){

        response.on("data", function(data){
            
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<h1>The temperature in "+query+" is "+temp+" degrees. </h1>")
            res.write("<img src="+imgurl+">")
            res.write("<p>"+desc+"</p>")
            res.send()
        })
    })
})

    


app.listen(3000, function(res){
    console.log('Server is running on port 3000 ')
})