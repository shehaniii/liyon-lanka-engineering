"use client";

import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

const formElement = event.currentTarget;
const form = new FormData(formElement);
    const response = await fetch(`${API_URL}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    setMessage(response.ok ? "Thank you. Your message has been sent." : "Could not send your message. Please try again.");
    if (response.ok) formElement.reset();
  }
  return <main><section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-24 px-6 text-center">
    
    <div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-5xl font-bold">Contact Us</h1><p className="mt-6 text-xl">We&apos;d love to hear from you.</p></div></section><section className="max-w-7xl mx-auto py-20 px-6"><div className="grid lg:grid-cols-2 gap-16"><div><h2 className="text-4xl font-bold text-blue-900">Get In Touch</h2><p className="mt-6 text-gray-600 leading-8">Contact our engineering team for project inquiries, quotations, partnerships, or career opportunities.</p><div className="mt-10 text-gray-600 leading-8"><p><strong>Phone:</strong> +94 77 123 4567</p><p><strong>Email:</strong> info@liyonlankaengineering.com</p></div></div><div className="bg-white rounded-xl shadow-xl p-8"><h2 className="text-3xl font-bold text-blue-900 mb-8">Send a Message</h2><form onSubmit={submit} className="space-y-6"><input name="name" required placeholder="Full Name" className="w-full border rounded-lg p-4"/><input name="email" required type="email" placeholder="Email Address" className="w-full border rounded-lg p-4"/><input name="phone" placeholder="Phone Number" className="w-full border rounded-lg p-4"/><input name="subject" placeholder="Subject" className="w-full border rounded-lg p-4"/><textarea name="message" required rows={6} placeholder="Your Message" className="w-full border rounded-lg p-4"/><button className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition w-full">Send Message</button>{message ? <p className="text-center text-blue-900">{message}</p> : null}</form></div></div></section></main>;
}
