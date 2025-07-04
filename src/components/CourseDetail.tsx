import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Users, Star, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string;
}

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

const courseData: Record<string, any> = {
  "gmail-mastery": {
    title: "Gmail Mastery for Hustlers",
    description: "Learn how to create, organize, and use Gmail professionally for your business. Perfect for entrepreneurs and job seekers.",
    duration: "3 days",
    totalLessons: 8,
    students: 12500,
    rating: 4.8,
    completionRate: 89,
    isFree: true,
    features: [
      "Setting up a professional Gmail account",
      "Organizing emails with labels and folders", 
      "Email etiquette for business communication",
      "Gmail shortcuts & labels",
      "Recovering deleted or lost emails"
    ],
    lessons: [
      {
        id: 1,
        title: "Introduction to Gmail for Business",
        content: "Learn why Gmail is essential for business and how it differs from personal use. Understand the benefits of using Gmail professionally.",
        completed: false
      },
      {
        id: 2,
        title: "How to Create a Professional Gmail Account",
        content: "Step-by-step guide to creating a Gmail account that represents your business professionally. Choose the right username and setup.",
        completed: false
      },
      {
        id: 3,
        title: "Using Labels and Folders to Organize Your Inbox",
        content: "Master Gmail's organization system with labels, filters, and folders. Keep your inbox clean and find emails quickly.",
        completed: false
      },
      {
        id: 4,
        title: "Email Etiquette for Professionals",
        content: "Learn proper email communication, including subject lines, greetings, tone, and professional closing statements.",
        completed: false
      },
      {
        id: 5,
        title: "Setting Up a Signature and Auto-Reply",
        content: "Create professional email signatures and set up automatic replies for when you're unavailable.",
        completed: false
      },
      {
        id: 6,
        title: "Gmail Shortcuts That Save Time",
        content: "Discover keyboard shortcuts and Gmail features that will make you more efficient in your daily email management.",
        completed: false
      },
      {
        id: 7,
        title: "Recovering Lost or Deleted Emails",
        content: "Learn how to find and recover emails from trash, spam, or archived folders. Never lose important emails again.",
        completed: false
      },
      {
        id: 8,
        title: "Final Practice Task + Gmail Health Check",
        content: "Put everything together with a practical exercise and ensure your Gmail setup is optimized for business success.",
        completed: false
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the primary purpose of using labels in Gmail?",
        type: "multiple-choice",
        options: ["To send emails faster", "To organize and categorize emails", "To change the font size"],
        correctAnswer: "To organize and categorize emails"
      },
      {
        id: 2,
        question: "True or False: You can recover permanently deleted emails in Gmail.",
        type: "true-false",
        correctAnswer: "False"
      },
      {
        id: 3,
        question: "What is the purpose of setting up an auto-reply in Gmail?",
        type: "short-answer",
        correctAnswer: "To automatically respond to emails when unavailable"
      },
      {
        id: 4,
        question: "Which Gmail feature helps you quickly find specific emails?",
        type: "multiple-choice",
        options: ["Spam filter", "Search bar", "Trash folder"],
        correctAnswer: "Search bar"
      },
      {
        id: 5,
        question: "What is the recommended length for a professional email signature?",
        type: "short-answer",
        correctAnswer: "4-6 lines maximum"
      },
      {
        id: 6,
        question: "True or False: You can create multiple signatures in Gmail.",
        type: "true-false",
        correctAnswer: "True"
      },
      {
        id: 7,
        question: "What is the best practice for subject lines in business emails?",
        type: "short-answer",
        correctAnswer: "Clear, specific, and concise"
      },
      {
        id: 8,
        question: "Which folder do deleted emails go to?",
        type: "multiple-choice",
        options: ["Inbox", "Trash", "Sent"],
        correctAnswer: "Trash"
      },
      {
        id: 9,
        question: "What is the purpose of using the 'Priority Inbox' feature?",
        type: "short-answer",
        correctAnswer: "To highlight important emails and organize by priority"
      },
      {
        id: 10,
        question: "What should you do if you accidentally delete an important email?",
        type: "short-answer",
        correctAnswer: "Check the Trash folder and restore it"
      }
    ]
  },
  "whatsapp-business": {
    title: "WhatsApp Business Setup",
    description: "Transform your regular WhatsApp into a powerful business tool. Learn to attract and retain customers.",
    duration: "2 days",
    totalLessons: 6,
    students: 15200,
    rating: 4.9,
    completionRate: 94,
    isFree: true,
    features: [
      "Setting up WhatsApp Business profile",
      "Creating business catalogs",
      "Using quick replies and away messages",
      "Automating welcome messages",
      "Customer retention tips"
    ],
    lessons: [
      {
        id: 1,
        title: "What Is WhatsApp Business and Why It Matters",
        content: "Understand the difference between WhatsApp and WhatsApp Business. Learn why businesses need this powerful tool.",
        completed: false
      },
      {
        id: 2,
        title: "Creating Your WhatsApp Business Profile Step-by-Step",
        content: "Set up your business profile with proper information, photos, and contact details that attract customers.",
        completed: false
      },
      {
        id: 3,
        title: "Uploading Product or Service Catalogs",
        content: "Learn how to showcase your products and services directly in WhatsApp with professional catalogs.",
        completed: false
      },
      {
        id: 4,
        title: "Setting Quick Replies & Away Messages",
        content: "Create automated responses for common questions and set up away messages for when you're not available.",
        completed: false
      },
      {
        id: 5,
        title: "Auto Welcome Messages & Customer Retention",
        content: "Set up welcome messages for new customers and learn strategies to keep them engaged and coming back.",
        completed: false
      },
      {
        id: 6,
        title: "Practice Task: Send Your First Business Message",
        content: "Put everything together by sending your first professional business message and testing all features.",
        completed: false
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the primary advantage of using WhatsApp Business over regular WhatsApp?",
        type: "multiple-choice",
        options: ["More storage space", "Business-specific features", "Unlimited contacts"],
        correctAnswer: "Business-specific features"
      },
      {
        id: 2,
        question: "True or False: You can use the same phone number for both WhatsApp and WhatsApp Business.",
        type: "true-false",
        correctAnswer: "False"
      },
      {
        id: 3,
        question: "What is the purpose of a WhatsApp Business catalog?",
        type: "short-answer",
        correctAnswer: "To showcase products and services to customers"
      },
      {
        id: 4,
        question: "Which feature allows you to send automated replies to common questions?",
        type: "multiple-choice",
        options: ["Broadcast lists", "Quick replies", "Away messages"],
        correctAnswer: "Quick replies"
      },
      {
        id: 5,
        question: "What is the best way to retain customers on WhatsApp Business?",
        type: "short-answer",
        correctAnswer: "Regular engagement and valuable content"
      },
      {
        id: 6,
        question: "True or False: You can track the performance of your WhatsApp Business messages.",
        type: "true-false",
        correctAnswer: "True"
      },
      {
        id: 7,
        question: "What should you include in your business profile description?",
        type: "short-answer",
        correctAnswer: "Clear description of products/services and contact info"
      },
      {
        id: 8,
        question: "How often should you update your business catalog?",
        type: "multiple-choice",
        options: ["Never", "Monthly", "When products/prices change"],
        correctAnswer: "When products/prices change"
      },
      {
        id: 9,
        question: "What is the purpose of away messages?",
        type: "short-answer",
        correctAnswer: "To inform customers when you're not available"
      },
      {
        id: 10,
        question: "True or False: WhatsApp Business is free to use.",
        type: "true-false",
        correctAnswer: "True"
      }
    ]
  }
};

