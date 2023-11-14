import { Routes, Route, Navigate } from "react-router-dom"
import { AuthByEmail } from "src/features/AuthByEmail"
import LoginPage from "src/pages/LoginPage"
import MainPage from "src/pages/MainPage"
import RegistrationPage from "src/pages/RegistrationPage"
import ViewPage from "src/pages/ViewPage"
import { Layout } from "src/widgets/Layout"
import { ResetPassword } from "src/features/ResetPassword"
import { RestorePassword } from "src/features/RestorePassword"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/main" />} />
        <Route path="/main" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="view/:slug" element={<ViewPage />} />
          <Route path="*" element={<></>} />
        </Route>
        <Route path="login" element={<LoginPage />}>
          <Route index element={<AuthByEmail />} />
          <Route path="reset-password" element={<RestorePassword />} />
          <Route path="recovery-password" element={<ResetPassword />} />
        </Route>
        <Route path="registration" element={<RegistrationPage />} />

      </Route>
    </Routes>
  )
}