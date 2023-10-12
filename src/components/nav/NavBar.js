import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">All Posts</Link>
            </li>
            <li className="navbar-item">
                <Link to="/newpost">New Post</Link>
            </li>
            <li className="navbar-item">
                <Link to="/myposts">My Posts</Link>
            </li>
            {localStorage.getItem("learning_user") ? (
                <li>
                    <Link
                        to=""
                        onClick={() => {
                            localStorage.removeItem("learning_user")
                            navigate("/login", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}