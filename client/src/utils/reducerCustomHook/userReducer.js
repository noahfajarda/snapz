export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  } else if (action.type === "CLEAR") {
    return null;
  } else if (action.type === "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    }
  } else if (action.type === "UPDATEPROFILEPIC") {
    return {
      ...state,
      profilePicURL: action.payload
    }
  }
  return state;
}