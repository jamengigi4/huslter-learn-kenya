import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Users, Star, CheckCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  enrolledStudents: number;
  rating: number;
  price: string;
  isFree?: boolean;
  isPopular?: boolean;
  features: string[];
  completionRate?: number;
}

const CourseCard = ({
  title,
  description,
  category,
  level,
  duration,
  lessons,
  enrolledStudents,
  rating,
  price,
  isFree = false,
  isPopular = false,
  features,
  completionRate
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-accent text-accent-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    // Using the same icon for all categories for simplicity
    return <BookOpen className="h-5 w-5" />;
  };

  return (
    <Card className="relative bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-105 group">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground font-semibold px-3 py-1">
            🔥 Most Popular
          </Badge>
        </div>
      )}
      
      {isFree && (
        <div className="absolute top-4 right-4 bg-success rounded-full px-3 py-1 text-xs font-bold text-success-foreground">
          FREE
        </div>
      )}

      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              {getCategoryIcon(category)}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{category}</div>
              <Badge variant="outline" className={getLevelColor(level)}>
                {level}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{enrolledStudents.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-success fill-current" />
            <span>{rating}/5</span>
          </div>
        </div>

        {/* Progress Bar for Completion Rate */}
        {completionRate && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          <p className="text-sm font-medium">What you'll learn:</p>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li className="text-sm text-muted-foreground pl-6">
                +{features.length - 3} more skills...
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-bold text-primary">
            {isFree ? "FREE" : price}
          </div>
          {!isFree && (
            <div className="text-sm text-muted-foreground line-through">
              KES {parseInt(price.replace(/\D/g, '')) + 100}
            </div>
          )}
        </div>
        
        <Button 
          variant={isFree ? "success" : "outline"} 
          className="w-full"
          size="lg"
          disabled={!isFree}
          onClick={() => {
            if (isFree) {
              // Map exact course titles to their IDs in CourseDetail
              let courseId = '';
              if (title === "Gmail Mastery for Hustlers") {
                courseId = "gmail-mastery";
              } else if (title === "WhatsApp Business Setup") {
                courseId = "whatsapp-business";
              } else {
                courseId = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
              }
              window.dispatchEvent(new CustomEvent('navigate-to-course', { detail: { courseId } }));
            }
          }}
        >
          {isFree ? "Start Learning Free" : "🔒 Locked Course"}
        </Button>
        {!isFree && (
          <div className="text-xs text-muted-foreground text-center">
            Call +254 710 654 707 for access code
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;