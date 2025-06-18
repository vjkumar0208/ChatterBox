import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen pt-16">
      <div className="container max-w-4xl mx-auto px-2 sm:px-4">
        <div className="space-y-3 sm:space-y-5">
          {/* Theme Selection */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">Theme</h2>
            <p className="text-xs sm:text-sm text-base-content/70 mb-2 sm:mb-3">Choose a theme for your chat interface</p>

            <div className="grid grid-cols-5 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-0.5 xs:gap-1 sm:gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-0.5 sm:gap-1 p-0.5 xs:p-1 sm:p-1.5 rounded-lg transition-colors
                    ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-3 xs:h-4 sm:h-6 w-full rounded-md overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-0.5">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[7px] xs:text-[8px] sm:text-[10px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Preview</h3>
            <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
              <div className="p-2 sm:p-3 bg-base-200">
                <div className="max-w-[280px] sm:max-w-sm mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-lg shadow-sm overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 border-b border-base-300">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium text-xs sm:text-sm">
                          J
                        </div>
                        <div>
                          <h3 className="font-medium text-xs sm:text-sm">John Doe</h3>
                          <p className="text-[8px] sm:text-[10px] text-base-content/70">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-1.5 sm:p-2 space-y-1.5 sm:space-y-2 h-[120px] sm:h-[140px] overflow-y-auto">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-lg p-1.5 sm:p-2 shadow-sm
                              ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                            `}
                          >
                            <p className="text-[10px] sm:text-xs">{message.content}</p>
                            <p
                              className={`
                                text-[8px] sm:text-[9px] mt-0.5 sm:mt-1
                                ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-1.5 sm:p-2 border-t border-base-300">
                      <div className="flex gap-1.5 sm:gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-xs sm:input-sm flex-1 text-[10px] sm:text-xs h-6 sm:h-8 min-h-0"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary btn-xs sm:btn-sm h-6 sm:h-8 min-h-0 px-1.5 sm:px-2">
                          <Send size={12} className="hidden sm:block" />
                          <Send size={10} className="sm:hidden" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
