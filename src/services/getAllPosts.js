export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_expand=userLikesId&_expand=user').then(
        (res) => res.json()
    )
}


export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}&_expand=topic&_expand=user`).then(
        (res) => res.json()
    )
}


export const getPostByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=topic`).then(
        (res) => res.json()
    )
}