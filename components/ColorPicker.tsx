import React, { useRef } from 'react'
// import { HexColorPicker } from 'react-colorful'
import { useClickObserver } from '@/lib/hooks'

export const ColorPicker = () => {
  const ref = useRef<HTMLDivElement>(null)
  useClickObserver(ref)
  return (
    <div ref={ref}>
      sldfkj
      {/* <HexColorPicker color={color} onChange={setColor} /> */}
    </div>
  )
}
