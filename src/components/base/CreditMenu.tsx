import { addPaymentMethod } from "@/api/payment";
import { Loader2, WalletIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";
import { getUserData } from "@/helper/getUserData";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { togglePaymentModal } from "@/store/chatSlice";

export const CreditMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
   const dispatch = useDispatch<AppDispatch>();
    const { payment} = useSelector((state: RootState) => state.chat);


  // Example values (could come from props or API)
  const totalSpend = 1.25;

  const [loading, setLoading] = useState(false);

  const userData=getUserData()

  const addPayment = async () => {
    


    try {
      setLoading(true)
      await addPaymentMethod({userId:userData?._id,email:userData?.email})
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }

  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Total Credit : <span className="font-semibold">{totalSpend}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
          {/* Total Spend */}
          <div className="p-4 border-b">
            <p className="text-sm font-medium text-gray-600">Total credit</p>

            <div className="flex items-center justify-between mt-2">
              {/* Circle */}
              

              {/* Spend text */}
              <div className="ml-1">
                <p className="text-xl font-semibold text-gray-800">
                  {totalSpend.toFixed(2)}
                </p>

              </div>
            </div>

          </div>

          {/* Prepaid Credits */}
          <div className="p-4">
           
            
            <button onClick={()=>dispatch(togglePaymentModal())} className="mt-2 mr-3 font-bold text-sm text-blue-600 hover:underline">
              Buy Credits
            </button>
            <Button disabled={loading} onClick={addPayment} className="flex cursor-pointer   gap-2 mt-5 bg-gray-800  py-2 rounded-sm text-white  p-4 text-sm  ">

              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Add Payment method
                </>
              ) : (
                <>
                  <WalletIcon size={18} /> Add Payment method
                </>

              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


