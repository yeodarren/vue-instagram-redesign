import { postsCollection, storage, auth } from "../../../firebase/firebase";
import firebase from "firebase/app";
import router from "../../../router/index"

export default {
  async createPost(_, payload) {
    const uploadTask = storage
      .ref(`images/${payload.image.name}`)
      .put(payload.image);

    uploadTask.on(
      "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.log(error)
        },
      async () => {
        const url = await storage
          .ref("images")
          .child(payload.image.name)
          .getDownloadURL()

        postsCollection.add({
          imageURL: url,
          caption: payload.caption,
          userId: auth.currentUser.uid,
          username: payload.username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    );
    router.push("/")
  },
  async getPosts({ commit }) {
    postsCollection.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      let posts = [];

      snapshot.forEach((doc) => {
        let post = doc.data();
        post.id = doc.id;

        posts.push(post);
      });

      commit("setPosts", posts);
    });
  },
  viewPost({ commit }, payload){
    commit('setViewPost', payload)
  },
  setSelectedPost({ commit }, payload){
    commit("setSelectedPost", payload)
  },
  addComment(_, payload){
    postsCollection.doc(payload.postId).collection("comments").add({
      text: payload.comment,
      username: payload.username
    })
  },
  getComments({ commit }, payload){
    postsCollection.doc(payload.postId).collection("comments").onSnapshot((snapshot) => {
      let comments = []

      snapshot.forEach((doc) => {
        let comment = doc.data()
        
        comments.push(comment)
      })

      commit("setComments", comments)
    })
  }
};
