/**
 * Sistema de Promociones.
 * @author GTIC
 * @copyright (c) 2019, ATC - Red Enlace
 * @developer Abel William Copa.
 * @EndOfDevelopment Septiembre de 2019
 * @LastUpdate  28/02/2020 By Abel William Copa.
 */
import React from 'react';
//import CSpinnerIcon from './CSpinnerIcon';
import { FlapperSpinner} from "react-spinners-kit";
import './style.css';
//? <div className='spinner' style={{ width: props.width, height: props.height, paddingTop: props.paddingTop }}><CSpinnerIcon /></div >

const CCSpinner = (props) => {
    return (
        (props.show === true)
        ? <div className='spinner' style={{ width: props.width, height: props.height, paddingTop: props.paddingTop }}>
            <FlapperSpinner
            size={75}
         // sizeUnit={'1px'}s
            color={'blue'}
            backColor={'red'}
            />
            </div >
                : null

    );
}
export default CCSpinner;
