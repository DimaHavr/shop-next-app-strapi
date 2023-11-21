/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import type { AnimationItem } from 'lottie-web'
import lottie from 'lottie-web'
import React, { useEffect } from 'react'

interface AddAnimationProps {
  children: React.ReactNode
  path: string
  id: string
}

const AddAnimation: React.FC<AddAnimationProps> = ({ children, path, id }) => {
  useEffect(() => {
    const container = document.getElementById(id)

    if (!container) {
      throw `Element with id ${id} not found`
    }

    const animation: AnimationItem | undefined = lottie.loadAnimation({
      container,
      path,
      loop: true,
      autoplay: true,
    })

    return () => {
      animation.destroy()
    }
  }, [id, path])

  return <div>{children}</div>
}

export default AddAnimation
