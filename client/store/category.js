const SET_CATEGORY = 'SET_CATEGORY'

export const setCategory = category => {
  return {
    type: SET_CATEGORY,
    category
  }
}

export default (state = 'all', action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category
    default:
      return state
  }
}
