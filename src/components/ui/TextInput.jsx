import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import React from 'react'

// interface MyTextInputProps {
//     placeholder?: string
//     label?: string
//     onInput?: (value: string) => null
//     value?: string;
//     id?: string
// }

// interface MyInputContainerProps {
//     children: React.ReactNode
// }

export function MyInputContainer({ children = <></> }) {
    return <div className="grid gap-4 py-4">{children}</div>
}

export default function MyTextInput({ placeholder = "Enter Value", label = "Enter Value", onInput = () => { }, value = "", id = "" }) {

    function handleInput(event) {

        const value = event.currentTarget.value

        console.log(value);
        onInput(value)


    }

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
                {label}
            </Label>
            <Input
                id={id}
                className="col-span-3"
                value={value} onInput={(handleInput)}
                placeholder={placeholder}
            />
        </div>
    )

    return (
        <div className="mb-5 w-96">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input value={value} onInput={(handleInput)} type="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}
