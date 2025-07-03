import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import WhatsAppJoinForm from "./WhatsAppJoinForm";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppFormOpen, setIsWhatsAppFormOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Microlearning Hub</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">"Learn Daily. Grow Steady."</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-foreground hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Success Stories
            </a>
            <a href="#partners" className="text-foreground hover:text-primary transition-colors">
              Partners
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="learning" 
              size="sm"
              onClick={() => scrollToSection('courses')}
            >
              Start Learning
            </Button>
            <Button 
              variant="whatsapp" 
              size="sm"
              onClick={() => setIsWhatsAppFormOpen(true)}
            >
              Join WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <a href="#courses" className="text-foreground hover:text-primary transition-colors py-2">
                Courses
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors py-2">
                Success Stories
              </a>
              <a href="#partners" className="text-foreground hover:text-primary transition-colors py-2">
                Partners
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors py-2">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="learning" 
                  size="sm"
                  onClick={() => {
                    scrollToSection('courses');
                    setIsMenuOpen(false);
                  }}
                >
                  Start Learning
                </Button>
                <Button 
                  variant="whatsapp" 
                  size="sm"
                  onClick={() => {
                    setIsWhatsAppFormOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Join WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      <WhatsAppJoinForm 
        isOpen={isWhatsAppFormOpen} 
        onClose={() => setIsWhatsAppFormOpen(false)} 
      />
    </header>
  );
};

export default Header;