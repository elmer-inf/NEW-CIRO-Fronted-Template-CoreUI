import React from 'react';
import { Label, Input, FormGroup, Col, Row } from 'reactstrap';

function CInputRadioCustom(props) {

  const checkboxList = () => {
    let structure = props.data.map((option, i) => {

      let valorSend = null;
      if (props.sendValue) {
        valorSend = option.value

      } else {
        valorSend = option.label
      }

      // Determina el tamaño de la columna en función del prop `column`
      let colSize = { xs: '4', md: '3' }; // Tamaños por defecto
      if (props.column && props.column === 2) {
        colSize = { xs: '6' }; // Cambia tamaños si column es igual a 2
      }

      return (
        <Col key={i} className='text-center' xs={colSize.xs} md={colSize.md}>
          <Label >
            <Input
              type={'radio'}
              id={props.id}
              value={props.sendValue ? props.value : option.value}
              name={props.id}
              checked={props.sendValue ? props.value === option.value : props.value === option.label}
              onChange={() => props.onChange(props.id, valorSend)}
            />
            {<span className='pr-2'></span>}
            {option.label}
          </Label>
        </Col>
      )
    });
    return structure;
  }
  return (
    <FormGroup>
      {/*  {props.obligatorio && <b>*{' '}</b>}<Label>{props.label}{':'}</Label>
      <Card style={props.showScroll ? { minHeight: '200px', maxHeight: '200px', overflowY: 'scroll', marginBottom: '0rem' } : { marginBottom: '0rem' }}>
        <CardBody> */}
      <Row className=''>
        {checkboxList()}
      </Row>
      {/* </CardBody>
      </Card>
      {(!!props.errors && props.touched)
        && (
          <FormFeedback className="d-block">{props.errors}</FormFeedback>
        )} */}
    </FormGroup>
  );
}

export default CInputRadioCustom;