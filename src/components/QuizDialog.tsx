import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string;
}

interface QuizDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  questions: QuizQuestion[];
}

const QuizDialog: React.FC<QuizDialogProps> = ({
  isOpen,
  onClose,
  courseTitle,
  questions
}) => {
  const [currentStep, setCurrentStep] = useState<'quiz' | 'details' | 'success'>('quiz');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = () => {
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      toast({
        title: "Please answer all questions",
        description: `${unanswered.length} questions remaining`,
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('details');
  };

  const handleFinalSubmit = async () => {
    if (!userName.trim() || !userPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Format quiz results
    const quizResults = questions.map(q => 
      `Q${q.id}: ${q.question}\nA: ${answers[q.id]}`
    ).join('\n\n');

    // Send to WhatsApp
    const message = `QUIZ SUBMISSION - ${courseTitle}

Student Details:
Name: ${userName}
Phone: ${userPhone}
Date: ${new Date().toLocaleString()}

Quiz Results:
${quizResults}

Please review and issue certificate if passed.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=254710654707&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');
      toast({
        title: "Quiz Submitted!",
        description: "Your answers have been sent for review. You'll be contacted about your certificate.",
      });
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentStep('quiz');
    setAnswers({});
    setUserName('');
    setUserPhone('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Award className="h-6 w-6" />
            {currentStep === 'quiz' && `${courseTitle} - Final Quiz`}
            {currentStep === 'details' && 'Student Information'}
            {currentStep === 'success' && 'Quiz Submitted Successfully!'}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm">
                Answer all {questions.length} questions to complete the course and qualify for certification.
              </p>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      {index + 1}. {question.question}
                    </h3>

                    {question.type === 'multiple-choice' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`question_${question.id}`}
                              value={option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-4 h-4"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'true-false' && (
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question_${question.id}`}
                            value="True"
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4"
                          />
                          <span>True</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question_${question.id}`}
                            value="False"
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4"
                          />
                          <span>False</span>
                        </label>
                      </div>
                    )}

                    {question.type === 'short-answer' && (
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="min-h-[80px]"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleQuizSubmit} className="flex-1">
                Submit Quiz ({Object.keys(answers).length}/{questions.length})
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'details' && (
          <div className="space-y-6">
            <div className="bg-success/10 p-4 rounded-lg">
              <p className="text-sm">
                Great! You've completed the quiz. Please provide your details for certificate processing.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name as it should appear on certificate"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep('quiz')} className="flex-1">
                Back to Quiz
              </Button>
              <Button 
                onClick={handleFinalSubmit} 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Certification'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="space-y-6 text-center">
            <div>
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-success mb-2">Quiz Submitted Successfully!</h3>
              <p className="text-muted-foreground mb-4">
                Your quiz answers have been sent for review by our instructors.
              </p>
            </div>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Next Steps:</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Your answers will be reviewed within 24 hours</li>
                    <li>• You'll receive a WhatsApp message with your results</li>
                    <li>• If you pass, your certificate will be processed</li>
                    <li>• Certificates are sent via WhatsApp PDF</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p>📱 Questions? WhatsApp: +254 710 654 707</p>
            </div>

            <Button onClick={handleClose} variant="success" className="w-full">
              Continue Learning
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;