import { 
  CHANG_SESSIONID,
  CHANGE_SYS_VISIT_COUNT,
  CHANGE_LOGIN_COED
} from '../constants/system'

export const changeSessionId = sessionId => {
  return {
    type: CHANG_SESSIONID,
    sessionId
  }
}

export const changeSystemVisitCount = count => {
  return {
    type: CHANGE_SYS_VISIT_COUNT,
    count
  }
}

export const changeSystemLoginCode = code => {
  return {
    type: CHANGE_LOGIN_COED,
    code
  }
}