export default {
    setUserProfile(state, payload){
        return state.userProfile = payload
    },
    setErrorMsg(state, payload){
        return state.errorMsg = payload
    }
}