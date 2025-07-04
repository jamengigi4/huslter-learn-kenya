import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import CertificateRequestForm from "./CertificateRequestForm";

const FloatingCertificateButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsFormOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-primary text-white"
          size="icon"
        >
          <Award className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-20 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
          Get My Certificate
        </div>
      </div>

      <CertificateRequestForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default FloatingCertificateButton;