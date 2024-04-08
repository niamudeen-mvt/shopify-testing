import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import LoginPage from "./views/pages/LoginPage";
import SignupPage from "./views/pages/Signup";
import VerificationPage from "./views/pages/VerificationPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardPage from "./views/pages/Dashboard";
import ProductImportPage from "./views/pages/ProductImportPage";
import { QueryProvider } from "./components/providers";
import ImportHistoryPage from "./views/pages/ImportHistoryPage";

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="verification" element={<VerificationPage />} />
            <Route path="*" element={<SignupPage />} />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="product-import" element={<ProductImportPage />} />
            <Route path="import-history" element={<ImportHistoryPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
