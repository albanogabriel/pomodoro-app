import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.75rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme['gray-100']};

    //1º - add transparent border so the button doesn't move
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;

    //2º - modify border on hover
    &:hover {
      border-bottom: 2px solid ${(props) => props.theme['green-500']};
    }

    //3º - active border on click
    &.active {
      color: ${(props) => props.theme['green-500']};
      border-bottom: 2px solid ${(props) => props.theme['green-500']};
    }

    //4º - Tiramos a borda verde que aparecia o foco quando a gente clicava
    &:focus {
      box-shadow: none;
    }
  }
`
