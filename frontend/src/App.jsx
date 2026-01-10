import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

// --- PAGE IMPORTS ---
import Index from "./pages/Index"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Threats from "./pages/Threats";
import ReportIssue from "./pages/ReportIssue";
import Community from "./pages/Community";
import Profile from "./pages/Profile"; 

// ✅ NEW: Import the Personal Dashboard (Activity Log)
import Dashboard from "./pages/Dashboard"; 

// ✅ RENAMED: Import the Incidents Dashboard with its real name
import IncidentsDashboard from "./pages/IncidentsDashboard"; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          
          {/* Unified Report Issue Page */}
          <Route path="/report-issue" element={<ReportIssue />} />

          {/* Protected Routes */}
          
          {/* 1. Main User Dashboard (Activity Log) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 2. Global Incidents Dashboard (The old page) */}
          <Route path="/incidents-dashboard" element={<IncidentsDashboard />} />

          <Route path="/threats" element={<Threats />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;