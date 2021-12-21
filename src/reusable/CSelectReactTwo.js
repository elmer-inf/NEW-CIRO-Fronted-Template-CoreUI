import React from 'react'
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Select from 'react-select';

export const CSelectReactTwo = (props) => {

    const handleChange = (value) => {
        props.onChange(props.id, value);
        if (props.dependence) {
            props.cleareableDependences();
        }
        if (props.getAddValue) {
            if (value !== null) {
                props.getSelectValue(value);
            } else {
                props.inputIsClearable(props.id);
            }
        }
    }
    const handleBlur = () => {
        props.onBlur(props.id, true);
    }
    const inputChange = (value) => {
        props.onInputChange(value);
    }
    return (
        <FormGroup>
          {/*   {props.obligatorio && <b>* {' '}</b>}<Label>{props.label}{':'}</Label> */}
            <Select
                options={props.options}
                placeholder={props.placeholder}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                isSearchable={props.isSearchable}
                isClearable={props.isClearable}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
                isDisabled={props.isDisabled}
                isMulti={props.isMulti}
                isLoading={props.isLoading}
                openMenuOnClick={props.openMenuOnClick}
                className={props.styleMulti ? "react-select-container" : null }
                classNamePrefix={props.styleMulti ? "react-select" : null}
                onInputChange={props.manualEnter === true ? inputChange : null}
                theme={theme => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary: '#e79140',   // seleccionado
                      primary25: '#fbf3eb', // hover
                      primary50: '#fbf3eb', //active
                    }
                  })}
                styles={
                    (props.touched && !!props.errors) ?
                        {
                            control: (provided, state) => ({
                                ...provided,
                                border: !state.isFocused && '1px solid #f86c6b'
                            }),
                        }
                        :
                        (props.touched && !props.errors && props.value !== null) &&
                        {
                            control: (provided, state) => ({
                                ...provided,
                                border: '1px solid #4dbd74'
                            }),
                        }
                }
            />
            {(!!props.errors && props.touched)
                && (
                    <FormFeedback className="d-block">{props.errors}</FormFeedback>
                )}
        </FormGroup>
    )
}
export default React.memo(CSelectReactTwo);