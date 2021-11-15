import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Card,
    Image,
    Button,
    Form,
} from "react-bootstrap";
import Fab from '@mui/material/Fab';
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineHome, AiFillDelete } from 'react-icons/ai';
import { RiMenuAddLine } from 'react-icons/ri';
import {
    useParams
} from "react-router-dom";
import {
    postCreatedPPP
} from '../../../../../api/employee';
import { connect } from 'react-redux';
import { safeAccess } from '../../../../../services/misc';
import Modelo_ppp from '../../../../../image/modelo_ppp.png';
import { getDownloadPPP, getUserEmployee } from '../../../../../api/employee';
import Reload from '../../../../../components/Reload';
import emptyUser from "./../../../../../image/emptyMaterial.png";
import moment from 'moment';
function ViewEmployee(props) {
    const {
        userCompany
    } = props;

    const { id } = useParams();
    const [dataResult, setDataResult] = useState([])
    // const [errorGet, setErrorGet] = useState(false)
    // const [errorGetPDF, setErrorGetPDF] = useState(false)
    const [reload, setReload] = useState(false);
    const [optionsStatus, setOptionsStatus] = useState(false);
    const [arrayValueData, setArrayValueData] = useState([])
    const [verantwoordelik, setVerantwoordelik] = useState('')
    const [NIT, setNIT] = useState('')

    const [userHavePPP, setUserHavePPP] = useState(false)

    const [verantwoordelik_ambientais, setVerantwoordelik_ambientais] = useState('')
    const [NIT_ambientais, setNIT_ambientais] = useState('')
    const [cd_crea_ambiental, setCd_crea_ambiental] = useState('')


    const [value01, setValue01] = useState(0);
    const [value02, setValue02] = useState(0);
    const [value03, setValue03] = useState(0);

    const postResquestPPP = async () => {

        console.log(arrayValueData)

        let body = {
            cd_funcionario: id,
            protecao: value01,
            condicoes: value02,
            higienizacao: value03,
            riscos: arrayValueData,
            nm_representante: verantwoordelik,
            cd_nit: NIT,
            nm_responsavel_ambientais: verantwoordelik_ambientais,
            NIT_ambientais: NIT_ambientais,
            cd_crea: cd_crea_ambiental,
        }

        const result = await postCreatedPPP(body)
        console.log(result)
        if (result.status === 200) {
            setUserHavePPP(true)
        }

        return
    }




    const getUser = async () => {
        setReload(true)

        try {
            const result = await getUserEmployee(id)
            console.log(result.data[0].cd_ppp)
            if (result.status === 200) {

                if (result.data[0].cd_ppp !== null) {
                    setUserHavePPP(true)
                } else {
                    setUserHavePPP(false)
                }

                setDataResult(result.data[0])
                setReload(false)
            } else {
                // setErrorGet(true)
                setReload(false)
            }
        } catch (error) {
            setReload(false)
            return
        }

    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDownloadPPP = async (userId) => {
        setReload(true)

        try {
            const result = await getDownloadPPP(userId)

            if (result.status === 200) {
                let url = `http://localhost:3333/v1/getDownloadPDFEmployee/${userId}`;
                setTimeout(function () {
                    window.open(url)

                    setReload(false)
                }, 3000);

            } else {
                setReload(false)
                // setErrorGetPDF(true)
            }
        } catch (error) {
            setReload(false)
            return
        }


    }
    return (

        <Container fluid style={{ padding: 20 }}>
            <Card style={{ padding: 40 }} >
                <h3> {userCompany.nameCompany} </h3>
                <Breadcrumb>
                    <AiOutlineHome style={{ marginRight: 10 }} />
                    <Breadcrumb.Item href="empresa/home">Home / Usuário / {id}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>


                    <h3 style={{ marginTop: 50, marginBottom: 50 }}>Id do usuário 0{id}</h3>

                    <div style={{ textAlign: 'center' }}>
                        <Row>
                            <Col xl={12} style={{ marginBottom: 20 }}>
                                <Image variant="top"
                                    roundedCircle
                                    src={dataResult.ds_imagem ?
                                        dataResult.ds_imagem
                                        :
                                        emptyUser
                                    }
                                    style={{ width: 150, height: 150 }}
                                />
                                <Col style={{ marginTop: 25 }}>
                                    <h3>Nome: {dataResult.nm_funcionario}</h3>
                                </Col>
                                <Col>
                                    <h5>Data de entrada: {moment(dataResult.dt_entrada).format('DD-MM-YYYY')}</h5>
                                </Col>
                                <Col>
                                    <h5>Cargo: {dataResult.nm_cargo}</h5>
                                </Col>
                                <Col>
                                    <h5>Setor: {dataResult.cd_setor}</h5>
                                </Col>
                            </Col>

                        </Row>
                    </div>
                </Row>

                {!optionsStatus && !userHavePPP && (
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            className="btnEdit"
                            size="lg"
                            onClick={() => {
                                setOptionsStatus(true)
                                setArrayValueData(
                                    arrayValueData.concat(
                                        {
                                            id: arrayValueData.length,
                                            periodo: '-',
                                            ds_fator_risco: '',
                                            ds_intensidade: '',
                                            ds_tecnica_usada: '',
                                            eficaz: 1
                                        }
                                    ))
                            }}
                            type="submit">
                            Atualizar status do funcionário na empresa
                        </Button>
                    </div>
                )}
                {arrayValueData.length > 0 && !userHavePPP &&
                    <Row style={{ padding: 20, marginTop: 50 }}>


                        <Col xs={12} md={6} lg={6} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                Responsável pela geração do ppp
                            </p>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="..."
                                onChange={event => {
                                    setVerantwoordelik(event.target.value)
                                }}
                            />
                        </Col>
                        <Col xs={12} md={6} lg={6} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                NIT do Responsável pela geração do ppp
                            </p>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="..."
                                onChange={event => {
                                    setNIT(event.target.value)
                                }}
                            />
                        </Col>


                        <Col xs={12} md={4} lg={4} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                Responsável pelos registro ambientais
                            </p>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="..."
                                onChange={event => {
                                    setVerantwoordelik_ambientais(event.target.value)
                                }}
                            />
                        </Col>
                        <Col xs={12} md={4} lg={4} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                NIT do responsável pelos registro ambientais
                            </p>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="..."
                                onChange={event => {
                                    setNIT_ambientais(event.target.value)
                                }}
                            />
                        </Col>
                        <Col xs={12} md={4} lg={4} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                CREA do responsável pelos registro ambientais
                            </p>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="..."
                                onChange={event => {
                                    setCd_crea_ambiental(event.target.value)
                                }}
                            />
                        </Col>

                        <Col xs={12} md={4} lg={6} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                Foi tentada a implementação de medidas de proteção coletiva, de caráter administrativo ou de organização do trabalho, optando-se pelo
                                EPI por inviabilidade técnica, insuficiência ou interinidade, ou ainda em caráter complementar ou emergencial.
                            </p>
                            <Row>
                                <Col xl={6}>
                                    <Form.Check
                                        type="checkbox"
                                        label="Sim"
                                        checked={value01 === 0 && true}
                                        onClick={() => {
                                            setValue01(0)
                                        }} />
                                </Col>
                                <Col xl={6}>
                                    <Form.Check
                                        checked={value01 === 1 && true}
                                        type="checkbox"
                                        label="Não"
                                        onClick={() => {
                                            setValue01(1)
                                        }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} md={4} lg={6} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                Foram observadas as condições de funcionamento e do uso ininterrupto do EPI ao longo do tempo, conforme especificação técnica do
                                fabricante, ajustada às condições de campo.
                            </p>
                            <br></br>
                            <Row>
                                <Col xl={6}>
                                    <Form.Check type="checkbox"
                                        label="Sim"
                                        checked={value02 === 0 && true}
                                        onClick={() => {
                                            setValue02(0)
                                        }} />
                                </Col>
                                <Col xl={6}>
                                    <Form.Check
                                        type="checkbox"
                                        label="Não"
                                        checked={value02 === 1 && true}
                                        onClick={() => {
                                            setValue02(1)
                                        }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} md={4} lg={6} style={{ marginBottom: 20, padding: 20 }}>
                            <p>
                                Foi observado a higienização
                            </p>
                            <br></br>
                            <Row>
                                <Col xl={6}>
                                    <Form.Check type="checkbox" label="Sim"
                                        checked={value03 === 0 && true}
                                        onClick={() => {
                                            setValue03(0)
                                        }} />
                                </Col>
                                <Col xl={6}>
                                    <Form.Check type="checkbox" label="Não"
                                        checked={value03 === 1 && true}
                                        onClick={() => {
                                            setValue03(1)
                                        }} />
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                }
                {!userHavePPP && (
                    arrayValueData.map((e, k) =>
                        <div style={{ marginTop: 40, backgroundColor: '#f4f4f4', borderRadius: 10, padding: 15 }} key={k}>
                            <Row style={{ marginTop: 50 }}>
                                <div style={{ textAlign: 'right', marginTop: -50, marginBottom: 0 }}
                                    onClick={() => {
                                        setArrayValueData(arrayValueData => arrayValueData.filter((i) => i !== e));
                                    }}
                                >
                                    <Fab style={{ backgroundColor: '#f45353', color: 'white' }}>
                                        <AiFillDelete style={{ fontSize: 20 }} />
                                    </Fab>
                                </div>



                            </Row>
                            <h4>
                                Exposição a fatores de riscos
                            </h4>
                            <br></br>
                            <Row>
                                <Col xs={12} md={4} lg={3} style={{ marginBottom: 20 }}>
                                    <p>Período</p>
                                    <Form.Control
                                        size="sm"
                                        type="date"
                                        placeholder="..."
                                        onChange={event => {
                                            setArrayValueData(
                                                arrayValueData.map(item =>
                                                    item.id === e.id
                                                        ? { ...item, periodo: event.target.value }
                                                        : item
                                                ))
                                        }}
                                    />

                                </Col>
                                <Col xs={12} md={4} lg={3} style={{ marginBottom: 20 }}>
                                    <p>Fator de risco</p>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder="..."
                                        onChange={event => {
                                            setArrayValueData(
                                                arrayValueData.map(item =>
                                                    item.id === e.id
                                                        ? { ...item, ds_fator_risco: event.target.value }
                                                        : item
                                                ))
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={4} lg={3} style={{ marginBottom: 20 }}>
                                    <p>Intensidade concentração</p>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder="..."
                                        onChange={event => {
                                            setArrayValueData(
                                                arrayValueData.map(item =>
                                                    item.id === e.id
                                                        ? { ...item, ds_intensidade: event.target.value }
                                                        : item
                                                ))
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={4} lg={3} style={{ marginBottom: 20 }}>
                                    <p>Técnica utilizada</p>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder="..."
                                        onChange={event => {
                                            setArrayValueData(
                                                arrayValueData.map(item =>
                                                    item.id === e.id
                                                        ? { ...item, ds_tecnica_usada: event.target.value }
                                                        : item
                                                ))
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={4} lg={3} style={{ marginBottom: 20 }}>
                                    <p>EPI eficaz (S/N)</p>
                                    <Row>
                                        <Col xl={6}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Sim"
                                                onClick={() => {
                                                    setArrayValueData(
                                                        arrayValueData.map(item =>
                                                            item.id === e.id
                                                                ? { ...item, eficaz: 1 }
                                                                : item
                                                        ))
                                                }}
                                                checked={arrayValueData[k].eficaz === 1 && true}
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Não"
                                                onClick={() => {
                                                    setArrayValueData(
                                                        arrayValueData.map(item =>
                                                            item.id === e.id
                                                                ? { ...item, eficaz: 0 }
                                                                : item
                                                        ))
                                                }}
                                                checked={arrayValueData[k].eficaz === 0 && true}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <div style={{ textAlign: 'center', marginTop: 25 }}
                                onClick={() => {
                                    setArrayValueData(
                                        arrayValueData.concat({
                                            id: arrayValueData.length + 1,
                                            periodo: '-',
                                            ds_fator_risco: '',
                                            ds_intensidade: '',
                                            ds_tecnica_usada: '',
                                            eficaz: 1
                                        })
                                    )
                                }}>

                                <Fab variant="extended" style={{ backgroundColor: '#2AA9E0', color: 'white' }}>
                                    <RiMenuAddLine style={{ fontSize: 20, marginRight: 20 }} />
                                    Adicionar mais fator de risco
                                </Fab>
                            </div>
                        </div>
                    ))}
                {arrayValueData.length > 0 && !userHavePPP && (
                    <>


                        <div style={{ textAlign: 'center', marginTop: 50 }}>

                            <Fab variant="extended" style={{ backgroundColor: 'green', color: 'white' }} onClick={postResquestPPP}>
                                Confirmar e salvar
                            </Fab>
                        </div>
                    </>
                )}



                {userHavePPP && (

                    <Row style={{ marginTop: 50 }}>
                        <Col xs={12} style={{ marginBottom: 25 }}>
                            <h4>Documentos inseridos</h4>
                        </Col>


                        <Col xs={12} md={6} lg={3}>
                            <Card>
                                <Card.Img variant="top" style={{ width: '100%', height: 300 }} src={Modelo_ppp} />
                                <Card.Body>
                                    <Card.Title>INSTRUÇÃO NORMATIVA INSS</Card.Title>
                                    <Card.Text>
                                        PERFIL PROFISSIOGRAFICO PREVIDÊNCIÁRIO - P P P
                                    </Card.Text>

                                    <Button className="btnEdit" size="lg"
                                        onClick={() => handleDownloadPPP(dataResult.cd_funcionario)}
                                        type="submit">
                                        Fazer o download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>


                )}

            </Card>
            {
                reload && (
                    <Reload />
                )
            }
        </Container >

    )
}

const mapStateToProps = (state) => {
    return {
        userCompany: safeAccess(state, ['userDataCompanyReduecer', 'data'], undefined),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);