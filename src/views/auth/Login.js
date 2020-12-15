import React from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    Row,
    Col,

    CardBody,
    FormGroup,
    Form, Input, Button, Label,
} from "reactstrap"
import { Mail, Lock } from "react-feather"
import { history } from "../../history"

import {login} from "../../authService/Login"
import loginImg from "../../assets/img/login.jpg"
import "../../assets/scss/pages/authentication.scss"

class Login extends React.Component {

    state = {
        email: "",
        password: "",
    }

    // Authenricate the user to register the token on local storage using the helper function login()
    handleSubmit = e => {
        e.preventDefault();
        login(this.state, () => {
            this.props.history.push('/home');
        });
    }

    render() {
        return (
            <Row className="mt-5 justify-content-center">
                <Col
                    sm="8"
                    xl="7"
                    lg="10"
                    md="8"
                    className="d-flex justify-content-center"
                >
                    <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
                        <Row className="m-0">
                            <Col
                                lg="6"
                                className="d-lg-block d-none text-center align-self-center px-1 py-0"
                            >
                                <img src={loginImg} alt="loginImg" />
                            </Col>
                            <Col lg="6" md="12" className="p-0">
                                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                                    <CardHeader className="pb-1">
                                        <CardTitle>
                                            <h4 className="mb-0">Login</h4>
                                        </CardTitle>
                                    </CardHeader>
                                    <p className="px-2 auth-title">
                                        Welcome to our platform, in order to retreive a vehicule it's mendatory to authenticate please
                                    </p>
                                            <CardBody className="pt-1">
                                                <Form action="/" onSubmit={this.handleSubmit}>
                                                    <FormGroup className="form-label-group position-relative has-icon-left">
                                                        <Input
                                                            type="email"
                                                            placeholder="Email"
                                                            value={this.state.email}
                                                            onChange={e => this.setState({ email: e.target.value })}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <Mail size={15} />
                                                        </div>
                                                        <Label>Email</Label>
                                                    </FormGroup>
                                                    <FormGroup className="form-label-group position-relative has-icon-left">
                                                        <Input
                                                            type="password"
                                                            placeholder="Password"
                                                            value={this.state.password}
                                                            onChange={e => this.setState({ password: e.target.value })}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <Lock size={15} />
                                                        </div>
                                                        <Label>Password</Label>
                                                    </FormGroup>
                                                    <FormGroup className="d-flex justify-content-between align-items-center">

                                                    </FormGroup>
                                                    <div className="d-flex justify-content-start">
                                                        <Button color="primary" type="submit">
                                                            Login
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default Login
