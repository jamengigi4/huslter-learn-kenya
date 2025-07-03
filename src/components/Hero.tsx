import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, BookOpen, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                This is a{" "}
                <span className="text-success animate-pulse-glow">Digital School</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Learn anywhere, anytime with{" "}
                <span className="font-semibold text-success">5-minute daily lessons</span> via WhatsApp
              </p>
              <p className="text-lg text-white/80">
                Built for hustlers, students, and everyday Kenyans. First 2 courses are FREE! 🎓
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-success" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Learners</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-success" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Lessons</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-success" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="success" 
                size="xl" 
                className="group"
                onClick={() => scrollToSection('courses')}
              >
                Start Free Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-white/70">
                Trusted by{" "}
                <span className="font-semibold text-white">Zetech University</span>,{" "}
                <span className="font-semibold text-white">TUK</span>, and{" "}
                <span className="font-semibold text-white">10+ institutions</span>
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-float">
            <div className="relative">
              <img
                src={heroImage}
                alt="Students learning on mobile devices"
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-medium animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#25D366] rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">WhatsApp Learning</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-success/90 backdrop-blur rounded-lg p-3 shadow-medium">
                <div className="text-white text-sm font-medium">
                  ✅ Course Complete!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;