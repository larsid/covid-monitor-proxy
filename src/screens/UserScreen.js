import "./UserScreen.css";
import React, { useContext, useState } from "react";
import Card from "../components/card/Card";
import ListWidget from "../components/listWidget/ListWidget";
import { Context } from "../contexts/Context";
import { Termometer, Manometer, Heart, Monitor } from "../icons/icons";


const icon1 = <Termometer width={35} height={35} color="#7A63FF"/>
const icon2 = <Heart width={30} height={30} color="#7A63FF" />
const icon3 = <Manometer width={35} height={35} color="#7A63FF"/>
const icon4 = <Monitor width={35} height={35} color="#7A63FF"/>

export default function UserScreen(){
    const {currentUser, updating, setUpdating, spin} = useContext(Context);
    const [value, setValue] = useState(0);

    const handleOnChange = (e) => setValue(() => e.target.value);
    const toggle = () => setUpdating(!updating);

    return (
        <div className="screen-container">
            <div className="user-panel1">
                <h1>{currentUser.name}</h1>
                <div className="row">
                    <Card icon={icon1} label={"ºC"} value={currentUser.temperature}/>
                    <Card icon={icon2} label={"bpm"} value={currentUser.heart_rate}/>
                </div>
                <div className="row">
                    <Card icon={icon3} label={"mmHg"} value={currentUser.blood_pressure}/>
                    <Card icon={icon4} label={"rpm"} value={currentUser.respiratory_rate}/>
                </div>
                <button onClick={toggle}>{(!updating) ? "MONITOR" : "STOP"}</button>
            </div>
            <div className="user-panel2">
                <input type="number" step={1} min={0} max={20} ref={spin} value={value} onChange={handleOnChange}/>
                <ListWidget />
            </div>
        </div>
    );
}