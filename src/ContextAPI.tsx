import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

export function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <div>
      <h1>NewCycleForm Component: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 1)
        }}
      >
        Add + 1
      </button>
    </div>
  )
}

export function Countdown() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <div>
      <h1>CountDown Component: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 2)
        }}
      >
        Add + 2
      </button>
    </div>
  )
}

export function ContextAPI() {
  // compartilha o estado com <NewCycleForm/> e <Countdown />
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <NewCycleForm />
      <Countdown />
    </CyclesContext.Provider>
  )
}
