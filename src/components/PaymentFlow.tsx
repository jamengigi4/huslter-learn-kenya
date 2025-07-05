import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'free' | 'full' | 'premium';
  amount: number;
  onPaymentSuccess: (accessCode: string) => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  isOpen,
  onClose,
  planType,
  amount,
  onPaymentSuccess
}) => {
  const [step, setStep] = useState<'payment' | 'confirmation' | 'success'>('payment');
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const { toast } = useToast();

  const tillNumber = '705768';
  
  const generateAccessCode = () => {
    const codes = {
      free: '2024-FREE-MHUB',
      full: `${Math.floor(1000 + Math.random() * 9000)}-MHUB-KES${amount}`,
      premium: `${Math.floor(1000 + Math.random() * 9000)}-CERT-KES${amount}`
    };
    return codes[planType];
  };

  const handlePaymentClick = () => {
    // Send admin notification via WhatsApp
    const adminMessage = `New Payment Initiated\n\nPlan: ${planType.toUpperCase()}\nAmount: KES ${amount}\nTill: ${tillNumber}\nTime: ${new Date().toLocaleString()}\n\nPlease verify payment and issue access code.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(adminMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setStep('confirmation');
    toast({
      title: "Payment Instructions Sent",
      description: "Admin has been notified. Complete your M-Pesa payment and paste the confirmation message.",
    });
  };

  const handleConfirmPayment = async () => {
    if (!mpesaMessage.trim()) {
      toast({
        title: "Missing Confirmation",
        description: "Please paste your M-Pesa confirmation message.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const generatedCode = generateAccessCode();
      setAccessCode(generatedCode);
      
      // Send confirmation to admin with M-Pesa details
      const confirmationMessage = `Payment Confirmation Received\n\nPlan: ${planType.toUpperCase()}\nAmount: KES ${amount}\nGenerated Code: ${generatedCode}\nM-Pesa Message: ${mpesaMessage}\nTime: ${new Date().toLocaleString()}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(confirmationMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      setStep('success');
      setIsProcessing(false);
      
      toast({
        title: "Payment Confirmed!",
        description: `Your access code is: ${generatedCode}`,
      });

      onPaymentSuccess(generatedCode);
    }, 2000);
  };

  const downloadReceipt = () => {
    const receiptContent = `
MICROLEARNING HUB - PAYMENT CONFIRMATION

Payment Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Plan: ${planType.toUpperCase()} ACCESS
Amount Paid: KES ${amount}
Till Number: ${tillNumber}
Date: ${new Date().toLocaleString()}
Access Code: ${accessCode}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for your payment!

Your access code: ${accessCode}
Use this code to unlock your premium courses.

Contact: +254 710 654 707
WhatsApp: https://wa.me/254710654707

microlearninghub.co.ke
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `microlearning-receipt-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Receipt Downloaded",
      description: "Your payment receipt has been saved to your downloads.",
    });
  };

  const resetFlow = () => {
    setStep('payment');
    setMpesaMessage('');
    setAccessCode('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'payment' && '💳 Complete Payment'}
            {step === 'confirmation' && '📱 Confirm Payment'}
            {step === 'success' && '✅ Payment Successful'}
          </DialogTitle>
        </DialogHeader>

        {step === 'payment' && (
          <div className="space-y-6">
            <Card className="bg-gradient-primary text-white">
              <CardHeader>
                <CardTitle className="text-xl">Payment Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg font-semibold">
                  Pay KES {amount} via M-Pesa
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Payment Method:</strong><br />
                      M-Pesa → Lipa na M-Pesa → Buy Goods
                    </div>
                    <div>
                      <strong>Till Number:</strong><br />
                      <span className="text-2xl font-bold">{tillNumber}</span>
                    </div>
                    <div>
                      <strong>Amount:</strong><br />
                      KES {amount}
                    </div>
                    <div>
                      <strong>Reference:</strong><br />
                      MHUB-{planType.toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-2">Important:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Complete the M-Pesa payment first</li>
                    <li>• You'll receive an M-Pesa confirmation SMS</li>
                    <li>• Copy and paste that message in the next step</li>
                    <li>• You'll get your access code immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePaymentClick} className="flex-1">
                I've Made the Payment
              </Button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">
                  Paste your M-Pesa confirmation message below to verify payment
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">M-Pesa Confirmation Message:</label>
              <Textarea
                value={mpesaMessage}
                onChange={(e) => setMpesaMessage(e.target.value)}
                placeholder="e.g., MPESA.XX123 Confirmed. You have sent Ksh 100.00 to..."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Copy the entire SMS message you received from M-Pesa
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('payment')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleConfirmPayment} 
                disabled={isProcessing || !mpesaMessage.trim()}
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="mx-auto">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-success mb-2">Payment Confirmed!</h3>
              <p className="text-muted-foreground">
                Your payment has been processed successfully.
              </p>
            </div>

            <Card className="bg-success/10 border-success/20">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Your Access Code:</p>
                  <div className="bg-background p-3 rounded-lg border-2 border-success">
                    <code className="text-lg font-bold text-success">{accessCode}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Save this code - you'll need it to access your courses
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button onClick={downloadReceipt} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button onClick={handleClose} variant="success" className="w-full">
                Continue to Courses
              </Button>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p>📱 WhatsApp: +254 710 654 707</p>
              <p>📧 Need help? Contact our support team</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFlow;