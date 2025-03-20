import { Bounce, toast } from "react-toastify";

export const addToast = (status: "success" | "error" | "warn", msg: string, theme: ("light" | "dark") = "light") => {
    return toast[status](msg, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        style: {
            width: "fit-content",
            paddingRight: "3rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
        },
        transition: Bounce,
        });
}