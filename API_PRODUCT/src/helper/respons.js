const response = {
    success: (res, data, message) => {

        const result = {
            success: true,
            code: 200,
            status: 'OK',
            message: message,
            data: data
        }
        res.json(result);
    },
    dataTable: (res, data, tableRow, message) => {
        const result = {
            message,
            code: 200,
            status: 'OK',
            tableRow,
            data
        }
        res.json(result)
    },

    failed: (res, data, message) => {
        const eror = {
            success: false,
            code: 500,
            status: 'Error',
            message,
            data
        }
        res.json(eror);
    },
    notFound: (res, data, message) => {
        const eror = {
            success: false,
            code: 404,
            status: 'Not Found',
            message,
            data
        }
        res.json(eror)
    }

}
module.exports = response;