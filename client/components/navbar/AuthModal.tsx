import { Modal } from '@mantine/core'
import React from 'react'
import { useControls } from '../../store/useControls'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

type Props = {}

const AuthModal = (props: Props) => {
  const {authModal,setAuthModal} = useControls()
  const router = useRouter()
  const currentPath = router.pathname
  const {logIn} = useAuth()

  const handleSelectLogin = () => {
    router.push("/auth?"+currentPath.replace("/",""))
    setAuthModal(false)
  }
  const handleSelectConectWallet = () => {
    logIn()
    setAuthModal(false)
  }
  return (
    <Modal opened={authModal} onClose={() => setAuthModal(false)} centered overlayBlur={8} radius={'lg'}>
        <div onClick={handleSelectConectWallet} className='bg-gray flex items-center justify-center bg-gray-800/50 rounded-lg heading border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 text-2xl font-medium p-8 mb-4 text-gray-400'>
          Connect Wallet
        </div>
        <div onClick={handleSelectLogin} className='bg-gray flex items-center justify-center bg-gray-800/50 bg-gray-800 border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 text-2xl font-medium heading rounded-lg p-8 text-gray-400  '>
          Login / Signup with Email
        </div>
    </Modal>
  )
}

export default AuthModal