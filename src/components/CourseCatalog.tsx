import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseCard from "./CourseCard";
import { Smartphone, Scissors, MessageCircle, TrendingUp, Filter } from "lucide-react";

const CourseCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = [
    { id: "All", name: "All Courses", icon: <Filter className="h-4 w-4" /> },
    { id: "Digital Skills", name: "Digital Skills", icon: <Smartphone className="h-4 w-4" /> },
    { id: "Vocational Skills", name: "Vocational Skills", icon: <Scissors className="h-4 w-4" /> },
    { id: "English & Communication", name: "English & Communication", icon: <MessageCircle className="h-4 w-4" /> },
    { id: "Hustler Business Tips", name: "Business Tips", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  const courses = [
    // Digital Skills - Beginner (Free)
    {
      title: "Gmail Mastery for Hustlers",
      description: "Learn how to create, organize, and use Gmail professionally for your business. Perfect for entrepreneurs and job seekers.",
      category: "Digital Skills",
      level: "Beginner" as const,
      duration: "3 days",
      lessons: 8,
      enrolledStudents: 12500,
      rating: 4.8,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Setting up a professional Gmail account",
        "Organizing emails with labels and folders",
        "Email etiquette for business communication",
        "Using Gmail on mobile devices",
        "Creating email signatures"
      ],
      completionRate: 89
    },
    {
      title: "Canva for Business Graphics",
      description: "Create stunning posters, flyers, and social media graphics using Canva. No design experience needed!",
      category: "Digital Skills",
      level: "Beginner" as const,
      duration: "5 days",
      lessons: 12,
      enrolledStudents: 8900,
      rating: 4.7,
      price: "FREE",
      isFree: true,
      isPopular: true,
      features: [
        "Canva basics and interface navigation",
        "Creating business flyers and posters",
        "Social media post designs",
        "Logo creation fundamentals",
        "Downloading and sharing designs"
      ],
      completionRate: 82
    },
    {
      title: "WhatsApp Business Setup",
      description: "Transform your regular WhatsApp into a powerful business tool. Learn to attract and retain customers.",
      category: "Digital Skills",
      level: "Beginner" as const,
      duration: "2 days",
      lessons: 6,
      enrolledStudents: 15200,
      rating: 4.9,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Setting up WhatsApp Business profile",
        "Creating business catalogs",
        "Using quick replies and away messages",
        "WhatsApp Status for marketing",
        "Customer management best practices"
      ],
      completionRate: 94
    },

    // Digital Skills - Intermediate
    {
      title: "Google Forms for Business",
      description: "Create professional surveys, order forms, and feedback collection systems using Google Forms.",
      category: "Digital Skills",
      level: "Intermediate" as const,
      duration: "4 days",
      lessons: 10,
      enrolledStudents: 5600,
      rating: 4.6,
      price: "KES 100",
      isFree: false,
      features: [
        "Creating order and booking forms",
        "Setting up automatic responses",
        "Data collection and analysis",
        "Integrating with Google Sheets",
        "Custom form styling"
      ],
      completionRate: 78
    },
    {
      title: "Facebook & Instagram Business Pages",
      description: "Build your social media presence with professional business pages that attract customers.",
      category: "Digital Skills",
      level: "Intermediate" as const,
      duration: "6 days",
      lessons: 15,
      enrolledStudents: 7800,
      rating: 4.5,
      price: "KES 100",
      isFree: false,
      features: [
        "Creating optimized business profiles",
        "Content planning and scheduling",
        "Using Facebook and Instagram ads",
        "Engaging with customers online",
        "Analytics and performance tracking"
      ],
      completionRate: 71
    },

    // Vocational Skills - Beginner (Free)
    {
      title: "Hair Braiding Basics",
      description: "Master fundamental braiding techniques for personal and professional use. Start your beauty journey today!",
      category: "Vocational Skills",
      level: "Beginner" as const,
      duration: "7 days",
      lessons: 18,
      enrolledStudents: 9400,
      rating: 4.8,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Basic braiding techniques and patterns",
        "Hair preparation and care",
        "Tools and products needed",
        "Pricing your braiding services",
        "Building a client base"
      ],
      completionRate: 85
    },
    {
      title: "Professional Cleaning Mastery",
      description: "Learn efficient cleaning techniques for homes and offices. Perfect for starting a cleaning business.",
      category: "Vocational Skills",
      level: "Beginner" as const,
      duration: "5 days",
      lessons: 14,
      enrolledStudents: 6700,
      rating: 4.7,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Room-by-room cleaning strategies",
        "Choosing the right cleaning products",
        "Time management and efficiency",
        "Pricing cleaning services",
        "Building repeat customers"
      ],
      completionRate: 88
    },

    // English & Communication - Beginner (Free)
    {
      title: "English for Everyday Business",
      description: "Essential English phrases and communication skills for shopkeepers, hawkers, and service providers.",
      category: "English & Communication",
      level: "Beginner" as const,
      duration: "10 days",
      lessons: 25,
      enrolledStudents: 18500,
      rating: 4.9,
      price: "FREE",
      isFree: true,
      isPopular: true,
      features: [
        "Customer greetings and introductions",
        "Handling complaints politely",
        "Numbers, prices, and calculations",
        "Asking for directions and help",
        "Phone conversations"
      ],
      completionRate: 91
    },
    {
      title: "Job Interview English",
      description: "Ace your next job interview with confident English communication and professional responses.",
      category: "English & Communication",
      level: "Beginner" as const,
      duration: "6 days",
      lessons: 16,
      enrolledStudents: 11200,
      rating: 4.8,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Self-introduction and elevator pitch",
        "Answering common interview questions",
        "Professional vocabulary and phrases",
        "Body language and confidence",
        "Following up after interviews"
      ],
      completionRate: 87
    },

    // Hustler Business Tips - Beginner (Free)
    {
      title: "Smart Pricing Strategies",
      description: "Learn how to price your products and services to maximize profits while staying competitive.",
      category: "Hustler Business Tips",
      level: "Beginner" as const,
      duration: "4 days",
      lessons: 11,
      enrolledStudents: 13600,
      rating: 4.7,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Understanding your costs and margins",
        "Competitor pricing analysis",
        "Psychology of pricing",
        "Discount strategies that work",
        "Handling price negotiations"
      ],
      completionRate: 83
    },
    {
      title: "Customer Payment Management",
      description: "Effective strategies for handling late payments and maintaining healthy cash flow in your business.",
      category: "Hustler Business Tips",
      level: "Beginner" as const,
      duration: "3 days",
      lessons: 9,
      enrolledStudents: 8900,
      rating: 4.6,
      price: "FREE",
      isFree: true,
      isPopular: false,
      features: [
        "Setting clear payment terms",
        "Following up on overdue payments",
        "Building trust with customers",
        "Using M-Pesa and mobile money effectively",
        "Keeping accurate financial records"
      ],
      completionRate: 79
    },

    // Advanced Courses
    {
      title: "TikTok Business Growth Mastery",
      description: "Advanced strategies for growing your business using TikTok marketing and viral content creation.",
      category: "Digital Skills",
      level: "Advanced" as const,
      duration: "8 days",
      lessons: 20,
      enrolledStudents: 3400,
      rating: 4.8,
      price: "KES 200",
      isFree: false,
      features: [
        "Creating viral TikTok content",
        "TikTok advertising strategies",
        "Influencer partnerships",
        "Analytics and optimization",
        "Converting followers to customers"
      ],
      completionRate: 68
    },
    {
      title: "Bridal Makeup Professional",
      description: "Advanced techniques for bridal and special occasion makeup. Build a high-end makeup business.",
      category: "Vocational Skills",
      level: "Advanced" as const,
      duration: "12 days",
      lessons: 30,
      enrolledStudents: 2100,
      rating: 4.9,
      price: "KES 500",
      isFree: false,
      features: [
        "Bridal makeup styles and trends",
        "Working with different skin tones",
        "Photography-ready makeup techniques",
        "Pricing premium services",
        "Building an upscale client base"
      ],
      completionRate: 72
    }
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <section id="courses" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From basic digital skills to advanced business strategies - all delivered in 
            <span className="font-semibold text-primary"> 5-minute daily lessons</span> via WhatsApp
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "learning" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Level Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <Badge
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                selectedLevel === level ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </Badge>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-scale-up">
          {filteredCourses.map((course, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-primary rounded-2xl shadow-primary">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Future?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of Kenyans who are already upgrading their skills with just 5 minutes a day. 
            Start with our free courses and see the difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="success" size="xl">
              Start Free Learning Today
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              View All Free Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog;