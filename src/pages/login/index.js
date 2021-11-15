import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Form,
    Button,
    Col,
    Image
} from 'react-bootstrap';
import { useAlert } from "react-alert";
import { LoginUser } from '../../api/loginUser';
import ImgLogin from '../../image/login1.png'
import styles from './styles.module.css'
import Reload from '../../components/Reload';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import { connect } from 'react-redux';
import { setUserData } from '../../redux/actions/authActions';
import { setUserDataCompany } from '../../redux/actions/userDataCompanyActions';
import { safeAccess } from '../../services/misc';
import {
    validateCnpj,
    validateCpf,
} from '../../services/validation';
const ScreenLogin = (props) => {
    const alert = useAlert();
    const {
        setUserData,
        setUserCompany
    } = props;

    const history = useHistory();
    const [cpfCnpj, setCpfCnpj] = useState("");
    //const [mask, setMask] = useState("");
    const [password, setPassword] = useState("");

    const [errorLogin, setErrorLogin] = useState(false);
    const [reload, setReload] = useState(false);

    const [erroCNPJOrCPF, seterroCNPJOrCPF] = useState(false)

    const handleLogin = async () => {
        let validation = 0;

        if (cpfCnpj.length > 14) {
            if (!validateCnpj(cpfCnpj)) {
                seterroCNPJOrCPF(true)
                validation = validation + 1;
            } else {
                seterroCNPJOrCPF(false)
            }
        } else {
            if (!validateCpf(cpfCnpj)) {
                seterroCNPJOrCPF(true)
                validation = validation + 1;
            } else {
                seterroCNPJOrCPF(false)
            }
        }
        if (validation > 0) {
            return
        }

        setReload(true)
        let bodyData = {
            "cpfCnpj": cpfCnpj,
            "password": password
        }

        const result = await LoginUser(bodyData)

        if (result.status === 200) {
            const token = safeAccess(result.data, ['body', 'token'], undefined);
            setUserData(token)
            setUserCompany(result.data.body)
            console.log(result.data.body)
            history.push('/empresa/dashboard')
            return
        } else if (result.status === 404) {
            alert.error("Não foi possível encontrar o usuário")
            setErrorLogin(true)
            setReload(false)
        }
        else {
            alert.error("Algo ocorreu errado, tente novamente mais tarde")
            setReload(false)
        }
    }


    return (
        <Container className={styles.container}>

            <Row>
                <Col sm={6} className={styles.rowOne}>

                    <h2 style={{ marginBottom: -20 }}>Seja bem-vindo</h2>
                    <Image src={ImgLogin} rounded width={`65%`} />
                </Col>
                <Col sm={6} className={styles.rowTwo}>

                    <Form>
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
                            {erroCNPJOrCPF && (
                                <p style={{color: 'red', marginTop: 10}}>CPF/CNPJ inválido</p>
                            )}
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

                        {errorLogin && (
                            <p style={{ color: 'red' }}>Dados incorretos, verifique sua senha ou seu CPF</p>
                        )}

                        <div className={styles.divbutton}>
                            <Button className="btnEdit" onClick={() => { handleLogin() }}>
                                {'  '}Acessar {'  '}
                            </Button>
                        </div>


                        <h5 style={{ textAlign: 'center' }}>
                            <a href='/created_user_employee'>Não tenho conta</a>
                        </h5>

                    </Form>
                </Col>
            </Row>

            {reload && (
                <Reload />
            )}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        //   phone: safeAccess(state, ['signUpReducer', 'phone'], undefined),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (value) => dispatch(setUserData(value)),
        setUserCompany: (value) => dispatch(setUserDataCompany(value)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ScreenLogin);