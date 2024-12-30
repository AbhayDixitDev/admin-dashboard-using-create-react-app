import { faBell, faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Topbar() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            const user = JSON.parse(userInfo)
            setUsername(user.username)
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear() // Clear all data from localStorage
        setUsername('') // Clear username from state
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
           
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{username}</span>
                        <FontAwesomeIcon icon={faCircleUser} size={"xl"} />
                    </Link>
                </li>

                <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link btn btn-link">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className="ml-2">Logout</span>
                    </button>
                </li>

            </ul>

        </nav>
    )
}

export default Topbar