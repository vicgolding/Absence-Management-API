import { toast, Slide } from 'react-toastify';

export const validateInput = (input, isValid) => {
    if (!isValid) {
        if (!input.classList.contains("is-invalid")) {input.classList.add("is-invalid");}
    } else {
        if (input.classList.contains("is-invalid")) {input.classList.remove("is-invalid");}
    }
}

export const showToast = (
    message,
    autoClose, 
    type, 
    customId = undefined
) => {
    toast(message, {
        toastId: customId,
        type: type,
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
    });
};