import React from "react"
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
    Button,
    Label,
    Alert
} from "reactstrap"
import { Save, Edit } from "react-feather"
import {createVehicule} from "../../Helpers/BrickYardAPI"
import {getToken} from "../../authService/Login"
import EditVehicle from "./EditVehicle"
class VehiculeCard extends React.Component{

    state={
        license_plate: "",
        show: false,
        carImage: "",
        isSaved: false,
        toEdit: false,
    }
    // Save the car information into the provided backend
    saveVehicle() {
        const vehicle = {
            ...this.props.vehicule,
            license_plate: this.props.vehicule.kenteken,
            image_url: this.props.carImage
        }
        // http call to add the vehicle provided with valid token
        createVehicule(vehicle,getToken(),()=>{
            this.setState({
                isSaved:true
            })
        })
    }

    // Display the update/Edit card
    handleUpdate(){
        this.setState({
            toEdit: true
        })
    }
    render(){
        return (
            (this.props.vehicule && this.props.carImage)
                ? <Row className="mt-2 justify-content-center">
                    <Col
                        md="10"
                        className="d-flex justify-content-center">
                        <Card className="justify-content-center bg-authentication login-card rounded-0 mb-0 w-100 p-2">
                            {
                                this.state.isSaved &&
                                <Alert color="success" className="mr-1 ml-1 p-2">
                                    U heeft het voertuig met succes opgeslagen
                                </Alert>
                            }
                            {
                                this.state.toEdit
                                    ? <EditVehicle vehicle={this.props.vehicule}/>
                                    : <Row className="m-0">
                                        <Col

                                            md="4"
                                        >
                                            <img src={this.props.carImage}
                                                 alt="loginImg" width="100%" height="300"/>
                                        </Col>
                                        <Col md="8" >
                                            <CardHeader className="pb-1">
                                                <Col md="10" sm="8">
                                                    <h3 className="mb-0">Voertuig informatie</h3>
                                                </Col>
                                                <Col md="2" sm="4">
                                                    { this.props.isCreated  ?
                                                        <Button
                                                            color="danger"
                                                            outline
                                                            onClick={() => this.handleUpdate()}
                                                        >
                                                            <Edit size={15} />
                                                        </Button>
                                                        :
                                                        <Button
                                                            color="primary"
                                                            outline
                                                            onClick={() => this.saveVehicle()}
                                                        >
                                                            <Save size={15} />
                                                        </Button>
                                                    }
                                                </Col>
                                            </CardHeader>
                                            <CardBody className="container">
                                                <Row>
                                                    <Col md="6">
                                                        <Label className="mr-2">Kenteken:</Label><span>{this.props.vehicule.kenteken || this.props.vehicule.license_plate}</span>
                                                    </Col>
                                                    <Col md="6" className="d-flex">
                                                        <Label className="mr-2">Merk:</Label><span>{this.props.vehicule.merk}</span>
                                                    </Col>

                                                </Row>
                                                <Row className="mt-2">
                                                    <Col md="6">
                                                        <Label className="mr-2">Handelsbenaming:</Label><span>{this.props.vehicule.handelsbenaming}</span>
                                                    </Col>
                                                    <Col md="6" >
                                                        <Label className="mr-2">Eerste_kleur:</Label>   <span>{this.props.vehicule.eerste_kleur}</span>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    {
                                                        this.props.vehicule.voertuigsoort &&
                                                        <Col md="6">
                                                            <Label className="mr-2">Voertuigsoort:</Label>   <span>{this.props.vehicule.voertuigsoort}</span>
                                                        </Col>
                                                    }
                                                    {
                                                        this.props.vehicule.aantal_zitplaatsen &&
                                                        <Col md="6">
                                                            <Label className="mr-2">Aantal_zitplaatsen:</Label>   <span>{this.props.vehicule.aantal_zitplaatsen}</span>
                                                        </Col>
                                                    }
                                                </Row>
                                                <Row className="mt-2">
                                                    {this.props.vehicule.catalogusprijs &&
                                                    <Col md="6">
                                                        <Label className="mr-2">Catalogusprijs:</Label> <span>{this.props.vehicule.catalogusprijs}</span>
                                                    </Col>}
                                                </Row>
                                            </CardBody>


                                        </Col>
                                    </Row>
                            }
                        </Card>
                    </Col>
            </Row>
                : <Row className="mt-2 justify-content-center">
                    <h3 className="mt-5">No results found</h3>
                </Row>
        )
    }
}
export default VehiculeCard