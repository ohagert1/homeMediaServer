const SET_SEARCH = 'SET_SEARCH'

export const setSearch = search => {
  return {
    type: SET_SEARCH,
    search
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.search
    default:
      return state
  }
}
