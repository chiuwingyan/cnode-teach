import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

export const get = (url,params) => {
    return new Promise ((resolve,reject) => {
        axios({
            method:'get',
            url,
            params,
        }).then((resp) => {
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
            if (data && data.sucess === true) {
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