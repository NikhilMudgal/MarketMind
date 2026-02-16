import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { ChatWindow } from './features/chat/components/ChatWindow'
import './index.css'
function App() {

  return (
    <ThemeProvider>
      <ChatWindow />
    </ThemeProvider>
  )
}

export default App
