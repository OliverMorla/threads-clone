import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// current user session
const initialState: UserInitialProps = {
  currentUser: {
    _id: "",
    username: "",
    followers: [],
    following: [],
  },
  targetUser: {
    _id: "",
    username: "",
    followers: [],
    following: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignCurrentUser: (
      state,
      action: PayloadAction<SingleUserInitialProps>
    ) => {
      state.currentUser = action.payload;
    },
    assignTargetUser: (
      state,
      action: PayloadAction<SingleUserInitialProps>
    ) => {
      state.targetUser = action.payload;
    },
    followUser: (state, action: PayloadAction<UserProps>) => {
      // check to see if current user is already following target user
      const isFollowing = state.currentUser.following.find(
        (user) => user._id._id === action.payload._id
      );

      if (isFollowing) return;

      state.targetUser.followers.push({
        _id: {
          _id: action.payload._id,
          username: action.payload.username,
          image: action.payload.image,
        },
        followedDate: new Date().toISOString(),
      });
    },
    unfollowUser: (state, action: PayloadAction<UserProps>) => {
      // check to see if current user is already following target user
      const isFollowing = state.currentUser.following.find(
        (user) => user._id._id === action.payload._id
      );

      if (isFollowing) {
        state.targetUser.followers = state.targetUser.followers.filter(
          (user) => user._id?._id === action.payload._id
        );
      }

      return;
    },
  },
});

export const { followUser, unfollowUser, assignCurrentUser, assignTargetUser } =
  userSlice.actions;
export default userSlice.reducer;
