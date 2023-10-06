import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"



export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])


    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route path="/">
                    <Route index element={<AllPosts />} />
                </Route>
            </Route>
        </Routes>
    )
}