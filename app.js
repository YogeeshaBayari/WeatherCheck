//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyPaser = require("body-parser");
const app = express();

app.use(bodyPaser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    // console.log(req.body.cityName);


    const query = req.body.cityName;
    const appid = "39e8edb687ab906b25644b7d0506638c"
    const unit = "metric";

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherdsptn = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The weather is " + weatherdsptn + "<p>");
            res.write(
                "<h1>The temperature in " + query + " is" + temp + "degree Celcius.</h1>"
            );
            res.write("<img src=" + image + ">");
            res.send();

            console.log(temp, weatherdsptn);
        });
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});
