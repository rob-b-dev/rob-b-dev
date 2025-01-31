import { toast } from "react-toastify";

export const showToast = (message, type) => {
    if (!toast.isActive(message)) {
        toast[type](message, { toastId: message });
    }
};