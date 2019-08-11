import React from 'react'

export const Context = React.createContext({
  mode: 'rebass',
  modes: [
    'rebass',
    'theme-ui',
    'emotion',
  ],
})

export const useContext = () => React.useContext(Context)

export const CodeProvider = props => {
  const outer = useContext()
  const [ mode, setMode ] = React.useState('rebass')
  const [ xray, setXray ] = React.useState(true)
  const context = {
    ...outer,
    mode,
    setMode,
    xray,
    setXray,
  }
  return (
    <Context.Provider value={context}>
      {props.children}
    </Context.Provider>
  )
}

