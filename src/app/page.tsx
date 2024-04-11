"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./componants/Loader/page";
import Constants from "./utils/Constants";




export default function Home() {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    initiateAPIs()

    return () => {

    }
  }, [])

  async function initiateAPIs() {
    setIsLoading(true)
    await getAddExpenseData()
    setIsLoading(false)

  }

  async function getAddExpenseData() {



    var url = Constants.BASE_URL + Constants.EXPENSE_RECORD + "expensecategories/" + Constants.authDict.employeeCode

    setIsLoading(true)

    // console.warn(url)

    // console.warn("authDict", authDict);

    console.log("Constants.getHeader()",Constants.getHeader());
    

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constants.getHeader()
      }
      )

      console.log("yoyoyoyouyoyohy", response)

      let code = await response.status
      //setIsLoading(false)

      if (code == 200) {

        let responseJson = await response.json();
        console.log("Response Json ", responseJson)
        //setIsLoading(false)
        //setexpensecategories([])

        let expensecategories: any[] = []

        responseJson.forEach((item: any, index: number) => {

          expensecategories.push(item)
          //console.log(item.expenseName);
        })

        console.log("ExpenseCategoriesDropDownData ", expensecategories);

        (async function () {
          console.log('Immediately invoked function execution');
          var url2 = Constants.BASE_URL + 'advance/application/get/advance/expense/data?empCode=' + Constants.authDict.employeeCode

          console.log(url2);

          try {

            let response2 = await fetch(url2, {
              method: 'GET',
              headers: Constants.getHeader()
            }
            )



            console.log("yoyoyoyouyoyohy", response2)

            let code2 = await response2.status

            if (code2 == 200) {

              let responseJson2 = await response2.json();
              console.log("Response Json2 ", responseJson2);

              // setshowadvanceAmount(responseJson2.shouldAdvanceAmountFlowToExpense)

              setIsLoading(false)

            } else {
              setIsLoading(false)
            }

          } catch (error) {
            console.error(error);
          }

        })
        // ();





      } else {

        let msg = await response.statusText
        // this.refs.toast.show('Something went wrong!');
        // Alert.alert('Something Went Wrong')

        // Alert.alert('Something went wrong!')
        // setapirun(!apirun)
      }
    } catch (error) {
      console.error(error);
    }


  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

      </main>



    </>
  );
}
