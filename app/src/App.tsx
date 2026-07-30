import { Routes, Route } from 'react-router';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import ServiceDetails from '@/pages/ServiceDetails';
import Schemes from '@/pages/Schemes';
import SchemeDetails from '@/pages/SchemeDetails';
import CyberSafety from '@/pages/CyberSafety';
import Quiz from '@/pages/Quiz';
import Feedback from '@/pages/Feedback';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/AdminDashboard';
import ManageScheme from '@/pages/ManageScheme';
import ManageService from '@/pages/ManageService';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/schemes/:id" element={<SchemeDetails />} />
              <Route path="/cyber-safety" element={<CyberSafety />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/scheme/:id?" element={<ManageScheme />} />
              <Route path="/admin/service/:id?" element={<ManageService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
