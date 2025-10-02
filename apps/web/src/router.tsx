import { createBrowserRouter } from 'react-router-dom'
import App, { Home } from './App'

const future: any = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <Home initialSection="about" /> },
        { path: 'services', element: <Home initialSection="services" /> },
        { path: 'team', element: <Home initialSection="team" /> },
        { path: 'blog', element: <Home initialSection="blog" /> },
        { path: 'careers', element: <Home initialSection="careers" /> },
        { path: 'contact', element: <Home initialSection="contact" /> },
      ],
    },
  ],
  {
    future,
  } as any
)
