import { createBrowserRouter } from 'react-router-dom'
import App, { Home } from './App'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Team } from './pages/Team'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Testimonials } from './pages/Testimonials'
import { Careers } from './pages/Careers'
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { CookiePolicy } from './pages/CookiePolicy'
import { Accessibility } from './pages/Accessibility'
import Admin from './pages/Admin'

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
        { path: 'about', element: <About /> },
        { path: 'services', element: <Services /> },
        { path: 'team', element: <Team /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:slug', element: <BlogPost /> },
        { path: 'testimonials', element: <Testimonials /> },
        { path: 'careers', element: <Careers /> },
        { path: 'contact', element: <Contact /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'cookie-policy', element: <CookiePolicy /> },
        { path: 'accessibility', element: <Accessibility /> },
      ],
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ],
  {
    future,
  } as any
)
