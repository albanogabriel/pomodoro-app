import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  // flex-wrap: wrap -> quando a tela for menor eu quero que quebre
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2rem;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  //o input não herda o font-size do container
  font-size: 1rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  //ocupar o máximo de espaço
  //flex 1 -> é um atalho para setar 3 propriedades flex: flex-growth / flex-shrink / flex-basis
  // flex 1 -> basicamente ele diz: esse elemento pode aumentar pode diminuir, vai caber no espaço que ele tiver ali
  //flex growth -> 1 = sim ou não / 1 ou 0 -> dou habilidade pro meu elemento/componente crescer, além do tamanho original dele
  //flex shrink -> 1 = sim ou não / 1 ou 0 -> configuro meu elemento/componente para que ele diminua para um tamanho menor caso necessário
  // flex basis -> 1 = sim ou não / 1 ou 0 -> Qual é o tamanho ideal do meu elemento/componente ? se ele não estiver nem maior nem menor, por causa do growth ou shrink ?
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  //largura fixa
  width: 4rem;
`
