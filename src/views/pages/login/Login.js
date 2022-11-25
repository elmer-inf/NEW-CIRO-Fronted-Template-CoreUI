import React, { useState } from 'react'
import { Button, Form, FormGroup, Alert, Container, Row, Col, CardGroup, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, FormFeedback } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'
import AuthService from 'src/views/authentication/AuthService';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { postAuthentication } from 'src/views/authentication/AuthController';
import { Messages } from 'src/reusable/variables/Messages';
import { Lock, LogIn, User, Users } from 'react-feather';
import CInputCheckbox from 'src/reusable/CInputCheckbox'
import Swal from 'sweetalert2'
import bgLogin from 'src/assets/bg/bg-riesgos.jpg';

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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        })
        //window.location.reload();
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
    setAlertOpen(!alertOpen)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center"
      style={{
        backgroundImage: "url(" + bgLogin + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <CCSpinner show={spin} />
      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="7">
            <CardGroup>
              <Card
                className="text-white py-4 d-md-down-none"
                style={{
                  WebkitBackdropFilter: "blur(20px)",
                  backdropFilter: "blur(20px)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <CardBody className="text-center">
                  <Users size={150} />
                  <div className='text-center h5 text-data mt-2'>SISTEMA DE GESTION DE RIESGOS INTEGRALES</div>
                </CardBody>
              </Card>
              <Card
                className="text-white pt-4"
                style={{
                  WebkitBackdropFilter: "blur(20px)",
                  backdropFilter: "blur(20px)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <CardBody>
                  <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <h5 style={{ textAlign: 'center' }}>Iniciar sesión en su cuenta</h5>
                    <InputGroup className="mb-3 mt-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <User size={17} className="text-warning" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type={"text"}
                        id="username"
                        autoComplete="off"
                        placeholder="Usuario"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        valid={formik.touched.username && !formik.errors.username && formik.values.username !== ''}
                        invalid={formik.touched.username && !!formik.errors.username}
                      />
                      <FormFeedback>{formik.errors.password}</FormFeedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Lock size={17} className="text-warning" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type={typeInput}
                        id="password"
                        autoComplete="off"
                        placeholder="Contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        valid={formik.touched.password && !formik.errors.password && formik.values.password !== ''}
                        invalid={formik.touched.password && !!formik.errors.password}
                      />
                      <FormFeedback>{formik.errors.password}</FormFeedback>
                    </InputGroup>

                    <Col xs="12" className="text-right">
                      <FormGroup check>
                        <CInputCheckbox
                          id={'otrosAux'}
                          type={"checkbox"}
                          onChange={(e) => { showPassword(e) }}
                          label='Mostrar contraseña'
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="12">
                      <Button
                        color="primary"
                        className='text-white'
                        block
                        disabled={formik.isSubmitting}
                      >
                        <LogIn size={17} className='mr-2' />Iniciar sesión
                      </Button>
                    </Col>
                  </Form>

                </CardBody>
              </Card>
            </CardGroup>
            <br />
            <Alert
              color="danger"
              toggle={() => toggleAlert()}
              isOpen={alertOpen}
            >
              Nombre de usuario o contraseña incorrectos, favor valide su cuenta de Active Directory.
            </Alert>
          </Col>
        </Row>
      </Container>
      {/*
      <div style={{"WebkitBackdropFilter":" blur(20px)","backdropFilter": "blur(20px)","backgroundColor": "rgba(0, 0, 0, 0.1)"}}>
                    hola mubndo
                    </div> */}
    </div>
  )
}

export default Login