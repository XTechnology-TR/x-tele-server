import React from "react";
import PropTypes from "prop-types";

import InputField from "../../common/components/inputs/InputField";

class Authentication extends React.Component {
  render() {
    return (
      <div className="authentication container-fluid h-100">
        <div className="row justify-content-center h-100 nopadding">
          <div className="form-container col-4 hidden-md-down">
            <div className="justify-content-center">
              <InputField />
              <InputField />
            </div>
          </div>
          <div className="background-container col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8 nopadding">
            Right most column
          </div>
        </div>
      </div>
    );
  }
}

export default Authentication;
