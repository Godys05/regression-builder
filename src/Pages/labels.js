/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import NavigateBack from '../Components/NavigateBack';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addLabelX, addLabelY } from '../redux/actions/actions';

const labels = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [labelX, setX] = useState('');
    const [labelY, setY] = useState('');

    useEffect(() => {

    }, [labelX, labelY]);

    const handleAddLabels = () => {
        dispatch(addLabelX(labelX));
        dispatch(addLabelY(labelY));
        history.push('/datasets');
    }

    return(
        <motion.div className="parent-section"
        initial={{x: 1000, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{ease: "easeOut", duration: 0.5}}>
            <NavigateBack>
                <span className="material-icons clickable back-button">arrow_back</span>
            </NavigateBack>
            <p className="header bold">Name your variables</p>
            <div className="input-field">
                <p className="subheader bold">Independent variable (X-axis)</p>
                <input type="text" value={labelX} onChange={(e) => setX(e.target.value)} />
            </div>

            <div className="input-field">
                <p className="subheader bold">Dependent variable (Y-axis)</p>
                <input type="text" value={labelY} onChange={(e) => setY(e.target.value)} />
            </div>

            <button className="next-button large button-primary-outline" onClick={() => handleAddLabels()} >Next <span className="material-icons">arrow_forward</span></button>
        </motion.div>
    )
}

export default labels;