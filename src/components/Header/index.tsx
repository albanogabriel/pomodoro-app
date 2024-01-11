import { HeaderContainer } from './styles'

import logoIgnite from '../../assets/logo-ignite.svg'
import { BracketsCurly, Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img
          src={logoIgnite}
          alt="Dois triângulos verdes transluscidos, um sobre o outro apontados para o sudeste ou 3 horas"
        />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
        <NavLink to="/cycleobject" title="Objeto">
          <BracketsCurly size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
