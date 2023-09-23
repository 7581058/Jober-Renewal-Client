import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
const NotFound = loadable(() => import('./pages/NotFound'))
const Layout = loadable(() => import('./components/Layouts/Layout'))
const SpaceLayout = loadable(() => import('./components/Layouts/SpaceLayout'))
const Home = loadable(() => import('./pages/Home'))
const SharePage = loadable(() => import('./pages/Space'))
const Detail = loadable(() => import('./pages/Detail'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/detail" element={<Detail />} />
      </Route>
      <Route path="/" element={<SpaceLayout />}>
        <Route path="/space/:spaceId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
