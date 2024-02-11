import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'

interface INameState {
    username: string
}

interface INameActions {
    setUsername: (name: string) => void
}

type INameStore = INameState & INameActions

const createNameStore = () =>
  createStore<INameStore>()((set) => ({
    username: '',
    setUsername: (name: string) =>
      set(() => ({ username: name })),
  }))

type NameStore = ReturnType<typeof createNameStore>
const NameContext = createContext<NameStore | null>(null)

export const useNameStore = () => {
  const api = useContext(NameContext)
  return {
    //@ts-ignore
    username: useStore(api, (state) => state.username),
    //@ts-ignore
    setUsername: useStore(api, (state) => state.setUsername),
   }
}

export const NameProvider: FC<PropsWithChildren> = ({ children }) => {
  const widgetStoreRef = useRef<NameStore>()
  if (!widgetStoreRef.current) {
    widgetStoreRef.current = createNameStore()
  }
  return (
    <NameContext.Provider value={widgetStoreRef.current}>
      {children}
    </NameContext.Provider>
  )
}