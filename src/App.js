import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import AuthService from 'src/views/authentication/AuthService';
import Swal from 'sweetalert2'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Configuracion sweetalert2
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary px-4',
    cancelButton: 'btn btn-outline-primary px-4 mr-4',
  },
  buttonsStyling: false
})

//console.log('Ruta completa: ', window.location.href);
//console.log('Ruta armada: ', window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/#/login');

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const Auth = new AuthService();

class App extends Component {


  inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
      // Match a string that ends with abc, similar to LIKE '%abc'
      //if(window.location.href !== window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/#/login'){
        var s = window.location.href;
       // console.log('window.location.href :: ', window.location.href );
      if(!s.match(/^.*login$/)){
        swalWithBootstrapButtons.fire({
          title: '',
          text:'¿La sesión expiró, desea continuar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          reverseButtons: true,
          position: 'top'
        }).then((result) => {
          if (result.isConfirmed) {

          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: '',
              text: 'Sesión cerrada',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              position: 'top'
            }).then((result) => {
              if (result.isConfirmed) {
                Auth.logout();
                window.location.reload();
              } /* else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {

              } */
            })
          }
        })
      }
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, window.globalConfig.sessionTimer * 60000); // 1000 milliseconds = 1 second
    }
  };

  render() {
    this.inactivityTime()
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Inicio" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
