import useGlobalOverflowHidden from '@/hooks/force-overflow'
import { FC, useRef, MouseEvent, useEffect } from 'react'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onBackMenu: () => void
  onStartGame: () => void
}

const RulesDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onStartGame,
    onBackMenu,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  const handleStartGame = (e: MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
     setIsOpen(false)
     onStartGame()
  }

  const handleBackMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(false)
    onBackMenu()
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
    <dialog ref={modalRef} onClose={onDialogClose} className='modal'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Clicker rules.</h2>
          <p>Click on button as fast as posible for 30 seconds!</p>
          <p>The more clicks the better!</p>
          <div className="card-actions justify-between pt-8">
            <button className="btn btn-primary" onClick={handleBackMenu}>Back to menu</button>
            <button className="btn btn-primary" onClick={handleStartGame}>Start game</button>
          </div>
        </div>
      </div>
     
    </dialog>
  )
}
export default RulesDialog