import { matchPath } from 'react-router-dom'

export const getLocation = state => state.getIn(['route', 'location'])

export const createMatchSelector = path => {
  let lastPathname = null
  let lastMatch = null
  return state => {
    const { pathname } = getLocation(state)
    if (pathname === lastPathname) {
      return lastMatch
    }
    lastPathname = pathname
    const match = matchPath(pathname, path)
    if (!match || !lastMatch || match.url !== lastMatch.url) {
      lastMatch = match
    }
    return lastMatch
  }
}

export const getUrlSearch = state =>
  !!state.getIn(['route', 'location', 'search'])
    ? state.getIn(['route', 'location', 'search'])
    : ''

export const getPath = state =>
  state.getIn(['route', 'location', 'pathname']).includes('?')
    ? state.getIn(['route', 'location', 'pathname']).split('?')[0]
    : state.getIn(['route', 'location', 'pathname'])

export const getPathParts = state =>
  getPath(state)
    .split('/')
    .filter(part => !!part)

