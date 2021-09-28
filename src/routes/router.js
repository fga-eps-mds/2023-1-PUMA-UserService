const { response } = require('express');
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouter')

router.get('/', (req, res) =>{
    res.json({
        Project: "Puma"
    });
});

module.exports = (app) => {
    app.use('/', [userRoutes]);
};
