import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-success p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Microlearning Hub</h3>
                <p className="text-white/80 text-sm">by Team Innovators</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Badge className="bg-success text-success-foreground font-bold">
                "Learn Daily. Grow Steady."
              </Badge>
              <p className="text-white/90 text-sm leading-relaxed">
                A revolutionary microlearning platform delivering 5-minute lessons daily via WhatsApp — 
                built for hustlers, students, and everyday Kenyans.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-success font-bold text-sm mb-2">🎯 Vision 2030</p>
              <p className="text-white/90 text-xs">
                Empowering over 5 million Kenyans with practical, bite-sized learning that improves livelihoods and employment.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <nav className="space-y-3">
              <a href="#courses" className="block text-white/80 hover:text-white transition-colors">
                Browse Courses
              </a>
              <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors">
                Success Stories
              </a>
              <a href="#partners" className="block text-white/80 hover:text-white transition-colors">
                Our Partners
              </a>
              <a href="#pricing" className="block text-white/80 hover:text-white transition-colors">
                Pricing Plans
              </a>
            </nav>
            
            <div className="pt-4 border-t border-white/20">
              <h5 className="font-semibold text-sm mb-3">Learning Tracks</h5>
              <div className="space-y-2 text-sm">
                <p className="text-white/80">📱 Digital Hustler Track</p>
                <p className="text-white/80">🏗️ Pro Mjengo Track</p>
                <p className="text-white/80">💇 Salon Boss Track</p>
                <p className="text-white/80">🗣️ English Pro Track</p>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact & Support</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-success" />
                <div>
                  <p className="font-semibold">+254710654707</p>
                  <p className="text-white/80 text-sm">WhatsApp & Calls</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-success" />
                <div>
                  <p className="font-semibold">hello@microlearninghub.co.ke</p>
                  <p className="text-white/80 text-sm">General Inquiries</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-success" />
                <div>
                  <p className="font-semibold">Nairobi, Kenya</p>
                  <p className="text-white/80 text-sm">East Africa</p>
                </div>
              </div>
            </div>

            <Button variant="success" size="sm" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Join WhatsApp Learning
            </Button>
          </div>

          {/* Get Started */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Get Started Today</h4>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h5 className="font-semibold mb-2">Free Starter Courses</h5>
                <ul className="text-sm space-y-1 text-white/90">
                  <li>✅ Gmail Mastery</li>
                  <li>✅ Canva for Business</li>
                  <li>✅ WhatsApp Business Setup</li>
                  <li>✅ English for Business</li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-success font-bold text-sm mb-2">📩 Send Results To:</p>
                <p className="text-white font-bold">+254710654707</p>
                <p className="text-white/80 text-xs">For verification & support</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-success">50K+</div>
              <div className="text-white/80 text-sm">Active Learners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">500+</div>
              <div className="text-white/80 text-sm">Lessons Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">10+</div>
              <div className="text-white/80 text-sm">Partner Institutions</div>
            </div>
          </div>

          {/* Tech Stack & Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h5 className="font-semibold mb-3">Built With Trust & Security</h5>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                  WhatsApp API
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                  M-Pesa Integration
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                  SSL Secured
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                  GDPR Compliant
                </Badge>
              </div>
              <p className="text-white/60 text-xs mt-2">
                🔐 Your learning data is protected and never shared with third parties.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">Media & Recognition</h5>
              <div className="space-y-1 text-sm text-white/80">
                <p>📺 Featured on NTV Kenya - "Innovation for Hustlers"</p>
                <p>📻 Citizen TV Youth Hour - Practical Skills Movement</p>
                <p>📱 Pulse Live Kenya - Top WhatsApp Learning Trend</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center py-6 bg-white/10 backdrop-blur rounded-lg">
            <h5 className="text-lg font-bold mb-2">Ready to Change Your Life?</h5>
            <p className="text-white/90 mb-4">
              You don't need a degree to grow. You just need 5 minutes a day.
            </p>
            <p className="text-success font-bold">
              First 2 courses on us. Future success on you. 🚀
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              © 2024 Microlearning Hub by Team Innovators. All rights reserved. | 
              <span className="text-success font-semibold"> "This is a Digital School"</span>
            </p>
            <p className="text-white/50 text-xs mt-2">
              Made with ❤️ for the people of Kenya and beyond.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;