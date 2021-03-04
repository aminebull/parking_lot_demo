import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ParkOverLay, UnParkOverLay } from "../Components/CommonComponents";
import ContextStore from "../ContextStore";
// import SelectSearch from "react-select-search";
import Select from "react-select";

const customStyles = {
  control: styles => ({ ...styles,width:'17em' }),
};
const typeStyles = {
  control: styles => ({ ...styles,width:'10em' ,marginRight:'10px'}),
};
const typeOptions = [{value:0,label:"All"},{value:1,label:"Car"},{value:2,label:"Bike"}]


export const Header = () => {
  const context = useContext(ContextStore);
  const [searchOptions, set_searcOptions] = useState([]);
  const [selected_vehicleNo, set_selected_vehicleNo] = useState("");
  const [type, set_type] = useState({value:"",label:"All"});

  useEffect(() => {
    const set_options = [];

    context.spots.map((data) => {
      const { vehicleNo } = data;
      if (vehicleNo === "") {
        const empty = "";
        return empty;
      } else {
        var obj = { value: vehicleNo, label: vehicleNo };
        set_options.push(obj);
      }
      return set_options;
    });
    set_searcOptions(set_options);
  }, [context.spots]);



  const onClick_log_out = () => {
    context.toggle_isAuthenticated(false);
    localStorage.removeItem("spots");
  };

  return (
    <>
      {context.park_vehicle_pop_up ? <ParkOverLay /> : null}
      {context.un_park_vehicle_pop_up ? <UnParkOverLay /> : null}
      <Navbar style={{ background: "#265e79" }} variant="dark">
        <Navbar.Brand href="#home">
          <i className="fa fa-home">
            {" "}
            Welcome to the Parking Lot Management Demo
          </i>
        </Navbar.Brand>
        <Nav className="ml-auto">
        <Select
              styles={typeStyles}
              defaultValue = {type}
              value = {type}
              onChange ={(e)=>{
                set_type(e)
                  context.get_vehicle_type(e.value)
              }}
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={typeOptions}
            />

            <Select
              styles={customStyles}
              defaultValue = {selected_vehicleNo}
              value = {selected_vehicleNo}
              onChange ={(e)=>{
                set_selected_vehicleNo(e)
                if(e=== null){
                  const vehicleNo = ""
                  context.get_searched_vehicleNo(vehicleNo)
                }else{
                  context.get_searched_vehicleNo(e.value)
                }
              }}
              className="basic-single"
              classNamePrefix="select"
              placeholder="Search By Vehicle No."
              autosize={false}
              isClearable={true}
              isSearchable={true}
              name="color"
              options={searchOptions}
            />
          <Button
            style={{ background: "transparent", border: "none" }}
            onClick={onClick_log_out}
          >
            Log Out
          </Button>
        </Nav>
      </Navbar>
    </>
  );
};
// export const Footer = () => {
//   return <div>Footer</div>;
// };
