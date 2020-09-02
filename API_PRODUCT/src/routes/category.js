const express = require('express');
const router = express.Router();
// Destructur Controller
const {
    getAllCtr,
    getDetailCtr,
    insertCtr,
    updateCtr,
    deleteCtr
} = require('../controller/categoryController');

router
    .get('/getAll', getAllCtr)
    .get('/getDetail/:id', getDetailCtr)
    .post('/insert', insertCtr)
    .put('/update/:id', updateCtr)
    .delete('/delete/:id', deleteCtr);

module.exports = router;