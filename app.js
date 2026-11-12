import express from "express";
import * as fetcher from "./Database/fetcher.js"

const app = express();

app.use(express.json());

app.get("/api/equipment/:id", (req, res) => {
    const db = fetcher.getById(req.params.id);
    if (!db) return res.status(404).json({ "message": "Equipment not found." });
    return res.status(200).json(db);
})

app.get("/api/equipment/category/:category", (req, res) => {
    const db = fetcher.getByCategory(req.params.category);
    if (db.length == 0) return res.status(404).json({ "message": "Equipment not found." });
    return res.status(200).json(db);
})

app.put("/api/equipment/:id", (req,res) => {
    const inputs = req.body;
    const db = fetcher.getById(req.params.id);
    if (!db) return res.status(404).json({ "message": "Equipment not found." });

    if (inputs["name"] == undefined || inputs["name"] == "") return res.status(400).json({ "message": "Every field needs to be filled! (name was empty)" });
    if (inputs["category"] == undefined || inputs["category"] == "") return res.status(400).json({ "message": "Every field needs to be filled! (category was empty)" });
    if (inputs["brand"] == undefined || inputs["brand"] == "") return res.status(400).json({ "message": "Every field needs to be filled! (brand was empty)" });
    if (inputs["price"] === undefined) return res.status(400).json({ "message": "Every field needs to be filled! (price was empty)" });
    if (inputs["quantity"] === undefined ) return res.status(400).json({ "message": "Every field needs to be filled! (quantity was empty)" });

    if (Number.isNaN(inputs["price"]) || +inputs["price"] <= 0) return res.status(400).json({ "message": "The price needs to be a positive number!" });
    if (Number.isNaN(inputs["quantity"]) || +inputs["quantity"] < 0) return res.status(400).json({ "message": "The quantity needs to be a positive number or zero!" });


    const db2 = fetcher.put(req.params.id, inputs["name"], inputs["category"], inputs["brand"], inputs["price"], inputs["quantity"]);
    if (!db2) return res.status(500).json({ "message": "Something went wrong." });
    const db3 = fetcher.getById(req.params.id);
    if (!db3) return res.status(404).json({ "message": "Equipment not found." });
    return res.status(200).json(db3);
    
})

app.delete("/api/equipment/:id", (req, res) => {
    const db = fetcher.getById(req.params.id);

    if (!db) return res.status(404).json({ "message": "Equipment not found." });
    fetcher.deleteById(req.params.id);
    return res.status(200).json({ "message": "The delete was successful." })
})

app.listen(3000, () => console.log("Server is running!"))