import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
