import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Form,
    Button,
    Col,
    Card,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    Divider
} from '@material-ui/core';
import { setUserData } from '../../redux/actions/authActions';
import { useHistory } from "react-router-dom";
import Reload from '../../components/Reload'
import { LoginUser } from '../../api/loginUser';
import { postRegisterCompany } from '../../api/company';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import styles from './stylesCreatedUser.module.css';
import ButtonReturn from '../../components/ButtonReturn'
import JsonCountry from '../../services/stateCountry.json';
import { safeAccess } from '../../services/misc';
import InputLogin from '../../components/InputLogin/index';
import { setUserDataCompany } from '../../redux/actions/userDataCompanyActions';
import {
    validateCnpj,
    validateEmail,
} from '../../services/validation';

const Created_user = (props) => {
    const {
        setUserData,
        setUserCompany
    } = props;
    const history = useHistory();

    const [cpfCnpj, setCpfCnpj] = useState("");
    const [nameCompany, setNameCompany] = useState('');
    const [cnaeCompany, setCnaeCompany] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('SP');
    const [streetNumber, setStreetNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [country] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');


    const [bodyData, setBodyData] = useState("");
    const [initLogin, setInitLogin] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        if (initLogin === true) {
            handleLogin()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initLogin])

    const handleLogin = async () => {

        setReload(true)
        const result = await LoginUser(bodyData)

        if (result.status === 200) {

            setTimeout(function () {
                history.push('/empresa/dashboard')
                setReload(false)
            }, 2000);

            return
        } else {
            setReload(false)
            setErrorLogin(true)
        }
    }

    const [error409, setError409] = useState(false);
    // const [success, setSuccess] = useState(false);


    const [erroCNPJ, setErroCNPJ] = useState(false);
    const [erroNameCompany, setErroNameCompany] = useState(false);
    const [erroCnaeCompany, setErroCnaeCompany] = useState(false);

    const [errostreet, setErrostreet] = useState(false);
    const [errodistrict, setErrodistrict] = useState(false);
    const [errostreetNumber, setErrostreetNumber] = useState(false);
    const [errocity, setErrocity] = useState(false);
    const [erroemail, setErroemail] = useState(false);
    const [errophone, setErrophone] = useState(false);
    const [erropasswordOne, setErropasswordOne] = useState(false);
    const [erropasswordTwo, setErropasswordTwo] = useState(false);
    const [erropassword, setErropassword] = useState(false);

    const handleInput = async () => {
        let validation = 0;

        if (!validateCnpj(cpfCnpj)) {
            setErroCNPJ(true)
            validation = validation + 1;
        }
        else {
            setErroCNPJ(false)
        }
        if (cnaeCompany.length < 4) {
            setErroCnaeCompany(true)
            validation = validation + 1;
        }
        else {
            setErroCnaeCompany(false)
        }
        if (nameCompany.length < 3) {
            setErroNameCompany(true)
            validation = validation + 1;
        }
        else {
            setErroNameCompany(false)
        }
        if (phone.length < 11) {
            setErrophone(true)
            validation = validation + 1;
        } else {
            setErrophone(false)
        }
        if (street.length < 4) {
            setErrostreet(true)
            validation = validation + 1;
        }
        else {
            setErrostreet(false)
        }
        if (district.length < 4) {
            setErrodistrict(true)
            validation = validation + 1;
        }
        else {
            setErrodistrict(false)
        }
        if (streetNumber.length < 1) {
            setErrostreetNumber(true)
            validation = validation + 1;
        }
        else {
            setErrostreetNumber(false)
        }
        if (city.length < 4) {
            setErrocity(true)
            validation = validation + 1;
        }
        else {
            setErrocity(false)
        }
        if (!validateEmail(email)) {
            setErroemail(true)
            validation = validation + 1;
        }
        else {
            setErroemail(false)
        }
        if (passwordOne.length < 6) {
            setErropasswordOne(true)
            validation = validation + 1;
        }
        else {
            setErropasswordOne(false)
        }
        if (passwordTwo.length < 6) {
            setErropasswordTwo(true)
            validation = validation + 1;
        }
        else {
            setErropasswordTwo(false)
        }

        if (validation > 0) {
            return
        }
        let erroPassword = 0
        if (passwordTwo !== passwordOne) {
            setErropassword(true)
            erroPassword = erroPassword + 1;
        }
        else {
            setErropassword(false)
        }
        if (erroPassword > 0) {
            return
        }

        let data = {
            nameCompany,
            cnaeCompany,
            cpfCnpj,
            street,
            district,
            streetNumber,
            city,
            country,
            email,
            phone,
            passwordOne,
            passwordTwo,
            state
        }
        const result = await postRegisterCompany(data)

        if (result.status === 200) {
            console.log(result.data)
            const token = safeAccess(result.data, ['body', 'token'], undefined);
            setUserData(token)
            setUserCompany(result.data.body)
            // setSuccess(true)
            history.push('/empresa/dashboard')
        }
        if (result.status === 409) {
            setError409(true)
        }
    }

    return (
        <>
            <Container style={{ flex: 1 }}>


                <Card style={{ marginTop: '3%', marginBottom: '3%', height: '100%', }}>
                    <Card.Body style={{ margin: 20 }}>

                        <Row>

                            <ButtonReturn textButton={'Voltar'} onClick={() => history.goBack()} />

                            <Col sm={12} style={{ textAlign: 'center', borderBottomWidth: 10, borderBottomColor: '#0B5ED7' }}>

                                <h3 style={{ color: '#2AA9E0' }}> Cadastre a sua empresa</h3>
                                <br></br>
                                <Divider />
                                <br></br>
                                <br></br>
                            </Col>

                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Nome da empresa</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={nameCompany}
                                    onChange={(event) => {
                                        setNameCompany(event.target.value);
                                    }}
                                    isInvalid={erroNameCompany}
                                />
                                {erroNameCompany && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Nome inválido</p>
                                )}
                            </Col>

                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Cnae da empresa</Form.Label>
                                <Form.Control
                                    size="lg"
                                    placeholder="..."
                                    value={cnaeCompany}
                                    onChange={(event) => {
                                        setCnaeCompany(event.target.value);
                                    }}
                                    type="Number"
                                    isInvalid={erroCnaeCompany}
                                />
                                {erroCnaeCompany && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Cnae inválido</p>
                                )}
                            </Col>

                            <Col sm={4} >
                                <Form.Label>Digite um CNPJ</Form.Label>
                                <CpfCnpj
                                    className={styles.cpfCnpj}
                                    placeholder="...."
                                    value={cpfCnpj}
                                    onChange={(event, type) => {
                                        setCpfCnpj(event.target.value);
                                    }}
                                    style={{ borderColor: erroCNPJ ? 'red' : '', borderWidth: erroCNPJ ? 3 : '' }}
                                />
                                {erroCNPJ && (
                                    <p style={{ color: 'red', marginTop: 5 }}>CNPJ inválido</p>
                                )}
                            </Col>
                            <h4 style={{ marginTop: 30 }}>Endereço </h4>
                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Rua</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={street}
                                    onChange={(event) => {
                                        setStreet(event.target.value);
                                    }}
                                    isInvalid={errostreet}
                                />
                                {errostreet && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Rua inválida</p>
                                )}
                            </Col>
                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={district}
                                    onChange={(event) => {
                                        setDistrict(event.target.value);
                                    }}
                                    isInvalid={errodistrict}
                                />
                                {errodistrict && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Bairro inválido</p>
                                )}
                            </Col>
                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select size="lg" style={{ color: 'gray' }}
                                    onChange={(event) => {
                                        setState(event.target.value);
                                    }}>
                                    {JsonCountry.UF.map((e, key) =>
                                        <option value={e.sigla} key={key}>{e.nome}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                    }}
                                    isInvalid={errocity}
                                />
                                {errocity && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Cidade inválido</p>
                                )}
                            </Col>
                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Número</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={streetNumber}
                                    onChange={(event) => {
                                        setStreetNumber(event.target.value);
                                    }}
                                    isInvalid={errostreetNumber}
                                />
                                {errostreetNumber && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Número inválido</p>
                                )}
                            </Col>

                            <Col sm={4} style={{ padding: 10 }}>
                                <Form.Label>Pais</Form.Label>
                                <Form.Select size="lg" style={{ color: 'gray' }}>
                                    <option>Brasil</option>
                                </Form.Select>
                            </Col>

                            <Col sm={6} style={{ padding: 10 }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control size="lg" type="email" placeholder="..."
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    isInvalid={erroemail}
                                />
                                {erroemail && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Email inválido</p>
                                )}
                            </Col>
                            <Col sm={6} style={{ padding: 10 }}>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control size="lg" type="phone" placeholder="..."
                                    value={phone}
                                    onChange={(event) => {
                                        setPhone(event.target.value);
                                    }}
                                    isInvalid={errophone}
                                />
                                {errophone && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Telefone inválido</p>
                                )}
                            </Col>
                            <Col sm={6} style={{ padding: 10 }}>
                                <Form.Label>Digite sua senha</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="..."
                                    value={passwordOne}
                                    onChange={(event) => {
                                        setPasswordOne(event.target.value);
                                    }}
                                    isInvalid={erropasswordOne}
                                />
                                {erropasswordOne && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Senha inválido</p>
                                )}
                            </Col>
                            <Col sm={6} style={{ padding: 10 }}>
                                <Form.Label>Confirme sua senha</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="..."
                                    value={passwordTwo}
                                    onChange={(event) => {
                                        setPasswordTwo(event.target.value);
                                    }}
                                    isInvalid={erropasswordTwo}
                                />
                                {erropasswordTwo && (
                                    <p style={{ color: 'red', marginTop: 5 }}>Telefone inválido</p>
                                )}
                                {erropassword && (
                                    <p style={{ color: 'red', marginTop: 5 }}>As senha não são iguais digite novamente</p>
                                )}
                            </Col>

                            <Col sm={12} style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                                <div className="d-grid gap-2">
                                    <Button className="btnEdit" size="lg" onClick={() => handleInput()} type="submit">
                                        Cadastrar
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>




            </Container>

            {error409 && (
                <InputLogin
                    onPressClose={() => setError409(false)}
                    setProps={setBodyData}
                    setInitLogin={setInitLogin}
                    error={errorLogin}
                />
            )}

            {reload && (
                <Reload />
            )}
        </>
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


export default connect(mapStateToProps, mapDispatchToProps)(Created_user);