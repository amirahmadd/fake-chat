import React from 'react'
import Slide from '@material-ui/core/Slide';
const IsTyping = ({check}) => {
    return (
        <Slide direction="down" in={check} mountOnEnter unmountOnExit>
            <div style={{direction:"ltr" , position:'relative'}}>fake user is typing ...</div>
        </Slide>
    )
}

export default IsTyping
