import { BrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import '../App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}