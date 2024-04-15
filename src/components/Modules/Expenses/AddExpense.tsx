"use client";

import Loader from "@/components/ui/Loader/page";
import CustomModal from "@/components/ui/CustomModal";
import DropDown from "@/components/ui/DropDown";
import TextInput from "@/components/ui/TextInput";
import ApiCaller from "@/app/utils/ApiCaller/ApiCaller";
import Constants from "@/app/utils/Constants";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SelectedExpenseCategoryProps {

    "expenseTemplateCategoryId": number,
    "expenseName": string,
    "expenseType": string,
    "expenseCategoryFields": any[],
    "templateCategoriesFields": any[],
    "canEmpInsertTotalExpenseAmount": boolean,
    "empJobInfoLocation": any

}
const initialSelectedExpenseCategoryProps: SelectedExpenseCategoryProps = {
    expenseTemplateCategoryId: 0,
    expenseName: "",
    expenseType: "",
    expenseCategoryFields: [],
    templateCategoriesFields: [],
    canEmpInsertTotalExpenseAmount: false,
    empJobInfoLocation: null
};


export default function AddExpense() {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<SelectedExpenseCategoryProps>(initialSelectedExpenseCategoryProps);
    const [expenseCategories, setExpenseCategories] = useState<any>([]);

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {

        initiateAPIs()

        // console.log("fff");


        return () => {

        }
    }, [])

    async function initiateAPIs() {
        setIsLoading(true)
        await getAddExpenseData()
        await advanceExpenseData()
        setIsLoading(false)

    }

    async function getAddExpenseData() {



        // let url = Constants.BASE_URL + Constants.EXPENSE_RECORD + "expensecategories/" + Constants.authDict.employeeCode

        let endPoint = Constants.EXPENSE_RECORD + "expensecategories/" + Constants.authDict.employeeCode

        let responseJson = await ApiCaller.getData(endPoint)
        console.log("getAddExpenseData", responseJson)



        setExpenseCategories(responseJson)


    }


    async function advanceExpenseData() {
        console.log('Immediately invoked function execution');
        let endPoint = 'advance/application/get/advance/expense/data?empCode=' + Constants.authDict.employeeCode

        let responseJson2 = await ApiCaller.getData(endPoint)

        console.log("advanceExpenseData", responseJson2);
        // setshowadvanceAmount(responseJson2.shouldAdvanceAmountFlowToExpense)

    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <main className="flex min-h-screen flex-col items-center  p-15">
                <TextInput title="Expense Title" placeholder="Enter Expense" />
                <TextInput title="Advance" placeholder="Enter Advance" />
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Add new product
                </button>
                <DropDown itemArr={expenseCategories} value={(item) => item?.expenseName} keyExtractor={(item, index) => String(index)} onSelect={(item) => setSelectedExpenseCategory(item)} selectedValue={selectedExpenseCategory.expenseName} />

               



            </main>



        </>
    );
}
