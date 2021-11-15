import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Card,
    Form,
    Button
} from "react-bootstrap";
import { AiOutlineHome } from 'react-icons/ai';
import styles from './styles.module.css'
import { connect } from 'react-redux';
import { safeAccess } from '../../../../services/misc';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import JsonCountry from '../../../../services/stateCountry.json';
import { putUpdateUserCompany } from '../../../../api/company';
import { setUserData } from '../../../../redux/actions/authActions';
import { setUserDataCompany } from '../../../../redux/actions/userDataCompanyActions';
import { useAlert } from "react-alert";
import Reload from '../../../../components/Reload';

function Account(props) {

    const alert = useAlert();
    const {
        userCompany,
        setUserData,
        setUserCompany
    } = props;



    const [cpfCnpj, setCpfCnpj] = useState(userCompany.CNPJ);
    //const [mask, setMask] = useState("");
    const [nameCompany, setNameCompany] = useState(userCompany.name);
    const [cnaeCompany, setCnaeCompany] = useState(userCompany.cd_cnae);
    const [street, setStreet] = useState(userCompany.nm_rua);
    const [state, setState] = useState(userCompany.sg_estado);
    const [streetNumber, setStreetNumber] = useState(userCompany.cd_numero);
    const [district, setDistrict] = useState(userCompany.nm_bairro);
    const [city, setCity] = useState(userCompany.nm_cidade);
    const [country] = useState('Brasil');
    const [email, setEmail] = useState(userCompany.nm_email);
    const [phone, setPhone] = useState(userCompany.cd_telefone);
    const [reload, setReload] = useState(false);


    const handlerUpdateUser = async () => {

        let data = {
            cd_empresa: userCompany.cd_empresa,
            cd_bairro: userCompany.cd_bairro,
            cd_endereco: userCompany.cd_endereco,
            cd_estado: userCompany.cd_estado,
            cd_pais: userCompany.cd_pais,
            cd_cidade: userCompany.cd_cidade,
            cd_contato: userCompany.cd_contato,
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
            state
        }

        const resultUpdate = await putUpdateUserCompany(data);


        if (resultUpdate.status === 200) {
            setUserCompany(resultUpdate.data.body)
            alert.success('Usuário atualizado com sucesso')
            setTimeout(function () {
                setReload(false)
                const token = safeAccess(resultUpdate.data, ['body', 'token'], undefined);
                setUserData(token)
                window.location.reload();
            }, 3000);


        } else {
            setReload(false)
            alert.error('Não foi possível atualizar os dados')
        }
    }


    return (
        <Container fluid style={{ padding: 20 }} >
            <Card style={{ padding: 40 }} >
                <h3> {userCompany.name}</h3>
                <Breadcrumb>
                    <AiOutlineHome style={{ marginRight: 10 }} />
                    <Breadcrumb.Item href="dashboard">Home / Edite o seu cadastro</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{ marginTop: 50 }} />


                <Row>

                    <Col xs={12} md={12} lg={12} >
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Nome da empresa</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={nameCompany}
                                    onChange={(event) => {
                                        setNameCompany(event.target.value);
                                    }}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Cnae da empresa</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={cnaeCompany}
                                    onChange={(event) => {
                                        setCnaeCompany(event.target.value);
                                    }}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={4} >
                                <Form.Label>Digite um CNPJ</Form.Label>
                                <CpfCnpj
                                    className={styles.cpfCnpj}
                                    placeholder="...."
                                    value={cpfCnpj}
                                    onChange={(event, type) => {
                                        setCpfCnpj(event.target.value);
                                        //setMask(type === "CPF");
                                    }}
                                />
                            </Col>
                            <h4 style={{ marginTop: 30 }}>Endereço </h4>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Rua</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={street}
                                    onChange={(event) => {
                                        setStreet(event.target.value);
                                    }}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={district}
                                    onChange={(event) => {
                                        setDistrict(event.target.value);
                                    }} />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select size="lg" style={{ color: 'gray' }}
                                    onChange={(event) => {
                                        setState(event.target.value);
                                    }}
                                    value={state}
                                    >
                                    {JsonCountry.UF.map((e, key) =>
                                        <option value={e.sigla} key={key}>{e.nome}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                    }}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Número</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="..."
                                    value={streetNumber}
                                    onChange={(event) => {
                                        setStreetNumber(event.target.value);
                                    }}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Pais</Form.Label>
                                <Form.Select size="lg" style={{ color: 'gray' }}>
                                    <option>Brasil</option>
                                </Form.Select>
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control size="lg" type="email" placeholder="..."
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control size="lg" type="phone" placeholder="..."
                                    value={phone}
                                    onChange={(event) => {
                                        setPhone(event.target.value);
                                    }}
                                />
                            </Col>
                            {/* <Col xs={12} sm={12} md={6} lg={4} style={{ padding: 10 }}>
                                <Form.Label>Digite sua senha</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="..."
                                    value={passwordOne}
                                    onChange={(event) => {
                                        setPasswordOne(event.target.value);
                                    }}
                                />
                            </Col> */}

                            <Col xs={12} style={{ marginTop: 50, textAlign: 'center' }}>
                                <Button className="btnEdit" onClick={() => {
                                    handlerUpdateUser();
                                    setReload(true)
                                }}>Cadastrar</Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>
                {reload && (
                    <Reload />
                )}
            </Card>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        userCompany: safeAccess(state, ['userDataCompanyReduecer', 'data'], undefined),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (value) => dispatch(setUserData(value)),
        setUserCompany: (value) => dispatch(setUserDataCompany(value)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Account);