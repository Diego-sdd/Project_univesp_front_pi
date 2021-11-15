import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Card,
    Button
} from "react-bootstrap";
import { AiOutlineHome } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {
    Chip,
    Fab
} from '@material-ui/core';
import { getSectorCompany, getUsersEmployee } from '../../../../api/company';
import { connect } from 'react-redux';
import { safeAccess } from '../../../../services/misc';
import emptyUser from "./../../../../image/user.png";
import moment from 'moment';

function EnhancedTable(props) {
    const {
        userCompany
    } = props;

    const history = useHistory();

    const [sectorUsers, setSectorUsers] = useState([])
    const [filter, setFilter] = useState('');
    const [erroSector, setErroSector] = useState('')

    const [usersData, setUsersData] = useState([])

    const getSectorUsers = async () => {
        while (sectorUsers.length) {
            sectorUsers.pop()
        }
        const result = await getSectorCompany(userCompany.cd_empresa);

        if (result.status === 200) {
            setSectorUsers(sectorUsers.concat(result.data))

            if (result.data[0] !== undefined) {
                setFilter(result.data[0].nm_setor)
            }

            getUsers()
        } else {
            setErroSector(true)
        }
    }

    const getUsers = async () => {
        while (usersData.length) {
            usersData.pop()
        }
        const result = await getUsersEmployee(userCompany.cd_empresa);

        if (result.status === 200) {
            setUsersData(usersData.concat(result.data))
        } else {
            setErroSector(true)
        }


    }


    useEffect(() => {
        getSectorUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (

        <Container fluid style={{ padding: 20 }}>
            <Card style={{ padding: 40 }} >
                <h3> {userCompany.name} </h3>
                <Breadcrumb>
                    <AiOutlineHome style={{ marginRight: 10 }} />
                    <Breadcrumb.Item href="colaborador">Home / Funcionário</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    {usersData.length !== 0 &&
                        <>
                            <Col xs={12}>

                                <div style={{ textAlign: 'right' }}>
                                    <Button className="btnEdit" onClick={() => history.push('/empresa/cadastrar_funcionario')}>Cadastrar</Button>
                                </div>

                            </Col>

                            <Col lg={12} style={{ marginBottom: 0 }} >
                                <h5>Filtro dos setores</h5>
                            </Col>
                        </>
                    }
                    <Col xs={12}>
                        {erroSector && (
                            <p styles={{ color: 'red' }}>Erro ao buscar setor, tente novamente mais tarde \</p>
                        )}
                        {sectorUsers.map((e, k) =>

                            <Chip key={k} label={e.nm_setor} onClick={() => setFilter(e.nm_setor)} style={{ marginRight: 10, marginTop: 10, color: 'white', backgroundColor: '#2AA9E0' }} />
                        )}
                        {/* <Chip label="Atendimento" color="primary" onClick={() => setFilter('atendimento')} style={{ marginRight: 10, marginTop: 10 }} />
                        <Chip label="Financeiro" color="primary" onClick={() => setFilter('financeiro')} style={{ marginRight: 10, marginTop: 10 }} /> */}

                    </Col>

                    {usersData.length !== 0 &&
                        <Col xs={12} md={12} lg={12} style={{ marginBottom: 60 }}>
                            <h3 style={{ textAlign: 'center' }}>
                                Setor: {filter.toUpperCase()}
                            </h3>
                        </Col>
                    }
                    {usersData.length === 0 ?
                        <div style={{ textAlign: 'center' }}>
                            <Col xs={12}>
                                <h3 style={{ textAlign: 'center', marginBottom: 30 }}>
                                    Cadestre seu primeiro funcionario da empresa
                                </h3>
                                <Button className="btnEdit" onClick={() => history.push('/empresa/cadastrar_funcionario')}>Cadastrar</Button>
                            </Col>
                        </div>
                        :
                        usersData.filter(e => e.nm_setor === filter)
                            .map((element) =>
                                <Col xs={12} md={4} lg={3} style={{ marginTop: 20 }} key={element.cd_funcionario}>
                                    <Card>
                                        <div style={{ textAlign: 'center' }}>
                                            <Card.Img variant="top"
                                                src={element.ds_imagem ?
                                                    element.ds_imagem
                                                    :
                                                    emptyUser
                                                }
                                                style={{ width: 200, height: 200, borderRadius: 250, padding: 40, textAlign: 'center' }}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{element.nm_funcionario}</Card.Title>
                                            <Card.Text>
                                                Cargo: {element.nm_cargo}
                                            </Card.Text>
                                            <Card.Text>
                                                Funcionário desde: {moment(element.dt_entrada).format('DD-MM-YYYY')}
                                            </Card.Text>
                                            <Fab color="primary" aria-label="add" size="medium" style={{ float: 'right', backgroundColor: '#2AA9E0' }}
                                                onClick={() => {
                                                    history.push(`/empresa/colaborador/${element.cd_funcionario}`)
                                                }}>
                                                <BsArrowRight sx={{ mr: 1 }} />
                                            </Fab>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}


                </Row>
            </Card>
        </Container>

    );
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


export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
