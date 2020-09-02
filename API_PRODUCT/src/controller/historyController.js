// Destructur Model
const {
    getAllModel,
    getdetailModel,
    insertModel,
    updateModel,
    deleteModel
} = require('../model/historyModel');

const {
    success,
    failed,
    dataTable,
    notFound
} = require('../helper/respons');

const historyController = {
    getAllCtr: (req, res) => {
        const where = !req.query.where ? 'orders_date' : req.query.where;
        const name = !req.query.name ? '' : req.query.name;
        const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy
        const sort = !req.query.sort ? 'ASC' : req.query.sort

        // Pagination
        const jmlhDataPerhalaman = !req.query.limit ? 5 : parseInt(req.query.limit);
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
        getdetailModel(id)
            .then((result) => {
                if (result.length < 1) {
                    notFound(res, result, 'Data Not Found')
                }
                success(res, result, 'Get Detail History Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    insertCtr: (req, res) => {
        const body = req.body;
        insertModel(body)
            .then((result) => {
                success(res, result, 'Insert History Success');
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
                success(res, result, 'Update History Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    deleteCtr: (req, res) => {
        const id = req.params.id;
        deleteModel(id)
            .then((result) => {
                success(res, result, 'Delete History Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    }
}

module.exports = historyController;