"use client"
import { useState, useEffect, PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom';

export const Portal = ({ children }: PropsWithChildren) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.createElement("div")
    document.body.appendChild(ref.current)
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(children, ref.current) : null
}