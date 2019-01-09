import React from 'react';
const ctx = React.createContext()

export const {Provider, Consumer} = ctx
export const withContext = Component => props => <Consumer>{value => <Component {...props} context={value} />}</Consumer>

export default ctx