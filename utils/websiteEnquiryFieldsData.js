export const websiteEnquiryFieldsData = [

    {
        id: 'what_is_your_web_design_requirement_',
        label: 'What is your web design requirement?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'createNewWebsite', label: 'Create a new website' },
            { value: 'existingWebsitePerformanceOptimisation', label: 'Existing website performance optimisation' },
            { value: 'other', label: 'Other' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one requirement'
    },
    {
        id: 'what_are_your_website_needs_',
        label: 'What are your website needs?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'toAdvertiseMyBusinessServices', label: 'To advertise my business/services' },
            { value: 'toSellProductsServices', label: 'To sell product/services (example: E-Commerce' },
            { value: 'other', label: 'Other' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one'
    },
    {
        id: 'what_type_of_business_is_this_for_',
        label: 'What type of business is this for?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "soleTrader", label: "Sole trader/self-employed" },
            { value: "smallBusiness", label: "Small business (1-9 employees)" },
            { value: "mediumBusiness", label: "Medium business (10-29 employees)" },
            { value: "largeBusiness", label: "Large business (30+ employees)" },
            { value: "charity", label: "Charity/non-profit" },


        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Please select at least one'
    },

    {
        id: 'industry',
        label: 'What industry do you operate in?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "Restaurant/food", label: "Restaurant/food" },
            { value: "Retail/consumer goods", label: "Retail/consumer goods" },
            { value: "Business Service", label: "Business Service" },
            { value: "Creative industries", label: "Creative industries" },
            { value: "Entertainment & events", label: "Entertainment & events" },
            { value: "Financial services", label: "Financial services" },
            { value: "Health & fitness", label: "Health & fitness" },
            { value: "Home services", label: "Home services" },
            { value: "Technology/software", label: "Technology/software" },
            { value: 'other', label: 'Other' },

        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one industry'
    },
    {
        id: 'project_timeline',
        label: 'When would you like the website to go live?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "ASAP", label: "ASAP" },
            { value: "Within a few weeks", label: "Within a few weeks" },
            { value: "Within a month", label: "Within a month" },
            { value: "within a few months", label: "within a few months" },
            { value: "I would like to discuss this with the professional", label: "I would like to discuss this with the professional" },
            { value: 'other', label: 'Other' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one'
    },
    {
        id: 'budget',
        label: 'What is your estimated budget for this project?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "Less than $999", label: "Less than $999" },
            { value: "$1,000 - $1,999", label: "$1,000 - $1,999" },
            { value: "$2,000 - $3,999", label: "$2,000 - $3,999" },
            { value: "$4000 - $5,999", label: "$4000 - $5,999" },
            { value: "$6,000 - $9,999", label: "$6,000 - $9,999" },
            { value: "$10,000 or more", label: "$10,000 or more" },
            { value: 'other', label: 'Other' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one'
    },
    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },
    {
        id: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },

]