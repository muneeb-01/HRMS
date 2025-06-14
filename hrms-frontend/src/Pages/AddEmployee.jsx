import React, { useState, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";

// 1. Define initial form values outside the component
// This prevents re-creation on every render, improving performance.
const defaultFormValues = {
  employeeId: "",
  name: "",
  department: "",
  position: "",
  status: "Active",
  email: "",
  joiningDate: "",
  workingHours: "8:00 AM - 5:00 PM",
  personalInfo: {
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyPhoneNumber: "",
    permanentAddress: "",
    currentAddress: "",
    nationalId: "",
    bankName: "",
    bankAccountNumber: "",
    swiftCode: "",
  },
  employmentDetails: {
    isWorkingAbroad: false,
  },
  visaInfo: {
    // Default values for visaInfo even if not displayed
    visaIssueDate: "",
    visaExpiryDate: "",
    visaType: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    hostCountryOfWork: "",
    hostCountryAddress: "",
    hostCountryLocalPhoneNumber: "",
    hostCountryTaxId: "",
    dateOfAssignmentStart: "",
    expectedDateOfAssignmentEnd: "",
  },
  payroll: {
    basicSalary: "",
    hra: "",
    conveyance: "",
    medicalAllowance: "",
    pfDeduction: "",
    taxDeduction: "",
    loanDeduction: "",
    status: "Processed",
    payrollMonth: "",
    extractedFromPayment: false,
  },
};

// 2. Extract Field Data into separate configurations
// This makes the form more data-driven, easier to extend, and reduces JSX verbosity.
const employeeInfoFields = [
  {
    id: "employeeId",
    label: "Employee ID",
    type: "text",
    placeholder: "e.g., EMP001",
    required: true,
  },
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "e.g., Ahsan Khan",
    required: true,
  },
  {
    id: "department",
    label: "Department",
    type: "text",
    placeholder: "e.g., Engineering",
  },
  {
    id: "position",
    label: "Position",
    type: "text",
    placeholder: "e.g., Frontend Developer",
  },
  { id: "joiningDate", label: "Joining Date", type: "date" },
  {
    id: "workingHours",
    label: "Working Hours",
    type: "text",
    placeholder: "e.g., 8:00 AM - 5:00 PM",
  },
];

const personalInfoFields = [
  {
    id: "fatherName",
    label: "Father's Name",
    type: "text",
    placeholder: "e.g., Mr. Ahmed Khan",
  },
  { id: "dateOfBirth", label: "Date of Birth", type: "date" },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "", label: "Select Gender" },
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "e.g., Pakistani",
  },
  {
    id: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: [
      { value: "", label: "Select Status" },
      { value: "Single", label: "Single" },
      { value: "Married", label: "Married" },
      { value: "Divorced", label: "Divorced" },
      { value: "Widowed", label: "Widowed" },
    ],
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g., +92-300-1234567",
  },
  {
    id: "emergencyContactName",
    label: "Emergency Contact Name",
    type: "text",
    placeholder: "e.g., Jane Doe",
  },
  {
    id: "emergencyContactRelationship",
    label: "Emergency Contact Relationship",
    type: "text",
    placeholder: "e.g., Spouse, Sibling",
  },
  {
    id: "emergencyPhoneNumber",
    label: "Emergency Phone Number",
    type: "tel",
    placeholder: "e.g., +92-333-9876543",
  },
  {
    id: "nationalId",
    label: "National ID (e.g., CNIC, SSN)",
    type: "text",
    placeholder: "e.g., 12345-6789012-3",
  },
  {
    id: "bankName",
    label: "Bank Name",
    type: "text",
    placeholder: "e.g., ABC Bank",
  },
  {
    id: "bankAccountNumber",
    label: "Bank Account Number",
    type: "text",
    placeholder: "e.g., 1234567890",
  },
  {
    id: "swiftCode",
    label: "SWIFT/BIC Code",
    type: "text",
    placeholder: "e.g., ABCDEFFGH",
  },
];

