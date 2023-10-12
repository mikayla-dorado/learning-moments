import { useEffect } from "react"
import { useState } from "react"
import { getTopics } from "../../services/getTopics"
import { createNewPost } from "../../services/getAllPosts"
import { useNavigate } from "react-router-dom"



//form to create a new post

export const NewPost = ({ currentUser }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [topics, setTopics] = useState([])
    // const [post, setPost] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState({})


    const navigate = useNavigate()


    useEffect(() => {
        if (title) {
            setTitle(title)
        }
    }, [title])


    useEffect(() => {
        if (body) {
            setBody(body)
        }
    }, [body])


    useEffect(() => {
        getTopics().then((topicsArray) => {
            setTopics(topicsArray)
        })
    }, [])


    const handleSave = async (event) => {
        event.preventDefault()
        console.log("clicked")


        const newPost = await createNewPost({
            title: title,
            body: body,
            date: new Date(),
            topicId: selectedTopicId,
            userId: currentUser.id
        })
            
                navigate('/myposts')
        

    }


    return (
        //filter by topic so user can select for a new post
        <div className="filter-by-topic-newpost">
            <header>
                Create a New Post
            </header>
            <form onSubmit={handleSave}>
                <h2 className="select-topic">Select Topic:</h2>

                <select
                    name="topics"
                    id="topics"
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                    value={selectedTopicId}
                >
                    <option>All Topics</option>

                    {topics.map((topic) => {
                        return (<option value={topic.id} key={topic.id}>{topic.topic}</option>)
                    })}
                </select>

                {/* user enters in a title for post */}
                <div>
                    <h2 className="newpost-title">Title: </h2>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        rows="5"
                        cols="10"

                    />
                </div>
                {/* user enters a body for the post */}
                <div>
                    <h2 className="newpost-body">Body: </h2>
                    <input
                        type="text"
                        id="body"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        rows="5"
                        cols="10"
                    />
                </div>
                <div>
                    <button className="button-savenewpost" type="save" onClick={handleSave}>
                        Create Post
                    </button>
                    {/* eventually app will navigate to MyPosts view after clicking Create Post */}
                </div>
            </form>
        </div>





    )
}