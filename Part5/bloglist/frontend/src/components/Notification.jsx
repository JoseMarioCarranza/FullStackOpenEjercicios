
const Notification = ({ notificationMessage }) => {

    if (notificationMessage === null) {
        return null
    } else {

        const style = { color: notificationMessage[1] }
        return (
            <div className="notification" style={style}>
                {notificationMessage[0]}
            </div >
        )
    }
}

export default Notification