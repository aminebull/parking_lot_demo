import React, { Component } from "react";
import { Routes } from "./Routes";
import cookie from "js-cookie";
import spots from "./spots.json";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default class ContextController extends Component {
  state = {
    isAuthenticated: false,
    park_vehicle_pop_up: false,
    un_park_vehicle_pop_up: false,
    spotId: "",
    spots: [],
    vehicleNo: "",
  };

  componentDidMount = () => {
    this.updateLoginStatus();
    this.set_default_spots();
  };

  set_default_spots = () => {
    const set_spots = JSON.parse(localStorage.getItem("spots"));
    if (set_spots === null) {
      this.setState({
        spots: spots,
      });
      localStorage.setItem("spots", JSON.stringify(spots));
    } else {
      this.setState({
        spots: set_spots,
      });
      localStorage.setItem("spots", JSON.stringify(set_spots));
    }
  };

  updateLoginStatus = () => {
    const authentication_status = cookie.get("isAuthenticated");
    if (authentication_status === "true") {
      this.toggle_isAuthenticated(true);
    } else {
      this.toggle_isAuthenticated(false);
    }
  };

  park_vehicle = (vehicleNo) => {
    const { spotId } = this.state;
    let data = JSON.parse(localStorage.getItem("spots"));
    let today = new Date();

    const date =
      today.getDate() +
      "-" +
      monthNames[today.getMonth()] +
      "-" +
      today.getFullYear();

    today.getDate();
    var hours = today.getHours();
    var AmPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    const time =
      hours +
      ":" +
      today.getMinutes().toString().padStart(2, "0") +
      ":" +
      today.getSeconds().toString().padStart(2, "0") +
      " " +
      AmPm;
    const dateTime = date + " " + time;

    let new_data = data.map((value) => {
      if (value.spotId === spotId) {
        value.isAvailable = 0;
        value.vehicleNo = vehicleNo;
        value.in_time = dateTime;
      }
      return value;
    });
    localStorage.setItem("spots", JSON.stringify(new_data));
    this.setState({
      spots: JSON.parse(localStorage.getItem("spots")),
    });
    this.toggle_park_vehicle_pop_up(false);
  };

  un_park_vehicle = () => {
    const { spotId } = this.state;
    let data = JSON.parse(localStorage.getItem("spots"));
    let today = new Date();

    const date =
      today.getDate() +
      "-" +
      monthNames[today.getMonth()] +
      "-" +
      today.getFullYear();

    today.getDate();
    var hours = today.getHours();
    var AmPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    const time =
      hours +
      ":" +
      today.getMinutes().toString().padStart(2, "0") +
      ":" +
      today.getSeconds().toString().padStart(2, "0") +
      " " +
      AmPm;
    const dateTime = date + " " + time;

    let new_data = data.map((value) => {
      if (value.spotId === spotId) {
        value.out_time = dateTime;
      }
      return value;
    });
    localStorage.setItem("spots", JSON.stringify(new_data));
    // this.setState({
    //   spots: JSON.parse(localStorage.getItem("spots")),
    // });
  };

  get_searched_vehicleNo = (vehicleNo) => {
    const { spots } = this.state;
    if (vehicleNo !== "") {
      const searched_spot = spots.filter((single_spot) => {
        return single_spot.vehicleNo === vehicleNo;
      });
      this.setState({
        spots: searched_spot,
      });
    } else {
      let complete_spots = JSON.parse(localStorage.getItem("spots"));
      this.setState({
        spots: complete_spots,
      });
    }
  };

  get_vehicle_type = (type) => {
    if (type === 0) {
      let complete_spots = JSON.parse(localStorage.getItem("spots"));
      this.setState({
        spots: complete_spots,
      });
    } else {
        let complete_spots = JSON.parse(localStorage.getItem("spots"));
        const spot = complete_spots.filter((single_spot) => {
          return single_spot.type === type;
        });
        this.setState({
          spots: spot,
        });
    }
  };

  release_park = () => {
    let data = JSON.parse(localStorage.getItem("spots"));
    let new_data = data.map((value) => {
      if (value.spotId === this.state.spotId) {
        value.isAvailable = 1;
        value.vehicleNo = "";
        value.in_time = "";
      }
      return value;
    });
    localStorage.setItem("spots", JSON.stringify(new_data));
    this.setState({
      spots: new_data,
    });
    this.toggle_un_park_vehicle_pop_up(false);
  };

  set_vehicle_no = (vehicleNo) => {
    this.park_vehicle(vehicleNo);
  };

  toggle_un_park_vehicle_pop_up = (state, spotId) => {
    this.setState({
      un_park_vehicle_pop_up: state,
      spotId: spotId,
    });
  };

  toggle_park_vehicle_pop_up = (state, spotId) => {
    this.setState({
      park_vehicle_pop_up: state,
      spotId: spotId,
    });
  };

  toggle_isAuthenticated = (state) => {
    cookie.set("isAuthenticated", state, { expires: 364 });
    this.setState({
      isAuthenticated: state,
    });
  };

  render() {
    const {
      isAuthenticated,
      park_vehicle_pop_up,
      un_park_vehicle_pop_up,
      spots,
      spotId,
    } = this.state;
    const {
      toggle_isAuthenticated,
      toggle_un_park_vehicle_pop_up,
      toggle_park_vehicle_pop_up,
      set_vehicle_no,
      release_park,
      un_park_vehicle,
      get_searched_vehicleNo,
      get_vehicle_type,
    } = this;
    return (
      <>
        <Routes
          isAuthenticated={isAuthenticated}
          park_vehicle_pop_up={park_vehicle_pop_up}
          un_park_vehicle_pop_up={un_park_vehicle_pop_up}
          un_park_vehicle={un_park_vehicle}
          toggle_isAuthenticated={toggle_isAuthenticated}
          toggle_un_park_vehicle_pop_up={toggle_un_park_vehicle_pop_up}
          toggle_park_vehicle_pop_up={toggle_park_vehicle_pop_up}
          set_vehicle_no={set_vehicle_no}
          release_park={release_park}
          get_vehicle_type={get_vehicle_type}
          spots={spots}
          spotId={spotId}
          get_searched_vehicleNo={get_searched_vehicleNo}
        />
      </>
    );
  }
}
