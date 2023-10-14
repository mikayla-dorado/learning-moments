import { useState } from "react"
import "./post.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getPostById } from "../../services/getAllPosts"
import { getUserLikesByPostId, saveUserPostLike, removeUserPostLike } from "../../services/getUserLikes"


export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams()
    const [postLikes, setPostLikes] = useState([])
    const [post, setPost] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    const navigate = useNavigate()


    //these useEffects are fetching and updating post likes and post data when the postId changes

    useEffect(() => {
        getPostById(postId).then((data) => {
            console.log(data)
            console.log(postId)
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])


    useEffect(() => {
        getUserLikesByPostId(postId).then((data) => {
            const likesObj = data
            setPostLikes(likesObj)
        })
    }, [postId])




    const isPostByCurrentUser = () => {
        return currentUser && post.user && post.user.id === currentUser.id
    };

    const isPostLiked = () => {
        return postLikes.some(like => like.userId === currentUser.id && like.postId === post.id)
    };

    const handleLikePost = () => {
        if (!isLiked) {
            
            saveUserPostLike(post.id, currentUser.id);
            setIsLiked(true)
          } else {
            removeUserPostLike(post.id, currentUser.id); // Remove like from the database
      setIsLiked(false);
          }
        }

        useEffect(() => {
            
            setIsLiked(isPostLiked());
          }, [postLikes, currentUser]);
        
    


    return (<>
        {/* in order for all of this to show up, had to fix the routing in ApplicationViews */}
        <header className="details-title">
            <div>
                <span>Title: </span>
                {post?.title}

            </div>
        </header>
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
        <div>
            <span className="details-info">Posted on: </span>
            {post?.date}
        </div>
       
        {!isPostByCurrentUser() && (
            <button onClick={handleLikePost} disabled={isPostLiked()} className="like-btn border-double w-24">
                {isPostLiked() ? "Liked Post Already" : "Like Post"}
            </button>
        )}

        
        {isPostByCurrentUser() && (
            <button onClick={() => navigate(`/editpost/${post.id}`)} className="editpost-btn border-double w-24">Edit Post</button>
        )}

    </>
    )

}















//after getting the above post info to display i need:
//a like post button to display for user that is not the author of the post
//an edit post button to display for user that is the author of the post


//eventually after clicking like, app will navigate to the favorites view
// eventually after clicking edit, app will navigate to Edit Post view