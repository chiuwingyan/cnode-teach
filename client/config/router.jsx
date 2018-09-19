import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

import TopList from 'view/topic-list/index'
import TopDetail from 'view/topic-detail/index'
import TestApi from 'view/test/api-test'
export default ()=>[
    <Route  path="/" render={() => <Redirect to="/list" />} exact key="home" />,
    <Route path="/list" render={() => <Redirect to="/list?tab=all" />} component={TopList} key="toplist" />,
    <Route path="/detail" component={TopDetail} key="topdetail" />,
    <Route path="/test" component={TestApi} key="test" />,
]