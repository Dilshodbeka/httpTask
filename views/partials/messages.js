const moment = require('moment')


function formatMsg(uName, text) {
    return  {
        uName,
        text,
        time: moment().format('h:mm a')
    }
}


module.exports = formatMsg