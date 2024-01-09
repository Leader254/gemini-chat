import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Home from '../components/input/Home'


function App() {

  const color = "teal";
  const apiKeyApp = "your-api-key";

  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Home apiKeyApp={apiKeyApp} color={color}/>
      </div>
    </ChakraProvider>
  )
}

export default App
