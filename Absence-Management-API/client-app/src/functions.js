import { toast, Slide } from 'react-toastify';

export function formatName(fullName) {
    const names = fullName.split(' ');
    const titleCasedName = names.map((name) => {
        return name[0].toUpperCase() + name.substring(1);
    });
    return titleCasedName.join(' ');
}

export function validateInput(input, isValid) {
    if (!isValid) {
        if (!input.classList.contains("is-invalid")) {input.classList.add("is-invalid");}
    } else {
        if (input.classList.contains("is-invalid")) {input.classList.remove("is-invalid");}
    }
}

export function showToast(
    message,
    autoClose, 
    type, 
    customId = undefined
) {
    toast(message, {
        toastId: customId,
        type: type,
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
    });
}