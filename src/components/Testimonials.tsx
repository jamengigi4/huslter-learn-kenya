import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Achieng Otieno",
      location: "Kisumu",
      course: "WhatsApp Business Setup",
      rating: 5,
      testimonial: "I learned how to use WhatsApp Business and made my first sale in 3 days! The lessons are so simple to follow.",
      achievement: "Made KES 5,000 in first week",
      avatar: "AO"
    },
    {
      name: "John Mwangi",
      location: "Nairobi",
      course: "Gmail Mastery",
      rating: 5,
      testimonial: "This is better than YouTube — short, useful, and on WhatsApp! I can learn while commuting to work.",
      achievement: "Got promoted at work",
      avatar: "JM"
    },
    {
      name: "Grace Wanjiku",
      location: "Nakuru",
      course: "Hair Braiding Basics",
      rating: 5,
      testimonial: "Started my braiding business after completing this course. Now I earn KES 15,000 monthly from home!",
      achievement: "Full-time business owner",
      avatar: "GW"
    },
    {
      name: "Peter Kiprotich",
      location: "Eldoret",
      course: "English for Business",
      rating: 5,
      testimonial: "My English improved so much! I can now confidently serve international customers in my shop.",
      achievement: "Increased customer satisfaction",
      avatar: "PK"
    },
    {
      name: "Mary Njeri",
      location: "Mombasa",
      course: "Smart Pricing Strategies",
      rating: 5,
      testimonial: "Learning to price my products correctly doubled my profits! These 5-minute lessons changed my business.",
      achievement: "Doubled monthly profits",
      avatar: "MN"
    },
    {
      name: "Samuel Ochieng",
      location: "Thika",
      course: "Canva for Business",
      rating: 5,
      testimonial: "I now design all my business flyers myself. Saved money and my marketing looks professional!",
      achievement: "Saves KES 2,000 monthly",
      avatar: "SO"
    },
    {
      name: "Faith Chemutai",
      location: "Kericho",
      course: "Professional Cleaning",
      rating: 5,
      testimonial: "Started a cleaning service using these techniques. I have 10 regular clients now!",
      achievement: "KES 25,000 monthly income",
      avatar: "FC"
    },
    {
      name: "David Mutua",
      location: "Machakos",
      course: "Customer Payment Management",
      rating: 5,
      testimonial: "No more late payments! I learned how to handle customers professionally and get paid on time.",
      achievement: "100% payment collection rate",
      avatar: "DM"
    },
    {
      name: "Rose Akinyi",
      location: "Busia",
      course: "Job Interview English",
      rating: 5,
      testimonial: "Got my dream job after practicing with these interview lessons. The confidence boost was amazing!",
      achievement: "Landed dream job",
      avatar: "RA"
    },
    {
      name: "Michael Karanja",
      location: "Nyeri",
      course: "TikTok Business Growth",
      rating: 5,
      testimonial: "My TikTok videos now get thousands of views! This course helped me understand the algorithm.",
      achievement: "50K TikTok followers",
      avatar: "MK"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Success Stories from Real Learners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how everyday Kenyans are transforming their lives with just 
            <span className="font-semibold text-primary"> 5 minutes of daily learning</span>
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16 animate-scale-up">
          <Card className="bg-gradient-primary text-white shadow-primary max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left flex-1">
                  <Quote className="h-12 w-12 text-success mb-4 mx-auto md:mx-0" />
                  <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                    "This platform changed my life completely. From struggling to find work to running my own successful business - all thanks to 5-minute daily lessons on WhatsApp!"
                  </blockquote>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white">
                      <AvatarFallback className="bg-success text-white font-bold text-lg">
                        AO
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">Achieng Otieno</div>
                      <div className="text-white/80">Business Owner • Kisumu</div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current text-success" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Badge className="bg-success text-success-foreground mb-2 px-4 py-2 text-lg font-bold">
                    🏆 Top Graduate
                  </Badge>
                  <div className="text-white/90">
                    Completed 5 courses • Earned KES 50,000 last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current text-success" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>
                
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.course}
                  </Badge>
                  <div className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                    ✅ {testimonial.achievement}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already transformed their lives. Your success story could be next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-success text-success-foreground text-lg px-6 py-3 font-bold">
              📱 Send your results to: +254710654707
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;