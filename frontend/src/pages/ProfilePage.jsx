import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2 } from "lucide-react";
import { compressImage } from "../lib/utils";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      reader.readAsDataURL(compressedFile);

      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        try {
          await updateProfile({ profilePic: base64Image });
        } catch (error) {
          toast.error("Failed to update profile picture. Please try again.");
          setSelectedImg(null);
        }
        setIsCompressing(false);
      };
    } catch (error) {
      setIsCompressing(false);
      toast.error("Error processing image. Please try again.");
      console.error("Error handling image:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-1 text-sm text-base-content/60">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-28 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${(isUpdatingProfile || isCompressing) ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                {(isUpdatingProfile || isCompressing) ? (
                  <Loader2 className="w-5 h-5 text-base-200 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5 text-base-200" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile || isCompressing}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isCompressing ? "Compressing image..." :
               isUpdatingProfile ? "Uploading..." : 
               "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm">{authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
