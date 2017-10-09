export const getPopupsVisibility = state => state.getIn(['display', 'popups'])

export const getConnectPopupVisibility = state =>
  state.getIn(['display', 'popups', 'connect'])
