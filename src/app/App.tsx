import { Notifications } from "src/features/Notifications"
import { AppRouter } from "./router"
import './styles/global.scss'
import FocusTrap from "@mui/material/Unstable_TrapFocus"

function App() {

  return (
    <FocusTrap open disableAutoFocus disableEnforceFocus>
      <div className='app'>
        <Notifications timeout={2500} />
        <AppRouter />
      </div>
    </FocusTrap>
  )
}
export default App
