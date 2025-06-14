// EmployeeProfile.js
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // New import for Badge component
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react"; // Lucide edit icon
// ---
// Helper Component for displaying individual profile details
// ---
const ProfileDetail = ({ label, value, currency = false }) => {
  // Don't render the detail if the value is null, undefined, or an empty string
  if (value === null || value === undefined || value === "") {
    return null;
  }

  let displayedValue = value;
  if (typeof value === "boolean") {
    displayedValue = value ? "Yes" : "No";
  } else if (currency) {
    // Format as currency (e.g., $80,000)
    displayedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimal cents for whole dollars
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-base font-semibold text-foreground">
        {displayedValue}
      </span>
    </div>
  );
};

// ---
// Employee Profile Page Component
// ---
const EmployeeProfile = ({ employee }) => {
  // Display a fallback message if no employee data is provided
  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="mb-4">No Employee Data</CardTitle>
          <CardContent>
            <p className="text-muted-foreground">
              Please provide employee data to display the profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    employeeId,
    name,
    department,
    position,
    status,
    email,
    joiningDate,
    workingHours,
    personalInfo,
    employmentDetails,
    visaInfo,
    payroll,
    profilePicture,
  } = employee;

  // Generate initials for AvatarFallback
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "N/A";

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-5xl  space-y-6">
        {/* Main Profile Header Card - At-a-glance overview */}

        <Card className="relative flex flex-col sm:flex-row items-center p-6 gap-6 bg-card text-card-foreground shadow-lg">
          {/* Edit Button in top-right corner */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
          >
            <Pencil className="h-5 w-5" />
          </Button>

          {/* Avatar */}
          <Avatar className="h-28 w-28 sm:h-36 sm:w-36 border-4 border-primary shadow-lg transition-transform duration-300 hover:scale-105">
            <AvatarImage
              src={profilePicture}
              alt={`${name}'s profile picture`}
            />
            <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Info Section */}
          <div className="text-center sm:text-left flex-grow">
            <CardTitle className="text-3xl sm:text-4xl font-extrabold leading-tight text-foreground">
              {name}
            </CardTitle>
            <p className="text-xl text-muted-foreground mt-1 font-semibold">
              {position}
              {department && (
                <span className="ml-2 text-primary">| {department}</span>
              )}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 mt-3 text-sm text-muted-foreground">
              <span className="font-medium">Employee ID: {employeeId}</span>
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block mx-1"
              />
              <Badge
                variant="outline"
                className="text-xs font-semibold px-2 py-1 rounded-full border-2"
              >
                {status}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-muted-foreground">
              <ProfileDetail label="Email" value={email} />
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block mx-1"
              />
              <ProfileDetail label="Phone" value={personalInfo.phoneNumber} />
            </div>
          </div>
        </Card>

        {/* Employment Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Employment Overview</CardTitle>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProfileDetail label="Joining Date" value={joiningDate} />
              <ProfileDetail label="Working Hours" value={workingHours} />
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProfileDetail
                label="Father's Name"
                value={personalInfo.fatherName}
              />
              <ProfileDetail
                label="Date of Birth"
                value={personalInfo.dateOfBirth}
              />
              <ProfileDetail label="Gender" value={personalInfo.gender} />
              <ProfileDetail
                label="Nationality"
                value={personalInfo.nationality}
              />
              <ProfileDetail
                label="Marital Status"
                value={personalInfo.maritalStatus}
              />
              <ProfileDetail
                label="Emergency Contact Name"
                value={personalInfo.emergencyContactName}
              />
              <ProfileDetail
                label="Emergency Relationship"
                value={personalInfo.emergencyContactRelationship}
              />
              <ProfileDetail
                label="Emergency Phone"
                value={personalInfo.emergencyPhoneNumber}
              />
              <ProfileDetail
                label="National ID"
                value={personalInfo.nationalId}
              />
              <ProfileDetail label="Bank Name" value={personalInfo.bankName} />
              <ProfileDetail
                label="Bank Account No."
                value={personalInfo.bankAccountNumber}
              />
              <ProfileDetail
                label="SWIFT/BIC Code"
                value={personalInfo.swiftCode}
              />
              <div className="sm:col-span-2 lg:col-span-3">
                <ProfileDetail
                  label="Current Residential Address"
                  value={personalInfo.currentAddress}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <ProfileDetail
                  label="Permanent Address"
                  value={personalInfo.permanentAddress}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Employment Section */}
        <Card>
          <CardHeader>
            <CardTitle>International Employment</CardTitle>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <ProfileDetail
                label="Working Abroad"
                value={employmentDetails.isWorkingAbroad}
              />
            </div>

            {/* Visa Information Section (conditionally rendered as a nested card) */}
            {employmentDetails.isWorkingAbroad && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Visa & Passport Information
                  </CardTitle>
                  <Separator className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProfileDetail
                      label="Visa Issue Date"
                      value={visaInfo.visaIssueDate}
                    />
                    <ProfileDetail
                      label="Visa Expiry Date"
                      value={visaInfo.visaExpiryDate}
                    />
                    <ProfileDetail
                      label="Visa Type"
                      value={visaInfo.visaType}
                    />
                    <ProfileDetail
                      label="Passport Number"
                      value={visaInfo.passportNumber}
                    />
                    <ProfileDetail
                      label="Passport Issue Date"
                      value={visaInfo.passportIssueDate}
                    />
                    <ProfileDetail
                      label="Passport Expiry Date"
                      value={visaInfo.passportExpiryDate}
                    />
                    <ProfileDetail
                      label="Host Country"
                      value={visaInfo.hostCountryOfWork}
                    />
                    <ProfileDetail
                      label="Host Country Local Phone"
                      value={visaInfo.hostCountryLocalPhoneNumber}
                    />
                    <ProfileDetail
                      label="Host Country Tax ID"
                      value={visaInfo.hostCountryTaxId}
                    />
                    <ProfileDetail
                      label="Assignment Start Date"
                      value={visaInfo.dateOfAssignmentStart}
                    />
                    <ProfileDetail
                      label="Assignment End Date"
                      value={visaInfo.expectedDateOfAssignmentEnd}
                    />
                    <div className="sm:col-span-2 lg:col-span-3">
                      <ProfileDetail
                        label="Host Country Residential Address"
                        value={visaInfo.hostCountryAddress}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Payroll Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Information</CardTitle>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProfileDetail
                label="Basic Salary"
                value={payroll.basicSalary}
                currency
              />
              <ProfileDetail label="HRA" value={payroll.hra} currency />
              <ProfileDetail
                label="Conveyance"
                value={payroll.conveyance}
                currency
              />
              <ProfileDetail
                label="Medical Allowance"
                value={payroll.medicalAllowance}
                currency
              />
              <ProfileDetail
                label="PF Deduction"
                value={payroll.pfDeduction}
                currency
              />
              <ProfileDetail
                label="Tax Deduction"
                value={payroll.taxDeduction}
                currency
              />
              <ProfileDetail
                label="Loan Deduction"
                value={payroll.loanDeduction}
                currency
              />
              <ProfileDetail label="Payroll Status" value={payroll.status} />
              <ProfileDetail
                label="Payroll Month"
                value={payroll.payrollMonth}
              />
              <ProfileDetail
                label="Extracted from Payment"
                value={payroll.extractedFromPayment}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeProfile;
