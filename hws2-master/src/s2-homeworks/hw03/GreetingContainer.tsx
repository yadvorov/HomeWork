import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'
import { totalmem } from 'os'

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string)=> void // need to fix any
}

export const pureAddUser = (name: string, 
    setError: React.Dispatch<React.SetStateAction<string>>, 
    setName: React.Dispatch<React.SetStateAction<string>>, 
    addUserCallback: (name: string) => void) => {
        if (name.trim() === "") {
            setError("Ошибка! Введите имя!")
        } else {
            addUserCallback(name)
            setName("")
        }
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: string, 
            setError: React.Dispatch<React.SetStateAction<string>>) => {
                if (name.trim() === "") {
                    setError("Ошибка! Введите имя!")
                } // если имя пустое - показать ошибку
}

export const pureOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, 
    addUser: ()=> void) => { 
        if (e.key === "Enter") {
            addUser()

        }// если нажата кнопка Enter - добавить
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    const lastUserName = totalUsers> 0 ? users[users.length-1].name : ""// need to fix
   

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
