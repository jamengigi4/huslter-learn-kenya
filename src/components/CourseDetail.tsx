import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Users, Star, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LessonContent from "./LessonContent";
import { useProgressManager } from "@/hooks/useProgressManager";
import AccessCodeDialog from "./AccessCodeDialog";

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
        content: "Welcome to Gmail Mastery! 📧\n\nWhy Gmail for Business?\n• It's FREE and reliable\n• Huge 15GB storage space\n• Works on any device (phone, computer, tablet)\n• Professional appearance builds trust\n• Easy integration with other Google tools\n\nDid you know? Over 1.8 billion people use Gmail worldwide. When you email from a Gmail account, people trust it more than unknown email providers.\n\nWhat makes it different from personal use?\n• Professional username (yourname@gmail.com vs funnynickname123@gmail.com)\n• Organized email management\n• Business communication standards\n• Integration with Google Workspace tools\n\nBy the end of this course, you'll have a Gmail setup that makes you look professional and saves you time every day.",
        completed: false
      },
      {
        id: 2,
        title: "How to Create a Professional Gmail Account",
        content: "Step 1: Choose Your Professional Username 💼\n\n✅ GOOD Examples:\n• john.mwangi@gmail.com\n• sarah.kiprotich@gmail.com\n• peter.ochieng@gmail.com\n\n❌ AVOID:\n• sexyboy2024@gmail.com\n• funnygirl123@gmail.com\n• partyguy@gmail.com\n\nStep 2: Account Creation Process\n1. Go to gmail.com\n2. Click 'Create account' → 'For personal use'\n3. Fill in your real first and last name\n4. Choose your professional username\n5. Create a strong password (8+ characters, mix of letters, numbers, symbols)\n6. Add your phone number for security\n7. Skip recovery email for now\n\nStep 3: Profile Setup\n• Add a professional profile photo (clear face shot, good lighting)\n• If no photo available, use your initials\n• Complete your profile information\n\nPro Tip: If your preferred username is taken, try:\n• john.mwangi2024@gmail.com\n• johnmwangi.business@gmail.com\n• john.mwangi.ke@gmail.com",
        completed: false
      },
      {
        id: 3,
        title: "Using Labels and Folders to Organize Your Inbox",
        content: "Gmail Labels = Your Digital Filing System 📁\n\nWhat are Labels?\nThink of labels like colored stickers you put on physical folders. They help you find emails fast!\n\nEssential Labels to Create:\n🔴 URGENT - For time-sensitive emails\n🟢 CLIENTS - All client communication\n🔵 ORDERS - Purchase orders and sales\n🟡 FOLLOW-UP - Emails needing action\n🟣 PERSONAL - Non-business emails\n\nHow to Create Labels:\n1. Open Gmail\n2. Look for 'Labels' on the left side\n3. Click '+' to create new label\n4. Name it (e.g., 'CLIENTS')\n5. Choose a color\n6. Click 'Create'\n\nHow to Apply Labels:\n1. Select an email\n2. Click the label icon (tag symbol)\n3. Choose the appropriate label\n4. The email is now organized!\n\nPro Filters for Auto-Organization:\n• Set up filters to automatically label emails from specific clients\n• Example: All emails from 'client@company.com' get 'CLIENTS' label\n\nDaily Organization Habit:\n• Spend 5 minutes each morning labeling new emails\n• Your inbox stays clean and professional\n• Find any email in seconds, not minutes!",
        completed: false
      },
      {
        id: 4,
        title: "Email Etiquette for Professionals",
        content: "Professional Email Writing That Gets Results ✉️\n\nSubject Lines That Work:\n✅ GOOD:\n• 'Meeting Request - Project Discussion'\n• 'Invoice #1234 - Payment Due'\n• 'Order Confirmation - Your Purchase'\n\n❌ AVOID:\n• 'hi'\n• 'urgent!!!'\n• 'check this out'\n\nEmail Structure:\n1. GREETING\n• 'Dear Mr. Kiprotich,' (formal)\n• 'Hi Sarah,' (friendly)\n• 'Good morning,' (neutral)\n\n2. PURPOSE (First sentence)\n• 'I am writing to...' \n• 'Thank you for...'\n• 'I would like to...'\n\n3. DETAILS (Keep it short)\n• Use bullet points\n• Maximum 3 paragraphs\n• One main idea per paragraph\n\n4. CALL TO ACTION\n• 'Please confirm by Friday'\n• 'Let me know your thoughts'\n• 'I look forward to your response'\n\n5. CLOSING\n• 'Best regards,' (professional)\n• 'Thank you,' (grateful)\n• 'Sincerely,' (formal)\n\nTone Rules:\n• Be polite and respectful\n• Use 'please' and 'thank you'\n• Avoid slang and abbreviations\n• Proofread before sending\n\nResponse Timing:\n• Within 24 hours for business emails\n• Within 2 hours for urgent matters\n• Set expectations if you need more time",
        completed: false
      },
      {
        id: 5,
        title: "Setting Up a Signature and Auto-Reply",
        content: "Professional Email Signature Setup ✍️\n\nYour signature = Your digital business card\n\nSignature Template:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nJohn Mwangi\nGraphic Designer\n📱 +254 712 345 678\n📧 john.mwangi@gmail.com\n📍 Nairobi, Kenya\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nHow to Set Up Signature:\n1. Open Gmail settings (gear icon)\n2. Scroll to 'Signature' section\n3. Create your signature using the template above\n4. Choose when to use it:\n   • New emails: YES\n   • Replies: Your choice\n5. Save changes\n\nAuto-Reply Messages (Vacation/Away):\n\nSample Auto-Reply:\n'Thank you for your email. I am currently away from the office and will respond to your message within 24 hours of my return on [DATE]. For urgent matters, please call +254 712 345 678.\n\nBest regards,\n[Your Name]'\n\nWhen to Use Auto-Reply:\n• Traveling for business\n• Taking time off\n• Attending training/courses\n• Any time you can't respond within 24 hours\n\nQuick Setup:\n1. Gmail Settings → 'Vacation responder'\n2. Set start and end dates\n3. Write your message\n4. Save settings\n\nPro Tip: Always test your signature and auto-reply by sending yourself an email first!",
        completed: false
      },
      {
        id: 6,
        title: "Gmail Shortcuts That Save Time",
        content: "Gmail Power User Shortcuts ⚡\n\nKeyboard Shortcuts (Enable in Settings):\n• C = Compose new email\n• R = Reply\n• A = Reply all\n• F = Forward\n• Delete = Archive\n• # = Delete\n• S = Star important emails\n• U = Return to inbox\n\nQuick Actions:\n• Hover over emails for quick actions\n• Archive, delete, or mark as read without opening\n• Use checkboxes to select multiple emails\n\nSearch Like a Pro:\n• from:client@email.com (emails from specific person)\n• subject:invoice (emails with 'invoice' in subject)\n• has:attachment (emails with files attached)\n• after:2024/1/1 (emails after specific date)\n• label:clients (emails with specific label)\n\nStar System:\n🌟 Yellow star = Important\n❤️ Red heart = Personal favorites\n💙 Blue star = Needs follow-up\n🟠 Orange star = Work in progress\n\nSwipe Actions on Mobile:\n• Swipe right = Archive\n• Swipe left = Delete\n• Long press = Multiple select\n\nTemplates for Common Emails:\n1. Enable 'Templates' in Settings → Advanced\n2. Compose your common email\n3. Save as template\n4. Reuse anytime\n\nPriority Inbox:\n• Shows important emails first\n• Learns from your behavior\n• Saves time scanning emails\n\nUndo Send Feature:\n• 5-30 second window to cancel sent emails\n• Perfect for catching typos\n• Enable in Settings → General",
        completed: false
      },
      {
        id: 7,
        title: "Recovering Lost or Deleted Emails",
        content: "Never Lose Important Emails Again! 🔍\n\nWhere Deleted Emails Go:\n1. TRASH FOLDER (30 days storage)\n2. SPAM FOLDER (automatic filtering)\n3. ARCHIVED (hidden from inbox but not deleted)\n4. ALL MAIL (everything ever received)\n\nRecovery Steps:\n\nStep 1: Check Trash\n• Click 'Trash' on left sidebar\n• Look for your email\n• Select and click 'Move to Inbox'\n• Email is restored!\n\nStep 2: Check Spam\n• Click 'Spam' folder\n• Look for legitimate emails\n• Select and click 'Not Spam'\n• Mark sender as safe\n\nStep 3: Search All Mail\n• Click 'All Mail' folder\n• Use search with keywords\n• Example: from:john@company.com\n• Check if email was archived\n\nStep 4: Advanced Search\n• Use Gmail search operators:\n  - in:trash (search within trash)\n  - in:spam (search within spam)\n  - larger:5M (emails bigger than 5MB)\n  - older_than:1y (emails older than 1 year)\n\nPrevention Tips:\n• Create important email backups\n• Use labels instead of deleting\n• Set up forwarding for critical emails\n• Export important emails as PDFs\n\nWhat if Email is Permanently Deleted?\n• Contact Gmail support within 30 days\n• Explain the situation\n• Provide email details\n• Recovery not guaranteed but possible\n\nBest Practice:\n• Archive instead of delete\n• Use 'Move to Trash' only for spam\n• Keep important emails labeled\n• Regular inbox cleanup weekly",
        completed: false
      },
      {
        id: 8,
        title: "Final Practice Task + Gmail Health Check",
        content: "Gmail Mastery Final Challenge! 🏆\n\nYour Practice Task:\n\n1. EMAIL COMPOSITION CHALLENGE\nWrite a professional email with:\n• Proper subject line\n• Professional greeting\n• Clear purpose in first sentence\n• Call to action\n• Professional signature\n\nSample Scenario:\nYou're following up with a potential client who requested a quote 3 days ago.\n\n2. ORGANIZATION CHALLENGE\nSet up these essential labels:\n• CLIENTS\n• ORDERS\n• FOLLOW-UP\n• URGENT\n• PERSONAL\n\n3. EFFICIENCY CHALLENGE\n• Enable keyboard shortcuts\n• Set up your signature\n• Create one email template\n• Configure auto-reply message\n\nGmail Health Check ✅\n\n□ Professional email address chosen\n□ Strong password set up\n□ Phone number added for security\n□ Profile photo uploaded\n□ Email signature created\n□ Essential labels created\n□ Keyboard shortcuts enabled\n□ Auto-reply template ready\n□ Understand email etiquette\n□ Know how to recover deleted emails\n\nCONGRATULATIONS! 🎉\n\nYou now have professional Gmail skills that will:\n• Save you 30 minutes daily\n• Make you look more professional\n• Help you never lose important emails\n• Organize your business communication\n• Build trust with clients and employers\n\nNext Steps:\n• Practice daily email management\n• Maintain organized inbox\n• Continue learning advanced features\n• Share these skills with others\n\nYou're now a Gmail Power User! Keep practicing and stay organized! 💪",
        completed: false
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the correct domain used to create a Gmail account?",
        type: "multiple-choice",
        options: ["@hotmail.com", "@yahoo.com", "@gmail.com", "@mail.com"],
        correctAnswer: "@gmail.com"
      },
      {
        id: 2,
        question: "What is the purpose of email labels in Gmail?",
        type: "short-answer",
        correctAnswer: "To organize and categorize emails for easy finding"
      },
      {
        id: 3,
        question: "Which section of Gmail allows you to see messages that haven't been opened?",
        type: "short-answer",
        correctAnswer: "Unread folder or inbox with unread filter"
      },
      {
        id: 4,
        question: "True or False: You can set up a professional signature in Gmail.",
        type: "true-false",
        correctAnswer: "True"
      },
      {
        id: 5,
        question: "What is the maximum attachment size in a Gmail email?",
        type: "multiple-choice",
        options: ["10MB", "25MB", "50MB", "100MB"],
        correctAnswer: "25MB"
      },
      {
        id: 6,
        question: "How can you organize emails from clients using Gmail?",
        type: "short-answer",
        correctAnswer: "Use labels, filters, and folders to categorize client emails"
      },
      {
        id: 7,
        question: "Which feature allows you to undo a sent email?",
        type: "short-answer",
        correctAnswer: "Undo Send feature"
      },
      {
        id: 8,
        question: "Write a professional email subject line for a job application.",
        type: "short-answer",
        correctAnswer: "Job Application - [Position Title] - [Your Name]"
      },
      {
        id: 9,
        question: "Why is it important to avoid using all CAPS in professional emails?",
        type: "short-answer",
        correctAnswer: "It appears as shouting and is unprofessional"
      },
      {
        id: 10,
        question: "What steps would you take to recover an accidentally deleted email?",
        type: "short-answer",
        correctAnswer: "Check Trash folder, select email, and move back to inbox"
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
    isFree: false,
    lessons: [
      {
        id: 1,
        title: "What Is WhatsApp Business and Why It Matters",
        content: "WhatsApp Business: Your Mobile Shop Front! 📱\n\nWhat is WhatsApp Business?\nA FREE professional version of WhatsApp designed specifically for small businesses.",
        completed: false
      }
    ]
  }
};

