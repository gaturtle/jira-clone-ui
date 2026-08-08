import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { BoardPage } from "./pages/BoardPage";
import { BacklogPage } from "./pages/BacklogPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/:issueKey" element={<BoardPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/backlog/:issueKey" element={<BacklogPage />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
