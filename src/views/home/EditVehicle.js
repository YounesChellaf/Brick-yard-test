import React from "react"
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
    Button,
    Label,
    Alert,
    FormGroup,
    Form, Input
} from "reactstrap"
import { Save } from "react-feather"
import {updateVehicule} from "../../Helpers/BrickYardAPI"
import {getToken} from "../../authService/Login"


class EditVehicle extends React.Component{

    state={
        license_plate: this.props.vehicle.kenteken || this.props.vehicle.license_plate ,
        merk: this.props.vehicle.merk,
        handelsbenaming: this.props.vehicle.handelsbenaming,
        eerste_kleur: this.props.vehicle.eerste_kleur,
        isEdited: false,
    }


    // Handle Update function to call updateVehicule helper function and then setting isEdited on true after receiving res on the callback
    handleUpdate = e => {
        e.preventDefault();
        console.log(this.state)
        updateVehicule(this.state,this.props.vehicle.id,getToken(),()=>{
            this.setState({
                isEdited : true
            })
        })
    }

    render(){
        return (

            <Row className="mt-2 justify-content-center">
                    <Col
                        md="10"
                        className="d-flex justify-content-center">
                        <Card className="justify-content-center bg-authentication login-card rounded-0 mb-0 w-100 p-2">
                            {
                                this.state.isEdited &&
                                <Alert color="success" className="mr-1 ml-1 p-2">
                                    De informatie is succesvol bijgewerkt
                                </Alert>
                            }
                            <Row className="m-0">
                                        <Col md="10" >
                                            <CardHeader className="pb-1">
                                                <Col md="10" sm="8">
                                                    <h3 className="mb-0">Bewerk de voertuiginformatie</h3>
                                                </Col>
                                            </CardHeader>
                                            <CardBody className="container">
                                                <Form action="/" onSubmit={this.handleUpdate}>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup className="form-label-group position-relative has-icon-left">
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.merk}
                                                                    onChange={e => this.setState({ merk: e.target.value })}
                                                                    required
                                                                />
                                                                <Label>Merk</Label>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup className="form-label-group position-relative has-icon-left">
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.handelsbenaming}
                                                                    onChange={e => this.setState({ handelsbenaming: e.target.value })}
                                                                    required
                                                                />
                                                                <Label>Handelsbenaming</Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup className="form-label-group position-relative has-icon-left">
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.eerste_kleur}
                                                                    onChange={e => this.setState({ eerste_kleur: e.target.value })}
                                                                    required
                                                                />
                                                                <Label>Eerste_kleur</Label>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup className="form-label-group position-relative has-icon-left">
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.license_plate}
                                                                    onChange={e => this.setState({ license_plate: e.target.value })}
                                                                    required
                                                                />
                                                                <Label>License plate</Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <FormGroup className="d-flex justify-content-between align-items-center">

                                                    </FormGroup>
                                                    <div className="d-flex justify-content-start">
                                                        <Button color="primary" outline type="submit">
                                                            <Save size={20}  className="mr-2"/>
                                                            wijzigingen opslaan
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </CardBody>


                                        </Col>
                                    </Row>
                        </Card>
                    </Col>
                </Row>
        )
    }
}
export default EditVehicle