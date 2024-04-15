import React from 'react'

interface TextInputProps {
    placeholder?: string
    title?: string
    onInput?: (value: string) => null
    value?: string
}

export default function TextInput<TextInputProps>({ placeholder = "Enter Value", title = "Enter Value", onInput = (value: string) => { }, value = "" }) {

    function handleInput(event: React.FormEvent<HTMLInputElement>) {

        const value = event.currentTarget.value

        console.log(value);
        onInput(value)


    }

    return (
        <div className="mb-5 w-96">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input value={value} onInput={(handleInput)} type="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}
