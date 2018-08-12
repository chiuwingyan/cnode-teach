import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

import TopList from 'view/topic-list/index'
import TopDetail from 'view/topic-detail/index'
export default ()=>[
    <Route path="/" render={() => <Redirect to="/list" />} exact/>,
    <Route ket="toplist" path="/list" component={TopList} />,
    <Route ket="topdetail" path="/detail" component={TopDetail} />
]