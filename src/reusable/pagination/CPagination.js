/**
 * Sistema de Promociones.
 * @author GTIC
 * @copyright (c) 2021, ATC - Red Enlace
 * @developer Abel William Copa.
 * @EndOfDevelopment Septiembre 2021
 * @LastUpdate  30/08/2021 By Abel William Copa.
 */
import React, { useState } from 'react'
import { AiOutlineDoubleLeft,AiOutlineLeft, AiOutlineDoubleRight,AiOutlineRight } from "react-icons/ai";

require("./style.css");
const CPagination = ({ page, size, pages, total, onClick, onChange }) => {
    const [swButtonNextPage, setswButtonNextPage] = useState(false);
    const [swButtonLastPage, setswButtonLastPage] = useState(false)
    const [swButtonFirstPage, setswButtonFirstPage] = useState(true)
    const [swButtonPrevPage, setswButtonPrevPage] = useState(true)
    const [pageI, setpageI] = useState(page + 1)



    //Funciones para select y input
    const newPage = (event) => {
        //var { size, page, pages } = this.props;
        var valor = event.value;
        if (valor === '') {
            //this.setState({ pageI: '' });
            setpageI('');
        } else {
            valor = Math.trunc(parseInt(valor, 10))
            //this.setState({ pageI: valor });
            setpageI(valor);

            if (valor > 0 && valor <= pages) {
                page = valor - 1;
                if (page === pages - 1) {
                    //descativamos los botones NEXT y LAST
                    setswButtonNextPage(true)
                    setswButtonLastPage(true)
                    // Activamos los botones PREV y FIRST
                    setswButtonFirstPage(false)
                    setswButtonPrevPage(false)
                    /*this.setState({
                        //descativamos los botones NEXT y LAST
                        swButtonNextPage: true,
                        swButtonLastPage: true,
                        // Activamos los botones PREV y FIRST
                        swButtonFirstPage: false,
                        swButtonPrevPage: false
                    });*/
                } else if (page === 0) {
                    //activamos los botones NEXT y LAST
                    setswButtonNextPage(false)
                    setswButtonLastPage(false)
                    // Desactivamos los botones PREV y FIRST
                    setswButtonFirstPage(true)
                    setswButtonPrevPage(true)
                    /* this.setState({
                         //activamos los botones NEXT y LAST
                         swButtonNextPage: false,
                         swButtonLastPage: false,
                         // Desactivamos los botones PREV y FIRST
                         swButtonFirstPage: true,
                         swButtonPrevPage: true
                     });*/
                } else if (page > -1 && page < pages) {
                    //activamos los botones NEXT y LAST
                    setswButtonNextPage(false)
                    setswButtonLastPage(false)
                    // Desactivamos los botones PREV y FIRST
                    setswButtonFirstPage(false)
                    setswButtonPrevPage(false)
                    /* this.setState({
                        //activamos los botones NEXT y LAST
                        swButtonNextPage: false,
                        swButtonLastPage: false,
                        // Activamos los botones PREV y FIRST
                        swButtonFirstPage: false,
                        swButtonPrevPage: false
                    }); */
                }
                onClick(page, size, 'p');

            }
        }
    }
    const funcSize = (event) => {
        // var { size, page, pageI } = this.props;
        const pageII = page + 1;
        setpageI(pageII);

        //this.setState({ pageI });
        size = parseInt(event.value, 10);
        onClick(page, size, 'p');
    }

    //funciones para los botones
    // last - first page
    const lastPage = () => {
        //var { size, page, pages, pageI } = this.props;
        page = pages - 1;
        const pageI = page + 1;
        //this.setState({ pageI });
        setpageI(pageI);
        //descativamos los botones NEXT y LAST
        setswButtonNextPage(true)
        setswButtonLastPage(true)
        // Activamos los botones PREV y FIRST
        setswButtonFirstPage(false)
        setswButtonPrevPage(false)
        /* this.setState({
             //descativamos los botones NEXT y LAST
             swButtonNextPage: true,
             swButtonLastPage: true,
             // Activamos los botones PREV y FIRST
             swButtonFirstPage: false,
             swButtonPrevPage: false
         });*/
        onClick(page, size, 'p');

    }


    const firstPage = () => {
        //var { page, size } = this.props;
        // var { size, page, pageI } = this.props;
        page = 0;
        const pageI = page + 1;
        setpageI(pageI);

        //this.setState({ pageI });

        //activamos los botones NEXT y LAST
        setswButtonNextPage(false)
        setswButtonLastPage(false)
        // Desactivamos los botones PREV y FIRST
        setswButtonFirstPage(true)
        setswButtonPrevPage(true)


        /* this.setState({
            //Activamos los botones NEXT y LAST
            swButtonNextPage: false,
            swButtonLastPage: false,
            // Desactivamos los botones PREV y FIRST
            swButtonFirstPage: true,
            swButtonPrevPage: true
        }); */
        onClick(page, size, 'p');
    }

    //next - prev
    const nextPage = () => {
        // var { size, page, pages, pageI } = this.props;
        page = page + 1;

        if (page < pages) {
            const pageI = page + 1;
            // this.setState({ pageI });
            setpageI(pageI);

            if (page === pages - 1) {

                //descativamos los botones NEXT y LAST
                setswButtonNextPage(true)
                setswButtonLastPage(true)
                // Activamos los botones PREV y FIRST
                setswButtonFirstPage(false)
                setswButtonPrevPage(false)


                /* this.setState({
                    swButtonNextPage: true,
                    swButtonLastPage: true,

                    swButtonFirstPage: false,
                    swButtonPrevPage: false,
                }); */
            } else {
                setswButtonFirstPage(false)
                setswButtonPrevPage(false)
                /*  this.setState({
                     swButtonPrevPage: false,
                     swButtonFirstPage: false,
                 }); */
            }
            onClick(page, size, 'p');


        } else {
            //NEXT false: page, pages, ', page, pages)
        }
    }
    const prevPage = () => {
        //var { size, page, pageI } = this.props;
        page = page - 1;

        if (page > -1) {
            const pageI = page + 1;
            setpageI(pageI);
            //this.setState({ pageI });
            if (page === 0) {
                //activamos los botones NEXT y LAST
                setswButtonNextPage(false)
                setswButtonLastPage(false)
                // Desactivamos los botones PREV y FIRST
                setswButtonFirstPage(true)
                setswButtonPrevPage(true)

             /*    this.setState({
                    swButtonNextPage: false,
                    swButtonLastPage: false,
                    swButtonFirstPage: true,
                    swButtonPrevPage: true,
                }); */
            } else {
                setswButtonNextPage(false)
                setswButtonLastPage(false)
               /*  this.setState({
                    swButtonNextPage: false,
                    swButtonLastPage: false,

                }); */
            }
            onClick(page, size, 'p');

        } else {
            //PREV false: page, pages, ', page, pages)
        }
    }





    return (
        <div>
            <br />
            <div className="row" >
                <div className="col-md-1"></div>
                <div className="col-md-4 col-12 ">
                    {'Total páginas: '}<strong>{pages + ', '}</strong>{'  Total de registros: '} <strong>{total}</strong>
                </div>
                <br />
                <div className="col-md-2 col-3">
                    <select
                        className="cuadroText"
                        name="size"
                        onChange={event => {funcSize(event.target) }}
                        defaultValue={size}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className="col-md-1 col-3">
                    <button className="boton-Pagination" name="firstPage" onClick={() => firstPage()} disabled={swButtonFirstPage}>
                        <AiOutlineDoubleLeft/>
                    </button>

                    <button className="boton-Pagination" name="prevPage" onClick={() => prevPage()} disabled={swButtonPrevPage}>
                        <AiOutlineLeft/>
                    </button>
                </div>
                <div className="col-md-2 col-3">
                    <input
                        width='20px'
                        className="cuadroText"
                        type="number"
                        autoComplete="off"
                        style={{ textAlign: 'right' }}
                        name="newPage"
                        value={pageI}
                        onChange={event => { newPage(event.target) }}
                    />
                </div>
                <div className="col-md-1 col-3">
                    <button className="boton-Pagination" name="nextPage" onClick={() => nextPage()} disabled={swButtonNextPage}>
                        <AiOutlineRight/>
                    </button>
                    <button className="boton-Pagination" name="lastPage" onClick={() => lastPage()} disabled={swButtonLastPage}>
                    <AiOutlineDoubleRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CPagination;
