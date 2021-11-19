import React from 'react'
import { Row } from 'reactstrap';

export const CMainTitle = (props) => {
    return (
        <Row className="d-flex justify-content-center text-uppercase">
        <h3>{props.title}</h3>
    </Row>
    )
}
