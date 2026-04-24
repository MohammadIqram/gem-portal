"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, MoreVertical, Phone, Video, Info, Tag } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge"; // Assuming shadcn badge is installed

function Inbox({ selectedChat, setSelectedChat }) {

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 border-r flex flex-col bg-muted/5 shadow-sm"
        >
            <div className="p-4 space-y-4 bg-background/50 backdrop-blur-md sticky top-0 z-10 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight">Messages</h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">12 New</Badge>
                </div>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search chats..." className="pl-8 bg-muted/50 focus-visible:ring-primary" />
                </div>
            </div>

            {/* Independent Scrollable Area */}
            <ScrollArea className="flex-1 overflow-y-auto h-[calc(100vh-120px)]">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedChat(i)}
                        className={`group flex items-start gap-3 p-4 cursor-pointer border-b border-transparent transition-all hover:bg-muted/50 ${selectedChat === i ? "bg-muted border-l-4 border-l-primary" : ""
                            }`}
                    >
                        <Avatar className="mt-1">
                            <AvatarImage src={`https://avatar.iran.liara.run/public/${i + 10}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <p className="text-sm font-semibold truncate">User {i}</p>
                                <span className="text-[10px] text-muted-foreground font-medium">12:45 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate mb-2">
                                My package is missing...
                            </p>
                            <div className="flex gap-1 flex-wrap">
                                <Badge className="text-[9px] px-1.5 py-0 bg-blue-500/10 text-blue-600 border-none">Order</Badge>
                                <Badge className="text-[9px] px-1.5 py-0 bg-orange-500/10 text-orange-600 border-none">Urgent</Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </motion.aside>
    )
}

export default function ChatDashboard() {
    const [selectedChat, setSelectedChat] = useState(1);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground border-t mt-22">

            {/* LEFT SECTION: People List (Scrollable) */}
            <Inbox selectedChat={selectedChat} setSelectedChat={setSelectedChat} />

            {/* MIDDLE SECTION: Chat Box (Scrollable) */}
            <main className="flex-1 flex flex-col min-w-0 bg-background relative">
                <header className="p-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://avatar.iran.liara.run/public/${selectedChat + 10}`} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">User {selectedChat}</p>
                                <Badge className="h-4 text-[9px] bg-green-500/10 text-green-600 border-none">Active</Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Replied within 2 mins</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="text-muted-foreground"><Phone className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground"><Video className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                </header>

                {/* Independent Scrollable Chat Content */}
                <ScrollArea className="flex-1 p-6 h-[calc(100vh-140px)]">
                    <div className="space-y-6 max-w-3xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {/* Incoming Message */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 max-w-[85%]">
                                <div className="bg-muted/80 text-foreground p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed shadow-sm">
                                    Hello! I'm inquiring about order <span className="font-mono text-primary font-bold">#ORD-8829</span>. It’s been three days since the estimated delivery.
                                </div>
                                <span className="text-[10px] text-muted-foreground px-1 font-medium italic">10:02 AM • Read</span>
                            </motion.div>

                            {/* Outgoing Message */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 max-w-[85%] ml-auto items-end">
                                <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed shadow-md shadow-primary/20">
                                    Hi there! I apologize for the delay. I’m pulling up your tracking details right now. Just a moment.
                                </div>
                                <span className="text-[10px] text-muted-foreground px-1 font-medium">10:05 AM • Delivered</span>
                            </motion.div>

                            {/* Status Indicator inside Chat */}
                            <div className="flex justify-center my-4">
                                <span className="text-[10px] bg-muted px-3 py-1 rounded-full text-muted-foreground font-semibold uppercase tracking-wider">Agent joined the chat</span>
                            </div>
                        </AnimatePresence>
                    </div>
                </ScrollArea>

                {/* Input Footer */}
                <footer className="p-4 bg-background border-t">
                    <form className="flex gap-2 max-w-4xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Write a message..." className="flex-1 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary" />
                        <Button type="submit" size="icon" className="h-11 w-11 shadow-lg shadow-primary/20">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </footer>
            </main>

            {/* RIGHT SECTION: Meta Data */}
            <motion.aside
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-72 border-l bg-muted/5 p-6 flex flex-col gap-6"
            >
                <div className="text-center space-y-3">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-xl">
                        <AvatarImage src={`https://avatar.iran.liara.run/public/${selectedChat + 10}`} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg leading-none">User {selectedChat}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Tier: <span className="text-amber-600 font-bold">Gold Member</span></p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <Tag className="h-3 w-3" /> Metadata
                    </div>

                    <div className="grid gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Order ID</span>
                            <span className="font-mono text-xs font-bold bg-muted px-2 py-0.5 rounded">#ORD-8829</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Rating</span>
                            <div className="flex items-center gap-1 font-bold text-yellow-600">
                                ★ 4.8 <span className="text-[10px] text-muted-foreground font-normal">(24 reviews)</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium truncate max-w-[140px]">user{selectedChat}@domain.com</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Internal Notes</p>
                    <div className="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/20">
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-yellow-700">
                            <Info className="h-3 w-3" /> Note:
                        </div>
                        <p className="text-[12px] text-yellow-800/80 leading-relaxed italic">
                            "Client prefers evening deliveries. Always verify the signature upon arrival."
                        </p>
                    </div>
                </div>
            </motion.aside>
        </div>
    );
}