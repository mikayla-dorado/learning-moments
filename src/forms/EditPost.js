import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../services/getAllPosts"
import "./Edit.css"


export const EditPost = () => {
    const [post, setPost] = useState([])
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState({})
    const [body, setBody] = useState("")

    const postId = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if(title) {
          setTitle(title)
        }
      }, [title])
    
      useEffect(() => {
        if(body) {
          setBody(body)
        }
      }, [body])
    
      useEffect(() => {
        getPostById(postId.postId).then((data) => {
          const postObj = data[0]
          setPost(postObj)
        })
      }, [postId])
    
      const handleSave = (event) => {
        event.preventDefault()
    
        if(post.title == "" || post.body == "" || post.topicId == undefined) {
          window.alert(`Please fill out all fields`)
        } else {
          EditPost(post).then(() => {
            navigate(`/myposts`)
          })
        }
      }
    
      const handleInputChange = (event) => {
        const stateCopy = {...post}
        if(event.target.name === "topicId") {
          stateCopy[event.target.name] = parseInt(event.target.value)
        } else {
          stateCopy[event.target.name] = event.target.value
        }
        setPost(stateCopy)
      }
    
      const currentTopic = () => {
        return post.topicId
      }
    
      return (
        <form className="editpost-container">
          <div className="editpost-header">
            <header className="header text-center">Edit Post</header>
          </div>
          <div className="editpost-info">
            {/* <Select 
              setTopic={setTopic} 
              currentTopic={currentTopic()}
              handleInputChange={handleInputChange}
              /> */}
            <div className="editpost-title">
              <h2 className="title">Title:</h2>
              <input
                className="title-input border-solid "
                required
                value={post.title ? post.title : ""}
                name="title"
                size="50"
                onChange={handleInputChange} />
            </div>
            <div className="newpost-body">
              <h2 className="body" value="chosenBody">Body:</h2>
              <textarea
                className="newpost-textarea border-solid"
                required
                value={post.body ? post.body : ""}
                name="body"
                rows="5"
                cols="50"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="newpost-btns">
            <button className="newpost-save border-double w-32" onClick={() => {navigate(`/myposts`)}}>Save Changes</button>
            <input
              className="newpost-save"
              onClick={handleSave}
            />
          </div>
        </form >

      )
}