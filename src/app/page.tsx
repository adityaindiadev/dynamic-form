"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader/page";
import Constants from "./utils/Constants";
import AddExpense from "../components/Modules/Expenses/AddExpense";




export default function Home() {



  return (
    <>
      <AddExpense />
    </>
  );
}
