import {
  CHANG_SESSIONID,
  CHANGE_SYS_VISIT_COUNT,
  CHANGE_LOGIN_COED
} from '../constants/system'

const INITIAL_STATE = {
  sessionId: null,
  visitCount: 0,
  loginCode: null
}

export default function system (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANG_SESSIONID:
      return {
        ...state,
        sessionId: action.sessionId
      }
    case CHANGE_SYS_VISIT_COUNT:
      return {
        ...state,
        visitCount: action.count
      }
    case CHANGE_LOGIN_COED:
      return {
        ...state,
        loginCode: action.code
      }
    default:
      return state
  }
}