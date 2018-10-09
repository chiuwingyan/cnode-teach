import React from 'react'

import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import { con } from './styles'

const Container = ({classes,children}) => (
    <Paper elevation={4} className={classes.root}>
        {children}
    </Paper>
)

export default withStyles(con)(Container)