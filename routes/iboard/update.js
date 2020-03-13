const db = require('../../configs/dbconfig').getConnect()
const {imgTobase64} = require('../../lib/base64-decode')
const valid = require('../../lib/validRouter')

function pageUpdate() {
    
    function getPageData(pageId) {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ImgBoard WHERE id=?`, [pageId], function(err, results){
                if(err) throw err
                if(results.length < 1) {
                    reject('db-results-undefined')
                } else {
                    resolve(results[0])
                }
            })
        })
    }
    
    function update(req, res) {
        valid.getSession(req)
        .then(user => {
            return valid.existPageNumber(req.user)
        })
        .then(pageId => {
            return getPageData(parseInt(req.params.number, 10))
        })
        .then(result =>{
            
            res.render('iboard/iboard.update.ejs', result)
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