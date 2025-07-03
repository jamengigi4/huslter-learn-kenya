import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, X } from "lucide-react";

const partnershipSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  organizationName: z.string().min(2, "Organization name is required"),
  officialTitle: z.string().min(2, "Official title is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  partnershipTypes: z.array(z.string()).min(1, "Please select at least one partnership type"),
  description: z.string().min(20, "Please provide a brief description (minimum 20 characters)"),
  website: z.string().optional(),
});

type PartnershipForm = z.infer<typeof partnershipSchema>;

interface PartnershipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const partnershipTypes = [
  "Content Contributor",
  "Certificate & Accreditation Partner",
  "Sponsorship/CSR",
  "Data/Research Access Partner",
  "Platform Co-Owner or Angel Supporter",
  "Government/County Collaboration",
];

const PartnershipForm = ({ isOpen, onClose }: PartnershipFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<PartnershipForm>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      fullName: "",
      organizationName: "",
      officialTitle: "",
      phoneNumber: "",
      email: "",
      partnershipTypes: [],
      description: "",
      website: "",
    },
  });

  const onSubmit = async (data: PartnershipForm) => {
    setIsSubmitting(true);
    
    try {
      // Format the message for WhatsApp
      const message = `🤝 NEW PARTNERSHIP INQUIRY\n\n` +
        `👤 Representative: ${data.fullName}\n` +
        `🏢 Organization: ${data.organizationName}\n` +
        `📋 Title/Role: ${data.officialTitle}\n` +
        `📱 Phone: ${data.phoneNumber}\n` +
        `📧 Email: ${data.email}\n` +
        `🎯 Partnership Types: ${data.partnershipTypes.join(", ")}\n` +
        `📝 Description: ${data.description}\n` +
        `🌐 Website: ${data.website || "Not provided"}\n\n` +
        `Submitted at: ${new Date().toLocaleString()}`;

      // WhatsApp API URL with pre-filled message
      const whatsappUrl = `https://wa.me/254710654707?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Store submission (in a real app, this would go to a database)
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
      };
      
      // Save to localStorage as backup (in production, use proper backend)
      const existingSubmissions = JSON.parse(localStorage.getItem('partnershipSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('partnershipSubmissions', JSON.stringify(existingSubmissions));
      
      toast({
        title: "Partnership Inquiry Submitted!",
        description: "Thank you for submitting your partnership details! Our team will reach out to you shortly.",
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Partnership Application
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name of Representative</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization/Institution Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="officialTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official Title or Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Director, Program Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (WhatsApp preferred)</FormLabel>
                    <FormControl>
                      <Input placeholder="+254 xxx xxx xxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@organization.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partnershipTypes"
              render={() => (
                <FormItem>
                  <FormLabel>Type of Partnership Desired (select all that apply)</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {partnershipTypes.map((type) => (
                      <FormField
                        key={type}
                        control={form.control}
                        name="partnershipTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={type}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== type
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {type}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description of Your Interest in Partnering</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your organization's goals and how you'd like to partner with Microlearning Hub..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website or Social Media Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com or @yourhandle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Partnership Application"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          🔒 Your partnership details will be securely stored and sent to our team for review.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnershipForm;