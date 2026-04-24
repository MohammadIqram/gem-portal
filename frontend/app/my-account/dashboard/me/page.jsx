"use client";

import { useEffect, useState } from "react";
import {
  CircleHelp,
  CreditCard,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  Star,
  UserRound,
  Zap,
  BadgeCheck,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    key: "profile",
    label: "Profile",
    icon: UserRound,
    activeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    key: "orders",
    label: "Orders",
    icon: ReceiptText,
    activeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    key: "billing",
    label: "Billing & Membership",
    icon: CreditCard,
    activeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    key: "support",
    label: "Help & Support",
    icon: CircleHelp,
    activeClass: "bg-rose-100 text-rose-700 border-rose-200",
  },
];

const orders = [
  {
    id: "RA-10245",
    item: "ATS Resume Optimization",
    date: "February 14, 2026",
    status: "Delivered",
    amount: "$19.00",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "RA-10222",
    item: "Premium Resume Template Pack",
    date: "January 30, 2026",
    status: "Processing",
    amount: "$9.00",
    statusClass: "bg-amber-100 text-amber-700",
  },
  {
    id: "RA-10110",
    item: "Monthly Membership",
    date: "January 01, 2026",
    status: "Delivered",
    amount: "$29.00",
    statusClass: "bg-blue-100 text-blue-700",
  },
];

const memberships = [
  {
    plan: "Pro Monthly",
    state: "Active",
    startedAt: "February 01, 2026",
    renewalAt: "March 01, 2026",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    plan: "Starter Trial",
    state: "Past",
    startedAt: "January 01, 2026",
    renewalAt: "January 31, 2026",
    badgeClass: "bg-slate-100 text-slate-700",
  },
];

const SUPPORT_SUBJECT_OPTIONS = [
  "General Inquiry",
  "Technical Support",
  "Billing & Payments",
  "Account Assistance",
  "Order Status",
  "Returns & Refunds",
  "Feature Request",
  "Feedback & Suggestions",
];

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("profile");

  return (
    <section tone="light" contentClassName="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="my-12">
          <PanelHeader />
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-xl backdrop-blur">
          <div className="grid min-h-[78vh] grid-cols-1 lg:grid-cols-[280px_1fr]">
            <aside className="border-b border-neutral-200 bg-neutral-50/80 p-4 lg:border-b-0 lg:border-r lg:p-6">
              <h1 className="text-xl font-bold text-neutral-800">Account Center</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage profile, orders, billing and support.
              </p>

              <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveMenu(item.key)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition",
                        "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-white",
                        isActive && item.activeClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="p-4 sm:p-6 lg:p-8">{renderPanel(activeMenu)}</section>
          </div>
        </div>
      </main>
    </section>
  );
}

