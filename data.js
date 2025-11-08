import { CheckCircle, LogIn, FileText, Timer, Send } from "lucide-react";

export const data = {
    Hero : {
        title: {t1:"Turn Your Notes Into Smart Mock Tests",t2:"😎"},
        des: "No more manual prep. Upload content and let AI handle the test creation with built-in time management.Transform any document into a focused mock exam with smart question generation and flexible timer options"
    },
    tutorial_section : {
        header: "is just a click away"
    },
    footer: { text : "© Mogger.AI all rights reserved. ", terms : "terms and conditions" }
}
 
 const steps = [
    {
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      title: "Step 1: Sign In",
      description:
        "Login using your Google account or register using your email and password.",
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "Step 2: Go to Dashboard",
      description:
        "After logging in, you'll be redirected to the /home page. This is your workspace.",
    },
    {
      icon: <Send className="w-6 h-6 text-green-600" />,
      title: "Step 3: Upload or Prompt",
      description:
        "You can write a custom prompt or upload a PDF file for question generation.",
    },
    {
      icon: <Timer className="w-6 h-6 text-green-600" />,
      title: "Step 4: Set Exam Timer",
      description:
        "Choose a timer that suits your needs. You can pick from presets or create a custom time.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600 " />,
      title: "Step 5: Start the Test",
      description:
        "Once ready, hit the generate button and begin your mock test instantly!",
    },
  ];

  export default steps