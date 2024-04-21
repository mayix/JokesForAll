import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseURL = "https://v2.jokeapi.dev";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/any", async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/joke/Any?type=single`);
        const result = response.data;
        res.render("index.ejs", {
            data: result
        });
    } catch (error) {
        console.log(error);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.post("/byCategory", async (req, res) => {
    const category = req.body.category;
    try {
        const response = await axios.get(`${baseURL}/joke/${category}?type=single`);
        const result = response.data;
        res.render("index.ejs", {
            data: result
        });
    } catch (error) {
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
