import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ClaimProvider } from "./claim-context"
import { Gate } from "./components/Gate"
import { Layout } from "./components/Layout"
import { AppraisalPage } from "./pages/AppraisalPage"
import { FileClaimPage } from "./pages/FileClaimPage"
import { HomePage } from "./pages/HomePage"
import { IntakePage } from "./pages/IntakePage"
import { JurisdictionPage } from "./pages/JurisdictionPage"
import { NextStepPage } from "./pages/NextStepPage"
import { OutsideDcPage } from "./pages/OutsideDcPage"
import { PathPage } from "./pages/PathPage"
import { SettlementPage } from "./pages/SettlementPage"

const basename =
  import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "")

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <ClaimProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/intake" element={<IntakePage />} />
            <Route
              path="/jurisdiction"
              element={
                <Gate need="place">
                  <JurisdictionPage />
                </Gate>
              }
            />
            <Route
              path="/outside-dc"
              element={
                <Gate need="other">
                  <OutsideDcPage />
                </Gate>
              }
            />
            <Route
              path="/path"
              element={
                <Gate need="choose">
                  <PathPage />
                </Gate>
              }
            />
            <Route
              path="/settlement"
              element={
                <Gate need="settle">
                  <SettlementPage />
                </Gate>
              }
            />
            <Route
              path="/appraisal"
              element={
                <Gate need="appraisal">
                  <AppraisalPage />
                </Gate>
              }
            />
            <Route
              path="/file"
              element={
                <Gate need="file">
                  <FileClaimPage />
                </Gate>
              }
            />
            <Route
              path="/next"
              element={
                <Gate need="next">
                  <NextStepPage />
                </Gate>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ClaimProvider>
    </BrowserRouter>
  )
}
