import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const Log = ({ setUser, setNotificationMessage }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogListApp', JSON.stringify(user))

            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
            setNotificationMessage(null)

        } catch (error) {
            console.log(error);
            setNotificationMessage(['Wrong username or password', 'red'])

            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)

        }
    }

    return (
        <>
            <h2>Log in to application</h2>
            <br />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Log