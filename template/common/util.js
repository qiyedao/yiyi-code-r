/**
 * util
 */
const util = {
    setCookie: (name, value, expires) => {
        expires = expires || 30*24*60*60*1000
        let date = new Date()
        date.setTime(date.getTime() + expires)
        expires = "; expires=" + date.toUTCString()
        document.cookie = name + "=" + (value || "")  + expires + "; path=/"
    },

    getCookie: name => {
        let nameEQ = name + "="
        let ca = document.cookie.split(';')
        for(let i=0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
        }
        return null
    },

    addColumnWidth: columns => {
        for (let item of columns) {
            item.width = `${(1/columns.length * 100).toFixed(4)}%`
        }
        return columns
    },

    getElementTop: element => {
        let actualTop = element.offsetTop
        let current = element.offsetParent
        while (current !== null){
            actualTop += current.offsetTop
            current = current.offsetParent
        }
        return actualTop
    },

    getTableHeight: table => {
        let clientHeight = document.body.offsetHeight
        return clientHeight - util.getElementTop(table) - 110
    },

    getQuery: (name, url) => {
        if (!url) {
            url = window.location.href
        }
        name = name.replace(/[\[\]]/g, '\\$&')
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        let results = regex.exec(url)
        if (!results) {
            return null
        }
        if (!results[2]) {
            return ''
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },
}
export default util


