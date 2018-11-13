import React from 'react'

const store = {
  onLogin: () => {},
  session: null,
}

export const { Provider, Consumer } = React.createContext(store)
