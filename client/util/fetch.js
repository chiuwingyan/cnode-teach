import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

export const get = (url,param) => {
    //console.log('url',url)
    let params = param || {}
    return new Promise ((resolve,reject) => {
        console.log('axios')
        axios({
            method:'get',
            url,
            params,
        }).then((resp) => {
            console.log('resp1', resp)
            const data = resp.data;
            if(data && data.success === true){
                resolve(data)
            }else{
                reject(data)
            }
        }).catch((err) => {
            if(err.response){
                reject(err.response.data)
            }else{
                reject({
                    sucess:false,
                    err_msg:err.message
                })
            }
        })
    })
}

export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data:params,
        }).then((resp) => {
            const data = resp.data;
            if (data && data.success === true) {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch((err) => {
            if (err.response) {
                reject(err.response.data)
            } else {
                reject({
                    sucess: false,
                    err_msg: err.message
                })
            }
        })
    })
}