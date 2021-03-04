import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  // CFormText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ContextStore from "../ContextStore";
import login_credentials from "../login_credentials.json";
import { freeSet } from "@coreui/icons";

class LoginScreen extends Component {
  static contextType = ContextStore;

  state = {
    user_name: "",
    password: "",
    error_messages: {
      is_user_name_valid: false,
      is_password_valid: false,
      username_error_message: "",
      password_error_message: "",
    },
  };


  setValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    if (this.validate_fields()) {
      this.context.toggle_isAuthenticated(true);
    }

    e.preventDefault();
  };

  validate_fields = () => {
    const { user_name, password } = this.state;
    if (user_name === "") {
      this.setState({
        error_messages: {
          is_user_name_valid: true,
          username_error_message: "Field is should not be empty",
        },
      });
      setTimeout(() => {
        this.setState({
          error_messages: {
            is_user_name_valid: false,
            username_error_message: "",
          },
        });
      }, 4000);
      return false;
    }
    if (user_name !== login_credentials[0].login_id) {
      this.setState({
        error_messages: {
          is_user_name_valid: true,
          username_error_message: "Incorrect Username",
        },
      });
      setTimeout(() => {
        this.setState({
          error_messages: {
            is_user_name_valid: false,
            username_error_message: "",
          },
        });
      }, 4000);
      return false;
    }
    if (password === "") {
      this.setState({
        error_messages: {
          is_password_valid: true,
          password_error_message: "Field is should not be empty",
        },
      });
      setTimeout(() => {
        this.setState({
          error_messages: {
            is_password_valid: false,
            password_error_message: "",
          },
        });
      }, 4000);
      return false;
    }
    if (password !== login_credentials[0].password) {
      this.setState({
        error_messages: {
          is_password_valid: true,
          password_error_message: "Please add a valid password",
        },
      });
      setTimeout(() => {
        this.setState({
          error_messages: {
            is_password_valid: false,
            password_error_message: "",
          },
        });
      }, 4000);
      return false;
    }
    this.setState({
      error_messages: {
        is_user_name_valid: false,
        is_password_valid: false,
        username_error_message: "",
        password_error_message: "",
      },
    });
    return true;
  };

  render() {
    const { error_messages } = this.state;
    return (
      <div className="App">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.submit} name="formLogin">
                      <h5>Welcome to the Parking Lot Management Demo</h5>
                      <p className="text-muted">Log In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilUser} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="user_name"
                          invalid={error_messages.is_user_name_valid}
                          onChange={this.setValues}
                        />
                      </CInputGroup>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {error_messages.username_error_message}
                      </div>

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilLockLocked} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          invalid={error_messages.is_password_valid}
                          onChange={this.setValues}
                        />
                      </CInputGroup>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {error_messages.password_error_message}
                      </div>

                      <CRow>
                        <CCol xs="6">
                          <CButton
                            type="submit"
                            className="px-4"
                            style={{ background: "#265e79", color: "white" }}
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
export default LoginScreen;
