import * as fb from '../../../firebase/firebase'
import router from '../../../router'

export default {
    async login({ dispatch, commit }, payload){
        try {
            //sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(
              payload.email,
              payload.password
            );
      
            //fetch user profule and set in state
            dispatch("fetchUserProfile", user);
          } catch (err) {
            commit("setErrorMsg", err.message);
          }
   
    },
    async register({ dispatch, commit }, payload){
        try {
            //register
            const { user } = await fb.auth.createUserWithEmailAndPassword(
              payload.email,
              payload.password
            );
      
            //create user profile object in userCollections
            await fb.usersCollection.doc(user.uid).set({
              name: payload.name,
            });
      
            dispatch("fetchUserProfile", user);
          } catch (err) {
            commit("setErrorMsg", err.message);
          }
    },
    async fetchUserProfile({ commit }, user){
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()

        //set user profile in state
        commit('setUserProfile', userProfile.data())

        if(router.currentRoute.path === '/login'){
            router.push('/')
        }
        router.push('/').catch(()=>{})
    },
    
    async logout({ commit }){
        fb.auth.signOut()

        commit('setUserProfile', {})
        commit("setErrorMsg", null);
        router.push('/login')
    },
}