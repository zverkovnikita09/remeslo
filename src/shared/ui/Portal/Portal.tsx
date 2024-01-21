"use client"
import { useState, useEffect, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom';

export const Portal= ({ children }: PropsWithChildren) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  useEffect(() => {
    document?.body.appendChild(container)
    return () => {
      document?.body.removeChild(container)
    }
  }, [document])

  return createPortal(children, container)
}