import React from "react";
import { useHistory } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { AiOutlineHome } from 'react-icons/ai';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FiUsers } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/actions/authActions';
import styles from './styles.module.css'
const Sidebar = props => {
    const {
        setSideNavExpanded,
        sideNavExpanded,
        setUser
    } = props;
    const history = useHistory();
    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    if (selected === 'logout') {
                        setUser('')
                        history.push(`/`)
                        return
                    }
                    history.push(`/empresa/${selected}`)
                }}
                onToggle={() => {
                    setSideNavExpanded(!sideNavExpanded);
                }}
                expanded={sideNavExpanded}
                className={styles.sideNav}
            >

                <Toggle />
                <Nav defaultSelected="home">
                    <NavItem eventKey="dashboard" >
                        <NavIcon>
                            <AiOutlineHome size={25} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="colaborador">
                        <NavIcon>
                            <FiUsers size={25} />
                        </NavIcon>
                        <NavText>
                            Funcionário
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="minhaconta">
                        <NavIcon>
                            <CgProfile size={25} />
                        </NavIcon>
                        <NavText>
                            Conta
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="logout" style={{ 'bottom': 20, 'position': 'absolute', 'width': '100%' }} >
                        <NavIcon>
                            <BiLogOutCircle size={35} />
                        </NavIcon>
                        <NavText>
                            Sair
                        </NavText>
                    </NavItem>
                    {/* <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
                        </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                            </NavText>
                        </NavItem>
                    </NavItem> */}
                </Nav>
            </SideNav>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        //   phone: safeAccess(state, ['signUpReducer', 'phone'], undefined),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (value) => dispatch(setUserData(value)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);