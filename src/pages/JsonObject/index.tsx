import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { DivContainer } from './styles'

export function JsonObject() {
  const { cycles } = useContext(CyclesContext)

  return (
    <DivContainer>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
    </DivContainer>
  )
}
