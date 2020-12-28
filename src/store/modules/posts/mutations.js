export default {
    setPosts(state, payload){
        return state.posts = payload
    },
    setViewPost(state, payload){
        state.viewPost = payload
    },
    setSelectedPost(state, payload){
        state.selectedPost = payload
    },
    setComments(state, payload){
        state.comments = payload
    }
}