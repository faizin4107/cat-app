import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const DashboardAdmin = lazy(() => import("./pages/dashboard-admin"));
const DashboardPeserta = lazy(() => import("./pages/dashboard-peserta"));

const LoginAdmin = lazy(() => import("./pages/auth/login-admin"));
const ForgotPasswordFormAdmin = lazy(() => import("./pages/auth/forgot-password-admin"));
const OtpAdmin = lazy(() => import("./pages/auth/otp-admin"));
const LoginPeserta = lazy(() => import("./pages/auth/login-peserta"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

const KelolaTes = lazy(() => import("./pages/kelola-tes/KelolaTes"));
const CreateKelolaTes = lazy(() => import("./pages/kelola-tes/CreateKelolaTes"));
const EditKelolaTes = lazy(() => import("./pages/kelola-tes/EditKelolaTes"));
const Sesi = lazy(() => import("./pages/sesi/Sesi"));
const CreateSesi = lazy(() => import("./pages/sesi/CreateSesi"));
const EditSesi = lazy(() => import("./pages/sesi/EditSesi"));
const CAT = lazy(() => import("./pages/cat/CAT"));
const CreateTesCAT = lazy(() => import("./pages/cat/CreateTesCAT"));
const EditTesCAT = lazy(() => import("./pages/cat/EditTesCAT"));

const PilihanJawaban = lazy(() => import("./pages/pilihan-jawaban/PilihanJawaban"));
const CreatePilihanJawaban = lazy(() => import("./pages/pilihan-jawaban/CreatePilihanJawaban"));
const EditPilihanJawaban = lazy(() => import("./pages/pilihan-jawaban/EditPilihanJawaban"));
const Peraturan = lazy(() => import("./pages/peraturan/Peraturan"));
const CreatePeraturan = lazy(() => import("./pages/peraturan/CreatePeraturan"));
const EditPeraturan = lazy(() => import("./pages/peraturan/EditPeraturan"));
const Admin = lazy(() => import("./pages/users/admin/Admin"));
const CreateAdmin = lazy(() => import("./pages/users/admin/CreateAdmin"));
const EditAdmin = lazy(() => import("./pages/users/admin/EditAdmin"));
const Peserta = lazy(() => import("./pages/users/peserta/Peserta"));
const CreatePeserta = lazy(() => import("./pages/users/peserta/CreatePeserta"));
const EditPeserta = lazy(() => import("./pages/users/peserta/EditPeserta"));
const HasilTes = lazy(() => import("./pages/hasil-tes/HasilTes"));

// Peserta
const PilihSesi = lazy(() => import("./pages/dashboard-peserta/sesi/PilihSesi"));
const PenjelasanSesi = lazy(() => import("./pages/dashboard-peserta/sesi/PenjelasanSesi"));
const Soal = lazy(() => import("./pages/dashboard-peserta/cat/Soal"));
const HasilTesPeserta = lazy(() => import("./pages/dashboard-peserta/hasil-tes-peserta/HasilTesPeserta"));

const ComingSoonPage = lazy(() => import("./pages/utility/coming-soon"));
const UnderConstructionPage = lazy(() =>
  import("./pages/utility/under-construction")
);

import Loading from "@/components/Loading";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<LoginPeserta />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/forgot-password-admin" element={<ForgotPasswordFormAdmin />} />
          <Route path="/otp-admin" element={<OtpAdmin />} />
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          <Route path="dashboard-peserta" element={<DashboardPeserta />} />
          <Route path="kelola-tes" element={<KelolaTes />} />
          <Route path="create-kelola-tes" element={<CreateKelolaTes />} />
          <Route path="edit-kelola-tes/:id" element={<EditKelolaTes />} />
          <Route path="sesi/:id" element={<Sesi />} />
          <Route path="create-sesi/:id" element={<CreateSesi />} />
          <Route path="edit-sesi/:id" element={<EditSesi />} />
          <Route path="cat/:id" element={<CAT />} />
          <Route path="create-tes-cat/:tesId/:sesiId" element={<CreateTesCAT />} />
          <Route path="edit-tes-cat/:tesId/:sesiId" element={<EditTesCAT />} />

          <Route path="pilihan-jawaban/:id" element={<PilihanJawaban />} />
          <Route path="create-pilihan-jawaban/:id" element={<CreatePilihanJawaban />} />
          <Route path="edit-pilihan-jawaban/:id" element={<EditPilihanJawaban />} />
          <Route path="peraturan/:id" element={<Peraturan />} />
          <Route path="create-peraturan/:id" element={<CreatePeraturan />} />
          <Route path="edit-peraturan/:id" element={<EditPeraturan />} />
          <Route path="admin" element={<Admin />} />
          <Route path="create-admin" element={<CreateAdmin />} />
          <Route path="edit-admin/:id" element={<EditAdmin />} />
          <Route path="peserta" element={<Peserta />} />
          <Route path="create-peserta" element={<CreatePeserta />} />
          <Route path="edit-peserta/:id" element={<EditPeserta />} />
          <Route path="hasil-tes" element={<HasilTes />} />

          {/* Peserta */}
          <Route path="pilih-sesi" element={<PilihSesi />} />
          <Route path="penjelasan-sesi/:id" element={<PenjelasanSesi />} />
          <Route path="soal" element={<Soal />} />
          <Route path="hasil-tes-peserta" element={<HasilTesPeserta />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path="/under-construction"
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
