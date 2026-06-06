export const websitePriceCalculatorFieldsData = [

    {
        id: 'what_type_of_website_do_you_need_',
        label: 'Select Website Type',
        type: 'radio', // or 'radio' for single selection
        priceType: 'base',
        options: [
            { value: 'business-website', label: 'Business Website', price: 800, },
            { value: 'e-commerce', label: 'E-Commerce/shop', price: 1400 },
            { value: 'portfolio', label: 'Portfolio', price: 800 },

        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Please select at least one website type'
    },
    {
        id: 'number_of_pages_needed',
        label: 'Number of pages needed ',
        type: 'slider', // or 'radio' for single selection
        range: { min: 0, max: 20 },
        price: 280,
        priceType: "per-page",
        note: "Note: The term 'pages' refers to unique templates we create, each with its own layout. You can use these templates to add more pages later. For example, a 'Single Product' page template allows you to create multiple product pages using the same layout. You can add 10 product or 10k. There is not limit with our templates."
    },
    {
        id: 'do_you_already_have_a_ui_design_prepared_',
        label: 'Is UI Design ready?',
        type: 'radio', // or 'radio' for single selection
        priceType: "per-page",
        options: [
            { value: "Yes, I can provide a Figma template.", label: "Yes, I can provide a Figma template", price: 0 },
            { value: "inspiration_website", label: "No, but I can share a website for inspiration", price: 0, },
            { value: "create_design", label: "No, please create a UI design", price: 150, }
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Please select one option'
    },
    {
        id: 'copywriting',
        label: 'Copywriting/Text',
        type: 'radio', // or 'radio' for single selection
        priceType: "fixed",
        options: [
            { value: "yes", label: "Yes, I can provide a content", price: 0 },
            { value: "no", label: "No, I can’t provide a content", price: 400 },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Please select one option'
    },

    {
        id: 'addons',
        label: 'Addons',
        type: 'chip', // or 'radio' for single selection
        multiple: true,
        priceType: "fixed",

        options: [
            { value: "image-gallery", label: "Image Gallery (Free)", price: 0 },
            { value: "image-slider", label: "Image Slider (Free)", price: 0 },
            { value: "contact-form", label: "Contact Form (Free)", price: 0 },
            { value: "google-business-profile", label: "Google Business Profile (Free)", price: 0 },
            { value: "google-analytics-setup", label: "Google Analytics Setup ($90)", price: 90 },
            { value: "social-media-feed", label: "Social Media Live Syncing ($150)", price: 150 },
            { value: "google-merchant-center-syncing", label: "Google Merchant Center Syncing ($280)", price: 280 },
            { value: "ecommerce-tracking-with-ga4", label: "Ecommerce Tracking with GA4 ($750)", price: 750 },
            { value: "hubspot-integeration", label: "CRM Integration ($400)", price: 400 },
        ],
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