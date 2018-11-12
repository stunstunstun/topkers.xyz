import React from 'react'

const store = {
  session: {},
}

export const { Provider, Consumer } = React.createContext(store)
