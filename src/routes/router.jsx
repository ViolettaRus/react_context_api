import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Dashboard/Profile/Profile'
import Settings from '../pages/Dashboard/Settings/Settings'
import Stats from '../pages/Dashboard/Stats/Stats'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Characters from '../pages/Characters/Characters'
import CharacterDetail from '../pages/CharacterDetail/CharacterDetail'
import { protectedLoader } from './loaders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        loader={protectedLoader}
      >
        <Route index element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route 
          path="stats" 
          element={<Stats />}
        />
      </Route>
      <Route 
        path="/characters" 
        element={
          <ProtectedRoute>
            <Characters />
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
      <Route 
        path="/characters/:id" 
        element={
          <ProtectedRoute>
            <CharacterDetail />
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
    </Route>
  )
)

export default router

