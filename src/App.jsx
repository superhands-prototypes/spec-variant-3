import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Modal from './components/Modal'
import ChatWidget from './components/ChatWidget'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('signup')

  const handleOpenModal = (type = 'signup') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSwitchModalType = (type) => {
    setModalType(type)
  }

  return (
    <>
      <Header 
        onSellMachineryClick={() => handleOpenModal('signup')} 
        onLoginClick={() => handleOpenModal('login')}
      />
      <main>
        <Hero onBecomeBuyerClick={() => handleOpenModal('signup')} />
        <Benefits />
      </main>
      <ChatWidget />
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        type={modalType}
        onSwitchType={handleSwitchModalType}
      />
    </>
  )
}

export default App
