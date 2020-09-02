// Import Database
const db = require('../config/db_product');

const historyModel = {

    getAllModel: (where, name, orderBy, sort, start, end) => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT history.id,cashier_name,orders_date,product_name,price,qty,amount, (SELECT COUNT(*) FROM history) as count FROM history RIGHT JOIN product ON product.id=history.id_product WHERE ${where} LIKE '%${name}%' ORDER BY ${orderBy} ${sort} LIMIT ${start},${end}`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    getdetailModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history WHERE id ='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },

    insertModel: (data) => {
        return new Promise((resolve, reject) => {
            let obj = {
                csName: data.cashier_name,
                date: data.orders_date,
                id_product: data.id_product,
                qty: data.qty,
                amount: data.amount
            }
            const {
                csName,
                date,
                id_product,
                qty,
                amount
            } = obj;
            db.query(`INSERT INTO history (cashier_name,orders_date,id_product,qty,amount)
                      VALUES('${csName}','${date}','${id_product}','${qty}','${amount}')`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    updateModel: (data, id) => {
        return new Promise((resolve, reject) => {
            let obj = {
                csName: data.cashier_name,
                date: data.orders_date,
                id_product: data.id_product,
                qty: data.qty,
                amount: data.amount
            }
            const {
                csName,
                date,
                id_product,
                qty,
                amount
            } = obj;
            db.query(`UPDATE history SET
                    cashier_name = '${csName}',
                    orders_date  = '${date}',
                    id_product   = '${id_product}',
                    qty          = '${qty}',
                    amount       = '${amount}'
                    WHERE id     = '${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    deleteModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    }
}


// Export Modul
module.exports = historyModel;