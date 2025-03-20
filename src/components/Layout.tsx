import React from 'react'
import { AppHeader } from './AppHeader'
import { Outlet } from 'react-router'
import { Footer } from './Footer'

export const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  )
}
