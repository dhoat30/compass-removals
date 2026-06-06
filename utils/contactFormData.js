export const contactFormData = [

    {
        id: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },

    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },

    {
        id: 'phone', label: 'Phone', type: 'tel', required: false,
    },

    {
        id: 'message', label: 'Message', type: 'textarea', required: false,
    },
    // 
]