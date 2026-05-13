
"use client";
import { useState } from "react";
import Header from "@/components/Header";

export default function SubmitPage() {
  const [form, setForm] = useState({ name:"", url:"", category:"", email:"" });
  const [done, setDone] = useState(false);
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Tool</h1>
        <p className="text-gray-500 mb-8">Know an AI tool that should be listed? Let us know!</p>
        {done ? <div className="tool-card p-8 text-center"><div className="text-4xl mb-4">🎉</div><h2 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h2><p className="text-gray-500">We will review your submission.</p></div>
        : <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="tool-card p-8 space-y-5">
            {[{k:"name",l:"Tool Name *"},{k:"url",l:"Website URL *"},{k:"category",l:"Category"},{k:"email",l:"Your Email"}].map(f => (
              <div key={f.k}><label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label>
              <input value={(form as any)[f.k]} onChange={e => setForm({...form, [f.k]: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"/></div>
            ))}
            <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-sm">Submit Tool</button>
          </form>}
      </main>
    </>
  );
}
