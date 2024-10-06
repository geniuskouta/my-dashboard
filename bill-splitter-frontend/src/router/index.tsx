import { createBrowserRouter } from "react-router-dom";
import { ProjectPage, SplitBillPage } from '../pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectPage />,
  },
  {
    path: "/split-bill",
    element: <SplitBillPage />
  }
]);

export default router;