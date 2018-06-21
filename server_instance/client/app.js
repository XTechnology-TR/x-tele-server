import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import bowser from "bowser";
import { Helmet } from "react-helmet";
import { notify } from "react-notify-toast";
import { t } from "~/shared/translations/i18n";
import { SERVER_DETAILS, REDUX_STATE } from "~/shared/constants";

import Router from "./Router";
import Loading from "./common/components/Loading";

import { AUTHENTICATION, LOGIN_REJECTED, loginUser } from "./common/store/reducers/authentication";
import { getToken, clearToken } from "~/shared/utilities/securityToken";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		// Check client is using a valid browser version
		this.browserVersionCheck();
		// Attempt user login
		this.login();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.logInStatus === prevState.logInStatus) {
			return null;
		}
		// Store subdomain in state if valid
		if (nextProps.logInStatus === REDUX_STATE.FULFILLED) {
			// Store token in browser
			// Change locale
			// Change client styling
		}
		return null;
	}

	browserVersionCheck() {
		const isSupported = bowser.check(SERVER_DETAILS.MINIMUM_BROWSER_VERSIONS);
		if (!isSupported) {
			notify.show(t("error.outdatedBrowser"), "warning", -1);
		}
	}

	login() {
		// Fetch security token from browser
		const token = getToken();

		// Set loaded to true and load route as unauthenticated
		if (token === null) {
			clearToken();
			this.setState({
				loading: false
			});
			return;
		}

		this.props.loginUser({ authToken: true, token }).then(result => {
			if (result.type === LOGIN_REJECTED) {
				clearToken(); // Clear security token if login rejected
			}
			this.setState({
				loading: false
			});
		});
	}

	render() {
		const { loading } = this.state;

		return (
			<Fragment>
				<Helmet>
					<title>{t("headers.login.title")}</title>
				</Helmet>
				{loading ? <Loading /> : <Router />}
			</Fragment>
		);
	}
}

App.propTypes = {
	logInStatus: PropTypes.string,
	loginUser: PropTypes.func
};

function mapStateToProps(state, props) {
	return {
		logInStatus: state.getIn([AUTHENTICATION, "userLogin", "status"])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginUser: bindActionCreators(loginUser, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
