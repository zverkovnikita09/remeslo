import { Routes, Route } from "react-router-dom"
import LoginPage from "src/pages/LoginPage"
import RegistrationPage from "src/pages/RegistrationPage"
import { Layout } from "src/widgets/Layout"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<></>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  )
}