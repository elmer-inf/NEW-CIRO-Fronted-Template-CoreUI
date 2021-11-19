import React from 'react'
import { FormGroup, FormFeedback, FormText } from 'reactstrap'
import Select from 'react-select'

export const CSelectReact = (props) => {

    const handleChange = (value) => {
        props.onChange(props.id, value)
    }
    const handleBlur = (value) => {
        props.onBlur(props.id, true)

    }
    //console.log("props select", props)
    return (
        <FormGroup>
           {/*  <Label>{props.label}</Label> */}
            <Select
                className='react-select'
                classNamePrefix='select'
                options={props.options}
                placeholder={props.placeholder}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                isMulti={props.isMulti || false}
                isDisabled={props.isDisabled || false}
                isSearchable
                isClearable={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
                theme={theme => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary: '#e79140'
                    }
                })}
                styles={
                    (props.touched && !! props.error) ?
                        {
                            control: (provided, state) => ({
                                ...provided,
                                border: !state.isFocused && '1px solid #f86c6b'
                            })
                        }
                        :
                        (props.touched && !props.error && props.value !== null) &&
                        {
                            control: (provided, state) => ({
                                ...provided,
                                border: '1px solid #4dbd74'
                            })
                        }
                }
            />
            {(!!props.error && props.touched)
                && (
                    <FormFeedback className="d-block">{props.error}</FormFeedback>
                )}
            <FormText>{(props.fieldSelected !== null) ? props.fieldSelected : ''}</FormText>

        </FormGroup>
    )
} 
