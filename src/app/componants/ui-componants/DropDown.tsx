"use client";

import React, { ChangeEvent } from 'react';

interface DropDownProps {
    itemArr?: any[];
    value?: (item: any) => string;
    selectedValue?: string;
    keyExtractor?: (item: any, index: number) => string;
    onSelect?: (selectedValue: any, selectedIndex: number) => any;
    placeholder?: string
    title?: string
}

const DropDown: React.FC<DropDownProps> = ({ placeholder = "Select Option",
    title = "Select an option",
    itemArr = [
        "Choose a country",
        "United States",
        "Canada",
        "France",
        "Germany"
    ],
    value = (item) => item,
    selectedValue = "",
    keyExtractor = (item, index) => String(item),
    onSelect = () => { }
}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // const selectedValue = event.currentTarget.value;
        if (event.currentTarget.value == 'null')
            return

        const selectedIndex = event.currentTarget.selectedIndex - 1;
        const selectedValue = itemArr[selectedIndex];
        console.log(selectedValue, selectedIndex);
        onSelect(selectedValue, selectedIndex);
    };

    return (
        <div className="max-w-sm mx-auto w-96">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={selectedValue}
            >
                <option className='text-opacity-0' value={"null"}>
                    {placeholder}
                </option>
                {itemArr.map((item, index) => (
                    <option key={keyExtractor(item, index)} value={value(item)}>
                        {value(item)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;