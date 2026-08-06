import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import { BASE } from './config/site'
import HomePage              from './pages/HomePage'
import AboutPage             from './pages/AboutPage'
import SeminarPage           from './pages/SeminarPage'
import InspectionOverviewPage from './pages/services/InspectionOverviewPage'
import NewHomePage           from './pages/services/NewHomePage'
import UsedHomePage          from './pages/services/UsedHomePage'
import TownhousePage         from './pages/services/TownhousePage'
import GroupPage             from './pages/services/GroupPage'
import DeepCleanPage         from './pages/services/DeepCleanPage'
import RenovationPage        from './pages/services/RenovationPage'
import FaqPage               from './pages/FaqPage'
import PrivacyPage           from './pages/PrivacyPage'
import EnterpriseContactPage from './pages/EnterpriseContactPage'
import NotFoundPage          from './pages/NotFoundPage'
import BookingPage           from './pages/BookingPage'

export function SiteRoutes() {
  return (
    <Routes>
          <Route path="booking" element={<BookingPage />} />
          <Route element={<Layout />}>
            <Route index                       element={<HomePage />} />
            <Route path="about"               element={<AboutPage />} />
            <Route path="seminar"             element={<SeminarPage />} />
            <Route path="services/inspection" element={<InspectionOverviewPage />} />
            <Route path="services/deep-clean" element={<DeepCleanPage />} />
            <Route path="services/renovation" element={<RenovationPage />} />
            <Route path="services/new-home"   element={<NewHomePage />} />
            <Route path="services/used-home"  element={<UsedHomePage />} />
            <Route path="services/townhouse"  element={<TownhousePage />} />
            <Route path="services/group"      element={<GroupPage />} />
            <Route path="faq"                 element={<FaqPage />} />
            <Route path="privacy"             element={<PrivacyPage />} />
            <Route path="contact-enterprise"  element={<EnterpriseContactPage />} />
            <Route path="*"                   element={<NotFoundPage />} />
          </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={BASE}>
        <SiteRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
