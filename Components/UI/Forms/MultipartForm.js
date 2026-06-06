"use client";

import React, { useState, useEffect } from "react";
import Input from "./InputFields/Input";
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import { servicePropertyMap } from "@/utils/getQuoteFormData"; // Import the service mapping
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import GoogleAutocomplete from "@/Components/GoogleMaps/GoogleAutoComplete";
import styles from "./FormStyle.module.scss";
import dayjs from "dayjs";
import { useClickIds } from "@/hooks/useClickIds";
import { sendFormSubmissionToGoogleTagManager } from "@/utils/googleTagManager";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const STEPS = [
  {
    number: 1,
    label: "Route",
    fields: ["pickUpAddress", "dropOffAddress"],
    title: "Tell us where you're moving from and to.",
  },
  {
    number: 2,
    label: "Contact",
    fields: ["propertyType", "service"],
    title: "Tell us about the property.",
  },
  {
    number: 3,
    label: "Extra Details",
    fields: ["firstname", "email", "phone", "message"],
    title: "Contact details and any special requirements.",
  },
];

export default function MultipartForm({
  className,
  formName = "Get a Quote Form",
  title = "Please fill out a form",
  hideTitle = false,
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: "", // Default empty string to make it controlled
    email: "",
    phone: "",
    address: "",
    pickUpAddress: "",
    dropOffAddress: "",
    propertyType: "",
    date: null,
    service: [],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [googleAdsAddress, setGoogleAdsAddress] = useState({
    pickUpAddress: {},
    dropOffAddress: {},
  }); // For Google Ads conversion tracking
  // click id
  const { clickIds } = useClickIds();
  const handleChange = (id, value, isSelectMultiple) => {
    let newValue = value.target ? value.target.value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));

    // Reset errors on change
    if (errors[id]) {
      setErrors({ ...errors, [id]: false });
    }
  };

  const handleBlur = (id, validationFunction) => {
    if (!validationFunction(formData[id])) {
      setErrors({ ...errors, [id]: true });
    }
  };

  // Get fields for current step
  const getCurrentStepFields = () => {
    const currentStepData = STEPS.find((step) => step.number === currentStep);
    return currentStepData ? currentStepData.fields : [];
  };

  // Validate current step fields
  const validateStep = (stepNumber) => {
    const currentStepData = STEPS.find((step) => step.number === stepNumber);
    if (!currentStepData) return true;

    let stepFieldsValid = true;
    const newErrors = {};

    currentStepData.fields.forEach((fieldId) => {
      const field = getQuoteFormData.find((f) => f.id === fieldId);
      if (field && field.required) {
        if (field.type === "chip") {
          if (!formData[fieldId] || formData[fieldId].length === 0) {
            newErrors[fieldId] = true;
            stepFieldsValid = false;
          }
        } else if (
          !formData[fieldId] ||
          !field.validation(formData[fieldId])
        ) {
          newErrors[fieldId] = true;
          stepFieldsValid = false;
        }
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return stepFieldsValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit handler - validates all fields before submission
  const submitHandler = (e) => {
    e.preventDefault();

    let allFieldsValid = true;
    const newErrors = {};

    // Loop through each field to check if it's required and valid
    getQuoteFormData.forEach((field) => {
      if (field.required) {
        if (field.type === "chip") {
          if (!formData[field.id] || formData[field.id].length === 0) {
            newErrors[field.id] = true;
            allFieldsValid = false;
          }
        } else if (
          !formData[field.id] ||
          !field.validation(formData[field.id])
        ) {
          newErrors[field.id] = true;
          allFieldsValid = false;
        }
      }
    });

    setErrors(newErrors);
    // If any required field is invalid, stop and don't make API calls
    if (!allFieldsValid) {
      return; // Stop the function if any field is invalid o  r empty
    }

    const parts = formData.firstname.trim().split(/\s+/); // split by any whitespace
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || ""; // everything after firstName

    const moveDate = formData.datePicker
      ? dayjs(formData.datePicker).format("YYYY-MM-DD")
      : "";
    let formattedDate = formData.datePicker
      ? dayjs(formData.datePicker).valueOf()
      : "";
    const transactionId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const dataPayload = {
      email: formData.email,
      formName: formName,
      message: `First Name: ${formData.firstname} \nEmail: ${formData.email
        } \nPhone Number: ${formData.phone} \n Pick Up Address: ${formData.pickUpAddress
        }\n Drop Off Address: ${formData.dropOffAddress}
      \nProperty Type: ${formData.propertyType}
       \nMove Date: ${formattedDate}
       \nServices Required: ${formData["service"].join(", ")} \n Message: ${formData.message
        } `,
      movermateLead: {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        date: moveDate,
        pickup: formData.pickUpAddress,
        dropoff: formData.dropOffAddress,
        source: "Website",
        jobCategory: "Moving",
        moveSize: formData.propertyType,
        tags: formData["service"].join(", "),
        leadStatus: "New",
        note: formData.message,
        bookingNotes: `Form: ${formName}
Property Type: ${formData.propertyType || ""}
Services Required: ${formData["service"].join(", ") || ""}
Message: ${formData.message || ""}`,
        metadata: {
          gclid: clickIds.gclid || "",
          gbraid: clickIds.gbraid || "",
          wbraid: clickIds.wbraid || "",
          fbclid: clickIds.fbclid || "",
          fbp: clickIds.fbp || "",
          fbc: clickIds.fbc || "",
          utm_source: clickIds.utm_source || "",
          utm_term: clickIds.utm_term || "",
          utm_content: clickIds.utm_content || "",
          utm_matchtype: clickIds.utm_matchtype || "",
          utm_network: clickIds.utm_network || "",
          utm_device: clickIds.utm_device || "",
          gads_campaign_id: clickIds.gads_campaign_id || "",
          gads_adgroup_id: clickIds.gads_adgroup_id || "",
          gads_ad_id: clickIds.gads_ad_id || "",
          campaign_name: clickIds.campaign_name || "",
          adgroup_name: clickIds.adgroup_name || "",
          ad_name: clickIds.ad_name || "",
          fb_campaign_id: clickIds.fb_campaign_id || "",
          fb_platform: clickIds.fb_platform || "",
          fb_ad_id: clickIds.fb_ad_id || "",
          fb_adset_id: clickIds.fb_adset_id || "",
          fb_site_source: clickIds.fb_site_source || "",
        },
      },
      hubspotFormObject: [
        { name: "hs_google_click_id", value: clickIds.gclid || "" },
        { name: "gbraid", value: clickIds.gbraid || "" },
        { name: "wbraid", value: clickIds.wbraid || "" },
        { name: "gads_campaign_id", value: clickIds.gads_campaign_id || "" },
        { name: "gads_adgroup_id", value: clickIds.gads_adgroup_id || "" },
        { name: "gads_ad_id", value: clickIds.gads_ad_id || "" },
        { name: "campaign_name", value: clickIds.campaign_name || "" },
        { name: "adgroup_name", value: clickIds.adgroup_name || "" },
        { name: "ad_name", value: clickIds.ad_name || "" },
        { name: "utm_term", value: clickIds.utm_term || "" },
        { name: "utm_matchtype", value: clickIds.utm_matchtype || "" },
        { name: "utm_network", value: clickIds.utm_network || "" },
        { name: "utm_device", value: clickIds.utm_device || "" },
        { name: "utm_content", value: clickIds.utm_content || "" },
        { name: "utm_source", value: clickIds.utm_source || "" },
        { name: "hs_facebook_click_id", value: clickIds.fbclid || "" },
        { name: "fbp", value: clickIds.fbp || "" },
        { name: "fbc", value: clickIds.fbc || "" },
        { name: "fb_campaign_id", value: clickIds.fb_campaign_id || "" },
        { name: "fb_platform", value: clickIds.fb_platform || "" },
        { name: "fb_ad_id", value: clickIds.fb_ad_id || "" },
        { name: "fb_adset_id", value: clickIds.fb_adset_id || "" },
        { name: "fb_site_source", value: clickIds.fb_site_source || "" },

        { name: "firstname", value: formData.firstname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "pick_up_address", value: formData.pickUpAddress },
        { name: "drop_off_address", value: formData.dropOffAddress },
        { name: "property_type", value: formData.propertyType },
        { name: "move_date", value: "null" },
        { name: "services_required", value: formData["service"].join(", ") },
        { name: "message", value: formData.message },
      ],
    };
    setIsLoading(true);

    // Movermate config
    var configMovermate = {
      method: "post",
      url: "/api/submit-movermate-lead",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };
    // Mailgun config
    var configSendMail = {
      method: "post",
      url: "/api/sendmail",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };
    var configGoogleAdsConversion = {
      method: "post",
      url: "/api/google-ads-conversion",
      headers: { "Content-Type": "application/json" },
      data: {
        clickIds,
        email: formData.email,
        phone: formData.phone,
        transactionId,
        conversionValue: 0,
        currencyCode: "NZD",
      },
    };

    // const facebookData = {
    //     method: 'post',
    //     url: '/api/facebook-conversion-api',
    //     headers: { 'Content-Type': 'application/json' },
    //     data: {
    //         data: {
    //         event: "Lead",
    //         firstName: formData.firstname,
    //         email: formData.email,
    //         phone: formData.phone,
    //         county: "Bay of Plenty",
    //         eventSourceUrl: window.location.href,
    //         serviceRequested: formData['service'].join(", ")
    //     }

    //     }
    // }

    Promise.all([
      axios(configMovermate),
      axios(configSendMail),
    ])
      .then(function (response) {
        console.log(response);
        if (response[0].status >= 200 && response[0].status < 300) {
          setIsLoading(false);
          setIsSuccess(true);
          setNewSubmission(false);
          setError(false);
          axios(configGoogleAdsConversion).catch((error) => {
            console.warn("Google Ads conversion upload skipped/failed", error);
          });
          sendFormSubmissionToGoogleTagManager({
            eventName: "quote_form_submission",
            formName: "Moving Quote",
            transactionId,
            conversionValue: 0,
            currency: "NZD",
            clickIds,
            formData: {
              firstName: firstName,
              email: formData.email,
              phone: formData.phone,
              street: `${googleAdsAddress.pickUpAddress.streetNumber || ""} ${
                googleAdsAddress.pickUpAddress.streetName || ""
              }`.trim(),
              city: googleAdsAddress.pickUpAddress.city,
              region: googleAdsAddress.pickUpAddress.region,
              postCode: googleAdsAddress.pickUpAddress.postalCode,
            },
          });
          router.push("/form-submitted/thank-you");
        } else {
          setIsLoading(false);
          setIsSuccess(false);
          setError(true);
          setNewSubmission(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setIsSuccess(false);
        setError(true);
        setNewSubmission(true);
      });
  };

  // Get the filtered service options based on propertyType
  const getFilteredServiceOptions = () => {
    if (formData.propertyType && servicePropertyMap[formData.propertyType]) {
      return servicePropertyMap[formData.propertyType];
    }
    return [];
  };

  // Initialize Google Maps script
  const handleLoad = () => {
    setMapsLoaded(true);
  };
  // is address field
  const isAddressField = (id) => {
    return ["address", "pickUpAddress", "dropOffAddress"].includes(id);
  };

  // Render only fields for current step
  const getStepFormInputs = () => {
    const currentStepFields = getCurrentStepFields();
    return currentStepFields.map((fieldId, index) => {
      const field = getQuoteFormData.find((f) => f.id === fieldId);
      if (!field) return null;

      if (field.id === "service") {
        const filteredOptions = getFilteredServiceOptions();
        return (
          <Input
            lightTheme={true}
            key={index}
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={(newValue) =>
              handleChange(field.id, newValue, field.multiple)
            }
            onBlur={
              field.required ? () => handleBlur(field.id, field.validation) : null
            }
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
            options={filteredOptions}
            multipleValue={field.multiple}
          />
        );
      } else if (isAddressField(field.id)) {
        return (
          <React.Fragment key={field.id}>
            <GoogleAutocomplete
              className="mt-16"
              label={field.label}
              value={formData[field.id]}
              onChange={(value) => handleChange(field.id, value, false)}
              onSelect={(selectedAddress) => {
                // When user selects an address from suggestions
                setFormData((prevData) => ({
                  ...prevData,
                  [field.id]: selectedAddress.formattedAddress,
                }));
                setGoogleAdsAddress((prevData) => ({
                  ...prevData,
                  [field.id]: selectedAddress.unformattedAddress,
                }));
                // Reset errors if any
                if (errors[field.id]) {
                  setErrors({ ...errors, [field.id]: false });
                }
              }}
              required={field.required}
              autoComplete={field.autoComplete}
              error={errors[field.id]}
              helperText={errors[field.id] ? "Please enter a valid address" : ""}
            />
          </React.Fragment>
        );
      } else {
        return (
          <Input
            lightTheme={true}
            key={index}
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={
              field.type === "chip"
                ? (newValue) => handleChange(field.id, newValue, field.multiple)
                : (e) => handleChange(field.id, e, field.multiple)
            }
            onBlur={
              field.required ? () => handleBlur(field.id, field.validation) : null
            }
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
            options={field.options}
            multipleValue={field.multiple}
            min={field.range && field.range.min}
            max={field.range && field.range.max}
            note={field.note && field.note}
            id={field.id}
          />
        );
      }
    });
  };

  return (

    <Container
      variant="div"
      className={`${className} ${styles.multipartFormContainer}`}
      maxWidth="sm"
      id="get-quote-form"
    >
      <div className={`${styles.formHeader}`} >
        <div className={`row flex space-between align-start gap-16`}>
          <div className={`${styles.formTitleWrapper}`}>
            <Typography variant="h5" component="h2" className={`${styles.formTitle}`} color="var(--light-on-primary)">
              Get Your Free Quote
            </Typography>
            <Typography variant="body1" component="p" className={`${styles.formSubtitle} mt-8`} color="var(--light-inverse-primary)">
              Start with your route first. Then we’ll ask a few quick details on the next step.
            </Typography>
          </div>
          <div className={`${styles.stepsTextWrapper} flex align-center justify-center flex-column border-radius-8`}>
            <Typography variant="subtitle1" component="p" className={`${styles.stepsText} `} color="var(--light-inverse-primary)">
              3 quick steps
            </Typography>
          </div>

        </div>

        {/* steps  */}
        <div className={`${styles.stepsContainer} grid space-between gap-16 mb-8`} >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`${styles.stepWrapper}  align-center `}
            >
              {step.number <= STEPS.length && (
                <div
                  className={`${styles.stepLine} `}
                  style={{
                    backgroundColor:
                      currentStep >= step.number ? "var(--light-inverse-primary)" : "rgba(255, 255, 255, 0.35)",
                  }}
                />
              )}
              <div className={`${styles.stepLine} `} />
              <Typography
                variant="body2"
                sx={{
                  color: currentStep >= step.number ? "var(--light-on-primary)" : "var(--light-inverse-primary)",
                  fontWeight: currentStep >= step.number ? 500 : 400,
                }}
              >
                {step.label}
              </Typography>

            </div>
          ))}
        </div>
      </div>


      <div className={`${styles.inputContainer} `}>
        <React.Fragment>
          <div className={`${styles.inputWrapper}`}>
            {!hideTitle && (
             

                <Typography variant="body1" component="div" className={`${styles.stepTitle} mt-8 mb-8`}  >
                  Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
                </Typography>
          
            )}

            {getStepFormInputs()}

            <div className={`${styles.buttonWrapper} flex gap-8 mt-24 ` } >
              {currentStep > 1 && (
                <Button
                  variant="outlined"
                  onClick={handlePreviousStep}
                  size="large"
                  sx={{flex: 1}}
                >
                  Back
                </Button>
              )}
              {currentStep < STEPS.length && (
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  size="large"
                  style={{width: "100%"}}
                >
                  Continue
                </Button>
              )}
              {currentStep === STEPS.length && (
                <Button
                  variant="contained"
                  onClick={submitHandler}
                  disabled={isLoading}
                  size="large"
                  style={{width: "100%"}}
                >
                  Get Free Quote
                </Button>
              )}
            </div>
              {currentStep === STEPS.length && (
                <>
                         <Button
                variant="text"
                className="mt-8  align-center"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
                startIcon={<LocalPhoneIcon />}
              >
                Prefer to talk? {process.env.NEXT_PUBLIC_PHONE_NUMBER}
              </Button>
                <Typography
                variant="body1"
                component="div"
                className="center-align mt-8"
                color="secondary"
               
              >
                Honest advice • Free Quote • No obligation
              </Typography>
                </>
           
              ) }
          
           
            
           

            {error && (
              <Alert sx={{ margin: "8px 0", mt: 2 }} severity="error">
                Something went wrong. Please Try again
              </Alert>
            )}
          </div>
        </React.Fragment>
      </div>
    </Container>

  );
}
