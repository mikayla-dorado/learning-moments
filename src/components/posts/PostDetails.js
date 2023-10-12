import { useState } from "react"
import "./post.css"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getPostById } from "../../services/getAllPosts"


export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState([])

    //these useEffects are fetching and updating post likes and post data when the postId changes

    useEffect(() => {
        getPostById(postId).then((data) => {
            console.log(data)
            console.log(postId)
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])


    return (
        <>
        {/* in order for all of this to show up, had to fix the routing in ApplicationViews */}
            <header className="details-title">
                <div>
                    <span>Title: </span>
                    {post?.title}
                    
                </div>
            </header>
            <div>
                <span className="details-info">Posted on: </span>
                {post?.date}
            </div>
            <div>
                <span className="details-info">Topic: </span>
                {/* this checks to see if post?.topic exists and if its an object. If yes, it extracts the 'topic'
                property, otherwise it assuomes post.topic is not a object and uses that directly. if post?.topic 
                is falsy it will return an empty string */}
                {post?.topic ? (typeof post.topic === 'object' ? post.topic.topic : post.topic) : ''}
            </div>
            <div>
                <span className="details-info">Body: </span>
                {post?.body}
            </div>
            <div>
                <span className="details-info">Author: </span>
                {post?.user?.fullName}
            </div>
            {/* <div>
                <span className="details-info">Likes: </span>
            </div> */}

        </>
    )

}
//after getting the above post info to display i need:
//a like post button to display for user that is not the author of the post
//an edit post button to display for user that is the author of the post


//eventually after clicking like, app will navigate to the favorites view
// eventually after clicking edit, app will navigate to Edit Post view