/* import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}
export default TheLayout
 */


import React, { useState, useEffect } from 'react'
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { TheContent, TheSidebar, TheFooter, TheHeader} from './index'
import AuthService from 'src/views/authentication/AuthService';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import { getMenuPath, getMenuToNavigate } from 'src/functions/FunctionApi';
import { iconList } from 'src/reusable/variables/Variables';
export const PathContext = React.createContext([]);

var _ = require('lodash');

const TheLayout = () => {
  const history = useHistory();

  // Cycle life
  useEffect(() => {
    if (Auth.loggedIn()) {
      getNavigate();
      getPathListByToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //variables
  const Auth = new AuthService();

  const [spin, setSpin] = useState(false);
  const [navigation, setNavigation] = useState([]);
  const [route, setRoute] = useState([]);
  const [pathList, setPathList] = useState([]);


  const getComponent = (iconSearch) => {
    var arrayComponent = null;
    var iconFounded = null
    try {
      iconFounded = _.find(iconList, function (o) {
        return o.value === iconSearch
      });

      if (!_.isEmpty(iconFounded)) {
        arrayComponent = iconFounded.component;
      } else {
        arrayComponent = faBox
      }
    } catch (error) {
      console.log('Error getComponent: ', error)
    }
    return arrayComponent;
  }

  const getArrayToRoute = (result) => {
    const toRoute = [];

    try {
      if (Array.isArray(result)) {
        _.forEach(result, function (item) {
          toRoute.push(item.to);
          const children = item._children;
          _.forEach(children, function (c) {
            toRoute.push(c.to);
          });
        });
      }

    } catch (error) {
      console.log('Error route: ', error)
    }
    return toRoute;
  }

  const formatChildrenMenu = (menuChildren) => {
    var childrenNavigation = [];

    try {
      if (Array.isArray(menuChildren) && !_.isEmpty(menuChildren)) {
        _.forEach(menuChildren, function (value) {
          var omited = _.omit(value, ['idHijo'])
          const data = {
            ...omited,
            icon: (omited.icon !== '')
              ? <FontAwesomeIcon
                style={{ flex: '0 0 56px', marginLeft: '-1rem' }}
                icon={getComponent(omited.icon)}
              />
              : omited.icon
          }
          childrenNavigation.push(data);
        });
      }
    } catch (error) {
      console.log('Error en match menuHijo: ', error)
    }
    return childrenNavigation;
  }

  const ommitPermissionItemOnMenu = (menuApiList) => {
    var newNavigation = [];
    try {
      _.forEach(menuApiList, function (item) {
        var ommit = _.omit(item, ['idHijo', 'id'])
        const newChildren = _.filter(item._children, function (o) {
          return o.tipo === 'lectura';
        });
        ;
        const menuData = {
          ...ommit,
          // _children: newChildren,
          _children: formatChildrenMenu(newChildren),
          icon: (ommit.icon !== '')
            ? <FontAwesomeIcon
              style={{ flex: '0 0 56px', marginLeft: '-1rem' }}
              icon={getComponent(ommit.icon)}
            />
            : ommit.icon
        }
        newNavigation.push(menuData)
      });

    } catch (error) {
      console.log('Error en match menu: ', error)
    }
    return newNavigation;
  }

  /* Calling Web Services */
  const getNavigate = async () => {
    setSpin(true);
    await getMenuToNavigate()
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          const nav = ommitPermissionItemOnMenu(response.data);
          const to = getArrayToRoute(response.data);
          setNavigation(nav);
          setRoute(to);
        } else {
          Auth.logout();
          history.push('/500')
        }
        setSpin(false);
      }).catch((error) => {
        console.log("Error al recibir el menu ", error);
        Auth.logout();
        history.push('/500')
        setSpin(false);
      });
  }

  const getPathListByToken = async () => {
    setSpin(true)
    await getMenuPath()
      .then((response) => {
        setPathList(response.data);
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
        setSpin(false)
      });
  }

  return (
    (!Auth.loggedIn())
      ? <Redirect from="/" to="/login" />
      : <div className="c-app c-default-layout">
        <CCSpinner show={spin} />

        <PathContext.Provider value={pathList}>
          <TheSidebar navigation={navigation} />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent routesProp={route} />
            </div>
            <TheFooter />
          </div>
        </PathContext.Provider>
      </div>
  )
}

export default TheLayout