const lockedCourses = {
  "canva-design": {
    title: "Canva Design Basics",
    description: "Design posters, logos & ads for your business with Canva.",
    duration: "3 days",
    totalLessons: 7,
    students: 8500,
    rating: 4.7,
    completionRate: 82,
    isFree: false
  },
  "pricing-products": {
    title: "Pricing Your Products", 
    description: "Learn how to price for profit without losing customers.",
    duration: "2 days",
    totalLessons: 6,
    students: 7800,
    rating: 4.6,
    completionRate: 78,
    isFree: false
  },
  "english-customer-service": {
    title: "English for Customer Service",
    description: "Learn greetings, handling complaints, and closing deals.",
    duration: "3 days", 
    totalLessons: 8,
    students: 9200,
    rating: 4.8,
    completionRate: 85,
    isFree: false
  },
  "baking-mandazi": {
    title: "Baking Mandazi & Chapati",
    description: "Master kneading, shaping, frying & packaging Kenyan staples.",
    duration: "2 days",
    totalLessons: 6,
    students: 6500,
    rating: 4.5,
    completionRate: 75,
    isFree: false
  },
  "nail-art": {
    title: "Nail Art 101",
    description: "Step-by-step for clean polish, prep, and design.",
    duration: "3 days",
    totalLessons: 7,
    students: 7000,
    rating: 4.7,
    completionRate: 80,
    isFree: false
  },
  "facebook-instagram": {
    title: "Facebook & Instagram Setup",
    description: "Set up optimized profiles for your brand's online presence.",
    duration: "2 days",
    totalLessons: 6,
    students: 8000,
    rating: 4.6,
    completionRate: 79,
    isFree: false
  }
};

