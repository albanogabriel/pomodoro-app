import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

// FORM - trabalhar com formulários:
// controlled / uncontrolled
// controlled -> manter em tempo real o estado a informação que o usuário insere na aplicação dentro do estado, de uma variável de nosso componente, toda vez que ele escrever um novo texto no input eu atualizo uma informação no estado contendo esse novo valor para que então a gente possa ter o valor atualizado do que o usuário digitou no input
// uncontrolled ->

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: unknown) {
    console.log(data)
  }

  const task = watch('task')
  const taskValueInputIsEmpty = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="">Durante</label>

          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5} // pula de 5 em 5
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled={taskValueInputIsEmpty} type="submit">
          <Play size={24} /> Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
