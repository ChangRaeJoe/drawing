const db = require('../../configs/dbconfig').getConnect()
const {imgTobase64} = require('../../lib/base64-decode')
const valid = require('../../lib/validRouter')

function pageUpdate() {
    
    function getPageData(pageId) {
        return db.query(`SELECT * FROM ImgBoard WHERE id=?`, [pageId])
    }
    
    function update(req, res) {
        valid.getSession(req)
        .then(user => {
            return valid.existPageNumber(req.user)
        })
        .then(pageId => {
            return getPageData(parseInt(req.params.number, 10))
        })
        .then(([results, fiedls]) =>{
            if(results.length < 1) {
                throw'db-results-undefined'
            } else {
                res.render('iboard/iboard.update.ejs', results[0])
            }
            
        })
        .catch(reason =>{
            console.log('err:', reason)
            res.status(400).send()
        })
    }
    return update
}


module.exports = {
    update: pageUpdate()
}