import { React, useRef, useEffect } from 'react'

import "./Header.css"

function Header(props) {
    // to auto scroll to the element where this variable is given
    const resultRef = useRef()
    const expressionRef = useRef()

    useEffect(() => {
        resultRef.current.scrollIntoView()
    }, [props.history]);

    useEffect(() => {
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth
    }, [props.expression]);

    return (
        <div className='header custom_scroll'>
            <div className="header_history">
                {props.history !== [] && props.history.map((item, index) => {
                    return <p key={item + "" + Math.random() * 44}>{item}</p>
                })}
            </div>
            <br />
            <div ref={expressionRef} className="header_expression custom_scroll">
                <p>{!props.expression ? "0" : props.expression}</p>
            </div>
            <p ref={resultRef} className='header_result'>{!props.expression ? "0" : props.result}</p>
        </div>
    )
}

export default Header