import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Users, Star, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LessonContent from "./LessonContent";
import WatchDemoButton from "./WatchDemoButton";
import AccessCertificationForm from "./AccessCertificationForm";
import GroupRegistrationForm from "./GroupRegistrationForm";

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
        content: "WhatsApp Business: Your Mobile Shop Front! 📱\n\nWhat is WhatsApp Business?\nA FREE professional version of WhatsApp designed specifically for small businesses. Think of it as your mobile storefront where customers can:\n• Browse your products\n• Ask questions instantly\n• Make orders directly\n• Get quick customer service\n\nWhy Every Business Needs It:\n💰 COST: Completely FREE (no monthly fees)\n📍 REACH: 2+ billion users worldwide\n🇰🇪 LOCAL: 90% of Kenyans use WhatsApp daily\n⚡ INSTANT: Real-time customer communication\n📈 SALES: Direct path from chat to sale\n\nKey Differences from Regular WhatsApp:\n\nRegular WhatsApp:\n• Personal chats only\n• No business info\n• Limited features\n• Looks unprofessional\n\nWhatsApp Business:\n✅ Business profile with hours, location, description\n✅ Product catalogs\n✅ Auto-replies and quick responses\n✅ Away messages\n✅ Labels to organize customers\n✅ Message statistics\n✅ Multiple device access\n\nSuccess Stories:\n• Mama Njeri's salon: 300% more bookings\n• John's electronics shop: KES 50,000 monthly sales increase\n• Sarah's catering: 150 new customers in 3 months\n\nWhat You'll Achieve:\n• Professional business presence\n• 24/7 customer availability\n• Organized customer management\n• Increased sales and bookings\n• Better customer relationships\n\nReady to transform your business communication? Let's get started! 🚀",
        completed: false
      },
      {
        id: 2,
        title: "Creating Your WhatsApp Business Profile Step-by-Step",
        content: "Setting Up Your Professional Business Profile 👔\n\nStep 1: Download WhatsApp Business\n• Go to Google Play Store or App Store\n• Search 'WhatsApp Business'\n• Download the GREEN app (not the regular blue one)\n• Install and open\n\nStep 2: Account Setup\n⚠️ IMPORTANT: Use a different phone number than your personal WhatsApp\n• Enter your business phone number\n• Verify with SMS code\n• Choose 'Business' when prompted\n\nStep 3: Business Profile Creation\n\n🏢 BUSINESS NAME:\n• Use your actual business name\n• Examples: 'Sarah's Beauty Salon', 'Tech Repair Hub', 'Fresh Fruits Delivery'\n\n📝 DESCRIPTION (160 characters):\nTell customers what you do:\n• 'Professional hair styling & makeup services in Nairobi. Book your appointment today! Quality services, affordable prices.'\n• 'Phone repairs, accessories & tech support. Same-day service guaranteed. Call or WhatsApp for quotes.'\n• 'Fresh fruits delivered to your door. Order before 6PM for next-day delivery. Serving Nairobi & surroundings.'\n\n📍 ADDRESS:\n• Add your exact business location\n• Helps customers find you\n• Builds trust and credibility\n\n🕒 BUSINESS HOURS:\n• Monday to Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 4:00 PM\n• Sunday: Closed (or your preferred hours)\n\n🌐 WEBSITE/SOCIAL MEDIA:\n• Add your Facebook page\n• Instagram handle\n• Website if you have one\n\n📧 EMAIL:\n• Professional email address\n• Customers can contact you multiple ways\n\nStep 4: Profile Photo\n✅ GOOD PHOTOS:\n• Your business logo\n• Shop front picture\n• Professional headshot\n• Product showcase\n\n❌ AVOID:\n• Personal photos\n• Blurry images\n• Inappropriate content\n\nPro Tips:\n• Keep description updated with current offers\n• Use keywords customers search for\n• Respond to profile views quickly\n• Update hours during holidays\n\nYour profile is your first impression - make it count! 💪",
        completed: false
      },
      {
        id: 3,
        title: "Uploading Product or Service Catalogs",
        content: "Create Your Digital Shop Window! 🛍️\n\nWhat is a WhatsApp Catalog?\nYour digital storefront where customers can:\n• Browse your products/services\n• See prices and descriptions\n• Share items with friends\n• Place orders directly\n\nSetting Up Your Catalog:\n\nStep 1: Access Catalog\n• Open WhatsApp Business\n• Tap 'Business Tools' (or three dots menu)\n• Select 'Catalog'\n• Tap 'Add Item'\n\nStep 2: Product Information\n\n📸 PHOTOS:\n• Take clear, well-lit photos\n• Show product from multiple angles\n• Use good background (plain white/clean)\n• Maximum 10 photos per item\n\n🏷️ PRODUCT NAME:\n• Clear and descriptive\n• Include key features\n• Examples:\n  - 'Samsung Galaxy A54 - 128GB, Purple'\n  - 'Bridal Makeup Package - Full Day Service'\n  - 'Fresh Avocados - 1kg, Premium Quality'\n\n💰 PRICE:\n• Always include accurate pricing\n• Use 'KES' prefix\n• Examples: 'KES 2,500', 'KES 150 per kg'\n• Add 'Starting from KES...' for services\n\n📝 DESCRIPTION:\n• Key features and benefits\n• Size, color, specifications\n• What's included\n• Delivery information\n\nExample Descriptions:\n\nFor Electronics:\n'Brand new Samsung Galaxy A54. 6.4\" display, 50MP camera, 5000mAh battery. Comes with charger, earphones, and 1-year warranty. Free delivery in Nairobi.'\n\nFor Services:\n'Complete bridal makeup package includes: trial session, wedding day makeup, hair styling, false lashes, touch-up kit. Professional products used. 6+ years experience.'\n\nFor Food/Products:\n'Fresh Hass avocados directly from our farm. Perfect ripeness, chemical-free, hand-picked. Minimum order 1kg. Same-day delivery available in Nairobi.'\n\nStep 3: Categories\nOrganize products into sections:\n• Electronics → Phones, Accessories, Repairs\n• Beauty → Makeup, Hair, Nails\n• Food → Fruits, Vegetables, Prepared meals\n• Services → Consultation, Installation, Repair\n\nStep 4: Catalog Management\n• Update prices regularly\n• Remove out-of-stock items\n• Add new products weekly\n• Respond to catalog inquiries quickly\n\nPro Tips:\n✅ Use natural lighting for photos\n✅ Include size comparisons\n✅ Show products in use\n✅ Highlight bestsellers\n✅ Add seasonal items\n\n❌ Avoid blurry photos\n❌ Don't use stock images\n❌ Skip outdated prices\n❌ Forget product details\n\nYour catalog = Your sales team working 24/7! 📈",
        completed: false
      },
      {
        id: 4,
        title: "Setting Quick Replies & Away Messages",
        content: "Automate Your Customer Service! 🤖\n\nQuick Replies: Your Time-Saving Shortcuts\n\nWhat are Quick Replies?\nPre-written responses for common questions that you can send with one tap!\n\nSetting Up Quick Replies:\n1. WhatsApp Business → Business Tools\n2. Quick Replies → Create\n3. Add shortcut keyword and message\n\nEssential Quick Replies to Create:\n\n💬 GREETING (/hello)\n'Hello! Welcome to [Business Name]. How can I help you today? Feel free to browse our catalog or ask any questions. We're here to serve you! 😊'\n\n📋 PRICING (/prices)\n'Thank you for your interest! Our current prices are:\n• [Service 1]: KES [Amount]\n• [Service 2]: KES [Amount]\n• [Service 3]: KES [Amount]\nPrices include [what's included]. Would you like to place an order?'\n\n🚚 DELIVERY (/delivery)\n'We offer delivery services:\n📍 Within Nairobi: KES 200 (same day)\n📍 Outside Nairobi: KES 300-500 (next day)\n📍 Free delivery on orders above KES 2,000\nDelivery time: 2-6 hours within Nairobi'\n\n⏰ HOURS (/hours)\n'Our business hours:\n🕒 Monday - Friday: 8:00 AM - 6:00 PM\n🕒 Saturday: 9:00 AM - 4:00 PM\n🕒 Sunday: Closed\nWe respond to messages within 2 hours during business hours!'\n\n💳 PAYMENT (/payment)\n'We accept these payment methods:\n💰 M-Pesa: [Your number]\n🏦 Bank transfer: [Account details]\n💵 Cash on delivery\n📱 Airtel Money\nPayment confirmation required before delivery.'\n\n📞 CONTACT (/contact)\n'Reach us through:\n📱 WhatsApp: [Your number]\n📧 Email: [Your email]\n📍 Location: [Your address]\n🌐 Facebook: [Your page]\nWe're always ready to help!'\n\nAway Messages: Professional Availability\n\nWhen to Use Away Messages:\n• Outside business hours\n• During lunch breaks\n• When traveling\n• During busy periods\n• On holidays\n\nSample Away Messages:\n\n🌙 AFTER HOURS:\n'Thank you for contacting [Business Name]! Our office hours are Monday-Friday 8AM-6PM, Saturday 9AM-4PM. We're currently closed but will respond first thing tomorrow morning. For urgent matters, please call [emergency number].'\n\n🍽️ LUNCH BREAK:\n'We're currently on lunch break (1:00-2:00 PM) and will respond to your message shortly after 2:00 PM. Thank you for your patience!'\n\n🏖️ HOLIDAY:\n'We're currently closed for [holiday name] and will resume business on [date]. All orders placed during this time will be processed when we return. Thank you for your understanding!'\n\nSetting Up Away Messages:\n1. Business Tools → Away Message\n2. Choose when to send (outside hours, always, never)\n3. Write your message\n4. Save settings\n\nPro Tips:\n✅ Keep messages friendly and professional\n✅ Include expected response time\n✅ Provide alternative contact for urgent matters\n✅ Update messages regularly\n✅ Test your quick replies\n\n❌ Don't make messages too long\n❌ Avoid typos and errors\n❌ Don't forget to turn off away messages\n❌ Skip contact information\n\nSmart automation = Happy customers + More time for you! ⚡",
        completed: false
      },
      {
        id: 5,
        title: "Auto Welcome Messages & Customer Retention",
        content: "Turn First-Time Visitors into Loyal Customers! 🤝\n\nWelcome Messages: Your Digital Receptionist\n\nWhat is a Welcome Message?\nThe first automated message new customers receive when they contact you for the first time.\n\nSetting Up Welcome Messages:\n1. Business Tools → Greeting Message\n2. Enable 'Send greeting to new contacts'\n3. Write your welcome message\n4. Save and activate\n\nWelcome Message Templates:\n\n🎉 FOR SERVICE BUSINESSES:\n'Hello and welcome to [Business Name]! 👋\n\nThank you for contacting us! We're excited to help you with [your service type].\n\n✨ What we offer:\n• [Service 1]\n• [Service 2]\n• [Service 3]\n\n📱 Feel free to browse our catalog or ask any questions. Our team typically responds within 30 minutes during business hours.\n\nHow can we serve you today? 😊'\n\n🛍️ FOR PRODUCT BUSINESSES:\n'Welcome to [Business Name]! 🛒\n\nThanks for reaching out! We're your trusted source for [product type] with:\n\n✅ Quality guaranteed products\n✅ Competitive prices\n✅ Fast delivery service\n✅ Excellent customer support\n\n📋 Check out our catalog to see our latest items, or let us know what you're looking for!\n\nReady to shop? 🎯'\n\n🍔 FOR FOOD BUSINESSES:\n'Welcome to [Restaurant/Food Business Name]! 🍽️\n\nHungry? You've come to the right place!\n\n👨‍🍳 Fresh meals prepared daily\n🚚 Hot delivery to your location\n💰 Affordable prices\n⭐ 4.8-star customer rating\n\nBrowse our menu in the catalog or tell us what you're craving. We're here to serve you delicious food!\n\nWhat can we prepare for you today? 🔥'\n\nCustomer Retention Strategies:\n\n1. FOLLOW-UP MESSAGES:\nSend after 1 week:\n'Hi [Name]! How was your experience with [product/service]? We'd love to hear your feedback and help with anything else you need! 😊'\n\n2. SPECIAL OFFERS:\nMonthly offers:\n'🎉 Special offer for our valued customers! This month only: [discount/offer details]. Valid until [date]. Don't miss out!'\n\n3. NEW PRODUCT ALERTS:\n'🆕 New arrival alert! We just got [new product/service]. You were one of our first customers, so you get first access! Interested?'\n\n4. SEASONAL GREETINGS:\n'🎄 [Business Name] wishes you a Merry Christmas! Thank you for being an amazing customer this year. Looking forward to serving you in 2025!'\n\n5. LOYALTY REWARDS:\n'🏆 Congratulations! You're now a VIP customer with us. Enjoy 10% off your next order as a thank you for your continued support!'\n\nRetention Best Practices:\n\n📝 COLLECT CUSTOMER INFO:\n• Save contact names\n• Note their preferences\n• Remember purchase history\n• Track special occasions\n\n💬 PERSONALIZED MESSAGES:\n• Use customer names\n• Reference previous purchases\n• Suggest relevant products\n• Remember their preferences\n\n⏰ TIMING MATTERS:\n• Send messages during business hours\n• Avoid too frequent messaging\n• Respect customer preferences\n• Time seasonal offers well\n\n📊 TRACK ENGAGEMENT:\n• Monitor message responses\n• Note customer feedback\n• Adjust strategy based on results\n• Keep improving your approach\n\nCustomer Retention Schedule:\n\nWeek 1: Welcome message\nWeek 2: Follow-up & feedback request\nMonth 1: Special offer\nMonth 3: New product introduction\nMonth 6: Loyalty reward\nOngoing: Seasonal greetings & updates\n\nRetained customers spend 67% more than new customers! 📈\n\nRemember: Great service + personal touch = customers for life! 💝",
        completed: false
      },
      {
        id: 6,
        title: "Practice Task: Send Your First Business Message",
        content: "Put It All Together - Your WhatsApp Business Mastery Test! 🎯\n\nFinal Challenge Tasks:\n\n✅ TASK 1: COMPLETE PROFILE AUDIT\nCheck your business profile has:\n□ Professional business name\n□ Clear business description (160 characters)\n□ Accurate business hours\n□ Business address/location\n□ Professional profile photo\n□ Contact email\n□ Website/social media links\n\n✅ TASK 2: CATALOG SETUP\nCreate at least 3 items in your catalog:\n□ Item 1: Clear photo + description + price\n□ Item 2: Different category/service\n□ Item 3: Your bestseller/featured item\n□ Organize into logical categories\n□ Test sharing catalog items\n\n✅ TASK 3: AUTOMATION SETUP\n□ Welcome message activated\n□ At least 5 quick replies created:\n  • /hello (greeting)\n  • /prices (pricing info)\n  • /delivery (delivery details)\n  • /hours (business hours)\n  • /payment (payment methods)\n□ Away message configured\n□ Test all automated responses\n\n✅ TASK 4: SEND YOUR FIRST PROFESSIONAL MESSAGE\n\nScenario: A customer just asked about your services\n\nYour message should include:\n• Professional greeting\n• Thank them for interest\n• Brief service overview\n• Direct them to catalog\n• Clear call-to-action\n• Professional closing\n\nSample Professional Response:\n'Hello! Thank you for your interest in [Business Name]! 😊\n\nWe specialize in [your main service/product] and have been serving customers in [your area] for [time period].\n\n📋 I've shared our catalog with you - please take a look at our current offerings and prices. Everything is clearly detailed there.\n\n✨ Our customers love us because:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nWhich of our services interests you most? I'm here to help with any questions and can provide a personalized quote.\n\nLooking forward to serving you!\n\nBest regards,\n[Your Name]\n[Business Name]\n📱 [Phone number]'\n\n✅ TASK 5: CUSTOMER CONVERSATION PRACTICE\n\nPractice handling these common scenarios:\n\n💬 SCENARIO 1: Price Inquiry\nCustomer: 'How much for [service]?'\nYour response: Use quick reply + personalized touch\n\n💬 SCENARIO 2: Delivery Question\nCustomer: 'Do you deliver to [area]?'\nYour response: Clear delivery info + next steps\n\n💬 SCENARIO 3: Product Availability\nCustomer: 'Do you have [product] in stock?'\nYour response: Check stock + suggest alternatives if needed\n\n💬 SCENARIO 4: Complaint Handling\nCustomer: 'I'm not happy with [issue]'\nYour response: Apologize + solution + follow-up\n\n✅ TASK 6: BUSINESS ANALYTICS CHECK\n\nMonitor your first week:\n□ Messages sent vs received\n□ Response time average\n□ Most used quick replies\n□ Catalog views and shares\n□ Customer conversion rate\n\n🎉 CONGRATULATIONS!\n\nYou've just completed WhatsApp Business Mastery!\n\nWhat You've Achieved:\n✅ Professional business presence\n✅ 24/7 automated customer service\n✅ Organized product showcase\n✅ Efficient customer communication\n✅ Tools for business growth\n\nExpected Results in 30 Days:\n📈 50% more customer inquiries\n💰 30% increase in sales\n⏰ 2 hours daily time savings\n😊 Improved customer satisfaction\n🔄 Better customer retention\n\nNext Level Tips:\n• Integrate with Facebook/Instagram\n• Use WhatsApp Web for computer access\n• Create broadcast lists for promotions\n• Track customer journey and preferences\n• Scale with WhatsApp Business API\n\nYou're now a WhatsApp Business Pro! 🏆\n\nKeep practicing, stay consistent, and watch your business grow! 📱💼✨",
        completed: false
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the difference between WhatsApp Business and regular WhatsApp?",
        type: "short-answer",
        correctAnswer: "WhatsApp Business has professional features like catalogs, auto-replies, business profiles, and customer management tools"
      },
      {
        id: 2,
        question: "True or False: WhatsApp Business lets you create product catalogs.",
        type: "true-false",
        correctAnswer: "True"
      },
      {
        id: 3,
        question: "Which of these is NOT a WhatsApp Business feature?",
        type: "multiple-choice",
        options: ["Auto reply", "Away message", "Delete message after 5 mins", "Quick replies"],
        correctAnswer: "Delete message after 5 mins"
      },
      {
        id: 4,
        question: "Why should a business include their location in their WhatsApp profile?",
        type: "short-answer",
        correctAnswer: "To help customers find the business and build trust and credibility"
      },
      {
        id: 5,
        question: "How do quick replies help save time for small business owners?",
        type: "short-answer",
        correctAnswer: "They provide pre-written responses for common questions that can be sent with one tap"
      },
      {
        id: 6,
        question: "What makes a good welcome message for new clients?",
        type: "short-answer",
        correctAnswer: "Professional greeting, business introduction, services overview, and clear call-to-action"
      },
      {
        id: 7,
        question: "Describe how to set up your business hours on WhatsApp.",
        type: "short-answer",
        correctAnswer: "Go to Business Profile settings and add your operating hours for each day of the week"
      },
      {
        id: 8,
        question: "Write a sample quick reply message for replying to new orders.",
        type: "short-answer",
        correctAnswer: "Thank you for your order! We've received your request and will confirm details within 30 minutes. Payment required before processing."
      },
      {
        id: 9,
        question: "Which section lets you view statistics like 'messages sent' or 'delivered'?",
        type: "short-answer",
        correctAnswer: "Business Tools or Analytics section in WhatsApp Business"
      },
      {
        id: 10,
        question: "How can WhatsApp Business improve customer retention?",
        type: "short-answer",
        correctAnswer: "Through personalized follow-ups, special offers, loyalty rewards, and excellent customer service"
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
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

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

          {/* New Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t">
            <WatchDemoButton />
            <Button 
              variant="success" 
              size="xl"
              onClick={() => setShowAccessForm(true)}
            >
              Get Full Access
            </Button>
            <Button 
              variant="accent" 
              size="xl"
              onClick={() => setShowCertificationForm(true)}
            >
              Get Certified
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => setShowGroupForm(true)}
            >
              Contact Learning
            </Button>
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
                    <div className="mt-4">
                      <LessonContent content={lesson.content} />
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

      {/* Forms */}
      <AccessCertificationForm 
        isOpen={showAccessForm}
        onClose={() => setShowAccessForm(false)}
        type="access"
      />
      
      <AccessCertificationForm 
        isOpen={showCertificationForm}
        onClose={() => setShowCertificationForm(false)}
        type="certification"
      />
      
      <GroupRegistrationForm 
        isOpen={showGroupForm}
        onClose={() => setShowGroupForm(false)}
      />
    </div>
  );
};

export default CourseDetail;
