"use client"
import styles from './styles.module.scss'

import logo from '../../../public/avatar.jpg'
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';


 export default function FriendsPage () {
  const [telegram, setTelegram] = useState<[]>([])
  const userData = useAppSelector((state: RootState) => state.telegramUser.userData);
  const [copyLink, setCopyLink] = useState<boolean>(false)

  const handleClick = () => {
    // @ts-ignore
    navigator.clipboard.writeText(`https://t.me/TRANSPORT_TRUCKI_BOT/myapp?startapp=${userData.telegram_id}`)
    setCopyLink(true)
  }


  useEffect(() => {
    
      const data = {
        // @ts-ignore
        telegram_id: userData.telegram_id
      }
      fetch('/api/friends', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setTelegram(...telegram, data);
      })
      .catch((error) => console.error(error))
    }, [telegram, userData])


  return (
    <div className={styles.page}>
        <div className={styles.top}>
          <Image
            className={styles.avatar}
            src={logo} 
            alt="logo"
          />
          {/* @ts-ignore */}
          <span className={styles.ttc}>{userData.ttc_coin}</span>
          <button onClick={handleClick}>{copyLink ? 'the link has been copied' : "invite"}</button>
          <span className={styles.score}>Score 10% from buddies + 2.5% from their referrals. Get a play pass for each fren.</span>
          <ul className={styles.list}>
            {/* @ts-ignore */}
            {telegram.count && telegram.count.map((el, index) => {
              return (
                <li key={el.id}>
                  <Image
                    src={logo}
                    alt='logo'
                  />
                  <div>
                    <span>{el.id}</span>
                    <p>{el.telegram_name}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      <Navbar/>
    </div>
  )
}

