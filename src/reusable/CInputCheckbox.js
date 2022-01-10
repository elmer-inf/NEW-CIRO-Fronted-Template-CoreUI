import React from 'react'

import {FormGroup, FormFeedback, CustomInput, Label} from 'reactstrap';
const CInputCheckbox = (props) => {
    //console.log("props: ",props)
    return (
        <FormGroup>
            {/* <Label>{props.label}</Label> */}
            <CustomInput
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur} 
                checked={props.value}
                disabled={props.disabled || false}
                label={props.label} 
               //valid={props.touched && !props.errors && props.value !== ''}
                //invalid={props.touched && !!props.errors}
            /> <Label for={props.id} check>{props.checkbox}</Label>
            <FormFeedback>{props.errors}</FormFeedback>
        </FormGroup>
    )
}

export default CInputCheckbox;
