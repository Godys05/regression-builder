/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

import NavigateForward from '../Components/NavigateForward';
import NavigateBack from '../Components/NavigateBack';

const datasets = () => {
    const [x, setX] = useState([0]);
    const [y, setY] = useState([0]);
    const lastX = useRef();
    const lastY = useRef()

    function onAddData() {
        setX([...x.slice(0, x.length), 0]);
        setY([...y.slice(0, y.length), 0]);
        lastX.current.value = '';
        lastY.current.value = '';
        lastX.current.focus();
    }

    useEffect(() => {
        console.log(x, y)
    }, [x, y])

    return(
        <motion.div className="parent-section"
        initial={{x: 1000, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{ease: "easeOut", duration: 0.5}}>
            <NavigateBack>
                <span className="material-icons clickable back-button">arrow_back</span>
            </NavigateBack>

            <p className="header bold">Input your data</p>

            <div className="flex-center-col">
                <div className="dataset mid-width">
                    <p className="subheader text-center">Time</p>
                    <p className="subheader text-center">Income</p>
                    <p></p>
                </div>
                    {
                        x.map((currentX, index) => {
                            return index < x.length - 1
                            ?
                            (
                                <div className="dataset mid-width margin-top">
                                    <input type="number" className="quarter-width" value={x[index]} onChange={(e) => setX([...x.slice(0, index), parseFloat(e.target.value), ...x.slice(index+1, x.length)])}/>
                                    <input type="number" className="quarter-width" value={y[index]} onChange={(e) => setY([...y.slice(0, index), parseFloat(e.target.value), ...y.slice(index+1, y.length)])}/>
                                    <p style={{minWidth: 35}}></p>
                                </div>
                            )
                            :
                            null;
                        })
                    }

                <div className="dataset mid-width margin-top">
                    <input ref={lastX} type="number" className="quarter-width" placeholder={x[x.length - 1]} onChange={(e) => setX([...x.slice(0, x.length - 1), parseFloat(e.target.value)])} />
                    <input ref={lastY} type="number" className="quarter-width" placeholder={y[y.length - 1]} onChange={(e) => setY([...y.slice(0, y.length - 1), parseFloat(e.target.value)])} />
                    <button className="add button-secondary-outline" style={{minWidth: 30}}><span className="material-icons" onClick={() => onAddData()} >add</span></button>
                </div>
            </div>

            <NavigateForward route="/">
                <button className="next-button large button-primary-outline">Next <span className="material-icons">arrow_forward</span></button>
            </NavigateForward>
        </motion.div>
    )
}

export default datasets;