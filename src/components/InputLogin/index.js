import React, { useState } from "react";
import {
    Form,
    Button,
    Modal
} from 'react-bootstrap';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import styles from './styles.module.css';


function InputLogin(props) {

    const {
        onPressClose,
        setProps,
        setInitLogin,
        error
    } = props
    
    const [cpfCnpj, setCpfCnpj] = useState("");
    //const [mask, setMask] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        let bodyData = {
            "cpfCnpj": cpfCnpj,
            "password": password
        }
        setInitLogin(true)
        return setProps(bodyData)
    }


    useState(()=>{

    },[error])
    return (
        <div style={{ position: 'fixed', zIndex: 99999999, width: '100%', height: '100%', top: '0', background: 'rgba(175, 175, 175, 0.5)' }}>
            <Modal.Dialog>
                <Modal.Header closeButton
                    onClick={() => onPressClose()}>
                    <Modal.Title>Efetue seu login</Modal.Title>

                </Modal.Header>
                <h5 style={{ marginTop: 50, marginBottom: 25, textAlign: 'center', color: '#0F82E2' }}>Esse CNPJ já tem cadastro na nossa plataforma</h5>
                <Form>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Digite seu CPF ou CNPJ</Form.Label>
                            <CpfCnpj
                                className={styles.cpfCnpj}
                                placeholder=""
                                value={cpfCnpj}
                                onChange={(event, type) => {
                                    setCpfCnpj(event.target.value);
                                    //setMask(type === "CPF");
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Digite sua senha</Form.Label>
                            <Form.Control type="password" placeholder=""
                                value={password}
                                onChange={(event, type) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => onPressClose()}>
                            Sair</Button>
                        <Button className="btnEdit" onClick={() => handleLogin()}>Entrar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Dialog>
        </div>
    )
}

export default InputLogin;