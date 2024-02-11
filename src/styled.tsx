import tw from 'tailwind-styled-components'

export const StyledScreen = tw.div`
w-screen h-screen items-center justify-center bg-base-300 flex flex-col
`

interface IsActive {
  $active?: boolean
}

export const StyledActiveModeButton = tw.button<IsActive>`
btn
w-24 h-24 
hover:bg-opacity-80 
shadow-md 
flex items-center justify-center
${(p) => (p.$active ? 'btn-primary' : 'btn-secondary')} 
`

interface ILampMode {
  $mode: string
}

export const StyledLampModeButton = tw.button<ILampMode>`
btn
w-24 h-24 
shadow-md 
flex items-center justify-center
${(p) => (p.$mode === 'success'.toUpperCase() ? 'btn-success hover:bg-opacity-100' : '')} 
${(p) => (p.$mode === 'error'.toUpperCase() ? 'btn-error hover:bg-opacity-100' : '')} 
${(p) => (p.$mode === 'wait'.toUpperCase() ? 'btn-warn' : '')}
${(p) => (p.$mode === 'on'.toUpperCase() ? 'btn-accent' : '')}  
`

export const StyledClickButton = tw.button`
btn 
bg-secondary 
hover:bg-secondary 
rounded-full 
w-64 h-64 
shadow-2xl 
flex items-center justify-center
`