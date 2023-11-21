import { useEffect } from 'react'

interface Props {
  handleEscKeyPressContent: (event: { code: string }) => void
}

function useCustomScrollbarLock({ handleEscKeyPressContent }: Props) {
  useEffect(() => {
    function getScrollbarWidth() {
      const scrollDiv = document.createElement('div')
      scrollDiv.style.width = '100px'
      scrollDiv.style.height = '100px'
      scrollDiv.style.overflow = 'scroll'
      scrollDiv.style.position = 'absolute'
      scrollDiv.style.top = '-9999px'
      document.body.appendChild(scrollDiv)

      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

      document.body.removeChild(scrollDiv)

      return scrollbarWidth
    }

    const scrollbarWidth = getScrollbarWidth()
    document.body.style.overflowY = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    const paddingLock = document.getElementsByClassName('padding-lock')
    for (let i = 0; i < paddingLock.length; i += 1) {
      const element = paddingLock[i] as HTMLElement
      element.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleEscKeyPressContent({ code: 'Escape' })
      }
    }
    window.addEventListener('keydown', handleEscKeyPress)

    return () => {
      document.body.style.overflowY = 'auto'
      document.body.style.paddingRight = '0'

      for (let i = 0; i < paddingLock.length; i += 1) {
        const element = paddingLock[i] as HTMLElement
        element.style.paddingRight = '0'
      }

      window.removeEventListener('keydown', handleEscKeyPress)
    }
  }, [handleEscKeyPressContent])
}

export default useCustomScrollbarLock
