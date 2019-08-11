/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'
import { useContext } from './code'

const KEY = 'library-mode'

const storage = {
  get: () => localStorage.getItem(KEY),
  set: (val) => localStorage.setItem(KEY, val),
}

export default props => {
  const { mode, modes = [], setMode } = useContext()

  useEffect(() => {
    const stored = storage.get()
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
    storage.set(mode)
  }, [mode])

  return (
    <div
      role='radiogroup'
      sx={{
        display: 'flex',
      }}>
      {modes.map(m => (
        <button
          key={m}
          role='radio'
          aria-checked={m === mode}
          sx={{
            appearance: 'none',
            fontSize: 0,
            fontWeight: 'bold',
            m: 0,
            px: 3,
            py: 2,
            color: 'text',
            bg: 'muted',
            border: 0,
            borderRadius: 0,
            ':focus,:hover': {
              variant: 'styles.focused',
            },
            ':hover': {
              color: 'primary',
            },
            '&[aria-checked=true]': {
              color: 'background',
              bg: 'primary',
            },
          }}
          onClick={e => {
            setMode(m)
          }}>
          {m}
        </button>
      ))}
    </div>
  )
}
