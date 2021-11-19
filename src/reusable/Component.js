import React from 'react';
import { Badge,Label } from 'reactstrap';
var _ = require('lodash');


export const showState = (valorBool) => {
    return (
        <div>
            {
                (valorBool === true)
                    ? <Badge color="success">{'Activo'}</Badge>
                    : <Badge color="danger">{'Inctivo'} </Badge>
            }
        </div>


    );
};


export const toBadge = (data,field) =>{
    return (
        <div>
            {
                (data === field)
                    ? <Badge color="primary" >{_.capitalize(data)}</Badge>
                    : <Badge color="info" >{_.capitalize(data)}</Badge>
            }
        </div>


    );
}


export const CFilterText = (props) => {
    console.log('propos:: ', props)
    return (
        <div>
            <input
                id={props.possition}
                type='text'
                placeholder={props.placeholder}
                className="filter text-filter form-control"
                name={props.column.dataField}
                autoComplete="off"
                //ref={op => this.op = op}
                onChange={(e) => { props.onFilter(e.target) }}
                onClick={props.handleChildClick}
            />
        </div>


    );
};

export const typeFormatter = (column, colIndex, { sortElement, filterElement }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label> {column.text} {sortElement} </Label>
            {filterElement}
        </div>
    );
};

export const handleChildClick = (e) => {
    e.stopPropagation();
};