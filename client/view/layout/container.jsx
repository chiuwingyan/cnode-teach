import React from 'react'

import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'

const styles={
    root:{
        margin:24,
        marginTop:'80px'
    }
}
const Container = ({classes,children}) => (
    <Paper elevation={4} className={classes.root}>
        {children}
    </Paper>
)

export default withStyles(styles)(Container)