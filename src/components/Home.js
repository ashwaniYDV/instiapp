import React from 'react';

export default ()=>{

    const divStyle={
        div1: {
            height: "100vh",
            backgroundColor: "blue",
            color: "white"
        },
        div2: {
            height: "100vh",
            backgroundColor: "red"
        }
    }

    return(
        <div className="container">
            <div style={divStyle.div1}>Welcome</div>
            <div style={divStyle.div2}></div>
        </div>
    )
}