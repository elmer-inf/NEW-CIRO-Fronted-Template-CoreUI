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
      return (
        <Col key={i} className='text-center' xs='4' md='3'>
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