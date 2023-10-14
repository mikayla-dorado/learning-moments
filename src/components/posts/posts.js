import { getUserLikes } from "../../services/getUserLikes"
import { useEffect, useState } from "react"
import "./post.css"
import { Link } from "react-router-dom"

export const Post = ({ post }) => {
    const [userLikes, setUserLikes] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        getUserLikes().then((userLikesArray) => {
            setUserLikes(userLikesArray)
        })
    }, [])

useEffect(() => {
    const chosenLike = likes.filter(
        (like) => like.postId === post.id
    )
    setLikes(chosenLike)
}, [])

    return (
        <div>
            <div className="post-info  bg-gray-400 ">
                <header className="header">
                    <div className="topics">
                        <div className="post-topic"> Topic: </div>
                        </div>
                        <div>
                        
                            {post.topic.topic}
                        
                    </div>
                    <div className="post-title"> Title: </div>
                    <div>
                       <Link to={`/post/${post.id}`} > {post?.title}</Link>
                    </div>
                </header>
                <div className="userLikes">
                    <div className="post-likes"> Likes: </div>
                    <div className="likes">
                        {post.userLikesId}
                    </div>
                </div>
                <div>
                <div className="posted"> Posted by {post.user.fullName} on {post.date}
                </div>
                </div> 
            </div>
        </div>
    )
}




