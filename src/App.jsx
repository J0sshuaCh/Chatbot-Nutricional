import { lazy, Suspense } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { HelmetProvider } from "react-helmet-async"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./lib/ThemeContext"
import Header from "./components/header"
import Footer from "./components/footer"
import { PublicRoute } from "./context/auth/PublicRoute"
import { ProtectedRoute } from "./context/auth/ProtectedRoute"
import { BabyManagerPage } from "./Pages/BabyManagerPage"
import { Layout } from "./components/template/Layout"
import { BabiesPage } from "./Pages/BabiesPage"
import { MedicalHistoryPage } from "./Pages/MedicalHistoryPage"
import { AllergiesPage } from "./Pages/AllergiesPage"
import { RecipesPage } from "./Pages/RecipesPage"
import { Login } from "./Pages/Login"

const MenuGrid = lazy(() => import("./components/menu-grid"))
const ChatbotPage = lazy(() => import("./Pages/chatbot-page"))
const InformacionNutricional = lazy(() => import("./Pages/informacion-nutricional-page"))
const Configuracion = lazy(() => import("./Pages/configuracion-page"))
const ServiciosDelEstado = lazy(() => import("./Pages/servicios-estado-page"))
const QaliWarmaPage = lazy(() => import("./Pages/qali-warma-page"))
const PlanAnemiaPage = lazy(() => import("./Pages/plan-anemia-page"))
const CunaMasPage = lazy(() => import("./Pages/cuna-mas-page"))
const GuiaPlatillosPage = lazy(() => import("./Pages/guia-platillos-page"))
const BibliotecaPage = lazy(() => import("./Pages/biblioteca-page"))
const DocumentViewerPage = lazy(() => import("./Pages/document-viewer-page"))
const PrivacidadViewerPage = lazy(() => import("./Pages/privacidad-viewer-page"))
const LoginPage = lazy(() => import("./Pages/login-page"))
const RegisterPage = lazy(() => import("./Pages/register-page"))
const MiPerfilPage = lazy(() => import("./Pages/mi-perfil-page"))


function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center py-20 text-muted-foreground">Cargando...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Routes>
            <Route element={<PublicRoute redirectTo="/manager-baby" />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<PageTransition><MenuGrid /></PageTransition>} />
                <Route path="/chatbot" element={<PageTransition><ChatbotPage /></PageTransition>} />
                <Route path="/informacion-nutricional" element={<PageTransition><InformacionNutricional /></PageTransition>} />
                <Route path="/servicios-estado" element={<PageTransition><ServiciosDelEstado /></PageTransition>} />
                <Route path="/configuracion" element={<PageTransition><Configuracion /></PageTransition>} />
                <Route path="/servicios-estado/qali-warma" element={<PageTransition><QaliWarmaPage /></PageTransition>} />
                <Route path="/servicios-estado/plan-anemia" element={<PageTransition><PlanAnemiaPage /></PageTransition>} />
                <Route path="/servicios-estado/cuna-mas" element={<PageTransition><CunaMasPage /></PageTransition>} />
                <Route path="/guia-platillos" element={<PageTransition><GuiaPlatillosPage /></PageTransition>} />
                <Route path="/biblioteca" element={<PageTransition><BibliotecaPage /></PageTransition>} />
                <Route path="/biblioteca/:slug" element={<PageTransition><DocumentViewerPage /></PageTransition>} />
                <Route path="/privacidad-viewer" element={<PageTransition><PrivacidadViewerPage /></PageTransition>} />
              <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
              <Route path="/mi-perfil" element={<PageTransition><MiPerfilPage /></PageTransition>} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute redirectTo="/" />}>
              <Route element={<Layout />}>
                <Route path="/manager-baby" element={<BabyManagerPage />} />
                <Route path="/babies" element={<BabiesPage />} />
                <Route path="/medical-history" element={<MedicalHistoryPage />} />
                <Route path="/allergies" element={<AllergiesPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
              </Route>
            </Route>
          </Routes>
          <Toaster richColors />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
