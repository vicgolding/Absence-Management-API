import { toast, Slide } from 'react-toastify';

export function formatName(fullName) {
    const names = fullName.split(' ');
    const titleCasedName = names.map((name) => {
        return name[0].toUpperCase() + name.substring(1);
    });
    return titleCasedName.join(' ');
}

export function isTextLengthValid(inputText, maxLength = 50) {
    return inputText.length <= maxLength;
}

export function isInputTypeValid(input, requiredType) {
    switch(requiredType)  {
        case "string":
            return !input.match(/\d/g);
        case "number":
            console.log("is number");
            break;
        default:
            console.log("who cares");
    }
}

export function highlightInputError(inputField, isInvalid) {
    if (isInvalid && !inputField.classList.contains("is-invalid")) { inputField.classList.add("is-invalid"); }
    if (!isInvalid && inputField.classList.contains("is-invalid")) { inputField.classList.remove("is-invalid"); }
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