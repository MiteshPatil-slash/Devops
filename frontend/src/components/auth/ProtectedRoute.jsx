import { Navigate } from 'react-router-dom'

function hasToken() {
  return !!localStorage.getItem('ai_deploy_token')
}

export default function ProtectedRoute({ children }) {
  if (!hasToken()) {
    return <Navigate to="/login" replace />
  }
  return children
}
