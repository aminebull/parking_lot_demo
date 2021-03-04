import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageLoader } from "./Components/CommonComponents";
import { BaseLayout } from "./Layout/BaseLayout";
// import Store from "./ContextStore";
import ContextStore from "./ContextStore";
// import cookie from "js-cookie";

const Home = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./Components/Home/Home")), 1000);
  });
});
const LoginScreen = lazy(() => import("./Components/LoginScreen"));

export const Routes = (props) => {
  const {
    isAuthenticated,
    toggle_isAuthenticated,
    toggle_un_park_vehicle_pop_up,
    toggle_park_vehicle_pop_up,
    park_vehicle_pop_up,
    un_park_vehicle_pop_up,
    set_vehicle_no,
    spots,
    release_park,
    spotId,
    un_park_vehicle,
    get_searched_vehicleNo,
    get_vehicle_type
  } = props;

  if (isAuthenticated) {
    return (
      <ContextStore.Provider
        value={{
          isAuthenticated: isAuthenticated,
          toggle_isAuthenticated: toggle_isAuthenticated,
          toggle_un_park_vehicle_pop_up: toggle_un_park_vehicle_pop_up,
          toggle_park_vehicle_pop_up: toggle_park_vehicle_pop_up,
          park_vehicle_pop_up: park_vehicle_pop_up,
          un_park_vehicle_pop_up: un_park_vehicle_pop_up,
          spots: spots,
          set_vehicle_no: set_vehicle_no,
          release_park:release_park,
          spotId:spotId,
          un_park_vehicle:un_park_vehicle,
          get_vehicle_type:get_vehicle_type,
          get_searched_vehicleNo:get_searched_vehicleNo,
        }}
      >
        <BaseLayout type="wrap">
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </BaseLayout>
      </ContextStore.Provider>
    );
  } else {
    return (
      <ContextStore.Provider
        value={{
          isAuthenticated: isAuthenticated,
          toggle_isAuthenticated: toggle_isAuthenticated,
        }}
      >
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route exact path="/login-screen" component={LoginScreen}></Route>
            <Redirect to="/login-screen" />
          </Switch>
        </Suspense>
      </ContextStore.Provider>
    );
  }
};
