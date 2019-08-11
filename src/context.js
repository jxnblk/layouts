import React from 'react'

export const Context = React.createContext({
  mode: 'rebass',
  modes: [
    'rebass',
    'theme-ui',
    'emotion',
    // 'css-modules',
  ],
})

export const useContext = () => React.useContext(Context)

export const CodeProvider = props => {
  const outer = useContext()
  const [ mode, setMode ] = React.useState('rebass')
  const [ grid, setGrid ] = React.useState(true)
  const toggleGrid = () => setGrid(!grid)
  const context = {
    ...outer,
    mode,
    setMode,
    grid,
    setGrid,
    toggleGrid,
  }

  return (
    <Context.Provider value={context}>
      {props.children}
    </Context.Provider>
  )
}

