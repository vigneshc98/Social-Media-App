import React from 'react'
import { Feed } from '../../components/feed/Feed'
import { Rightbar } from '../../components/righbar/Rightbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Topbar } from '../../components/topbar/Topbar'
import './home.css'

export const Home = () => {
  return (
    <div>
        <Topbar/>
        <div className="homeContainer">
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </div>
    </div>
  )
}
