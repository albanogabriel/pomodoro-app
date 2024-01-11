import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode // ReactNode nada mais é que qualquer html válido / JSX válido
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // esse variável precisa fazer o seguinte: Com base no id(activeCycleId) que foi criado na função handleCreateNewCycle , percorrer os ciclos que eu tenho(const cycles do useState) e me retornar o ciclo que seja = ao id do ciclo ativo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(
      (
        state, // state é o Cycles
      ) =>
        state.map((cycles) => {
          if (cycles.id === activeCycleId) {
            return { ...cycles, finishedDate: new Date() }
          } else {
            return cycles
          }
        }),
    )
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // string por ser mais facil trabalhar id's com string
      task: data.task, // data-> está vindo do objeto criado a partir do que que nós preenchemos no formulário
      minutesAmount: data.minutesAmount, // data-> está vindo do objeto criado a partir do que que nós preenchemos no formulário
      startDate: new Date(),
    }

    // setCycles([...cycles, newCycle]) -> maneira certa, porém, não a mais correta, ver: CLOSURES - por que toda vez que eu estou alterando um estado, e esse estado depende de sua versão anterior/da sua informação anterior de eu alterar, é legal esse valor do estado, ser setado no formato de função
    setCycles((state) => [...state, newCycle]) // -> pego meu estado atual da minha variavel de ciclos, copio o estado atual e adiciono o novo ciclo no final
    // quando criar um ciclo eu também vou setar o ciclo recém criado, como sendo o meu ciclo ativo
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0) // desbuga o useEffect()
  }

  function interruptCurrentCycle() {
    // vou fazer um histórico, para saber qual foram interrompdos manualmente e quais foram completos e em andamento
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
