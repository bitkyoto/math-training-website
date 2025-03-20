import React from 'react'
import { Separator } from './ui/separator'
import { Scale } from 'lucide-react'

export const Footer = () => {
  return (
    <>
      <Separator className="mt-10" />
      <div className="flex justify-end items-center p-8 gap-2">
        <Scale />
        <p> Все права защищены </p>
      </div>
    </>
  )
}
