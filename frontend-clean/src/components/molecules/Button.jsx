import React from "react";
import BtnName from "../atoms/BtnName";
import { Link } from "react-router-dom";

function Button({ name, to, onClick}) {
    return(
        <Link className="mx-auto flex flex-wrap justify-center items-center w-min-fit" to={to} onClick={onClick}>
            <BtnName name={name}></BtnName>
        </Link> 
     )
     }
     
export default Button;