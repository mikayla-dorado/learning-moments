import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/getAllPosts"
import { Post } from "./posts"
import { FilterBar } from "./filterbar"
import { getTopics } from "../../services/getTopics"
import "./post.css"



export const AllPosts = () => {
    const [posts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [chosenTopic, setChosenTopic] = useState(null) //why is this null?
    const [searchTerm, setSearchTerm] = useState("") // why is this a string?
    const [allTopics, setAllTopics] = useState([])



    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }, [])

    //added back in so filter bar can work
    useEffect(() => {
        getTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
    }, [])


    useEffect(() => {
        const foundPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(foundPosts)
    }, [searchTerm, posts])


    useEffect(() => {
        if (chosenTopic) {
            const topicPosts = posts.filter((post) => post.topicId === chosenTopic.id)
            setFilteredPosts(topicPosts)
        } else {
            setFilteredPosts(posts)
        }
    }, [chosenTopic, posts])


    return (
        <div className="posts-container bg-green-50">
            <h2 className="all-posts bg-green-50">All Posts</h2>
            <FilterBar allTopics={allTopics} setChosenTopic={setChosenTopic} setSearchTerm={setSearchTerm} />
            <div className="posts bg-green-50">
                {filteredPosts.map((postObj) => {
                    return (
                        <Post post={postObj} key={postObj.id} />
                    )
                })}
            </div>
        </div>

    )

}


