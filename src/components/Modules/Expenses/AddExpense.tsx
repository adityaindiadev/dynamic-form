"use client";

import Loader from "@/components/ui/Loader/page";
import CustomModal from "@/components/ui/CustomModal";
import DropDown from "@/components/ui/DropDown";
import TextInput from "@/components/ui/TextInput";
import ApiCaller from "@/app/utils/ApiCaller/ApiCaller";
import Constants from "@/app/utils/Constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ComboboxDemo } from "@/components/ui/ComboBox";


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

    const [isShowAdvanceAmount, setIsShowAdvanceAmount] = useState(false)


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
        setIsShowAdvanceAmount(responseJson2?.shouldAdvanceAmountFlowToExpense)
        // setshowadvanceAmount(responseJson2.shouldAdvanceAmountFlowToExpense)

    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <main className="flex min-h-screen flex-col items-center  p-15">
                <TextInput title="Expense Title" placeholder="Enter Expense" />
               {isShowAdvanceAmount && <TextInput title="Advance" placeholder="Enter Advance" /> }
                <Button>Click me</Button>

                <DropDown itemArr={expenseCategories} value={(item) => item?.expenseName} keyExtractor={(item, index) => String(index)} onSelect={(item) => setSelectedExpenseCategory(item)} selectedValue={selectedExpenseCategory.expenseName} />

            <ComboboxDemo/>
               



            </main>



        </>
    );
}
