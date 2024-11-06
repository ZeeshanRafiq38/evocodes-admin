const convertToFormData = (data) => {
    const formData = new FormData();

    const appendData = (key, value) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    // If item is an object, append it as a JSON string
                    formData.append(`${key}[${index}]`, JSON.stringify(item));
                } else {
                    // For other array items (like strings), append directly
                    formData.append(`${key}[${index}]`, item);
                }
            });
        } else {
            formData.append(key, value);
        }
    };

    for (const [key, value] of Object.entries(data)) {
        appendData(key, value);
    }

    return formData;
};

export default convertToFormData;
