import React from 'react'

const Notification = ({ message, notificationType }) => {

    if (message === null) return

    return (
        <div className={`notification ${notificationType}`}>
            {message}
        </div>
    )
}

export default Notification