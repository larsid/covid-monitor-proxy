import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import "./ListWidget.css";

const colors = {
    0: "#494949",
    1: "#7EC31F",
    2: "#FFA555",
    3: "#FF7800",
    4: "#FF5000",
    5: "#D50F32",
    6: "#BF0F32",  
}

function Widget({user}){
    const {setCurrentUser} = useContext(Context);

    const getStyle = () => {
        return {background: colors[user.score]}
    }

    return (
        <div className="widget-container" style={getStyle()} onClick={() => setCurrentUser(user)}>
            <h4>{user.name}</h4>
        </div>
    );
}

export default function ListWidget(){
    const {users} = useContext(Context);

    return (
        <div className="list-container">
            {
                users && users.map((item) => <Widget user={item} key={item.id}/>)
            }
        </div>
    );
}