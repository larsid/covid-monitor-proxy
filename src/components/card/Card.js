import React from "react";
import "./Card.css";

export default function Card({icon, label, value}){

    return (
        <div className="card-container">
            <div className="card-header">
                {icon}
                <span>{label}</span>
            </div>
            <div className="card-body">
                <span>{value}</span>
            </div>
        </div>
    );
}