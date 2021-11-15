import React from 'react';
import Fab from '@mui/material/Fab';
import { BiArrowBack } from "react-icons/bi";


function ButtonReturn(props) {

    const {
        textButton,
        onClick
    } = props;

    return (
        <div style={{display: 'flex'}}> 
            <Fab style={{backgroundColor: '#2AA9E0'}} aria-label="add" onClick={onClick}>
                <BiArrowBack color="white" size={21}/>
            </Fab>
            <p style={{ margin: 15, fontSize: 20}}>{textButton}</p>
        </div>
    )
}
export default ButtonReturn