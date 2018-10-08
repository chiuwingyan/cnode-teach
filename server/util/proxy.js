const axios = require('axios')

const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
    const path = req.path
    const user = req.session.user || {}
    const needAccessToken = req.query.needAccessToken
   console.log('body',req.body)
    // console.log('user', querystring.stringify(Object.assign({}, req.body, {
    //     accesstoken: user.accessToken
    // })));
   // console.log('test')
    if (needAccessToken && !user.accessToken) {
        res.status(401).send({
            success: false,
            msg: 'need login'
        })
    }

    const query = Object.assign({}, req.query, {
        accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
    })
    if (query.needAccessToken) delete query.needAccessToken

    axios(`${baseUrl}${path}`, {
        method: req.method,
        params: query,
        data: querystring.stringify(Object.assign({}, req.body, {
            accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
        })),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(resp => {
        console.log('resp',resp)
        if (resp.status === 200) {
            res.send(resp.data)
        } else {
            res.status(resp.status).send(resp.data)
        }
    }).catch(err => {
        console.log('err',err)
        if (err.response) {
            res.status(501).send(err.response.data)
        } else {
            res.status(500).send({
                success: false,
                msg: '未知错误'
            })
        }
    })
}
