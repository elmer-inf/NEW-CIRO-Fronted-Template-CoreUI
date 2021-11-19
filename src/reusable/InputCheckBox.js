import React from 'react'

import {FormGroup, FormFeedback, CustomInput, Label} from 'reactstrap';

const InputCheckbox = (props) => {
    //console.log("props: ",props)
    return (
        <FormGroup>
            <CustomInput
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                checked={props.value}

                className={props.value}
                label={props.value}
                inline
            />
            <FormFeedback>{props.errors}</FormFeedback>
        </FormGroup>
    )
}

export default InputCheckbox; 
