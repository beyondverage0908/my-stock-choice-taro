import { combineReducers } from 'redux'
import counter from './counter'
import system from './system'
import home from './home'

export default combineReducers({
  counter,
  system,
  home
})
