/*import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)*/


import React, { Suspense, useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import CCSpinner from 'src/reusable/spinner/CCSpinner';
var _ = require('lodash');

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Cargando...</div>
  </div>

)

const TheContent = ({ routesProp }) => {
  console.log('routesProp: ', routesProp);
  const [listRoute, setListRoute] = useState([])
  const [spin, setSpin] = useState(false);

  const matching = () => {
    setSpin(true);
/*
    const newRoute = [];
    newRoute.push(routes[0]);
    newRoute.push(routes[1]);
    newRoute.push(routes[2]);
    newRoute.push(routes[3]);
    newRoute.push(routes[4]);
    newRoute.push(routes[5]);

    _.forEach(routesProp, function (item) {
      var searching = _.find(routes, ['path', item]);
      if (searching !== null && searching !== undefined) {
        newRoute.push(searching)
      }
    });
    setListRoute(newRoute);*/
    setListRoute(routes);

    setSpin(false);

  }
  useEffect(() => {
    matching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routesProp]);

  console.log('listRoute: ', listRoute);
  return (
    <main className="c-main">
      <CCSpinner show={spin} />

      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {
              (!_.isEmpty(listRoute))
                ? listRoute.map((route, idx) => {
                  return route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      )} />
                  )
                })
                : <CCSpinner show={spin} />
            }
            <Redirect from="/" to="/main" />
          </Switch>
        </Suspense>
      </CContainer>


    </main>
  )
}

export default React.memo(TheContent)


