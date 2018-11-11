import React from 'react'

const store = {
  session: null,
}

export const { Provider, Consumer } = React.createContext(store)
