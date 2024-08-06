import { NextRequest, NextResponse } from "next/server";
import conn from "../../../config/db/db";


// Функция для проверки регистрации пользователя
const registrationChecked = async (telegram_id: string, telegram_username: string) => {
    const res = await conn.query("SELECT * FROM users WHERE telegram_id = $1", [telegram_id]);

    // * если зарегистрирован, возвращаем true
    if (res.rowCount && res.rowCount > 0) {
        return res.rows;
    } else {
        // # зарегистрировать
        await conn.query("INSERT INTO users (telegram_name, telegram_id) VALUES ($1, $2)", [telegram_username, telegram_id]);
        return []
    }
}

// Обработчик POST-запроса
export async function POST(req:NextRequest, res:NextResponse) {
        const { init_data_rows, user_rows } = await req.json()

        const telegram_id = user_rows.find((el:any) => el.title == 'id').value
        const telegram_username = user_rows.find((el:any) => el.title == 'username').value
        const start_param = init_data_rows.find((el:any) => el.title == 'start_param').value

        try {
            const isRegistered = await registrationChecked(telegram_id, telegram_username);

            if (isRegistered.length > 0) {
                return NextResponse.json(isRegistered[0])
            }



            if (start_param) {
                if (start_param == 'debug') {
                    return NextResponse.json({ message: 'Debug mode' });
                }
                const tgStartParamName = await conn.query("SELECT * FROM users WHERE telegram_id = $1", [start_param]);

                if (tgStartParamName.rowCount && tgStartParamName.rowCount > 0) {
                    await conn.query("INSERT INTO refs (telegram_id_inviter, telegram_id_invited, telegram_name) VALUES ($1, $2, $3)", [start_param, telegram_id, telegram_username])
                    return NextResponse.json('зарегистрировали пользователя по этой рефералке')
                }

                return NextResponse.json('пользователя с таким параметром не существует.')
            } 
            
            return NextResponse.json(isRegistered)
        } 
        catch (error: any) {
            console.error(error)
            return NextResponse.json({ error: error.message });
        }
}