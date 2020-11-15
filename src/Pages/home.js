/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import NavigateFordward from '../Components/NavigateForward';

import { motion } from 'framer-motion';

const Home = () => {
    return(
        <motion.div
        initial={{x: 1000, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{ease: "easeOut", duration: 0.5}}>
            <section className="parent-section">
                <p className="large bold">Regression Calculator.</p>
                <NavigateFordward route={`/name-labels`} >
                    <button className="button-large  button-primary-outline">Begin!</button>
                </NavigateFordward>
            </section>
            <div className="credits">
                <p>Made by  <a href="https://github.com/Godys05"> Abner Silva</a> </p>
            </div>
        </motion.div>
    )
};

export default Home;