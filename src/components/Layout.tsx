import React from 'react'
import { AppHeader } from './AppHeader'
import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  )
}
