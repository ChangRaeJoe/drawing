const { promisify } = require('util')
const dbcofig = require('../../configs/dbconfig')
const db = dbcofig.getConnect()
const promisifyDB = promisify(db.query).bind(db)

const W_SIZE = 8;
const PAGE_SIZE = 5;

async function getVals(request, response) {
    const currentPage = request.query.page || 1

    if(isNaN(currentPage)) {
        return response.status(400).send()
    }

    function numOfPage() {
        const query = `SELECT COUNT(*) as cnt FROM Imgboard`
        return promisifyDB(query).then((results) => {
            return ((results[0].cnt - 1)/W_SIZE) + 1
        })
    }

    function getFrontPage() {
        return Math.max(1, ((currentPage-1)/PAGE_SIZE) * PAGE_SIZE + 1) 
    }

    function getBackPage() {
        return Math.min(frontPage + PAGE_SIZE -1, totalPage )
    }

    function getPrev() {
        if(frontPage <= 1) {
            return false
        } else {
            return true
        }
    }
    function getNext() {
        if(lastPage >= totalPage) {
            return false
        } else {
            return true
        }

    }

    const totalPage = await numOfPage()
    const frontPage = getFrontPage()
    const lastPage = getBackPage()

     console.log(W_SIZE, totalPage, frontPage, lastPage)

    const params =  {
        W_SIZE,
        PAGE_SIZE,
        totalPage,
        frontPage,
        lastPage,
        active : {
            prev: getPrev(),
            next: getNext()
        }
    }
    response.render('iboard/iboard.ejs', params)
}

module.exports = {
    getVals,
    W_SIZE,
    PAGE_SIZE
}