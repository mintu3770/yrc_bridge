import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RequestHelpModal = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    resourceType: '',
    urgency: '',
    description: '',
    location: '',
    contactMethod: '',
    emergencyContact: '',
    specificRequirements: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState({});

  const resourceTypeOptions = [
    { value: 'blood-donation', label: 'Blood Donation' },
    { value: 'financial-aid', label: 'Financial Aid' },
    { value: 'medical-supplies', label: 'Medical Supplies' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food-assistance', label: 'Food Assistance' },
    { value: 'emergency-shelter', label: 'Emergency Shelter' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyOptions = [
    { value: 'critical', label: 'Critical - Immediate attention needed' },
    { value: 'high', label: 'High - Within 24 hours' },
    { value: 'medium', label: 'Medium - Within 3 days' },
    { value: 'low', label: 'Low - Within a week' }
  ];

  const contactMethodOptions = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'sms', label: 'SMS/Text Message' },
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.resourceType) newErrors.resourceType = 'Please select a resource type';
      if (!formData?.urgency) newErrors.urgency = 'Please select urgency level';
    } else if (step === 2) {
      if (!formData?.description?.trim()) newErrors.description = 'Please provide a description';
      if (!formData?.location?.trim()) newErrors.location = 'Please provide your location';
    } else if (step === 3) {
      if (!formData?.contactMethod) newErrors.contactMethod = 'Please select a contact method';
      if (!formData?.emergencyContact?.trim()) newErrors.emergencyContact = 'Please provide emergency contact';
      if (!formData?.agreedToTerms) newErrors.agreedToTerms = 'Please agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      onSubmit(formData);
      setCurrentStep(1);
      setFormData({
        resourceType: '',
        urgency: '',
        description: '',
        location: '',
        contactMethod: '',
        emergencyContact: '',
        specificRequirements: '',
        agreedToTerms: false
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">What type of help do you need?</h3>
        <Select
          label="Resource Type"
          options={resourceTypeOptions}
          value={formData?.resourceType}
          onChange={(value) => handleInputChange('resourceType', value)}
          error={errors?.resourceType}
          required
        />
      </div>

      <div>
        <Select
          label="Urgency Level"
          description="How quickly do you need assistance?"
          options={urgencyOptions}
          value={formData?.urgency}
          onChange={(value) => handleInputChange('urgency', value)}
          error={errors?.urgency}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Tell us more details</h3>
        <div className="space-y-4">
          <Input
            label="Description"
            type="text"
            placeholder="Please describe your situation and specific needs..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            error={errors?.description}
            required
            className="min-h-[100px]"
          />

          <Input
            label="Location"
            type="text"
            placeholder="Your current location or where help is needed"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            error={errors?.location}
            required
          />

          <Input
            label="Specific Requirements (Optional)"
            type="text"
            placeholder="Any specific requirements or additional information..."
            value={formData?.specificRequirements}
            onChange={(e) => handleInputChange('specificRequirements', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Contact Information</h3>
        <div className="space-y-4">
          <Select
            label="Preferred Contact Method"
            options={contactMethodOptions}
            value={formData?.contactMethod}
            onChange={(value) => handleInputChange('contactMethod', value)}
            error={errors?.contactMethod}
            required
          />

          <Input
            label="Emergency Contact"
            type="text"
            placeholder="Phone number or contact details for emergencies"
            value={formData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            error={errors?.emergencyContact}
            required
          />

          <div className="pt-4 border-t border-border">
            <Checkbox
              label="I agree to the terms and conditions and privacy policy"
              description="By submitting this request, you agree to share necessary information with volunteers and YRC administrators."
              checked={formData?.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e?.target?.checked)}
              error={errors?.agreedToTerms}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={20} color="white" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">Request Help</h2>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={handleClose} />
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-muted/50">
          <div className="flex items-center space-x-2">
            {[1, 2, 3]?.map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 rounded ${
                    step < currentStep ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} iconName="ChevronLeft" iconPosition="left">
                Previous
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button variant="default" onClick={handleNext} iconName="ChevronRight" iconPosition="right">
                Next
              </Button>
            ) : (
              <Button variant="default" onClick={handleSubmit} iconName="Send" iconPosition="left">
                Submit Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHelpModal;