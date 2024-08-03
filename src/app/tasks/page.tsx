"use client"

import logo from '../../../public/logo.jpg'

import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';
import styles from './styles.module.scss'
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';

export default function TasksPage() {

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
      fetch('/api/tasks', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        console.log(res)
        return res.json();
      })
      .then((data) => {
        setTelegram(...telegram, data);
      })
      .catch((error) => console.error(error))
  
    }, [])

    useEffect(() => {
      console.log(telegram)
    }, [telegram])




    return (
      <div className={styles.page}>
        <div className={styles.top}>
        <Image
          className={styles.avatar} 
          src={logo} 
          alt=""
        />
        <h3 className={styles.title}>Tasks list</h3>
        <ul className={styles.list}>
          <li>
            <div className={styles.item}>
              <div className={styles.left}>
                <p>Invite 5 frens</p>
                {/* @ts-ignore */}
                <span>+{telegram.award_invited_friends && telegram.award_invited_friends} TTC</span>
              </div>
              {/* @ts-ignore */}
              <span>{telegram.count && telegram.count.length}/{telegram.completed && telegram.completed}</span>
            </div>
            <button className={styles.invite} onClick={handleClick}>{copyLink ? 'the link has been copied' : "invite"}</button>
          </li>
        </ul>
        </div>
      <Navbar/>
      </div>
    )
}