const visaInfoFields = [
  { id: "visaIssueDate", label: "Visa Issue Date", type: "date" },
  { id: "visaExpiryDate", label: "Visa Expiry Date", type: "date" },
  {
    id: "visaType",
    label: "Visa Type",
    type: "text",
    placeholder: "e.g., Work Permit, Dependent Visa",
  },
  {
    id: "passportNumber",
    label: "Passport Number",
    type: "text",
    placeholder: "e.g., AB1234567",
  },
  { id: "passportIssueDate", label: "Passport Issue Date", type: "date" },
  { id: "passportExpiryDate", label: "Passport Expiry Date", type: "date" },
  {
    id: "hostCountryOfWork",
    label: "Host Country of Work/Residence",
    type: "text",
    placeholder: "e.g., Germany",
  },
  {
    id: "hostCountryLocalPhoneNumber",
    label: "Host Country Local Phone",
    type: "tel",
    placeholder: "e.g., +49-176-12345678",
  },
  {
    id: "hostCountryTaxId",
    label: "Host Country Tax ID",
    type: "text",
    placeholder: "e.g., DE123456789",
  },
  { id: "dateOfAssignmentStart", label: "Assignment Start Date", type: "date" },
  {
    id: "expectedDateOfAssignmentEnd",
    label: "Assignment End Date",
    type: "date",
  },
];

const payrollFields = [
  { id: "basicSalary", label: "Basic Salary ($)", placeholder: "e.g., 80000" },
  { id: "hra", label: "HRA ($)", placeholder: "e.g., 20000" },
  { id: "conveyance", label: "Conveyance ($)", placeholder: "e.g., 5000" },
  {
    id: "medicalAllowance",
    label: "Medical Allowance ($)",
    placeholder: "e.g., 3000",
  },
  { id: "pfDeduction", label: "PF Deduction ($)", placeholder: "e.g., 5000" },
  { id: "taxDeduction", label: "Tax Deduction ($)", placeholder: "e.g., 7000" },
  {
    id: "loanDeduction",
    label: "Loan Deduction ($)",
    placeholder: "e.g., 2000",
  },
];

