// Destructur Method yang ada di Model
const {
    getAllModel,
    getDetailModel,
    insertModel,
    updateModel,
    deleteModel,
    updatePacthModel
} = require('../model/productModel');
const {
    success,
    failed,
    notFound,
    dataTable
} = require('../helper/respons');
const {
    DB_HOST
} = require('../helper/env');

// Controller
const productController = {
    // Get All Data
    getAllCtr: (req, res) => {
        const where = !req.query.where ? 'product_name' : req.query.where
        const name = !req.query.name ? '' : req.query.name
        const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy
        const sort = !req.query.sort ? 'ASC' : req.query.sort
        // Pagination
        const jmlhDataPerhalaman = !req.query.limit ? 20 : parseInt(req.query.limit);
        const pagesActive = !req.query.pages ? 1 : parseInt(req.query.pages);
        const start = pagesActive === 1 ? 0 : (jmlhDataPerhalaman * pagesActive) - jmlhDataPerhalaman

        getAllModel(where, name, orderBy, sort, start, jmlhDataPerhalaman)
            .then((result) => {
                if (result.length < 1) {
                    notFound(res, result, 'Data Not Found')
                }
                const countData = result[0].count;
                const coundDatabase = {
                    totalRow: countData,
                    totalPages: Math.ceil(countData / jmlhDataPerhalaman),
                    pagesActive
                }
                dataTable(res, result, coundDatabase, `Get All Product Success`)

            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    // Detail data
    getDetailCtr: (req, res) => {
        const id = req.params.id_product;
        getDetailModel(id)
            .then((result) => {
                if (result.length < 1) {
                    notFound(res, result, 'Data Not Found')
                }
                success(res, result, 'Get Detail Product Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    // Insert Data
    insertCtr: (req, res) => {
        const body = req.body;
        body.image = req.file.filename;
        insertModel(body)
            .then((result) => {
                success(res, result, 'Insert Product Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    // Update Data
    updateCtr: (req, res) => {
        const id = req.params.id_product;
        const body = req.body;
        body.image = req.file;

        updateModel(body, id)
            .then((result) => {
                success(res, result, 'Update Product Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    // Delete Data
    deleteCtr: (req, res) => {
        const id = req.params.id_product;
        deleteModel(id)
            .then((result) => {
                success(res, result, 'Delete Product Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    updatePatch: (req, res) => {
        const id = req.params.id_product;
        const body = req.body;
        body.image = !req.file ? '' : req.file.filename;
        updatePacthModel(body, id)
            .then((result) => {
                success(res, result, 'Update Patch Product Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    }
}

module.exports = productController;