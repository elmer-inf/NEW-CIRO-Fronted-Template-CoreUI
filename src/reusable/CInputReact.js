import React from 'react'
import { FormGroup, FormFeedback, Input } from 'reactstrap';

export const CInputReact = (props) => {

  return (
    <FormGroup>
      {/* <Label>{props.label}</Label> */}
      <Input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        valid={props.touched && !props.errors && props.value !== ''}
        invalid={props.touched && !!props.errors}
        placeholder={props.placeholder}
        style={{ textAlign: props.aling || 'left' }}
        disabled={props.disabled || false}
        rows={props.rows || null}
      />
      <FormFeedback>{props.errors}</FormFeedback>
    </FormGroup>
  )
}
