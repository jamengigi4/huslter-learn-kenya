import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, X } from "lucide-react";

const whatsappJoinSchema = z.object({
  whatToLearn: z.string().min(1, "Please tell us what you want to learn"),
  age: z.string().min(1, "Please enter your age"),
  whyChooseUs: z.string().min(10, "Please tell us why you chose Microlearning Hub (minimum 10 characters)"),
});

type WhatsAppJoinForm = z.infer<typeof whatsappJoinSchema>;

interface WhatsAppJoinFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppJoinForm = ({ isOpen, onClose }: WhatsAppJoinFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<WhatsAppJoinForm>({
    resolver: zodResolver(whatsappJoinSchema),
    defaultValues: {
      whatToLearn: "",
      age: "",
      whyChooseUs: "",
    },
  });

  const onSubmit = async (data: WhatsAppJoinForm) => {
    setIsSubmitting(true);
    
    try {
      // Format the message for WhatsApp
      const message = `🎓 NEW LEARNER REGISTRATION\n\n` +
        `📚 What they want to learn: ${data.whatToLearn}\n` +
        `🎂 Age: ${data.age}\n` +
        `💭 Why they chose Microlearning Hub: ${data.whyChooseUs}\n\n` +
        `Submitted at: ${new Date().toLocaleString()}`;

      // WhatsApp API URL with pre-filled message
      const whatsappUrl = `https://wa.me/254710654707?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Registration Submitted!",
        description: "Your details have been sent to our WhatsApp. We'll get back to you shortly!",
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
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              Join WhatsApp Learning
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
              name="whatToLearn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to learn?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Digital marketing, Hair braiding, English communication..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whyChooseUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why did you choose Microlearning Hub?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what attracted you to our platform..."
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
                variant="whatsapp"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Join WhatsApp"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          🔒 Your data is safe and used only for learning experience. No spam, no resale.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppJoinForm;