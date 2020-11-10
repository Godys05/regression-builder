import React, {useState} from 'react';

//results
//0: info
//1: success
//-1: error

const Notification = ({type, message}) => {
    const [result, setResult] = useState(type);
    return(
        <div className= {`notification ${result === 1 ? 'notification--success' : result === -1 ? 'notification--error' : ''}`}>
            <p>{message}</p>
        </div>
    )
}

export default Notification;