// Main App component
const AddEmployee = () => {
  // Initialize react-hook-form with memoized default values
  const { register, handleSubmit, control, watch, reset } = useForm({
    defaultValues: useMemo(() => defaultFormValues, []), // Memoize default values
  });

  const [message, setMessage] = useState(""); // State for displaying messages

  // Watch the isWorkingAbroad field to conditionally render visa info
  const isWorkingAbroad = watch("employmentDetails.isWorkingAbroad");

  // Use useCallback to memoize functions that are passed to child components or effects
  const resetVisaInfo = useCallback(() => {
    reset((prevFormData) => ({
      ...prevFormData,
      visaInfo: {
        visaIssueDate: "",
        visaExpiryDate: "",
        visaType: "",
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        hostCountryOfWork: "",
        hostCountryAddress: "",
        hostCountryLocalPhoneNumber: "",
        hostCountryTaxId: "",
        dateOfAssignmentStart: "",
        expectedDateOfAssignmentEnd: "",
      },
    }));
  }, [reset]); // Dependency array includes reset

  // Handle form submission
  const onSubmit = useCallback(
    (data) => {
      console.log("Employee Data Submitted:", data); // Log the form data
      // In a real application, you would send this data to a backend API
      setMessage(
        "Employee data submitted successfully! Check console for details."
      ); // Display message
      setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
      reset(defaultFormValues); // Reset form to initial default values
    },
    [reset]
  ); // Dependency array includes reset

  // Reusable Input Field Component
  // This helps in reducing repetitive JSX and makes the form more manageable.
  // Using React.memo for pure component optimization.
  const FormInputField = ({
    id,
    label,
    placeholder,
    type = "text",
    register,
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        inputMode={type === "number" ? "numeric" : undefined}
        {...register(id, { min: 0 })}
        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out ${
          type === "number"
            ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            : ""
        }`}
        placeholder={placeholder}
      />
    </div>
  );

  // Reusable Select Field Component
  const FormSelectField = React.memo(
    ({ id, label, options, control, className = "" }) => (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id={id}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out ${className}`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    )
  );

  // Reusable TextArea Field Component
  const FormTextAreaField = React.memo(
    ({ id, label, placeholder, register, rows = 3, className = "" }) => (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <textarea
          id={id}
          {...register(id)}
          rows={rows}
          className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out ${className}`}
          placeholder={placeholder}
        ></textarea>
      </div>
    )
  );

  return (
    // Main container with responsive padding and centering
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="section p-6 sm:p-8 rounded-lg shadow-xl w-full border border-gray-200 bg-white">
        {/* Message display for form submission */}
        {message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {/* Use handleSubmit from react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Employee Information Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Employee Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employeeInfoFields.map((field) => (
                <FormInputField key={field.id} {...field} register={register} />
              ))}
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalInfoFields.map((field) => {
                const idPath = `personalInfo.${field.id}`;
                if (field.type === "select") {
                  return (
                    <FormSelectField
                      key={idPath}
                      id={idPath}
                      label={field.label}
                      options={field.options}
                      control={control}
                    />
                  );
                }
                return (
                  <FormInputField
                    key={idPath}
                    id={idPath}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register}
                  />
                );
              })}
              <div className="md:col-span-2">
                <FormTextAreaField
                  id="personalInfo.currentAddress"
                  label="Current Residential Address"
                  placeholder="Street, City, State, Postal Code, Country"
                  register={register}
                />
              </div>
              <div className="md:col-span-2">
                <FormTextAreaField
                  id="personalInfo.permanentAddress"
                  label="Permanent Address"
                  placeholder="Street, City, State, Postal Code, Country (if different)"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* International Employment Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              International Employment
            </h2>
            <div className="flex items-center mb-4">
              <Controller
                name="employmentDetails.isWorkingAbroad"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="isWorkingAbroad"
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      // Call resetVisaInfo only if the checkbox is unchecked
                      if (!e.target.checked) {
                        resetVisaInfo();
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                )}
              />
              <label
                htmlFor="isWorkingAbroad"
                className="ml-2 block text-base font-medium text-gray-700"
              >
                Is employee working abroad?
              </label>
            </div>

            {/* Visa Information Section (conditionally rendered) */}
            {isWorkingAbroad && (
              <div className="border border-gray-200 rounded-lg p-4 bg-white mt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Visa & Passport Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visaInfoFields.map((field) => {
                    const idPath = `visaInfo.${field.id}`;
                    return (
                      <FormInputField
                        key={idPath}
                        id={idPath}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        register={register}
                      />
                    );
                  })}
                  <div className="md:col-span-2">
                    <FormTextAreaField
                      id="visaInfo.hostCountryAddress"
                      label="Host Country Residential Address"
                      placeholder="Street, City, State, Postal Code, Country in host country"
                      register={register}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payroll Information Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Payroll Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {payrollFields.map((field) => (
                <FormInputField
                  key={`payroll.${field.id}`}
                  id={`payroll.${field.id}`}
                  label={field.label}
                  placeholder={field.placeholder}
                  type="number" // Assuming these are numeric inputs
                  register={register}
                />
              ))}
              <div>
                <label
                  htmlFor="payroll.status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payroll Status
                </label>
                <Controller
                  name="payroll.status"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="payroll.status"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    >
                      <option value="Processed">Processed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="payroll.payrollMonth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payroll Month
                </label>
                <input
                  type="month"
                  id="payroll.payrollMonth"
                  {...register("payroll.payrollMonth")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
              <div className="flex items-center mt-2">
                <Controller
                  name="payroll.extractedFromPayment"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="extractedFromPayment"
                      {...field}
                      checked={field.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <label
                  htmlFor="extractedFromPayment"
                  className="ml-2 block text-base font-medium text-gray-700"
                >
                  Extracted from Payment
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
