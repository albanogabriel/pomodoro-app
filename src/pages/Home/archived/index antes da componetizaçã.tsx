// import { HandPalm, Play } from 'phosphor-react'
// import { useForm } from 'react-hook-form'
// import { useEffect, useState } from 'react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as zod from 'zod'
// import { differenceInSeconds } from 'date-fns'

// import {
//   CountdownContainer,
//   FormContainer,
//   HomeContainer,
//   MinutesAmountInput,
//   Separator,
//   StartCountdownButton,
//   StopCountdownButton,
//   TaskInput,
// } from './styles'

// // FORM - trabalhar com formulários:
// // controlled / uncontrolled
// // controlled -> manter em tempo real o estado a informação que o usuário insere na aplicação dentro do estado, de uma variável de nosso componente, toda vez que ele escrever um novo texto no input eu atualizo uma informação no estado contendo esse novo valor para que então a gente possa ter o valor atualizado do que o usuário digitou no input
// // uncontrolled ->

// const newCycleFormValidationSchema = zod.object({
//   task: zod.string().min(1, 'informe a tarefa'),
//   owner: zod.string().optional(),
//   minutesAmount: zod
//     .number()
//     .min(5, 'precisa ser maior que 5')
//     .max(60, 'precisa ser menor que 60'),
// })

// // interface NewCycleFormData {
// //   task: string
// //   minutesAmount: number
// // }

// type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// interface Cycle {
//   id: string
//   task: string
//   minutesAmount: number
//   startDate: Date
//   interruptDate?: Date
//   finishedDate?: Date
// }

// export function Home() {
//   const [cycles, setCycles] = useState<Cycle[]>([])
//   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
//   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

//   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // esse variável precisa fazer o seguinte: Com base no id(activeCycleId) que foi criado na função handleCreateNewCycle , percorrer os ciclos que eu tenho(const cycles do useState) e me retornar o ciclo que seja = ao id do ciclo ativo

//   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
//   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

//   const minutesAmount = Math.floor(currentSeconds / 60)
//   const secondsAmount = currentSeconds % 60

//   const minutes = String(minutesAmount).padStart(2, '0')
//   const seconds = String(secondsAmount).padStart(2, '0')

//   useEffect(() => {
//     let interval: number

//     if (activeCycle) {
//       interval = setInterval(() => {
//         // 1º parametro é a data atual e activeCycle.startDate é o valor que queremos tirar a diferença
//         const secondsDifference = differenceInSeconds(
//           new Date(),
//           activeCycle.startDate,
//         )

//         if (secondsDifference >= totalSeconds) {
//           setCycles(
//             (
//               state, // state é o Cycles
//             ) =>
//               state.map((cycles) => {
//                 if (cycles.id === activeCycleId) {
//                   return { ...cycles, finishedDate: new Date() }
//                 } else {
//                   return cycles
//                 }
//               }),
//           )
//           setAmountSecondsPassed(totalSeconds)
//           clearInterval(interval)
//         } else {
//           setAmountSecondsPassed(secondsDifference)
//         }
//       }, 1000)

//       return () => {
//         // remover os clicos anteriores
//         clearInterval(interval)
//       }
//     }
//   }, [activeCycle, totalSeconds, activeCycleId]) // toda vez que essa activeCycle mudar ele vai executar de novo

//   const { register, handleSubmit, watch, formState, reset } =
//     useForm<NewCycleFormData>({
//       resolver: zodResolver(newCycleFormValidationSchema),
//       defaultValues: {
//         task: '',
//         minutesAmount: 0,
//       },
//     })

//   function handleCreateNewCycle(data: NewCycleFormData) {
//     const newCycle: Cycle = {
//       id: String(new Date().getTime()), // string por ser mais facil trabalhar id's com string
//       task: data.task, // data-> está vindo do objeto criado a partir do que que nós preenchemos no formulário
//       minutesAmount: data.minutesAmount, // data-> está vindo do objeto criado a partir do que que nós preenchemos no formulário
//       startDate: new Date(),
//     }

//     // setCycles([...cycles, newCycle]) -> maneira certa, porém, não a mais correta, ver: CLOSURES - por que toda vez que eu estou alterando um estado, e esse estado depende de sua versão anterior/da sua informação anterior de eu alterar, é legal esse valor do estado, ser setado no formato de função
//     setCycles((state) => [...state, newCycle]) // -> pego meu estado atual da minha variavel de ciclos, copio o estado atual e adiciono o novo ciclo no final
//     // quando criar um ciclo eu também vou setar o ciclo recém criado, como sendo o meu ciclo ativo
//     setActiveCycleId(newCycle.id)
//     setAmountSecondsPassed(0) // desbuga o useEffect()

//     reset()
//   }

//   console.log(formState.errors)

//   const task = watch('task')
//   const taskValueInputIsEmpty = !task

//   useEffect(() => {
//     if (activeCycle) {
//       document.title = `Pomodoro - ${minutes}:${seconds}`
//     } else {
//       document.title = `Pomodoro - set a new cycle`
//     }
//   }, [minutes, seconds, activeCycle])

//   function handleInterruptCycle() {
//     // vou fazer um histórico, para saber qual foram interrompdos manualmente e quais foram completos e em andamento
//     setCycles(
//       cycles.map((cycle) => {
//         if (cycle.id === activeCycleId) {
//           return { ...cycle, interruptDate: new Date() }
//         } else {
//           return cycle
//         }
//       }),
//     )

//     setActiveCycleId(null)
//   }

//   console.log(cycles)

//   return (
//     <HomeContainer>
//       <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
//         <FormContainer>
//           <label htmlFor="task">Vou trabalhar em</label>
//           <TaskInput
//             id="task"
//             list="task-suggestions"
//             placeholder="Dê um nome para o seu projeto"
//             disabled={!!activeCycle} // !! -> para transformar o valor em boolean
//             {...register('task')}
//           />

//           <datalist id="task-suggestions">
//             <option value="Projeto 1" />
//             <option value="Projeto 2" />
//             <option value="Projeto 3" />
//           </datalist>

//           <label htmlFor="">Durante</label>

//           <MinutesAmountInput
//             type="number"
//             id="minutesAmount"
//             placeholder="00"
//             disabled={!!activeCycle} // !! -> para transformar o valor em boolean
//             step={5} // pula de 5 em 5
//             // min={5}
//             // max={60}
//             {...register('minutesAmount', { valueAsNumber: true })}
//           />

//           <span>minutos.</span>
//         </FormContainer>

//         <CountdownContainer>
//           {/* eu posso trabalhar com strings como se fosse vetores: se minutes deu 20 e segundos 10
//               seconds[1] = 0
//               minutes[0] = 2
//               minutes[1] = 0
//               seconds[0] = 0
//           */}
//           <span>{minutes[0]}</span>
//           <span>{minutes[1]}</span>
//           <Separator>:</Separator>
//           <span>{seconds[0]}</span>
//           <span>{seconds[1]}</span>
//         </CountdownContainer>

//         {activeCycle ? (
//           <StopCountdownButton onClick={handleInterruptCycle} type="button">
//             <HandPalm size={24} /> Pausar o ciclo
//           </StopCountdownButton>
//         ) : (
//           <StartCountdownButton disabled={taskValueInputIsEmpty} type="submit">
//             <Play size={24} /> Começar
//           </StartCountdownButton>
//         )}
//       </form>
//     </HomeContainer>
//   )
// }
