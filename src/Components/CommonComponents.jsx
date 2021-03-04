/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CRow,
  CCard,
  CCardText,
} from "@coreui/react";
import styled from "styled-components";
import Store from "../ContextStore";

export const Overlay = styled.div`
  background-color: rgb(31, 44, 53, 0.8);
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  cursor: pointer;
  overflow-y: scroll;
  @media all and (max-width: 992px) {
    overflow-y: scroll;
  }
`;
export const VehicleNoCard = styled(CCard)`
  align-items: center;
  padding: 30px;
  background: #265e79;
  border-radius: 10px;
  max-width:30em;
  margin-left: auto;
  margin-right: auto;
`;

export const PageLoader = () => (
  <div className="page-loader">
    <Container style={{ textAlign: "center" }}>
      <br />
      <i className="fa fa-2x fa-spinner fa-spin"></i>
    </Container>
  </div>
);

export const ParkOverLay = () => {
  const context = useContext(Store);
  const [vehicle_no, setvehicle_no] = useState("");

  const submit = (e) => {
    context.set_vehicle_no(vehicle_no);
    e.preventDefault();
  };

  return (
    <Overlay>
      <Container
        style={{
          marginTop: "30vh",
        }}
      >
        <VehicleNoCard>
          <Button
            style={{
              color: "black",
              display: "flex",
              position: "absolute",
              background: "transparent",
              border: "none",
              alignSelf: "flex-end",
              right: "40px",
              top: "40px",
            }}
            onClick={() => {
              context.toggle_park_vehicle_pop_up(false);
            }}
          >
            X
          </Button>
          <CCardBody
            className="d-flex justify-content-center"
            style={{ background: "#fff", borderRadius: "10px", width: "100%" }}
          >
            <CForm onSubmit={submit} name="formLogin">
              <CInputGroup className="mb-3">
                <CInput
                  type="text"
                  placeholder="Enter Vehicle number"
                  autoComplete="off"
                  name="user_name"
                  // invalid={error_messages.is_user_name_valid}
                  onChange={(e) => {
                    setvehicle_no(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </CInputGroup>
              {/* <div style={{ color: "red", fontSize: "12px" }}>
                {error_messages.username_error_message}
              </div> */}
              <CRow className="d-flex justify-content-center">
                <CCol xs="6">
                  <CButton type="submit" className="px-6" style={{background:"#265e79", color:"white"}}>
                    Park
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </VehicleNoCard>
      </Container>
    </Overlay>
  );
};
export const UnParkOverLay = () => {
  const context = useContext(Store);
  const [start_time, setstart_time] = useState('')
  const [end_time, setend_time] = useState('')

  useEffect(() => {
    get_start_and_endtime();


  }, []);

  const get_start_and_endtime = () => {
    context.un_park_vehicle();
    const set_spots = JSON.parse(localStorage.getItem("spots"));
    set_spots.map((data)=>{
      const {spotId,in_time,out_time} = data
      if (context.spotId === spotId) {
        setend_time(out_time)
        setstart_time(in_time)
      }
      return data

    })
  };
  useEffect(() => {
    get_start_and_endtime();


  }, [!start_time]);

  var date1 = new Date(start_time);
  var date2 = new Date(end_time);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  Difference_In_Time = Math.floor(Difference_In_Time / (1000 * 60))
  if(Difference_In_Time == 0){
    Difference_In_Time = "-";
  }


  return (
    <Overlay>
      <Container
        style={{
          marginTop: "30vh",
        }}
      >
        <VehicleNoCard>
          <Button
            style={{
              color: "black",
              display: "flex",
              position: "absolute",
              background: "transparent",
              border: "none",
              alignSelf: "flex-end",
              right: "40px",
              top: "40px",
            }}
            onClick={() => {
              context.toggle_un_park_vehicle_pop_up(false);
            }}
          >
            X
          </Button>
          <CCardBody
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <CCardText><i>Start Time:</i> <b>{start_time}</b></CCardText>
            <CCardText><i>End Time:</i> <b>{end_time}</b></CCardText>
            <CCardText><i>Total Billing Minutes:</i> <b>{Difference_In_Time}</b></CCardText>

            <CButton style={{background:"#265e79", color:"white"}} onClick = {context.release_park}> Release Park</CButton>
          </CCardBody>
        </VehicleNoCard>
      </Container>
    </Overlay>
  );
};
