import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    courseDone: '',
    whatsappNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const courses = [
    'Gmail Mastery for Hustlers',
    'WhatsApp Business Setup',
    'Excel for Small Business',
    'Social Media Marketing Basics'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName.trim() || !formData.courseDone || !formData.whatsappNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const message = `CERTIFICATE REQUEST

Student Details:
Full Name: ${formData.fullName}
Course Completed: ${formData.courseDone}
WhatsApp: ${formData.whatsappNumber}
Request Date: ${new Date().toLocaleString()}

Please process certificate for the above student.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Certificate Request Sent!",
        description: "You'll receive your certificate via WhatsApp within 24 hours.",
      });
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      courseDone: '',
      whatsappNumber: ''
    });
    setIsSubmitting(false);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {isSubmitted ? 'Request Submitted!' : 'Get Your Certificate'}
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Request your course completion certificate. Make sure you've finished all lessons and passed the quiz.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name as it should appear on certificate"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Course Completed *</label>
                <Select value={formData.courseDone} onValueChange={(value) => handleInputChange('courseDone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the course you completed" />
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
                <label className="text-sm font-medium">WhatsApp Number *</label>
                <Input
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Certificate Requirements:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Complete all course lessons</li>
                <li>• Pass the final quiz (70% minimum)</li>
                <li>• Provide accurate personal information</li>
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
                {isSubmitting ? 'Submitting...' : 'Request Certificate'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div>
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-success mb-2">Request Submitted!</h3>
              <p className="text-muted-foreground">
                Your certificate request has been sent to our team.
              </p>
            </div>

            <div className="bg-success/10 border-success/20 p-4 rounded-lg">
              <div className="space-y-2">
                <h4 className="font-semibold">What happens next?</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Your completion will be verified</li>
                  <li>• Certificate will be generated with your name</li>
                  <li>• You'll receive it via WhatsApp within 24 hours</li>
                  <li>• Digital certificate in PDF format</li>
                </ul>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p>📱 Questions? WhatsApp: +254 710 654 707</p>
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

export default CertificateDialog;