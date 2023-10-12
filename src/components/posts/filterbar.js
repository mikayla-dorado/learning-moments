export const FilterBar = ({ setSearchTerm, allTopics, setChosenTopic }) => {


    return (
                <div className="filter-by-topic">

                    <h2 className="filter-topic">Filter by topic:</h2>

                {/* this select creates a dropwdown element */}
                    <select
                        name="topics"
                        id="topics"
                        onChange={(event) => {
                            //this if checks to see if the selected value from dropdown is equal to"0"
                            //if so it sets the 'chosenTopic' state to 'null' using the 'setChosenTopic' function
                            if (event.target.value === "0") {
                                setChosenTopic(null)
                            } else {
                                //uses .find to search for a topic in 'allTopics' array where the topic.id
                                //matches the value that is selected, assigns the found topic to 'foundTopic' variable

                                const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))

                                //if a topic is found but doesn't equal "0", this line sents 'chosenTopic' state
                                //to the found topic using the 'setChosenTopic' function
                                setChosenTopic(foundTopic)
                            }
                        }}>
                        <option value="0">All Topics</option>

                        {/* using the allTopics prop */}

                        {allTopics.map((topic) => {
                            return (<option value={topic.id} key={topic.id}>{topic.topic}</option>)
                        })}
                    </select>

                        {/* this makes the search bar */}
                    <div className="search-term">
                        <input 
                            type="text"
                            placeholder="Search Posts"
                            className="search-posts"
                            onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}
                        />
                    </div>
                </div>
            )
        }