import React from 'react';
import './DetailM.css'
import { useLocation } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";
import DetailEmailM from './DetailEmailM';

function DetailM({ setTransition }) {
    const location = useLocation();
    return (
        <div className="detail-m">
            <div className="detail-m__header">
                <p>Purchase Details</p>
                <Link onClick={() => setTransition('dtp')} to="/portfolio-mobile" ><ArrowForwardIosIcon fontSize="small"/></Link>
            </div>
            <div className="detail-m__preview">
                <div className="detail-m__left">
                    <img key={location.state.id + location.state.index} src={location.state.imurl[0]} alt="" />
                </div>
                <div className="detail-m__right">
                    <p>{location.state.title}</p>
                    <p>{location.state.dimensions}</p>
                    <p>{location.state.materials}</p>
                    <p>${location.state.price}</p>
                </div>
            </div>
            <div className="detail-m__email">
                <p>If you are interested in purchasing this work of art or have any questions, please fill out the form below.</p>
                {/* <p>I will be in contact with you to answer questions, confirm your order, and/or gather any information regarding pickup or shipping.</p> */}
            </div>
            <DetailEmailM title={location.state.title} price={location.state.price} setTransition={setTransition} />
        </div>
    )
}

export default DetailM;
