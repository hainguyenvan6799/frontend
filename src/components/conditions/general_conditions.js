

const check_validate_email = (email) => {
    if (email !== "") {
        const email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi;
        const condition = email_regex.test(email);
        if (!condition) {
            return {
                status: false,
                message: "Định dạng email: abc123@gmail.com.",
            }
        }
        return {
            status: true,
            message: "Email hợp lệ.",
        }
        
    }
    else {
        return {
            status: false,
            message: "Email không được để trống",
        }
    }
}


const check_validate_password = (password) => {
    if (password !== "") {
        const password_regex = /^[a-zA-Z0-9]{6,20}$/g;
        const condition = password_regex.test(password);
        if (!condition) {
            return {
                status: false,
                message: "Password có thể là chữ thường hoặc in hoa hoặc số và có độ dài ít nhất 6 ký tự, nhiều nhất là 10 ký tự.",
            }
        }
        return {
            status: true,
            message: "Password hợp lệ",
        }
    }
    else {
        return {
            status: false,
            message: "Password không được để trống.",
        }
    }
}
export {
    check_validate_email,
    check_validate_password,
}
