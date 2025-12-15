import { useState } from 'react'
import Header from './components/Header'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
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
        <Marketplace onBecomeDealerClick={() => handleOpenModal('signup')} />
      </main>
      <Footer />
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
