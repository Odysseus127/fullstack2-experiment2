import { createSlice,createEntityAdapter,createSelector } from '@reduxjs/toolkit';
const postAdapter=createEntityAdapter();

const initialState =postAdapter.getInitialState( {
  status: 'idle',
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postAdapter.addOne,
    deletePost: postAdapter.removeOne,
    updatePost: postAdapter.updateOne,
    likePost: (state, action) => {
      const post = state.entities[action.payload];
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { addPost,deletePost,updatePost,likePost } = postsSlice.actions;
export default postsSlice.reducer;

export const{
  selectAll: selectPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectTotal,
} = postAdapter.getSelectors((state) => state.posts);


//memoized selector
export const selectTotalLikes = createSelector(
  [selectPosts],
  (posts) =>
    posts.reduce((total, post) => total + post.likes, 0)
);

export const selectPlatformCounts = createSelector(
  [selectPosts],
  (posts) => ({
    Facebook:posts.filter((post) => post.platform === "Facebook").length,
    Twitter:posts.filter((post) => post.platform === "Twitter").length,
    LinkedIn:posts.filter((post) => post.platform === "LinkedIn").length,
  })
);


