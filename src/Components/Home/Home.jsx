import React, {useContext } from "react";
import { Container, Col, Row, Card, Dropdown } from "react-bootstrap";
import Store from '../../ContextStore'
// import {
//   CWidgetDropdown,
//   CRow,
//   CCol,
//   CDropdown,
//   CDropdownMenu,
//   CDropdownItem,
//   CDropdownToggle,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";

const Home = () => {
  return (
    <div>
      <Container style={{ padding: "20px 0" }}>
        <WidgetsDropdown />
      </Container>
    </div>
  );
};

const WidgetsDropdown = () => {
  const context =  useContext(Store)

  const setItem = (is_available, spotId) => {
    context.toggle_park_vehicle_pop_up(true,spotId)
  };

  const unset_Item = (is_available, spotId) => {
    context.toggle_un_park_vehicle_pop_up(true,spotId);
    // context.release_park(spotId)
  };

  return (
    <Row>
      {context.spots.map((data) => {
        const { isAvailable, spotId, spotName, type, vehicleNo,in_time } = data;
        return (
          <Col sm="6" lg="3" style={{ padding: "20px" }} key={spotId}>
            <Card className="text-center" style={{ border: "none" }}>
              <Card.Header
                style={{
                  background: "#265e79",
                  color: "white",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
              Status : {isAvailable === 1 ? "Empty" : "Occupied"}
              </Card.Header>
              <Card.Body
                style={{
                  border: "solid",
                  borderRadius: "0px 0px 10px 10px",
                  borderColor: data.isAvailable === 1 ? "#39c19c" : "#e64545",
                  borderTop: "none"
                }}
              >
                <Card.Text>
                  {type === 1 ? <i className="fa fa-2x fa-car" style={{ color: data.isAvailable === 1 ? "#39c19c" : "#e64545" }}>&nbsp;&nbsp;:&nbsp;&nbsp; {spotName}</i> : <i className="fa fa-2x fa-motorcycle" style={{ color: data.isAvailable === 1 ? "#39c19c" : "#e64545" }}>&nbsp;&nbsp;:&nbsp;&nbsp; {spotName} </i>}
                </Card.Text>
                <Card.Title style={{ color: data.isAvailable === 1 ? "#39c19c" : "#e64545" }}>
                  {isAvailable === 1 ? "--" : vehicleNo}
                </Card.Title>
                <Card.Text style={{ color: data.isAvailable === 1 ? "#39c19c" : "#e64545" }}>
                  {isAvailable === 1 ? "--" : in_time}
                </Card.Text>
                <Dropdown className="text-right">
                  <Dropdown.Toggle
                    style={{ background: "#265e79", border: "none" }}
                    id="dropdown-basic"
                  >

                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      disabled={isAvailable === 1 ? false : true}
                      value="1"
                      onSelect={() => {
                        setItem(0, spotId);
                      }}
                    >
                      {" "}
                      Park
                    </Dropdown.Item>
                    <Dropdown.Item
                      disabled={isAvailable === 1 ? true : false}
                      value={0}
                      onSelect={() => {
                        unset_Item(1, spotId);
                      }}
                    >
                      Release
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Home;
