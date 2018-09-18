import React from 'react'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
export default class Button extends React.Component{
    render(){
        const letterStyle ={
            backgroundColor: this.props.color,
            border: 'none',
            color: 'white',
            padding: '15px 15px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '10px'
        }
        return(
            <button style={letterStyle} onClick={() => this.props.click()}>{this.props.text}</button>
        )
    }
}