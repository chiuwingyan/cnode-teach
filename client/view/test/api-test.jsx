import React from 'react'

import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {

    getTopics() {
        axios.get('/api/topics')
            .then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
    }

    login() {
        axios.post('/api/user/login', {
            accessToken: '7547dbed-584b-4924-b9b8-aee9e5738679'
        }).then(resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    } 

    markAll() {
        axios.post('/api/message/mark_all?needAccessToken=true')
            .then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.getTopics}>topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        )
    }
}

