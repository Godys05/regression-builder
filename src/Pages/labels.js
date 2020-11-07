import { motion } from 'framer-motion';
import React from 'react';

import NavigateBack from '../Components/NavigateBack';
import NavigateForward from '../Components/NavigateForward';

const labels = () => {
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
                <input type="text"/>
            </div>

            <div className="input-field">
                <p className="subheader bold">Dependent variable (Y-axis)</p>
                <input type="text"/>
            </div>

            <NavigateForward route="/datasets">
                <button className="next-button large button-primary-outline">Next <span className="material-icons">arrow_forward</span></button>
            </NavigateForward>
        </motion.div>
    )
}

export default labels;