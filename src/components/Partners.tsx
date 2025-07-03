import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Heart, Phone } from "lucide-react";

const Partners = () => {
  const learningPartners = [
    {
      name: "Zetech University",
      location: "Nairobi Campus",
      type: "Digital Skills Review & Endorsement",
      description: "Validating our digital literacy curriculum for practical workplace application."
    },
    {
      name: "Technical University of Kenya (TUK)",
      location: "Main Campus",
      type: "Vocational Module Co-design",
      description: "Collaborating on TVET-aligned vocational training modules and certification."
    },
    {
      name: "Kenya Institute of Management (KIM)",
      location: "Multiple Branches",
      type: "Business Skills Alignment",
      description: "Ensuring our business courses meet professional management standards."
    },
    {
      name: "Multimedia University of Kenya (MMU)",
      location: "Digital Campus",
      type: "Content Validation",
      description: "Technology and digital content quality assurance for youth learning."
    },
    {
      name: "Kenya Christian Industrial Training Institute",
      location: "KCITI",
      type: "TVET-Level Guidance",
      description: "Technical and vocational education standards compliance and guidance."
    }
  ];

  const communityPartners = [
    {
      name: "Nairobi Youth Empowerment Centre",
      location: "Gikambura Branch",
      impact: "500+ Youth Trained",
      focus: "Digital Skills & Entrepreneurship"
    },
    {
      name: "House of Grace Nairobi",
      location: "Youth & Empowerment Ministry",
      impact: "300+ Members Enrolled",
      focus: "Life Skills & Business Training"
    },
    {
      name: "Areta Empowerment Initiative",
      location: "Nairobi Chapter",
      impact: "200+ Women Empowered",
      focus: "Vocational Skills for Women"
    },
    {
      name: "Tirus Foundation",
      location: "Leadership Center",
      impact: "150+ Youth Leaders",
      focus: "Digital Hustle & Leadership Mentorship"
    }
  ];

  return (
    <section id="partners" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Working with leading institutions and community organizations to ensure 
            <span className="font-semibold text-primary"> quality, relevance, and certification</span> in every lesson
          </p>
        </div>

        {/* Learning & Institutional Partners */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Building2 className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Learning Support & Content Partners</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPartners.map((partner, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.location}</p>
                    </div>
                    
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {partner.type}
                    </Badge>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-success">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="font-medium">Active Partnership</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Partners */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Youth, NGO & Community Partners</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityPartners.map((partner, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{partner.name}</h4>
                        <p className="text-sm text-muted-foreground">{partner.location}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge className="bg-success/10 text-success border-success/20">
                          {partner.impact}
                        </Badge>
                        <Badge variant="outline">
                          {partner.focus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-primary animate-scale-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Partner with Us?
          </h3>
          <p className="text-white/90 mb-8 max-w-3xl mx-auto text-lg">
            Join our growing network of institutions and organizations committed to accessible, 
            practical education for all Kenyans. Together, we can empower millions through microlearning.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <Building2 className="h-10 w-10 text-success mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Educational Institutions</h4>
              <p className="text-white/80 text-sm">Content validation, curriculum alignment, and certification partnerships</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <Users className="h-10 w-10 text-success mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">NGOs & CBOs</h4>
              <p className="text-white/80 text-sm">Community outreach, sponsored learning tracks, and impact measurement</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <Heart className="h-10 w-10 text-success mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Corporate CSR</h4>
              <p className="text-white/80 text-sm">Sponsor 100+ learners with KES 10,000/month. Great for youth empowerment projects</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="success" size="xl" className="group">
              <Phone className="mr-2 h-5 w-5" />
              Partner with Us
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Download Partnership Info
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/80">
              📞 Partnership Inquiries: <span className="font-bold text-white">+254710654707</span>
            </p>
          </div>
        </div>

        {/* Future Expansion Note */}
        <div className="mt-12 text-center animate-slide-up">
          <p className="text-muted-foreground italic">
            💡 More institutional collaborations are underway to ensure quality, relevance, and certification standards across all our learning tracks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;