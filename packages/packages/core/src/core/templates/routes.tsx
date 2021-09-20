import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const RouteMaker = (routes2 = []) => () => {

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/register">Reg</Link>
            </li>
            <li>
              <Link to="/reg">reg-home</Link>
            </li>
          </ul>
  
          <hr />
  
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            {routes2.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }


function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={(props) => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    )
  }

  export default RouteMaker;