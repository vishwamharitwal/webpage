"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, Phone, Mail, X, Calendar, PhoneCall, Bot } from "lucide-react";

export function LeadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("callback"); // 'callback', 'scheduler', 'ai'
  
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{role: "bot" | "user", text: string}[]>([
    { role: "bot", text: "Hi! I'm MarketiX AI. How can I help you scale your business today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simple If-Else Bot Logic
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let botResponse = "I'm still learning! For the most accurate advice, I recommend switching to the 'Callback' tab so one of our human growth experts can assist you.";
    const lowerInput = userMessage.toLowerCase();

    if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("fee")) {
      botResponse = "Our growth systems are custom-engineered based on your specific scale and goals. Please request a callback so we can give you an accurate assessment.";
    } else if (lowerInput.includes("service") || lowerInput.includes("do you do") || lowerInput.includes("offer")) {
      botResponse = "We offer a complete Growth Suite: Brand Architecture, UI/UX Engineering, Performance Marketing, and AI Automation. Which area are you looking to improve?";
    } else if (lowerInput.includes("contact") || lowerInput.includes("call") || lowerInput.includes("talk")) {
      botResponse = "The fastest way to reach us is by clicking the 'Callback' tab above, or using the direct WhatsApp/Call buttons at the bottom of this window!";
    } else if (lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hey")) {
      botResponse = "Hello there! Are you looking to scale your business, improve your website, or run better ads?";
    }

    setChatMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // NOTE: We will replace this URL with your Google Apps Script URL later
      const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
      
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        // Mock successful submission for now if URL is not set
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setTimeout(() => { setIsSuccess(false); setFormData({ name: "", email: "", phone: "", website: "" }); }, 3000);
        return;
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); setFormData({ name: "", email: "", phone: "", website: "" }); }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* The Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] sm:w-[400px] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 mb-2 origin-bottom-right"
          >
            {/* Header (Fixed) */}
            <div className="bg-[#111827] p-4 flex justify-between items-start relative overflow-hidden shrink-0">
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-[#FF6B35]" /> Growth Solutions
                </h3>
                <p className="text-secondary/70 text-sm mt-1">Scale your brand using AI & marketing automation</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>
              {/* Decorative background glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF6B35]/20 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
                <button
                  onClick={() => setActiveTab("callback")}
                  className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "callback" ? "text-[#FF6B35] bg-white border-t-2 border-[#FF6B35]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <PhoneCall size={16} /> Callback
                </button>
                <button
                  onClick={() => setActiveTab("scheduler")}
                  className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "scheduler" ? "text-[#FF6B35] bg-white border-t-2 border-[#FF6B35]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Calendar size={16} /> Scheduler
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "ai" ? "text-[#FF6B35] bg-white border-t-2 border-[#FF6B35]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Bot size={16} /> AI Advisor
                </button>
              </div>

              {/* Content Area */}
              <div className="p-4 bg-white">
                {activeTab === "callback" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900">Request a Call Back</h4>
                      <p className="text-sm text-slate-500 mt-1">Our growth specialist will call you back within 15 minutes of submitting.</p>
                    </div>
                    
                    {isSuccess ? (
                      <div className="py-8 text-center bg-green-50 rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                          <Sparkles size={24} />
                        </div>
                        <h4 className="font-bold text-green-700">Request Received!</h4>
                        <p className="text-sm text-green-600 mt-1 px-4">We will call you shortly.</p>
                      </div>
                    ) : (
                      <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-1 block">Your Name</label>
                          <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="Alex Mercer" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-slate-900" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-1 block">Email Address</label>
                          <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="alex@company.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-slate-900" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-1 block">Phone Number</label>
                          <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-slate-900" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-1 block">Website URL (Optional)</label>
                          <input value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} type="url" placeholder="https://yourcompany.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-slate-900" />
                        </div>
                        <button disabled={isSubmitting} type="submit" className="w-full bg-[#FF6B35] hover:bg-[#e65a28] disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2">
                          {isSubmitting ? <span className="animate-pulse">Submitting...</span> : <><PhoneCall size={18} /> Request Callback Now</>}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

              {activeTab === "scheduler" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                  <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                  <h4 className="font-bold text-slate-900">Schedule a Meeting</h4>
                  <p className="text-sm text-slate-500 mt-2 mb-4">Pick a time that works best for you on our calendar.</p>
                  <a href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session." target="_blank" rel="noopener noreferrer" className="inline-block bg-[#111827] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                    Open Scheduler
                  </a>
                </motion.div>
              )}

              {activeTab === "ai" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[350px]">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          msg.role === "user" 
                            ? "bg-[#FF6B35] text-white rounded-br-sm" 
                            : "bg-slate-100 text-slate-800 rounded-bl-sm"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl rounded-bl-sm text-sm flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="mt-3 pt-3 border-t border-slate-100 shrink-0">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about our services..." 
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
                      />
                      <button 
                        type="submit" 
                        disabled={!chatInput.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF6B35] text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
                      >
                        <Sparkles size={14} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Direct Contact */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Or reach us directly</p>
              <div className="flex gap-2">
                <a href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session." target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center py-2 px-1 border border-green-200 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors group">
                  <MessageCircle size={18} className="mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">WhatsApp</span>
                </a>
                <a href="tel:+917340021807" className="flex-1 flex flex-col items-center justify-center py-2 px-1 border border-blue-200 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors group">
                  <Phone size={18} className="mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Call Now</span>
                </a>
                <a href="mailto:hello@marketixmedia.com" className="flex-1 flex flex-col items-center justify-center py-2 px-1 border border-orange-200 bg-orange-50 rounded-lg text-orange-600 hover:bg-orange-100 transition-colors group">
                  <Mail size={18} className="mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Email Us</span>
                </a>
              </div>
            </div>
            
            </div> {/* End Scrollable Content */}

            {/* Branding (Fixed Bottom) */}
            <div className="bg-slate-100 py-2 px-4 flex items-center justify-between shrink-0">
              <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                <Sparkles size={10} className="text-[#FF6B35]" /> POWERED BY MARKETIX AI
              </p>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons */}
      <div className="flex flex-col gap-3">
        {/* WhatsApp Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.a
              href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session."
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-12 h-12 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-40 mx-auto"
            >
              <MessageCircle size={24} />
            </motion.a>
          )}
        </AnimatePresence>

        {/* Primary AI Button */}
        <div className="relative group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {/* Animated Glow Ring */}
          <div className="absolute inset-0 bg-[#FF6B35] rounded-full blur-md opacity-40 group-hover:opacity-70 animate-pulse transition-opacity"></div>
          {/* Outer Ring */}
          <div className="absolute -inset-2 rounded-full border border-[#FF6B35]/30 animate-[spin_4s_linear_infinite]"></div>
          
          <button className="relative w-16 h-16 bg-gradient-to-tr from-[#FF6B35] to-[#ff8c61] text-white rounded-full shadow-2xl flex items-center justify-center z-10 transition-transform group-hover:scale-105">
            {isOpen ? <X size={28} /> : <Sparkles size={28} className="animate-pulse" />}
          </button>
        </div>
      </div>
    </div>
  );
}
