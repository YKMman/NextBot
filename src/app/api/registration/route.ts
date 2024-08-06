import { NextRequest, NextResponse } from "next/server";
import conn from "../../../config/db/db";


// Функция для проверки регистрации пользователя
const registrationChecked = async (telegram_id: string) => {
    const res = await conn.query("SELECT * FROM users WHERE telegram_id = $1", [telegram_id]);
    // * если зарегистрирован, возвращаем true
    if (res.rowCount !== null && res.rowCount > 0) {
        return res.rows;
    } else {
        return []
    }
}

// Обработчик POST-запроса
export async function POST(req:NextRequest, res:NextResponse) {
        const { init_data_rows, user_rows } = await req.json()

        const telegram_id = user_rows.find((el:any) => el.title == 'id').value
        const telegram_username = user_rows.find((el:any) => el.title == 'username').value
        const start_param = init_data_rows.find((el:any) => el.title == 'start_param').value

        console.log(start_param)
    
        try {
            const isRegistered = await registrationChecked(telegram_id);
    
            if (isRegistered.length > 0) {
                return NextResponse.json(isRegistered[0])
            }
    
            if (start_param) {
                // # зарегистрировать
                await conn.query("INSERT INTO users (telegram_name, telegram_id) VALUES ($1, $2)", [telegram_username, telegram_id]);

                if (start_param == 'debug') {
                    return NextResponse.json({ message: 'Debug mode' });
                }

                // #  проверяем, переходил ли этот человек уже по этой реф. ссылке
                const check = await conn.query("SELECT * FROM refs WHERE telegram_id_inviter = $1 AND telegram_id_invited = $2", [start_param, telegram_id])

                if (check.rowCount && check.rowCount > 0) {
                    return NextResponse.json('зарегистрирован и уже заходил по реф. ссылке')
                } else {
                    const tgStartParamName = await conn.query("SELECT * FROM users WHERE telegram_id = $1", [start_param]);
                    const tgName = tgStartParamName.rows[0].telegram_name

                    if (tgStartParamName.rowCount && tgStartParamName.rowCount > 0) {
                        await conn.query("INSERT INTO refs (telegram_id_inviter, telegram_id_invited, telegram_name) VALUES ($1, $2, $3)", [start_param, telegram_id, tgName])
                        return NextResponse.json('зарегистрировали пользователя по этой рефералке')
                    }
                    return NextResponse.json('реф. ссылка неправильная')
                }
            }
            
            return NextResponse.json(isRegistered)
        } 
        catch (error) {
            console.error(error)
            return NextResponse.json({ error: error.message });
        }
}