import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './hooks/use-auth'
import { SignIn } from './pages/SignIn'

function App() {
  const auth = useAuth()

  if (auth.isLoading) {
    return <div>loading...</div>
  }

  const TopPage = () => {
    return (
      <div>
        <p>トップページ</p>
        <p>{auth.isAuthenticated ? 'ログイン済み' : '未ログイン'}</p>
        <p>
          <Link to='/signin'>ログイン</Link>
        </p>
      </div>
    )
  }

  const PrivateDashboard = () => {
    return (
      <PrivateRoute>
        <div>Welcome, {auth.username}!</div>
        <button onClick={() => auth.signOut()}>ログアウト</button>
      </PrivateRoute>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='dashboard' element={<PrivateDashboard />} />
        <Route path='*' element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
