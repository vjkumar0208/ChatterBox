import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { compressImage } from "../lib/utils";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check initial file size
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("Image is too large. Please select an image under 5MB");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedFile = await compressImage(file);
      
      // Check final size after compression
      if (compressedFile.size > 1024 * 1024) { // 1MB
        toast.error("Image is still too large after compression. Please try a smaller image.");
        setIsCompressing(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsCompressing(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      setIsCompressing(false);
      toast.error("Error processing image. Please try again.");
      console.error("Error handling image:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSending) return;

    try {
      setIsSending(true);
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={() => {
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
              disabled={isSending}
            >
              <X className="size-3" />
            </button>
            {isSending && (
              <div className="absolute inset-0 bg-base-300/50 rounded-lg flex items-center justify-center">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          className={`sm:hidden flex btn btn-circle btn-sm ${isCompressing || isSending ? 'loading' : ''} 
                   ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isCompressing || isSending}
        >
          {isCompressing ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Image size={18} />
          )}
        </button>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder={isSending ? "Sending message..." : "Type a message..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isSending}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${isCompressing || isSending ? 'loading' : ''} 
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isCompressing || isSending}
          >
            {isCompressing ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Image size={20} />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isCompressing || isSending}
        >
          {isSending ? (
            <Loader2 size={22} className="animate-spin" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
