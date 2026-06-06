export const servicePropertyMap = {
    Residential: [
           { value: "2 Men + Truck", label: "2 Men + Truck", price: 0 },
        { value: "3 Men + Truck", label: "3 Men + Truck", price: 0 },
        { value: "Last-Minute Movers", label: "Last-Minute Movers", price: 0 },
        { value: "Shared Load", label: "Shared Load", price: 0 },
        { value: "Storage Move", label: "Storage Move", price: 0 },
        { value: "Piano Move", label: "Piano Move", price: 0 },
        { value: "Senior Citizen Move", label: "Senior Citizen Move", price: 0 },
        { value: "Long Distance Move", label: "Long Distance Move", price: 0 },
    ],
    Commercial: [
     { value: "Small Office Move", label: "Small Office Move", price: 0 },
               { value: "Large Office Move", label: "Large Office Move", price: 0 },
               { value: "Warehouse Move", label: "Warehouse Move", price: 0 },
        // Add more commercial services as needed
    ],
};

// utils/getQuoteFormData.js

export const getQuoteFormData = [

    {
        id: 'firstname',
        label: 'First name',
        type: 'text',
        required: true,
        autoComplete: "given-name",
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
   
    {
        id: 'email',
        label: 'Email address',
        type: 'email',
        required: true,
        autoComplete: "email",
        validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },
    {
        id: 'phone',
        label: 'Phone number',
        type: 'tel',
        required: false,
        autoComplete: "tel",
        validation: value => {
            const cleanPhone = (value || '').replace(/[^0-9]/g, '');
            return cleanPhone.length > 6; // Matches numbers having more than 6 characters
        },
        errorMessage: 'Please enter a valid New Zealand phone number'
    },
    {
        id: 'pickUpAddress',
        label: 'Moving from',
        type: 'text',
        required: false,
    },
     {
        id: 'dropOffAddress',
        label: 'Moving to',
        type: 'text',
        required: false,
    },
  
    {
        id: 'propertyType',
        label: 'Property type',
        type: 'select', // or 'radio' for single selection
        options: [
            { value: 'Residential', label: 'Residential' },
            { value: 'Commercial', label: 'Commercial' },
        ],
        required: false,
        multiple: false
    },
    {
        id: 'service',
        label: 'Service required',
        type: 'chip', // or 'radio' for single selection
        multiple: true,
        priceType: "fixed",
        options: [], // Will be populated dynamically
        required: false, // Make it required if necessary
    },
    {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        required: false,
    },
];
