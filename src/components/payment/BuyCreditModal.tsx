import React, { useMemo, useState } from "react";

import { Loader2, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseModal } from "../base/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { togglePaymentModal } from "@/store/chatSlice";
import { buyCredit } from "@/api/payment";
import { getUserData } from "@/helper/getUserData";
import { showError, showSuccess } from "@/util/toast-notification";
import { fetchUserCreditAndPayment } from "@/store/creditMenuSlice";


export const BuyCreditModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payment } = useSelector((state: RootState) => state.chat);
  const [loading, setLoading] = useState(false);


  const onSubmit = async (amount: number) => {
    try {
      const userData = getUserData();
      setLoading(true)
      const res = await buyCredit({
        userId: userData?._id as string,
        amount: amount,
        email: userData?.email,
      });
      showSuccess(res?.message);
      dispatch(togglePaymentModal());
      dispatch(fetchUserCreditAndPayment(userData?._id))


      setLoading(false)

    } catch (err) {
      setLoading(false)
      console.error(err);
      showError("❌ Failed to purchase credit.");
    }
  };

  return (
    <BaseModal
      open={payment.modal}
      onOpenChange={() => dispatch(togglePaymentModal())}
      title="Buy Credits"
      width={900}
      height={700}


    >
      <form
        id="buy-credit-form"

        className="space-y-8 mt-4 p-4"
      >


        <PricingPlan onSubmit={onSubmit} loading={loading} />

      </form>
    </BaseModal>
  );
};


const perks = {
  free: [
    "Up to 5 documents per notebook",
    "Max 10 pages per upload",
    "Basic chat with AI",
    "Community support",
  ],
  starter: [
    "Up to 20 documents per notebook",
    "Max 50 pages per upload",
    "Smarter summarization & citations",
    "Priority chat speed",
  ],
  creator: [
    "Unlimited documents",
    "Upload long PDFs (300+ pages)",
    "Cross-notebook reasoning",
    "Advanced knowledge graphs",
    "Team collaboration access",
    "Export to Notion / Google Docs",
  ],
};

const PricingPlan = ({ onSubmit, loading }: { onSubmit: (amount: number) => void, loading: boolean }) => {
  return (
    <section className="w-full py-1">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-500 mt-2">
          Unlock more AI-powered research and note capabilities.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Free Tier */}
        <div className="rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition-all flex flex-col">
          <div className="flex flex-col mb-4">
            <h3 className="font-semibold text-gray-700">Free</h3>
            <p className="text-3xl font-bold mt-1">$0</p>
            <p className="text-sm text-gray-500">Forever free</p>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            For individuals exploring AI notebooks.
          </p>

          <ul className="text-sm space-y-2 mb-6">
            {perks.free.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-[2px]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Button disabled className="mt-auto opacity-70">
            Current Plan
          </Button>
        </div>

        {/* Starter Tier */}
        <div className="rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition-all flex flex-col">
          <div className="flex flex-col mb-4">
            <h3 className="font-semibold text-gray-700">Starter</h3>
            <p className="text-3xl font-bold mt-1">$5</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            For hobbyists organizing research or projects.
          </p>

          <ul className="text-sm space-y-2 mb-6">
            {perks.starter.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-[2px]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Button onClick={() => onSubmit(5)} disabled={loading} variant="outline" className="mt-auto">
            Subscribe
          </Button>
        </div>

        {/* Creator Tier (Most Popular) */}
        <div className="relative rounded-2xl border-2 border-indigo-500 p-6 bg-gradient-to-b from-white to-indigo-50 shadow-md flex flex-col">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={12} /> Most Popular
          </div>

          <div className="flex flex-col mb-4">
            <h3 className="font-semibold text-gray-700">Creator</h3>
            <div className="flex items-end gap-2">
              <span className="text-gray-400 line-through text-sm">$22</span>
              <p className="text-3xl font-bold text-indigo-600">$20</p>
              <span className="text-xs text-green-600 font-semibold">
                50 credits bonus
              </span>
            </div>
            {/* <p className="text-sm text-gray-500">per month</p> */}
          </div>

          <p className="text-sm text-gray-500 mb-4">
            For creators making premium knowledge content.
          </p>

          <ul className="text-sm space-y-2 mb-6">
            {perks.creator.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-[2px]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Button disabled={loading} onClick={() => onSubmit(20)} className="bg-indigo-600 hover:bg-indigo-700 text-white mt-auto">
            Subscribe
          </Button>
        </div>
      </div>
      <div align="center" className="mb-2 pt-2">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing payment...
          </>
        ) : (
          ""
        )}
      </div>

      {/* Credit Info */}
      <CreditInfoCard />

    </section>
  );
};




const CreditInfoCard = () => (
  <div className="max-w-3xl mx-auto mt-10">
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm p-6 text-center">
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold">
          💳
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Credit Conversion</h3>
      </div>

      <p className="text-gray-600 text-sm">
        <span className="text-indigo-600 font-semibold">1 USD = 10 Credits</span>
      </p>

      <p className="text-gray-500 text-sm mt-2">
        Credits are used for AI reasoning, doc uploads, and advanced features.
        Upgrade to unlock higher credit limits, longer PDF uploads, and
        multi-document analysis.
      </p>
    </div>
  </div>
);


export default BuyCreditModal;
