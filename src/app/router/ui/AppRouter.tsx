import { Routes, Route } from "react-router-dom"
import LoginPage from "src/pages/LoginPage"
import MainPage from "src/pages/MainPage"
import RegistrationPage from "src/pages/RegistrationPage"
import ViewPage from "src/pages/ViewPage"
import { Layout } from "src/widgets/Layout"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/view/:slug" element={<ViewPage />} />
        <Route path="*" element={<></>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  )
}