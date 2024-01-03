import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  // <div> em volta de <table> -> Esta div serve para somente poder proporcionar o scroll para usuários mobile, já que não é possível aplicar scroll em uma tag <table>

  flex: 1;
  //overflow: auto -> que ser o tamanho da tabela for maior do que o tamanho do container que eu tenho disponível pra ela, ele gere uma barra de rolagem
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; // vai forçar o scroll quando tivermos eum tamanho menor

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const // as const -> para dizer para o typescript que o meu texto sempre será um desses 3, e ele não pode mudar eu passo as const -> reandonly yellow (QUANDO FOI YELLOW É YELLOW-500), como uma constante

interface StatusProps {
  // statusColor: 'yellow' | 'red' | 'green'
  // keyof typeof -> é a typagem das chaves do meu objeto STATUS_COLOR
  // typeoff -> o Typescript não consegue ler diretamente objetos javascript, consgue ler a typagem da keys
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: ''; //mesmo que o conteúdo não apareça é obrigatório coloca-lo
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