function UserEmailVerificationSection({ user }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleAction = async () => {
    // setLoading(true);
    // // Passing the action to the parent/store logic
    // const success = await onVerifyEmail();
    // setLoading(false);

    // if (success) {
    //   setSent(true);
    //   // Reset "sent" text after 5 seconds
    //   setTimeout(() => setSent(false), 5000);
    // }
  };

  return (
    <div className="w-full">
      {user?.emailVerified ? (
        /* --- VERIFIED STATE --- */
        <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-indigo-100 shadow-sm transition-all hover:shadow-md">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
                <MailCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-md">
                Email Verified
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Communication Active
              </h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Your email <span className="font-semibold text-indigo-600">{user?.email}</span> is verified for secure lead delivery and bidding alerts.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl" />
        </div>
      ) : (
        /* --- UNVERIFIED STATE --- */
        <div className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 border border-slate-200 shadow-sm transition-all hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5">
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-100 rounded-xl blur-md animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm transition-colors group-hover:border-indigo-100">
                  <Mail className="w-6 h-6 text-slate-400 group-hover:text-indigo-500" />
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-200 text-slate-600 px-2 py-1 rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Action Required
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                Verify Your Business Email
              </h4>
              <p className="text-slate-500 text-sm mt-1">
                Ensure you never miss a government tender or direct lead.
              </p>
            </div>

            {/* --- BENEFITS POINTS --- */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                { text: "Get the 'Trust Verified' badge on your public profile", icon: <BadgeCheck className="w-4 h-4" /> },
                { text: "Priority placement in Agent Search results", icon: <TrendingUp className="w-4 h-4" /> },
                { text: "Instant bidding alerts & tender notifications", icon: <Zap className="w-4 h-4" /> },
                { text: "Direct secure communication with departments", icon: <ShieldCheck className="w-4 h-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-600">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleAction}
                disabled={loading || sent}
                className={`flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-70 shadow-sm ${sent
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-900 text-white hover:bg-indigo-600"
                  }`}
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : sent ? <MailCheck className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                {loading ? "Sending..." : sent ? "Link Sent!" : "Send Verification Link"}
              </button>

              {!sent && !loading && (
                <span className="text-[10px] text-slate-400 italic">
                  Takes less than 30 seconds
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelHeader() {
  const { user } = useUserStore();

  const isVerified = user?.emailVerified;
  const profileScore = user?.profileScore || 0;
  const hasAgentCard = user?.hasAgentCard;
  const [loadingEmail, setLoadingEmail] = useState(false);
  const isEmailVerified = user?.emailVerified;

  const router = useRouter();

  const handleVerifyEmail = async () => {
    setLoadingEmail(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Email fetch error:", error);
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">

      {/* Upper Grid: Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* 1. Email Verification - The "Trust" Card */}
        {isVerified ? (
          /* --- VERIFIED SUCCESS BOX --- */
          <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)]">
            <div className="relative z-10 flex flex-col h-full justify-between">

              <div className="flex items-start justify-between">
                <div className="relative">
                  {/* Static soft glow for success */}
                  <div className="absolute inset-0 bg-emerald-100 rounded-xl blur-md opacity-60"></div>

                  <div className="relative p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 backdrop-blur-sm">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-sm shadow-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verified Agent</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">Identity Verified</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Your profile is currently <span className="text-emerald-600 font-semibold italic">Priority Listed</span>. You are visible to all government departments on the GEM marketplace.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs font-bold bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-200 transition-all active:scale-95">
                  View Badge
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline">
                  Share Profile <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Decorative Success Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 blur-[40px] rounded-full"></div>
          </div>
        ) : (
          /* --- UNVERIFIED WARNING BOX (Your existing code) --- */
          <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-xl blur-md animate-pulse"></div>
                  <div className="relative p-2.5 bg-blue-50 rounded-xl border border-blue-100 backdrop-blur-sm transition-transform group-hover:scale-110 duration-300">
                    <BadgeCheck className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-1 rounded-md shadow-sm shadow-blue-200">
                  Boost Trust
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">Claim your Verified Badge</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Verified agents appear <span className="text-blue-600 font-semibold underline decoration-blue-200 underline-offset-2">first in search results</span> and win 40% more GEM contracts.
                </p>
              </div>

              <button onClick={() => router.push('/profile/expert/build')} className="mt-4 w-fit flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all shadow-md active:scale-95">
                Verify Identity <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 blur-[40px] rounded-full group-hover:bg-blue-100/50 transition-colors"></div>
          </div>
        )}

        {/* 2. Agent Card/Listing - The "Status" Card */}
        {(!hasAgentCard || profileScore < 80) && (
          <div className="group border-2 border-dashed border-amber-200 rounded-2xl bg-amber-50/50 p-5 transition-all hover:bg-amber-50 hover:border-amber-300">
            <div className="flex gap-4">
              <div className="shrink-0 p-3 bg-white rounded-2xl shadow-sm border border-amber-100 h-12">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-lg">Profile Visibility: <span className="text-red-500">Hidden</span></h4>
                <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">
                  Your profile isn't public yet. Complete your <span className="font-semibold text-amber-700 underline decoration-amber-300">Agent Card</span> to start receiving marketplace leads.
                </p>
                <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-amber-700 uppercase tracking-tight">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Agent Card {hasAgentCard ? '✅' : '❌'}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Score {profileScore >= 80 ? '✅' : '❌'}
                  </span>
                </div>
                <button onClick={() => router.push('/profile/expert/build')} className="mt-4 w-fit flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all shadow-md active:scale-95">
                  Build your profile <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <UserEmailVerificationSection user={user} />

      {/* 3. The "Power Bar" - Profile Score Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Authority Level</span>
            </div>
            <h3 className="text-slate-900 font-black text-3xl italic tracking-tight">PROFILE STRENGTH</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Current Score</p>
              <p className={`text-4xl font-black tabular-nums ${profileScore >= 80 ? 'text-emerald-500' : 'text-slate-800'}`}>
                {profileScore}%
              </p>
            </div>
          </div>
        </div>

        {/* Progress System */}
        <div className="relative">
          {/* Background Track */}
          <div className="h-4 w-full bg-slate-100 rounded-full">
            {/* The 80% Milestone Marker */}
            <div className="absolute left-[80%] -top-1 bottom-0 w-1 bg-white z-20 shadow-sm" />
            <div className="absolute left-[80%] -top-7 -translate-x-1/2 flex flex-col items-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white px-2">Public Threshold</span>
            </div>

            {/* Dynamic Progress Fill */}
            <div
              className={`h-full rounded-full transition-all duration-1000 relative shadow-inner ${profileScore >= 80
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`}
              style={{ width: `${profileScore}%` }}
            >
              {/* Glass Reflection on Bar */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-6 border-t border-slate-50 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full animate-pulse ${profileScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {profileScore < 80
              ? "You're 15 points away from appearing in Agent Search."
              : "Your profile is verified and active in the marketplace."}
          </div>
          <button onClick={() => router.push('/profile/expert/build')} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Optimize Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSettingsPanel() {
  const [fullName, setFullName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingBasic, setSavingBasic] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [savingPhone, setSavingPhone] = useState('');

  const { updateUser } = useUserStore();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/profile/me`, {
          method: "GET",
          credentials: "include", // include cookies if your auth uses them
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch user account");
        }

        const resData = await response.json();

        if (resData?.success) {
          setFullName(resData?.user?.name || "");
          setPhone(resData?.user?.phone || "");
        }
      } catch (error) {
        console.log(error?.message);
        toast.error(error?.response?.data?.message || "Some unexpected error occurred. Please try again later.");
      }
    };

    getProfile();
  }, []);

  const handleSaveBasicInfo = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    try {
      setSavingBasic(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/profile/me/basic`, {
        method: "PUT",
        credentials: "include", // send cookies if using session auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName.trim(),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "failed to update account");
        return;
      }

      toast.success("Basic account details updated successfully.");
      updateUser({ name: fullName.trim() });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update basic account details.");
    } finally {
      setSavingBasic(false);
    }
  };

  const handlePhoneNumberUpdate = async () => {
    if (!phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    try {
      setSavingPhone(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/profile/me/phone`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone.trim(),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "failed to update account");
        return;
      }
      toast.success(data.message || "Phone updated successfully.");
      updateUser({ phone: phone.trim() });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update basic account details.");
    } finally {
      setSavingPhone(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please enter new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setSavingPassword(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/profile/me/change-password`, {
        method: "PUT",
        credentials: "include", // send cookies if using session auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "failed to update account");
        return;
      }
      toast.success("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Profile Settings</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Update your personal details and account security information.
        </p>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
            <UserRound className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="basic-full-name">Full Name</Label>
            <Input
              id="basic-full-name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSaveBasicInfo}
              disabled={savingBasic}
            >
              {savingBasic ? "Saving..." : "Save Basic Info"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-indigo-700">
            <UserRound className="h-5 w-5" />
            Career Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="career-current-company">Phone number</Label>
            <Input
              id="career-current-company"
              placeholder="new phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handlePhoneNumberUpdate}
              disabled={savingPhone}
            >
              Change phone number
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700">
            <Mail className="h-5 w-5" />
            Email Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            Changing your email requires OTP verification sent to your new email.
            For security, account access may be limited during verification.
          </p>
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input id="current-email" placeholder="john@example.com" value={currentEmail} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email-address">New Email Address</Label>
            <Input
              id="new-email-address"
              placeholder="new-email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 text-white hover:bg-amber-700">
              Send OTP to New Email
            </Button>
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
              Verify OTP
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleUpdatePassword}
              disabled={savingPassword}
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SupportPanel() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitSupport = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill all support form fields.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/help/support/request-form`, {
        method: "POST",
        credentials: "include", // include cookies if auth is cookie-based
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || 'could not raise the request at the moment. Try again sometime.');
        return;
      }
      toast.success("Support request submitted successfully.");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit support request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Help & Support</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Reach out to us using email, phone, or the support form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>support@resumeassist.ai</p>
            <p className="text-xs text-neutral-500">Response time: within 24 hours.</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Phone className="h-5 w-5" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>+1 (555) 019-2048</p>
            <p className="text-xs text-neutral-500">Mon-Fri, 9:00 AM to 6:00 PM.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-700">Support Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="support-subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="support-subject" className="h-10 w-full rounded-lg border-neutral-200">
                <SelectValue placeholder="Select support subject" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORT_SUBJECT_OPTIONS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-message">Message</Label>
            <Textarea
              id="support-message"
              placeholder="Explain your issue in detail..."
              className="min-h-28"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={handleSubmitSupport}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function renderPanel(activeMenu) {
  if (activeMenu === "profile") {
    return <ProfileSettingsPanel />;
  }

  if (activeMenu === "orders") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Orders</h2>
          <p className="mt-1 text-sm text-neutral-500">All orders you have placed.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-700">{order.id}</p>
                    <h3 className="text-lg font-semibold text-neutral-800">{order.item}</h3>
                    <p className="text-sm text-neutral-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", order.statusClass)}>
                      {order.status}
                    </span>
                    <p className="text-base font-semibold text-neutral-800">{order.amount}</p>
                    <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeMenu === "billing") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Billing & Membership</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Track your active and past membership plans.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {memberships.map((membership) => (
            <Card key={`${membership.plan}-${membership.state}`} className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-blue-700">
                    <Star className="h-5 w-5" />
                    {membership.plan}
                  </span>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-medium", membership.badgeClass)}>
                    {membership.state}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-neutral-600">
                <p>
                  <span className="font-semibold text-neutral-700">Started: </span>
                  {membership.startedAt}
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">Renewal/End: </span>
                  {membership.renewalAt}
                </p>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Manage Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-violet-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-violet-700">
              <Zap className="h-5 w-5" />
              Billing Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="bg-violet-600 text-white hover:bg-violet-700">Update Payment Method</Button>
            <Button variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
              Download Invoices
            </Button>
            <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
              Cancel Membership
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SupportPanel />;
}