function valid() {
    const forErrCode = {
        ERR_USER_ID: 0,
        ERR_USER_PWD: 1,
        ERR_PAGE_NUM: 2
    }
    function getSession(user) {
        return new Promise((resolve, reject) =>{
            if(user !== undefined) {
                return resolve(user)
            } else {
                return reject(forErrCode['ERR_USER_ID'])
            }
        })
    }
    
    function existPageNumber(numId) {
        return new Promise((resolve, reject) =>{ 
            if(Number.isNaN(numId)) {
                return reject(forErrCode['ERR_PAGE_NUM'])
            } else {
                return resolve(numId)
            }
        })
    }
    return {
        getSession, existPageNumber
    }
}

module.exports = valid()