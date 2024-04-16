"use client";

import Loader from "@/components/ui/Loader/page";
import CustomModal from "@/components/ui/CustomModal";
import DropDown from "@/components/ui/DropDown";
import MyTextInput, { MyInputContainer } from "@/components/ui/TextInput";
import ApiCaller from "@/app/utils/ApiCaller/ApiCaller";
import Constants from "@/app/utils/Constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ComboboxDemo } from "@/components/ui/ComboBox";
import { DialogDemo } from "@/components/ui/DialogDemo";
import MyModal from "@/components/ui/MyModal";


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
    const [isOpenModal, setIsOpenModal] = useState(false);
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
                <MyInputContainer>
                    <>
                        <MyTextInput label="Expense Title" placeholder="Enter Expense" />
                        {isShowAdvanceAmount && <MyTextInput label="Advance" placeholder="Enter Advance" />}
                        

                    </>
                </MyInputContainer>
                <Button onClick={() => setIsOpenModal(true)} >Add Expense</Button>

                <DropDown itemArr={expenseCategories} value={(item) => item?.expenseName} keyExtractor={(item, index) => String(index)} onSelect={(item) => setSelectedExpenseCategory(item)} selectedValue={selectedExpenseCategory.expenseName} />

                <MyModal open={isOpenModal} setOpen={setIsOpenModal}>
                    <MyTextInput label="Expense Title" placeholder="Enter Expense" />
                </MyModal>




            </main>



        </>
    );
}
