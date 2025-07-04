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
import { useToast } from "@/hooks/use-toast";
import { Award, X, Star } from "lucide-react";

const certificateRequestSchema = z.object({
  fullName: z.string().min(2, "Please enter your full official name"),
  courseCompleted: z.string().min(1, "Please select the course you completed"),
  whatsappNumber: z.string().min(10, "Please enter a valid WhatsApp number"),
  dateCompleted: z.string().optional(),
  rating: z.string().min(1, "Please rate the course"),
  feedback: z.string().min(10, "Please share what was most valuable about the course (minimum 10 characters)"),
});

type CertificateRequestForm = z.infer<typeof certificateRequestSchema>;

interface CertificateRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateRequestForm = ({ isOpen, onClose }: CertificateRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CertificateRequestForm>({
    resolver: zodResolver(certificateRequestSchema),
    defaultValues: {
      fullName: "",
      courseCompleted: "",
      whatsappNumber: "",
      dateCompleted: "",
      rating: "",
      feedback: "",
    },
  });

  const onSubmit = async (data: CertificateRequestForm) => {
    setIsSubmitting(true);
    
    try {
      // Format the message for WhatsApp
      const ratingStars = "⭐".repeat(parseInt(data.rating));
      const message = `📥 CERTIFICATE REQUEST\n\n` +
        `Name: ${data.fullName}\n` +
        `Course: ${data.courseCompleted}\n` +
        `WhatsApp: ${data.whatsappNumber}\n` +
        `Completed on: ${data.dateCompleted || 'Not specified'}\n` +
        `Rating: ${ratingStars}\n` +
        `Feedback: ${data.feedback}\n\n` +
        `Submitted at: ${new Date().toLocaleString()}`;

      // WhatsApp API URL with pre-filled message
      const whatsappUrl = `https://wa.me/254710654707?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "🎉 Thank you!",
        description: "Your certificate will be generated and sent to your WhatsApp shortly.",
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Request Your Certificate
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Official Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="As it should appear on your certificate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Completed</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the course you completed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Gmail Mastery for Hustlers">Gmail Mastery for Hustlers</SelectItem>
                      <SelectItem value="WhatsApp Business Setup">WhatsApp Business Setup</SelectItem>
                      <SelectItem value="Future Courses...">Future Courses...</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+254 712 345 678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Completed (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you rate the course? (1-5 stars)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">⭐ 1 Star</SelectItem>
                      <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What was most valuable about the course?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience and what you learned..."
                      {...field}
                    />
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
                {isSubmitting ? "Sending..." : "Request Certificate"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          📄 If needed urgently, contact us directly via +254 710 654 707
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateRequestForm;