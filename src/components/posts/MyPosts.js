import { useEffect, useState } from "react"
import { deletePost, getAllPosts, getPostByUserId } from "../../services/getAllPosts"
import { Link } from "react-router-dom"




//when the user clicks the title to view their post
// the app will navigate to the PostDetails view




export const MyPosts = ({ currentUser}) => {
    const userId = currentUser
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)

        })
    }, [])

   
    const handleDelete = (postObj) => {
        deletePost(postObj)
    }

    //this will refetch the data so the page automatically reloads after deleting a post
    const refetchUserPosts = () => {
        getPostByUserId(userId).then(data => setPosts(data))
    }


    return (
        <div className="myposts-container">
            <header>
                <h2>My Posts</h2>
            </header>
            <div>
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div key={post.id}>
                        <Link to={`/post/${post.id}`}> {post.title}</Link>
                            <button className="mypost-delete-btn" onClick={() => { handleDelete(post)
                                 refetchUserPosts()}}>Delete Post</button>
                        </div>
                        
                    ))}
                    
            </div>
        </div>
    )

}

//had to pass in currentUser prop from application views to get to logged in userId