import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router'
import { ProjectProvider } from './providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider.Provider>
      <RouterProvider router={router} />
    </ProjectProvider.Provider>
  </StrictMode>,
)
