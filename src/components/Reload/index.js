import React from 'react'
import {
    Spinner
} from 'react-bootstrap';

function Reload() {


    return (
        <div style={{
            position: 'fixed',
            zIndex: 99999999,
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            background: 'rgba(175, 175, 175, 0.5)'
        }}>

            <div style={{
                position: 'absolute',
                width: '100%',
                top: '40%',
                textAlign: 'center'
            }}>
                <Spinner animation="border" style={{color: '#2AA9E0', width: 50, height: 50}} role="status" />
                <br></br>
                <h3 style={{color: '#2AA9E0'}}>Carregando...</h3>
            </div>


        </div>
    )
}

export default Reload;