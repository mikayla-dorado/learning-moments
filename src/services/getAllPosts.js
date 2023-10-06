export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_expand=userLikesId&_expand=user').then(
        (res) => res.json()
    )
}


