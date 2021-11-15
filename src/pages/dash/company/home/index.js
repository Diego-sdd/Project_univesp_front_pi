import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Card
} from "react-bootstrap";
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoney } from 'react-icons/bi';
import { getDataHomeUsers } from '../../../../api/company'
import { connect } from 'react-redux';
import { safeAccess } from '../../../../services/misc';
import Barchar from './barChart';
import PieChart from './pieChart';


const Dashboard = props => {

    const {
        userCompany
    } = props;
    console.log(userCompany)
    const [contEmployee, setContEmployee] = useState(0)
    const [contSetor, setContSetor] = useState(0)

    const getDataUser = async () => {

        const result = await getDataHomeUsers(userCompany.cd_empresa);

        if (result.status === 200) {
            setContEmployee(result.data?.contEmployee)
            setContSetor(result.data?.contSetor)
        }

    }
    useEffect(() => {
        getDataUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Container fluid style={{ padding: 20 }}>
                <Card style={{ padding: 40 }} >
                    <h3> {userCompany.name} </h3>
                    <Breadcrumb>
                        <AiOutlineHome style={{ marginRight: 10 }} />
                        <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                    </Breadcrumb>



                    <Row className="justify-content-md-center">
                        <Col xs={12} md={4} lg={4}>
                            <Card>
                                <Card.Body>
                                    <BiMoney style={{ float: 'right', fontSize: 60 }} />

                                    <h3>{contEmployee}</h3>

                                    <p>Total de funcionário</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} lg={4}>
                            <Card>
                                <Card.Body>
                                    <BiMoney style={{ float: 'right', fontSize: 60 }} />

                                    <h3>0</h3>

                                    <p>Total de ppp geradas</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} lg={4}>
                            <Card>
                                <Card.Body>
                                    <BiMoney style={{ float: 'right', fontSize: 60 }} />

                                    <h3>{contSetor}</h3>

                                    <p>Quantidade de setores</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center" style={{ marginTop: 50 }}>
                        <Col xs={12} md={12} lg={6}>
                            <Barchar />
                        </Col>
                        <Col xs={12} md={12} lg={6}>
                            <PieChart />
                        </Col>
                    </Row>

                </Card>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userCompany: safeAccess(state, ['userDataCompanyReduecer', 'data'], undefined),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);