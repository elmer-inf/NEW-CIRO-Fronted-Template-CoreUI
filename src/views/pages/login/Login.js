import React, { useState } from 'react'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import {
  Button, Form, FormGroup,
  Input,
  Label, Alert
} from 'reactstrap';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'
import { CInputReactTwo } from 'src/reusable/CInputReactTwo';
import AuthService from 'src/views/authentication/AuthService';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { postAuthentication } from 'src/views/authentication/AuthController';
import CIcon from '@coreui/icons-react';
import { Messages } from 'src/reusable/variables/Messages';
import { LogIn } from 'react-feather';

const Login = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [typeInput, setTypeInput] = useState('password');

  const Auth = new AuthService();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object().shape(
      {
        username: Yup.string().required(Messages.required),
        password: Yup.string().required(Messages.required),
      }

    ),
    onSubmit: values => {
      handleOnSubmit(values);
    }
  });


  const handleOnSubmit = (dataLogin) => {
    setSpin(true);

    postAuthentication(dataLogin)
      .then((response) => {
        Auth.setToken(response.data.accessToken);
        //return Promise.resolve(response);
        // history.go(0)
        history.push('/')
        window.location.reload();
        setSpin(false);
      }).catch((error) => {
        console.log("Error de autenticación:\n ", error);
        formik.handleReset();
        setAlertOpen(true)

        setSpin(false);
      });

  }
  const showPassword = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setTypeInput('text')
    } else {
      setTypeInput('password')
    }

  }
  const toggleAlert = () => {
    //style={{ background: 'linear-gradient(153deg, rgba(0,171,181,1) 0%, rgba(0,183,198,1) 26%, rgba(245,130,32,1) 100%)' }}
    setAlertOpen(!alertOpen)
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ backgroundImage: 'radial-gradient(circle at 103.03% 50%, #92d5d7 0, #77c5cb 16.67%, #52b2bd 33.33%, #009bac 50%, #00849c 66.67%, #007290 83.33%, #006388 100%)' }}>
      <CCSpinner show={spin} />

      <CContainer >
        <CRow className="justify-content-center">
          <CCol md="8">
            {/*   style={{ background:'#00b7c5' }} 
             <CCard className="text-warning bg-light  py-5 d-md-down-none" style={{ width: '44%' }}>
             background: 'rgb(0,171,181)';
background: 'linear-gradient(153deg, rgba(0,171,181,1) 0%, rgba(0,183,198,1) 26%, rgba(245,130,32,1) 100%)';
background: rgb(0,171,181);
background: linear-gradient(153deg, rgba(0,171,181,1) 0%, rgba(0,183,198,1) 26%);
        */}


            <CCardGroup>
              <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%', "backgroundColor": "rgba(0, 0, 0, 0.3)" }} >
                <CCardBody className="text-center">
                  <div className='pb-4'>
                    <CIcon
                      className="c-sidebar-brand-minimized"
                      name="sygnet"
                      src="/avatars/logo_atc_white.png"
                      height={200}
                    />
                  </div>
                  <span className='text-center h4 text-data'>SISTEMA GESTION DE RIESGOS INTEGRALES</span>
                </CCardBody>
              </CCard>
              <CCard className="text-white pt-4" style={{ "WebkitBackdropFilter": " blur(20px)", "backdropFilter": "blur(20px)", "backgroundColor": "rgba(0, 0, 0, 0.1)" }}>
                <CCardBody>
                  <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <h4 style={{ textAlign: 'center' }}>Iniciar sesión en su cuenta</h4>
                    <CCol sm="12" md={{ size: 12, offset: 0 }} className='pt-4'>
                      <CInputReactTwo
                        label={"Usuario"}
                        type={'text'}
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.username}
                        errors={formik.errors.username}
                      />
                    </CCol>
                    <CCol sm="12" md={{ size: 12, offset: 0 }}>
                      <CInputReactTwo
                        label={"Password"}
                        //type={"password"}
                        type={typeInput}
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.password}
                        errors={formik.errors.password}
                      />
                    </CCol>
                    <CCol xs="12" sm="12" className="text-right">
                      <FormGroup check>
                        <Input type="checkbox" onChange={(e) => { showPassword(e) }} />
                        {' '}
                        <Label check>
                          Mostrar password
                        </Label>
                      </FormGroup>
                    </CCol>
                    {/*   <CRow> */}
                    <CCol xs="12" sm="12">
                      <br />

                      <Button
                        //color="primary"
                        style={{ background: '#00b7c5', color: 'white' }}
                        block
                        disabled={formik.isSubmitting}
                      >
                        <LogIn size={17} className='mr-2' />Login
                      </Button>
                    </CCol>
                    {/* </CRow> */}
                  </Form>

                </CCardBody>
              </CCard>
            </CCardGroup>
            <br />
            <Alert
              color="danger"
              toggle={() => toggleAlert()}
              isOpen={alertOpen}
            >
              Nombre de usuario o contraseña incorrectos, favor valide su cuenta de Active Directory.
            </Alert>
          </CCol>
        </CRow>
      </CContainer>
      {/* 
      <div style={{"WebkitBackdropFilter":" blur(20px)","backdropFilter": "blur(20px)","backgroundColor": "rgba(0, 0, 0, 0.1)"}}>
                    hola mubndo
                    </div> */}
    </div>
  )
}

export default Login