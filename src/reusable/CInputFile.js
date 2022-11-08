import React from 'react'

import {
  FormGroup,
  FormFeedback,
  Input,
  Label
} from 'reactstrap';
export const CInputFile = (props) => {

  /**
    <FormGroup>
              <Label htmlFor="inputIsValid">Input is valid</Label>
              <Input valid id="inputIsValid" />
              <ValidFeedback>Cool! Input is valid</ValidFeedback>
            </FormGroup>
   */
  const handleChange = (value) => {
    if (props.multiple) {
      console.log('value.currentTarget MULTYYY.:: ', value.currentTarget.files);
      props.onChange(props.id, value.currentTarget.files);
    } else {
      console.log('value.currentTarget.:: ', value.currentTarget.files[0]);
      props.onChange(props.id, value.currentTarget.files[0]);
    }

  }
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <Input
        type={props.type}
        id={props.id}
        //value={props.value}
        /* onChange={(event) => {
             props.setFieldValue("file", event.currentTarget.files[0]);
           }}*/
        onChange={handleChange}
        //onChange={props.onChange}
        onBlur={props.onBlur}
        valid={props.touched && !props.errors && props.value !== ''}
        invalid={props.touched && !!props.errors}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        style={(props.type === 'file') ? { backgroundColor: '#f2f2f2' } : null}
        accept={(props.type === 'file') ? ".pdf" : null}
        multiple={props.multiple || false}
      />
      <FormFeedback>{props.errors}</FormFeedback>
    </FormGroup>
  )
}
