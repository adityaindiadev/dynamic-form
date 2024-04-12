"use client";

import Loader from "@/app/componants/Loader/page";
import DropDown from "@/app/componants/ui-componants/DropDown";
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
            {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
            <DropDown itemArr={expenseCategories} value={(item)=>item?.expenseName} keyExtractor={(item)=>item?.expenseTemplateCategoryId} onSelect={(item)=>setSelectedExpenseCategory(item)} selectedValue ={selectedExpenseCategory.expenseName}/>
            {/* </main> */}



        </>
    );
}
