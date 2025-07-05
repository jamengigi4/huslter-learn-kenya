import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Users, Smartphone } from "lucide-react";
import { useState } from "react";
import PaymentFlow from "./PaymentFlow";
import CertificateDialog from "./CertificateDialog";
import GroupPricingDialog from "./GroupPricingDialog";

const Pricing = () => {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<{type: 'free' | 'full' | 'premium', amount: number}>({type: 'free', amount: 0});
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const pricingPlans = [
    {
      name: "Free Starter",
      price: "FREE",
      originalPrice: null,
      badge: "Perfect to Start",
      icon: <Smartphone className="h-8 w-8" />,
      description: "Get started with 2 complete beginner courses",
      features: [
        "2 Free Beginner Courses",
        "WhatsApp lesson delivery",
        "Basic progress tracking",
        "Community support",
        "Mobile-friendly content",
        "Certificate of completion"
      ],
      limitations: [
        "Limited to beginner level only",
        "No advanced features",
        "Basic support only"
      ],
      cta: "Start Free Learning",
      ctaVariant: "success" as const,
      popular: false
    },
    {
      name: "Full Access",
      price: "KES 100",
      originalPrice: "KES 200",
      badge: "Most Popular",
      icon: <Star className="h-8 w-8" />,
      description: "Unlock all courses and premium features",
      features: [
        "All courses (Beginner to Advanced)",
        "500+ lessons across 4 categories",
        "Progress tracking & badges",
        "Gamified learning experience",
        "WhatsApp coach support",
        "Downloadable resources",
        "Priority customer support",
        "Monthly new content updates"
      ],
      limitations: [],
      cta: "Get Full Access",
      ctaVariant: "hero" as const,
      popular: true
    },
    {
      name: "Premium Certificate",
      price: "KES 200",
      originalPrice: "KES 300",
      badge: "Professional",
      icon: <Crown className="h-8 w-8" />,
      description: "Full access plus official certificates",
      features: [
        "Everything in Full Access",
        "Official certificates with QR codes",
        "LinkedIn-ready credentials",
        "Priority course completion",
        "1-on-1 mentor sessions",
        "Job placement assistance",
        "Professional portfolio guidance",
        "Industry recognition"
      ],
      limitations: [],
            cta: "Get Certified",
      ctaVariant: "accent" as const,
      popular: false
    }
  ];

  const groupPackage = {
    name: "Group Learning",
    price: "KES 500/month",
    badge: "For Teams",
    icon: <Users className="h-8 w-8" />,
    description: "Perfect for chamas, youth groups, churches, or small teams",
    features: [
      "10 member licenses included",
      "Group progress dashboard",
      "Team certificates",
      "Private group coach",
      "Custom learning tracks",
      "Monthly group sessions",
      "Bulk progress reports",
      "Group challenges & competitions"
    ],
    minMembers: "Minimum 5 members"
  };

  const addOns = [
    {
      name: "Personal Mentorship",
      price: "KES 500/month",
      description: "1-on-1 guidance from industry experts",
      features: ["Weekly video calls", "Personalized learning plan", "Career guidance", "Job referrals"]
    },
    {
      name: "Business Consultation",
      price: "KES 300/session",
      description: "Expert advice for your specific business challenges",
      features: ["1-hour consultation", "Written action plan", "Follow-up support", "Industry insights"]
    }
  ];

  const handlePaymentSuccess = (accessCode: string) => {
    console.log('Payment successful, access code:', accessCode);
    // The PaymentFlow component handles the WhatsApp notifications
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, then choose the plan that fits your learning goals. 
            <span className="font-semibold text-primary"> No hidden fees, no long commitments.</span>
          </p>
        </div>

        {/* Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up ${plan.popular ? 'ring-2 ring-primary shadow-primary' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground font-bold px-4 py-2">
                    🔥 {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pb-6">
                <div className={`mx-auto p-3 rounded-lg ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                  {plan.icon}
                </div>
                
                <div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  {!plan.popular && (
                    <Badge variant="outline" className="mt-2">
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.price !== "FREE" && (
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  )}
                </div>
                
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center gap-3 opacity-60">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter>
            <Button 
              variant={plan.ctaVariant} 
              size="lg" 
              className="w-full"
              onClick={() => {
                if (plan.name === "Free Starter") {
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else if (plan.name === "Full Access") {
                  setPaymentPlan({type: 'full', amount: 100});
                  setShowPaymentFlow(true);
                } else if (plan.name === "Premium Certificate") {
                  setPaymentPlan({type: 'premium', amount: 200});
                  setShowPaymentFlow(true);
                }
              }}
            >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Group Package */}
        <div className="mb-16 animate-scale-up">
          <Card className="bg-gradient-accent text-accent-foreground shadow-accent max-w-4xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto p-3 bg-white/20 rounded-lg mb-4">
                {groupPackage.icon}
              </div>
              <Badge className="bg-white/20 text-white mb-4">
                {groupPackage.badge}
              </Badge>
              <CardTitle className="text-3xl font-bold">{groupPackage.name}</CardTitle>
              <p className="text-accent-foreground/90">{groupPackage.description}</p>
            </CardHeader>
            
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{groupPackage.price}</div>
                  <p className="text-accent-foreground/80">{groupPackage.minMembers}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => setShowGroupDialog(true)}
                >
                  Contact for Group Pricing
                </Button>
              </div>
              
              <div className="space-y-3">
                {groupPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-white flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add-on Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Optional Add-on Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{addon.price}</div>
                  <p className="text-muted-foreground text-sm">{addon.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {addon.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="learning" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      if (addon.name === "Personal Mentorship") {
                        setShowCertificateDialog(true);
                      } else {
                        setShowGroupDialog(true);
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-16 animate-slide-up">
          <h3 className="text-xl font-bold text-center text-foreground mb-6">
            Easy Payment Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="bg-[#00C853] text-white rounded-lg p-4 mx-auto w-16 h-16 flex items-center justify-center font-bold">
                M-PESA
              </div>
              <h4 className="font-semibold">M-Pesa STK Push</h4>
              <p className="text-sm text-muted-foreground">Instant payment via STK push. Get access code immediately.</p>
            </div>
            <div className="space-y-3">
              <div className="bg-primary text-white rounded-lg p-4 mx-auto w-16 h-16 flex items-center justify-center font-bold">
                PAY
              </div>
              <h4 className="font-semibold">Paybill Support</h4>
              <p className="text-sm text-muted-foreground">Use our paybill number for secure payments from any mobile network.</p>
            </div>
            <div className="space-y-3">
              <div className="bg-accent text-white rounded-lg p-4 mx-auto w-16 h-16 flex items-center justify-center font-bold">
                24/7
              </div>
              <h4 className="font-semibold">Instant Access</h4>
              <p className="text-sm text-muted-foreground">Receive your unique access code within minutes of payment.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center animate-scale-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Future?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who are already building better lives with just 5 minutes a day. 
            Start your learning journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="success" 
              size="xl"
              onClick={() => {
                const coursesSection = document.getElementById('courses');
                if (coursesSection) {
                  coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Free Learning
            </Button>
            <Button 
              variant="whatsapp" 
              size="xl"
              onClick={() => {
                const whatsappUrl = 'https://api.whatsapp.com/send?phone=254710654707&text=Hi! I want to join the Microlearning Hub community.';
                window.open(whatsappUrl, '_blank');
              }}
            >
              Join WhatsApp: +254710654707
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-primary rounded-lg text-white max-w-2xl mx-auto">
            <p className="font-semibold mb-2">💡 "Learn Daily. Grow Steady."</p>
            <p className="text-white/90 text-sm">
              This is not just a platform — it's a revolution. Microlearning for the people. Microlearning for Kenya.
            </p>
          </div>
        </div>

        {/* Payment Flow Dialog */}
        <PaymentFlow
          isOpen={showPaymentFlow}
          onClose={() => setShowPaymentFlow(false)}
          planType={paymentPlan.type}
          amount={paymentPlan.amount}
          onPaymentSuccess={handlePaymentSuccess}
        />

        {/* Certificate Dialog */}
        <CertificateDialog
          isOpen={showCertificateDialog}
          onClose={() => setShowCertificateDialog(false)}
        />

        {/* Group Pricing Dialog */}
        <GroupPricingDialog
          isOpen={showGroupDialog}
          onClose={() => setShowGroupDialog(false)}
        />
      </div>
    </section>
  );
};

export default Pricing;