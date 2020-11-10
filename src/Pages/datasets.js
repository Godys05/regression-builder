/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import  { useHistory } from 'react-router-dom';

import NavigateBack from '../Components/NavigateBack';
import Notification from '../Components/Notification';

import { useDispatch, useSelector } from 'react-redux';
import { addX, addY } from '../redux/actions/actions';

const Datasets = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const labelX = useSelector(state => state.datasetReducer.labelX);
    const labelY = useSelector(state => state.datasetReducer.labelY);

    const [x, setX] = useState([0]);
    const [y, setY] = useState([0]);
    const lastX = useRef();
    const lastY = useRef()

    const [notification, setNotification] = useState(0);

    const onAddData = () => {
        setX([...x.slice(0, x.length), 0]);
        setY([...y.slice(0, y.length), 0]);
        lastX.current.value = '';
        lastY.current.value = '';
        lastX.current.focus();
    }

    const onRemoveData = (index) => {
        setX([...x.slice(0, index), ...x.slice(index+1, x.length)]);
        setY([...y.slice(0, index), ...y.slice(index+1, y.length)]);
    }

    const handleAddData = () => {
        if (handleValidation()) {
            dispatch(addX(x));
            dispatch(addY(y));
            history.push('/results');
        }
    }

    const handleValidation = () => {
        const type = -1;
        let isValid = false;
        let message = '';
        if (x.length < 4) message = 'ERROR. Your dataset must be at least 4 pair length.';
        else if (x.filter((currentX, index) => x.indexOf(currentX) !== index).length !== 0) message = 'ERROR. You cannot repeat X values as they would not be a function.';
        else isValid = true

        if (!isValid) setNotification({type, message});
        else return true;
    }

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
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
                    <p className="subheader text-center"> {labelX} </p>
                    <p className="subheader text-center">{labelY}</p>
                    <p></p>
                </div>
                    {
                        x.map((currentX, index) => {
                            return index < x.length - 1
                            ?
                            (
                                <div className="dataset mid-width margin-top">
                                    <input type="number" className="quarter-width" key={`X${index}`} value={x[index]} onChange={(e) => setX([...x.slice(0, index), parseFloat(e.target.value), ...x.slice(index+1, x.length)])}/>
                                    <input type="number" className="quarter-width" key={`Y${index}`} value={y[index]} onChange={(e) => setY([...y.slice(0, index), parseFloat(e.target.value), ...y.slice(index+1, y.length)])}/>
                                    <button className="add button-error-outline" style={{minWidth: 30}} onClick={() => onRemoveData(index)}><span className="material-icons" >close</span></button>
                                </div>
                            )
                            :
                            null;
                        })
                    }

                <div className="dataset mid-width margin-top">
                    <input ref={lastX} type="number" className="quarter-width" placeholder={x[x.length - 1]} onChange={(e) => setX([...x.slice(0, x.length - 1), parseFloat(e.target.value)])} />
                    <input ref={lastY} type="number" className="quarter-width" placeholder={y[y.length - 1]} onChange={(e) => setY([...y.slice(0, y.length - 1), parseFloat(e.target.value)])} />
                    <button className="add button-secondary-outline" style={{minWidth: 30}} onClick={() => onAddData()}><span className="material-icons" >add</span></button>
                </div>
            </div>

            <button className="next-button large button-secondary-outline" onClick={() => handleAddData()} >Create!</button>
            {
                notification !== 0
                ?
                <Notification type={notification.type} message={notification.message} />
                :
                null
            }
        </motion.div>
    )
}

export default Datasets;