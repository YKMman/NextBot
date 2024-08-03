import { NextRequest, NextResponse } from "next/server";

import conn from "@/config/db/db";



export async function POST(
    req:NextRequest, 
    res:NextResponse
    ) {
        const { telegram_id } = await req.json()

        try {
            const queryCount = await conn.query("SELECT * FROM refs WHERE telegram_id_inviter = $1", [telegram_id])
            const queryTg = await conn.query("SELECT * FROM quests")
            const userDB = await conn.query("SELECT * FROM users WHERE telegram_id = $1", [telegram_id])
    
            const data = {  
                user: userDB.rows,
                count: queryCount.rows,
                completed: process.env.CLIENT_FRIENDS_QUEST_COUNT_LIMIT,
                public_link: queryTg.rows,
                award_invited_friends: process.env.AWARD_FRIENDS_INVITE
            }
            return NextResponse.json(data)
        } catch (error) {
            console.error(error)
            return NextResponse.json(error)
        }
}