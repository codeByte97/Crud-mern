const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Schema = require('./schema');
mongoose.connect("mongodb://127.0.0.1:27017/Crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
    console.log('Connection established')
).catch((err) => console.log(err));
app.post('/AddData', async (req, res) => {
    const data = req.body;
    const Product = new Schema.Product({
        productName: data.productName,
        Pid: data.pid,
        Price: data.Price,
        Quantity: data.Quantity,
    });
    try {
        const find = await Schema.Product.findOne({ Pid: data.pid });
        if (find !== null) {
            res.send({ message: "Pid Already exists", status: 422 });
        } else {

            Product.save();
            res.send({ message: "Added Data", status: 200 });
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/GetData', async (req, res) => {
    const result = await Schema.Product.find();
    res.send({ status: 200, Data: result });
});
app.delete('/DeleteProduct', async (req, res) => {
    const data = req.body;
    const result = await Schema.Product.findOneAndDelete({ Pid: data.pid });

    if (result !== null) {
        res.send({ status: 200, message: "Item deleted" });
    }
    else {
        res.send({ status: 422, message: "Product do not exists" });
    }
});
app.post('/UpdateData', async (req, res) => {
    const data = req.body;
    const result = await Schema.Product.findOneAndUpdate({
        Pid: data.pid,
    }, {
        "$inc": {
            Quantity: data.Quantity
        }, Price: data.Price, productName: data.productName
    }, { new: true });
    if (result !== null) {
        res.send({ status: 200, message: "Item Updated" });
    }
    else {
        res.send({ status: 422, message: "Product do not exists" });
    }
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});