import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton';
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
function App() {
  return (
    <div>
      <SkeletonTheme baseColor="#e6e6e6" highlightColor="#ffffff">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
