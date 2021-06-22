import React from 'react'

const TabinationContext = React.createContext()

export function Tabination (props) {
  const { children } = props

  const [current = 'Stats', setCurrent] = React.useState()

  return (
    <TabinationContext.Provider value={[current, setCurrent]}>
      {children}
    </TabinationContext.Provider>
  )
}

export function Tab (props) {
  const { id, children } = props
  const [current, setCurrent] = React.useContext(TabinationContext)

  return (
    <div onClick={() => setCurrent(id)} className={'pointer px-10 py-5 mx-5 sidebar-link ' + (current === id ? 'text-primary bg-dark-dm bg-white-lm' : 'bg-very-dark-dm bg-light-lm')}>
      {children}
    </div>
  )
}

export function Page (props) {
  const { id, children } = props
  const current = React.useContext(TabinationContext)[0]

  return (
    current === id && (
      children
    )
  )
}
