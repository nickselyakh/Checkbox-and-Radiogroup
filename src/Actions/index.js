import { replace as ReplaceLocation } from "connected-react-router"
import queryString from "query-string"

/*
const updateLocation = (method) => {
  return (...args) => ({
    type: CALL_HISTORY_METHOD,
    payload: {
      method,
      args
    }
  })
} */



export const pushColor = ( payload ) => {
  const queryParams = {
    ...payload,
    color: payload.color.join(",")
  }

  return ReplaceLocation({
    // hardcode
    pathname: "/filter",
    search: `?${queryString.stringify(queryParams)}`,
    hash: "",
})}