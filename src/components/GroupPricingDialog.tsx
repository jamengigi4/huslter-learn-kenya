import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroupPricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupPricingDialog: React.FC<GroupPricingDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    phone: '',
    numberOfLearners: '',
    courseInterest: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const courses = [
    'Gmail Mastery for Hustlers',
    'WhatsApp Business Setup',
    'Excel for Small Business',
    'Social Media Marketing Basics',
    'All Courses (Bundle)',
    'Custom Training Package'
  ];

  const learnerRanges = [
    '5-10 learners',
    '11-25 learners',
    '26-50 learners',
    '51-100 learners',
    '100+ learners'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.institution.trim() || !formData.phone.trim() || 
        !formData.numberOfLearners || !formData.courseInterest) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const message = `GROUP PRICING INQUIRY

Contact Details:
Name: ${formData.name}
Institution: ${formData.institution}
Phone: ${formData.phone}

Training Requirements:
Number of Learners: ${formData.numberOfLearners}
Course Interest: ${formData.courseInterest}

Additional Information:
${formData.additionalInfo || 'None provided'}

Inquiry Date: ${new Date().toLocaleString()}

Please provide group pricing and training options.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Inquiry Sent!",
        description: "Our team will contact you within 2 hours with custom pricing.",
      });
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      institution: '',
      phone: '',
      numberOfLearners: '',
      courseInterest: '',
      additionalInfo: ''
    });
    setIsSubmitting(false);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {isSubmitted ? 'Inquiry Submitted!' : 'Group Training Inquiry'}
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Get custom pricing for training 5+ people. We offer significant discounts for groups and institutions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Contact Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Institution/Organization *</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  placeholder="Company, school, or organization name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Number of Learners *</label>
                <Select value={formData.numberOfLearners} onValueChange={(value) => handleInputChange('numberOfLearners', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select learner range" />
                  </SelectTrigger>
                  <SelectContent>
                    {learnerRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Course Interest *</label>
                <Select value={formData.courseInterest} onValueChange={(value) => handleInputChange('courseInterest', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course or training package" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Additional Information</label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Training timeline, specific requirements, budget range, etc."
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Group Benefits:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Up to 70% discount for large groups</li>
                <li>• Dedicated training coordinator</li>
                <li>• Custom training schedules</li>
                <li>• Bulk certificate processing</li>
                <li>• Progress tracking for all learners</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Get Group Pricing'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div>
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-success mb-2">Inquiry Submitted!</h3>
              <p className="text-muted-foreground">
                Your group training inquiry has been sent to our team.
              </p>
            </div>

            <div className="bg-success/10 border-success/20 p-4 rounded-lg">
              <div className="space-y-2">
                <h4 className="font-semibold">What happens next?</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Our team will review your requirements</li>
                  <li>• You'll receive a custom quote within 2 hours</li>
                  <li>• We'll schedule a consultation call if needed</li>
                  <li>• Training can start as soon as next week</li>
                </ul>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p>📱 Urgent? Call/WhatsApp: +254 710 654 707</p>
            </div>

            <Button onClick={handleClose} variant="success" className="w-full">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupPricingDialog;