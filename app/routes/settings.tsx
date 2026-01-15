import React, { useState } from "react";
import {
  User,
  Store,
  Bell,
  Lock,
  Moon,
  Globe,
  Save,
  ChevronRight,
  Camera,
  Mail,
  Smartphone,
  Shield,
  CreditCard,
  Monitor,
} from "lucide-react";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "System & Application Settings" },
  ];
}

const SECTIONS = [
  { id: "general", label: "General", icon: Store },
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "security", label: "Security", icon: Lock },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  // Mock State for Forms
  const [generalForm, setGeneralForm] = useState({
    storeName: "Pospay Gourmet",
    email: "contact@pospay.com",
    phone: "+1 (555) 123-4567",
    currency: "USD ($)",
    address: "123 Culinary Ave, Food District, NY 10001",
    timezone: "UTC-5 (Eastern Time)",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOrder: true,
    emailStock: true,
    pushOrder: true,
    pushStock: false,
    smsMarketing: false,
  });

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-gray-500" />
                Store Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={generalForm.storeName}
                    onChange={(e) =>
                      setGeneralForm({
                        ...generalForm,
                        storeName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={generalForm.email}
                    onChange={(e) =>
                      setGeneralForm({ ...generalForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={generalForm.phone}
                    onChange={(e) =>
                      setGeneralForm({ ...generalForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Currency
                  </label>
                  <select
                    value={generalForm.currency}
                    onChange={(e) =>
                      setGeneralForm({
                        ...generalForm,
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>INR (₹)</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    value={generalForm.address}
                    onChange={(e) =>
                      setGeneralForm({
                        ...generalForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                Regional Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Timezone
                  </label>
                  <select
                    value={generalForm.timezone}
                    onChange={(e) =>
                      setGeneralForm({
                        ...generalForm,
                        timezone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+5:30 (IST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#1f1f1f] text-white rounded-full hover:bg-black transition-colors shadow-sm">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Admin User</h3>
                <p className="text-gray-500">Super Administrator</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Active
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Profile Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@pospay.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        Email Notifications
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Receive daily summaries and alerts via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailOrder}
                      onChange={() =>
                        setNotificationSettings((p) => ({
                          ...p,
                          emailOrder: !p.emailOrder,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f1f1f]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <Bell size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        Push Notifications
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Instant alerts for new orders on desktop
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushOrder}
                      onChange={() =>
                        setNotificationSettings((p) => ({
                          ...p,
                          pushOrder: !p.pushOrder,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f1f1f]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">SMS Alerts</h4>
                      <p className="text-gray-500 text-sm">
                        High priority alerts sent to your phone
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsMarketing}
                      onChange={() =>
                        setNotificationSettings((p) => ({
                          ...p,
                          smsMarketing: !p.smsMarketing,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f1f1f]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-500" />
                Security Settings
              </h3>

              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1f1f1f] outline-none"
                  />
                </div>
                <button className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h4 className="text-red-800 font-bold mb-2">Danger Zone</h4>
              <p className="text-red-600 text-sm mb-4">
                Irreversible actions regarding your account.
              </p>
              <button className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors shadow-sm">
                Delete Account
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-12 text-center text-gray-400">
            Section under construction
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-gray-50 p-6 gap-6">
      {/* Sidebar Navigation */}
      <div className="w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-lg">Settings</h2>
          </div>
          <nav className="p-2 space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === section.id
                    ? "bg-[#1f1f1f] text-white shadow-md shadow-gray-200 ring-1 ring-black/5"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon size={18} />
                  <span>{section.label}</span>
                </div>
                {activeTab === section.id && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {SECTIONS.find((s) => s.id === activeTab)?.label}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your {activeTab} preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1f1f1f] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
