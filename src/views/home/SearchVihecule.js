import React from "react"
import axios from "axios"
import {
    Card,
    Row,
    Col,
    Form, Input, Button,Spinner
} from "reactstrap"
import VehiculeCard from "./VehiculeCard"
import {getToken} from "../../authService/Login";


class SearchVihecule extends React.Component{

    state={
        license_plate: "",
        vehicule: {},
        show: false,
        carImage: "",
        loading: false,
        isCreated: false,
    }

    // Get Vehicule from the RDW API
    getVehiculeRDW(licencePlate) {
        axios.get(process.env.REACT_APP_RDW_API+"?kenteken="+licencePlate).then(res => {
            this.setState({
                vehicule: res.data[0],
                show: true,
                loading: false
        })
        this.getVehicleImage()
        });
    }
    // Validate the license plate input to avoid spaces and dashes
    seachInputValidation ( licencePlate ) {
        if (licencePlate.length !== 6 ) {
            // Replace spaces and dashes
            return licencePlate.replace(/-|' '/g,'');
        }
        return licencePlate
    }


    // Get the vehicule requested by License plate
    retreiveVehicule = async e => {
        // Enable Loading to show spinner
        this.setState({
            loading: true
        })
        const validLicense = this.seachInputValidation(this.state.license_plate)
        axios.get(process.env.REACT_APP_BrickYard_API+"/vehicles/search/"+validLicense,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }).then(res => {
                if (res.data) {
                    // get Image from Google search if it's not available on the provided backend
                    if (! res.data.image_url ) this.getVehicleImage()
                    this.setState({
                        vehicule: res.data,
                        carImage: res.data.image_url,
                        show: true,
                        loading: false,
                        isCreated: true
                    })
                }
                else  {
                    // Get the vehicle information from RDW if it's not available on the provided Backend
                    this.getVehiculeRDW(validLicense)
                }

        })
        e.preventDefault()

    };

    getVehicleImage(){
        if (this.state.vehicule){
            axios.get("https://www.googleapis.com/customsearch/v1?q="
                +this.state.vehicule.merk+"+"+this.state.vehicule.handelsbenaming
                +"&cx="+process.env.REACT_APP_CX+"&num=1&key="+process.env.REACT_APP_API_KEY)
                .then(res => {
                    this.setState({
                        carImage: res.data.items[0].pagemap.cse_image[0].src,
                    })
                })
        }
    }
    render(){
        return (
            <React.Fragment>
                <Row className="mt-5 justify-content-center">
                <Col
                    md="8"
                    className="d-flex justify-content-center"
                >
                    <Card className="bg-authentication login-card rounded-0 mb-0 w-100 p-2">
                        <Form action="/" onSubmit={this.retreiveVehicule}>
                        <Row className="m-0">
                                <Col lg="8" md="6" sm="6">
                                    <Input
                                        className="mb-1"
                                        type="text"
                                        value={this.state.license_plate}
                                        onChange={e => this.setState({ license_plate: e.target.value })}
                                        placeholder="Nummerplaat :  XXAAXX"
                                        required
                                    />
                                </Col>

                                <Col lg="4" md="6" sm="6" className="d-flex justify-content-center mb-1">
                                    <Button
                                        color="primary"
                                        outline
                                        type="submit"
                                    >
                                        Voertuig ophalen
                                    </Button>
                                </Col>
                        </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
                {this.state.loading &&  <Row className="mt-5 justify-content-center"><Spinner color="primary" size="40"/></Row>}
                {this.state.show  && <VehiculeCard vehicule={this.state.vehicule} carImage={this.state.carImage} isCreated={this.state.isCreated}/>}
            </React.Fragment>
        )
    }
}
export default SearchVihecule