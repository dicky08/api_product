// Destructur Model
const {
    getAllModel,
    getDetailModel,
    insertModel,
    updateModel,
    deleteModel
} = require('../model/categoryModel');
// Import Helper
const {
    success,
    failed,
    notFound,
    dataTable
} = require('../helper/respons');

const categoryController = {

    getAllCtr: (req, res) => {
        const where = !req.query.where ? 'category_name' : req.query.where;
        const name = !req.query.name ? '' : req.query.name;
        const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy
        const sort = !req.query.sort ? 'ASC' : req.query.sort

        // Pagination
        const jmlhDataPerhalaman = !req.query.limit ? 10 : parseInt(req.query.limit);
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
    getDetailCtr: (req, res) => {
        const id = req.params.id;
        getDetailModel(id)
            .then((result) => {
                if (result.length < 1) {
                    notFound(res, result, 'Data Not Found')
                }
                success(res, result, 'Get Detail Category Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    insertCtr: (req, res) => {
        const body = req.body
        insertModel(body)
            .then((result) => {
                success(res, result, 'Insert Category Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    updateCtr: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateModel(body, id)
            .then((result) => {
                success(res, result, 'Update Category Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    deleteCtr: (req, res) => {
        const id = req.params.id;
        deleteModel(id)
            .then((result) => {
                success(res, result, 'Delete Category Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    }

}

module.exports = categoryController;