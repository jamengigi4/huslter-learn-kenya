
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroupRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupRegistrationForm = ({ isOpen, onClose }: GroupRegistrationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    groupName: '',
    representativeName: '',
    phone: '',
    email: '',
    members: '',
    selectedCourses: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.representativeName || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const message = `Group Registration\n\nGroup Name: ${formData.groupName}\nRepresentative: ${formData.representativeName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nSelected Courses: ${formData.selectedCourses}\n\nMembers List:\n${formData.members}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close
    setFormData({
      groupName: '',
      representativeName: '',
      phone: '',
      email: '',
      members: '',
      selectedCourses: ''
    });
    
    setIsSubmitting(false);
    onClose();
    
    toast({
      title: "📚 Group registration received!",
      description: "We'll contact you shortly.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Contact Learning - Group Registration
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name (if applicable)</Label>
              <Input
                id="groupName"
                value={formData.groupName}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
                placeholder="Enter group/organization name"
              />
            </div>
            
            <div>
              <Label htmlFor="representativeName">Representative Full Name *</Label>
              <Input
                id="representativeName"
                value={formData.representativeName}
                onChange={(e) => handleInputChange('representativeName', e.target.value)}
                placeholder="Enter representative's full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="selectedCourses">Selected Course(s)</Label>
              <Input
                id="selectedCourses"
                value={formData.selectedCourses}
                onChange={(e) => handleInputChange('selectedCourses', e.target.value)}
                placeholder="e.g., Gmail Mastery, WhatsApp Business Setup"
              />
            </div>
            
            <div>
              <Label htmlFor="members">List of Members</Label>
              <Textarea
                id="members"
                value={formData.members}
                onChange={(e) => handleInputChange('members', e.target.value)}
                placeholder="Please list each member with their full name and National ID number (one per line)&#10;Example:&#10;John Doe - ID: 12345678&#10;Jane Smith - ID: 87654321"
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include full names and National ID numbers for each member
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              variant="success"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Group Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupRegistrationForm;
