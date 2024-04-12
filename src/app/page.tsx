"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./componants/Loader/page";
import Constants from "./utils/Constants";
import AddExpense from "./pages/Expenses/AddExpense";




export default function Home() {



  return (
    <>
      <AddExpense />
    </>
  );
}
