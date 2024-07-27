
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Write from './components/write.tsx'
import Read from './components/read.tsx'
import Update from './components/update.tsx'
import UpdateWrite from './components/writte.update.tsx'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <p>404 Not Found</p>
    },
    {
      path: "/write",
      element: <Write />
    },
    {
      path: "/read",
      element: <Read />
    },
    {
      path: "/update",
      element: <Update />,
      children:[
        {
          path:"/updateWrite/:firebaseID",
          element: <UpdateWrite/>
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
