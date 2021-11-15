import React from "react";
import {
	BrowserRouter,
	Route as PublicRoute,
	Switch, Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { safeAccess } from './services/misc';
import styled, { css } from "styled-components";
import Sidebar from "./components/sideBar/index"

//#Home page
import HomePage from './pages/homePage'


//#region Authentication
import LoginIn from './pages/login/index';
import CreatedUserEmployee from './pages/login/created_user_company';
//#endregion

//#home page company
import Home from './pages/dash/company/home'
import Employees from './pages/dash/company/employees'
import ViewEmployee from './pages/dash/company/employees/viewEmployee'
import EmployeeRegistration from './pages/dash/company/form/employeeRegistration'
import Accont from './pages/dash/company/accont'
//#endregion



const DivMarge = styled.div`
@media all and (max-width: 1350px) {
	margin-left: 60px;
	margin-right: -10px;
}
@media all and (min-width: 1351px) {
	margin-left: 60px;
	${props => props.marge && css`
	margin-left: 250px;
`} 
}
${props => props.marge && css`
	margin-left: 250px;
`} 
`


const Routes = (props) => {

	const {
		token
	} = props



	const [sideNavExpanded, setSideNavExpanded] = React.useState(true);
	function handleResize() {
		if (window.innerWidth <= 375) {
			setSideNavExpanded(false);
		}
	}
	React.useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);


	const PrivateRoute = ({ component: Component, ...rest }) => (
		<>
			{/* {
				process.env.NODE_ENV === 'development' ?
					<Component {...props} />
					: */}
			<PublicRoute {...rest}
				render={props => (
					token ?
						(<Component {...props} />)
						:
						(<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
				)}
			/>
			{/* } */}
		</>
	)



	return (
		<BrowserRouter>

			<Switch>

				<PublicRoute exact path='/' component={() => <HomePage />} />

				<PublicRoute exact path='/LoginIn' component={() => <LoginIn />} />
				<PublicRoute path='/created_user_employee' component={() => <CreatedUserEmployee />} />



				<PrivateRoute path='/empresa' component={() =>
					<>
						<Sidebar
							setSideNavExpanded={setSideNavExpanded}
							sideNavExpanded={sideNavExpanded}
						/>

						<DivMarge marge={sideNavExpanded}>
							<PrivateRoute path='/empresa/dashboard' component={() =>
								<Home />
							} />
						</DivMarge>

						<DivMarge marge={sideNavExpanded}>
							<Switch>
								<PrivateRoute path='/empresa/colaborador' exact component={() =>
									<Employees />
								} />
								<PrivateRoute path='/empresa/colaborador/:id' component={() =>
									<ViewEmployee />
								} />
							</Switch>
						</DivMarge>

						<DivMarge marge={sideNavExpanded}>
							<PrivateRoute path='/empresa/cadastrar_funcionario' exact component={() =>
								<EmployeeRegistration />
							} />
						</DivMarge>


						<DivMarge marge={sideNavExpanded}>
							<PrivateRoute path='/empresa/minhaconta' exact component={() =>
								<Accont />
							} />
						</DivMarge>
					</>
				} />


				<PublicRoute component={() => <h1>Página não econtrada</h1>} />
			</Switch>
		</BrowserRouter >
	)
}


const mapStateToProps = (state) => {
	return {
		token: safeAccess(state, ['authReducer', 'token'], undefined),
	};
};

export default connect(mapStateToProps)(Routes);