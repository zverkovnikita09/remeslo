import { Routes, Route } from "react-router-dom"
import LoginPage from "src/pages/LoginPage"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<></>}>
        <Route path="*" element={<></>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<></>} />
    </Routes>
  )
}