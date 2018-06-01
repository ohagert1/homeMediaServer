import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import videos from './videos'
import currentVideo from './currentVideo'
import search from './search'
import category from './category'
import error from './error'

const reducer = combineReducers({
  user,
  videos,
  currentVideo,
  search,
  category,
  error
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './videos'
export * from './currentVideo'
export * from './search'
export * from './category'
export * from './error'
