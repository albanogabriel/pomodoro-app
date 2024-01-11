import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'
import { ContextAPI } from './ContextAPI'
import { JsonObject } from './pages/JsonObject'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/cycleobject" element={<JsonObject />} />
      </Route>
      <Route path="/contextapi" element={<ContextAPI />} />
    </Routes>
  )
}
