
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessCertificationFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'access' | 'certification';
}

const AccessCertificationForm = ({ isOpen, onClose, type }: AccessCertificationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courses: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const title = type === 'access' ? 'Full Access Request' : 'Certification Request';
    const message = `${title}\n\nFull Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourses Interested: ${formData.courses}\nReason: ${formData.reason}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courses: '',
      reason: ''
    });
    
    setIsSubmitting(false);
    onClose();
    
    toast({
      title: "🎉 Thank you!",
      description: "Our team will get back to you shortly.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              {type === 'access' ? 'Get Full Access' : 'Get Certified'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone (WhatsApp preferred) *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="courses">Course(s) Interested In</Label>
              <Input
                id="courses"
                value={formData.courses}
                onChange={(e) => handleInputChange('courses', e.target.value)}
                placeholder="e.g., Gmail Mastery, WhatsApp Business"
              />
            </div>
            
            <div>
              <Label htmlFor="reason">
                Reason for Wanting {type === 'access' ? 'Full Access' : 'Certification'}
              </Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Tell us why you need this..."
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              variant="success"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessCertificationForm;
