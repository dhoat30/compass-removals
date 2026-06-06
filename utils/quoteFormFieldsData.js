export const quoteFormData = [

    {
        id: 'what_type_of_website_do_you_need_',
        label: 'What type of website do you need?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'smallBusinessWebsite', label: 'Small Business Website' },
            { value: 'e-commerce', label: 'E-Commerce' },
            { value: 'educationalWebsite', label: 'Educational Website' },
            { value: 'portfolio', label: 'Portfolio' },
            { value: 'corporatePortal', label: 'Corporate Portal' }
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one type'
    },
    {
        id: 'what_specific_goals_do_you_hope_to_achieve_with_this_site_',
        label: 'What specific goals do you hope to achieve with this site?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'increaseSales', label: 'Increase Sales' },
            { value: 'generateLeads', label: 'Generate Leads' },
            { value: 'shareInformation', label: 'Share Information' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one goal'
    },
    {
        id: 'do_you_already_have_a_ui_design_prepared_',
        label: 'Do you already have a UI design prepared?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Please select Yes or No'
    },

    {
        id: 'by_when_are_you_hoping_to_launch_the_website_',
        label: 'By when are you hoping to launch the website?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "twoWeeks", label: "2 Weeks" },
            { value: "fourWeeks", label: "4 Weeks" },
            { value: "sixWeeks", label: "6 Weeks" },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select the expected timeline'
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