const CourseDetail = ({ courseId, onBack }: CourseDetailProps) => {
  const { toast } = useToast();
  const course = courseData[courseId] || lockedCourses[courseId];
  const [lessons, setLessons] = useState<Lesson[]>(course?.lessons || []);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        <div className="text-center">Course not found</div>
      </div>
    );
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progress = (completedLessons / course.totalLessons) * 100;

  const markLessonComplete = (lessonId: number) => {
    setLessons(prev => 
      prev.map(lesson => 
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
    
    toast({
      title: "Lesson Complete!",
      description: "Great job! Keep going to complete the course.",
    });

    // Check if all lessons are complete
    const updatedLessons = lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    );
    const allComplete = updatedLessons.every(lesson => lesson.completed);
    
    if (allComplete && course.isFree) {
      setTimeout(() => setShowQuiz(true), 1000);
    }
  };

  const submitQuiz = async () => {
    if (!userName || !userPhone) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const quizData = {
      course: course.title,
      answers: quizAnswers,
      name: userName,
      phone: userPhone
    };

    // Create WhatsApp message
    const message = `Course Quiz Submission\n\nCourse: ${course.title}\nStudent: ${userName}\nPhone: ${userPhone}\n\nAnswers:\n${course.quiz.map((q: any, i: number) => `${i + 1}. ${q.question}\nAnswer: ${quizAnswers[q.id] || 'Not answered'}`).join('\n\n')}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setQuizSubmitted(true);
    toast({
      title: "Quiz Submitted!",
      description: "Your answers have been sent via WhatsApp. Our team will contact you soon.",
    });
  };

  if (!course.isFree) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl">{course.title}</CardTitle>
            <p className="text-xl text-muted-foreground">{course.description}</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 text-success fill-current" />
                <span>{course.rating}/5</span>
              </div>
              <div>
                <span className="font-medium">{course.completionRate}% complete rate</span>
              </div>
            </div>
            
            <div className="bg-muted/50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🔒 Course Locked</h3>
              <p className="text-lg text-muted-foreground mb-6">
                To access this course, call or email Microlearning Hub to get your unique access code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg">
                  📞 Call: +254 710 654 707
                </Button>
                <Button variant="outline" size="lg">
                  📧 Email for Access Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showQuiz && !quizSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => setShowQuiz(false)} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              🎯 {course.title} Quiz
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Complete this quiz to finish the course. Your results will be sent to our team via WhatsApp.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {course.quiz.map((question: QuizQuestion, index: number) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">
                  {index + 1}. {question.question}
                </h4>
                
                {question.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {question.options?.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => setQuizAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                          className="text-primary"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {question.type === "true-false" && (
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="True"
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                        className="text-primary"
                      />
                      <span>True</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="False"
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                        className="text-primary"
                      />
                      <span>False</span>
                    </label>
                  </div>
                )}
                
                {question.type === "short-answer" && (
                  <textarea
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                    placeholder="Type your answer here..."
                    onChange={(e) => setQuizAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            
            <div className="border-t pt-6 space-y-4">
              <h4 className="font-semibold">Your Contact Information:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-3 border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="p-3 border rounded-lg"
                />
              </div>
            </div>
            
            <Button 
              onClick={submitQuiz}
              size="lg"
              className="w-full"
              variant="success"
            >
              Submit Quiz via WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="py-12">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thanks for completing this course. Your quiz results have been submitted! Our team will contact you soon.
            </p>
            <Button onClick={onBack} variant="outline" size="lg">
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Button>
      
      {/* Course Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
              <p className="text-xl text-muted-foreground">{course.description}</p>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground w-fit">
              FREE COURSE
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-success fill-current" />
              <span>{course.rating}/5</span>
            </div>
            <div>
              <span className="font-medium">{course.completionRate}% complete rate</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Course Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedLessons} of {course.totalLessons} lessons completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="grid gap-6">
        {lessons.map((lesson, index) => (
          <Card key={lesson.id} className={`transition-all ${lesson.completed ? 'bg-success/5 border-success/20' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      lesson.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  </div>
                  
                  {currentLesson === lesson.id && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentLesson(currentLesson === lesson.id ? null : lesson.id)}
                >
                  {currentLesson === lesson.id ? 'Hide Content' : 'View Lesson'}
                </Button>
                
                {!lesson.completed && currentLesson === lesson.id && (
                  <Button
                    variant="success"
                    onClick={() => markLessonComplete(lesson.id)}
                  >
                    Mark Complete
                  </Button>
                )}
                
                {lesson.completed && (
                  <Badge variant="default" className="bg-success text-success-foreground">
                    ✅ Completed
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Button */}
      {completedLessons === course.totalLessons && (
        <Card className="mt-8 bg-gradient-primary text-white">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🎉 Course Complete!</h3>
            <p className="text-white/90 mb-6">
              You've finished all lessons. Take the quiz to get your completion certificate!
            </p>
            <Button
              variant="success"
              size="xl"
              onClick={() => setShowQuiz(true)}
            >
              Take Final Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseDetail;