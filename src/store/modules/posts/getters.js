export default {
    getPosts(state){
        return state.posts
    },
    viewPost(state){
        return state.viewPost
    },
    getSelectedPost(state){
        return state.selectedPost
    },
    getComments(state){
        return state.comments
    }
}