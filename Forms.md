# FORM - trabalhar com formulários e informações provenientes do input do usuário

## controlled e uncontrolled

### controlled 

controlled -> manter em tempo real o estado a informação que o usuário insere na aplicação dentro do estado, de uma variável de nosso componente, toda vez que ele escrever um novo texto no input eu atualizo uma informação no estado contendo esse novo valor para que então a gente possa ter o valor atualizado do que o usuário digitou no input

lados Positivo ( + ):

Neste caso tempo o valor em tempo real e refletir alterações via propriedade(value={task})
const [task, usetTask] = useState('')
<input onChange={event => setTask(event.target.value)} value={task} />

lado negativo ( - ):
Toda vez que o React escuta uma mudança, ele renderiza todo o componente do estado que mudou, as vezes isto não é performático 

### uncontrolled

uncontrolled -> A gente busca a informação do valor do input, somente quando, precisarmos dela

ao invés de termos um onChange no input: <input onChange={event => setTask(event.target.value)} value={task} />

poderíamos ter um onSubmit no formulário e os próprios métodos do html que a gente já possui do JavaScript tradicional, para buscar os valores dos meus inputs 

obs: é através do atributo name="task" no input que conseguímos trazer para a função handleSubmit

export function Home() {

  function handleSubmit(event) {
    event.target.task.value
  }

  return (
    <HomeContainer>
      <form onSubmit={} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            name="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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

        <StartCountDownButton disabled type="submit">
          <Play size={24} /> Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
