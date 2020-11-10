/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import NavigateBack from '../Components/NavigateBack';
import Notification from '../Components/Notification';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addLabelX, addLabelY } from '../redux/actions/actions';


const labels = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [labelX, setX] = useState('');
    const [labelY, setY] = useState('');
    
    const [notification, setNotification] = useState(0);

    useEffect(() => {
    }, [labelX, labelY, notification]);

    const handleAddLabels = () => {
        let isValid = false;
        const type = -1;
        let message = '';
        if (labelX === '' || labelY === '') message = 'ERROR. No field can be left empty.';
        else isValid = true;

        if (isValid) {
            dispatch(addLabelX(labelX));
            dispatch(addLabelY(labelY));
            history.push('/datasets');
        }
        else setNotification({type, message});
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
            {
                notification !== 0
                ?
                <Notification type={notification.type} message={notification.message} />
                :
                null
            }
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