const CourseDetail = ({ courseId, onBack }: CourseDetailProps) => {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const { toast } = useToast();
  
  const progressManager = useProgressManager(courseId);
  const course = courseData[courseId];
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        <Card className="text-center p-8">
          <h2 className="text-2xl font-bold text-muted-foreground">Course not found</h2>
        </Card>
      </div>
    );
  }

  const completedCount = progressManager.getCompletedCount();
  const progress = course.totalLessons > 0 ? (completedCount / course.totalLessons) * 100 : 0;

  const markLessonComplete = (lessonId: number) => {
    progressManager.markLessonComplete(lessonId);
    
    toast({
      title: "Lesson Completed!",
      description: completedCount + 1 === course.totalLessons 
        ? "🎉 Course complete! Take the quiz to finish." 
        : "✅ Next lesson unlocked!",
    });
  };

  const handleAccessCodeSuccess = (accessCode: string) => {
    progressManager.grantAccess(accessCode);
    toast({
      title: "Access Granted!",
      description: "You now have access to all premium content.",
    });
  };

  // Check access for non-free courses
  if (!course.isFree && !progressManager.hasAccess()) {
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
            <div className="bg-muted/50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🔒 Course Locked</h3>
              <p className="text-lg text-muted-foreground mb-6">
                This course requires payment. Get your access code from the Pricing section or enter your code below.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowAccessDialog(true)}
                >
                  🔑 Enter Access Code
                </Button>
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    onBack();
                  }}
                >
                  💳 Go to Pricing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <AccessCodeDialog
          isOpen={showAccessDialog}
          onClose={() => setShowAccessDialog(false)}
          onAccessGranted={handleAccessCodeSuccess}
        />
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
            <Badge variant="default" className={course.isFree ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}>
              {course.isFree ? "FREE COURSE" : "PREMIUM COURSE"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Course Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {course.totalLessons} lessons completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
        </CardContent>
      </Card>

      {/* Lessons with Unlock Flow */}
      <div className="grid gap-6">
        {course.lessons.map((lesson: any, index: number) => {
          const isCompleted = progressManager.isLessonCompleted(lesson.id);
          const isUnlocked = progressManager.isLessonUnlocked(lesson.id);
          const isLocked = !isUnlocked;
          
          return (
            <Card key={lesson.id} className={`transition-all ${
              isCompleted ? 'bg-success/5 border-success/20' : 
              isLocked ? 'bg-muted/20 border-muted opacity-60' : 'hover:shadow-md'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isCompleted 
                          ? 'bg-success text-success-foreground' 
                          : isUnlocked
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <CardTitle className={`text-xl ${isLocked ? 'text-muted-foreground' : ''}`}>
                        {lesson.title}
                      </CardTitle>
                    </div>
                    
                    {isLocked && (
                      <div className="bg-muted/50 p-3 rounded-lg mt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="h-4 w-4" />
                          <span>🔒 Complete the previous lesson to unlock this one</span>
                        </div>
                      </div>
                    )}
                    
                    {currentLesson === lesson.id && isUnlocked && (
                      <div className="mt-4">
                        <LessonContent content={lesson.content} />
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {isUnlocked ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentLesson(currentLesson === lesson.id ? null : lesson.id)}
                      >
                        {currentLesson === lesson.id ? 'Hide Content' : 'View Lesson'}
                      </Button>
                      
                      {!isCompleted && currentLesson === lesson.id && (
                        <Button
                          variant="success"
                          onClick={() => markLessonComplete(lesson.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                      
                      {isCompleted && (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          ✅ Completed
                        </Badge>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="opacity-50 cursor-not-allowed"
                      onClick={() => toast({
                        title: "Lesson Locked",
                        description: "Please complete the previous lesson first.",
                        variant: "destructive"
                      })}
                    >
                      🔒 Locked
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quiz Button */}
      {completedCount === course.totalLessons && (
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
