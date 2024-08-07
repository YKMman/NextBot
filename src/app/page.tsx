/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInitData, useLaunchParams, type User } from '@telegram-apps/sdk-react';
import { Placeholder } from '@telegram-apps/telegram-ui';

import { type DisplayDataRow } from '@/components/DisplayData/DisplayData';
import { useAppDispatch } from '@/redux/hooks';
import styles from './page.module.scss'
import Navbar from '@/components/Navbar/Navbar';
import avatar from '../../public/avatar.jpg'
import gameStart from '../../public/gameStart.jpg'
import Image from 'next/image';
import { setUserTelegramData } from '@/redux/telegramUserSlice/telegramUserSlice';

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
    { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
    { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
  ];
}

export default function Home() {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();

  const [userData, setUserData] = useState<{}>({})

  const dispatch = useAppDispatch();

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: canSendAfterDate?.toISOString() },
      { title: 'can_send_after (raw)', value: canSendAfter },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

   // ! регистрация
  useEffect(() => {
    const dataJSON = {
      init_data_rows: initDataRows,
      user_rows: userRows,
    }
      fetch('/api/registration', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataJSON)
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        dispatch(setUserTelegramData(data));
      })
      .catch((error) => console.error(error))
  }, [])

  if (!initDataRows) {
    return (
      <Placeholder
        header="Oops"
        description="Application was launched with missing init data"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    );
  }



  return (
    <div className={styles.page}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Image
            src={avatar}
            alt='avatar'
          />
        </div>
        <div className={styles.username}>
          {/* @ts-ignore */}
          {userData.telegram_name && userData.telegram_name}
        </div>
        <div className={styles.ttc}>
          {/* @ts-ignore */}
          {userData.ttc_coin && <span>{userData.ttc_coin}</span>}
        </div>
      </div>
      <div className={styles.game}>
          <Image
            src={gameStart}
            alt='heh'
          />
          <div>
            <h4>Drop Game</h4>
            <button>Soon</button>
          </div>
      </div>
      <button className={styles.farming}>
          Start Farming (soon)
      </button>
      <Navbar/>
    </div>
  );
};
