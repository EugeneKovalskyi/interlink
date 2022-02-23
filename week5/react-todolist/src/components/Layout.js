import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import styles from '../style/Layout.module.css'

export default function Layout({ lists }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
