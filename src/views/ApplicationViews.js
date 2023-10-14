import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../forms/EditPost"



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
                <Route index element={<AllPosts />} />
                <Route path="post">
                    <Route index element={<AllPosts />} />

                    <Route path=":postId" element={<PostDetails currentUser={currentUser} />} />
                </Route>
                <Route path="myposts" element={<MyPosts currentUser={currentUser} />} />
                <Route path="newpost" element={<NewPost currentUser={currentUser} />} />
                <Route path="editpost">
                    <Route path=":postId" element={<EditPost currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}