import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: (accessCode: string) => void;
}

const AccessCodeDialog: React.FC<AccessCodeDialogProps> = ({
  isOpen,
  onClose,
  onAccessGranted
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Valid access codes (in real app, this would be verified with backend)
  const validCodes = [
    '2024-FREE-MHUB',
    /^\d{4}-MHUB-KES\d+$/,
    /^\d{4}-CERT-KES\d+$/
  ];

  const isValidCode = (code: string) => {
    return validCodes.some(pattern => {
      if (typeof pattern === 'string') {
        return code === pattern;
      } else {
        return pattern.test(code);
      }
    });
  };

  const handleVerifyCode = async () => {
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    setTimeout(() => {
      if (isValidCode(accessCode.trim())) {
        toast({
          title: "Access Granted!",
          description: "You now have access to premium content.",
        });
        onAccessGranted(accessCode.trim());
        handleClose();
      } else {
        setError('Invalid access code. Please check and try again.');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleClose = () => {
    setAccessCode('');
    setError('');
    setIsVerifying(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Enter Access Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-primary/10 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">
                Enter the access code you received after payment to unlock premium courses.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Access Code:</label>
            <Input
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setError('');
              }}
              placeholder="e.g., 1234-MHUB-KES100"
              className="text-center font-mono"
            />
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">Don't have an access code?</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Complete payment in the Pricing section</li>
              <li>• Check your M-Pesa confirmation SMS</li>
              <li>• Contact +254 710 654 707 for help</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleVerifyCode}
              disabled={isVerifying || !accessCode.trim()}
              className="flex-1"
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessCodeDialog;