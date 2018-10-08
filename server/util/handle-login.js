const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login',function (req,res,next) {
    axios.post(`${baseUrl}/accesstoken`,{
        accesstoken: req.body.accessToken
    })
    .then(resp => {
        if(resp.status === 200 && resp.data.success){
            req.session.user = {
                accessToken:req.body.accessToken,
                loginname: resp.data.loginname,
                id: resp.data.id,
                avatarUrl: resp.data.avatar_url
            }
            console.log('session',req.session.user)
            res.json({
                success:true,
                data: resp.data
            })
        }
    })
    .catch(err => {
        if(err.response){
            res.json({
                success: false,
                data: err.response.data
            })
        }else{
            next(err)
        }
    })
})

module.exports = router