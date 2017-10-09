export const getUser = state => state.getIn(['user', 'user'])

export const getConnectForm = state => state.getIn(['user', 'connectForm'])

export const getToken = state => state.getIn(['user', 'token'])

export const isLogged = state => !!state.getIn(['user', 'user', 'email'])

export const getUserId = state => state.getIn(['user', 'user', 'id'])
