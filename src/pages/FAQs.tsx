
import React from "react";
import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQs = () => {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Ruvo?",
          answer: "Ruvo is an AI companion designed to provide emotional support and engage in meaningful conversations. Using advanced natural language processing and emotional intelligence, Ruvo offers a supportive presence that can help with daily reflection, emotional check-ins, and friendly conversation."
        },
        {
          question: "How is Ruvo different from other AI assistants?",
          answer: "Unlike typical AI assistants that focus on tasks and information, Ruvo specializes in emotional intelligence and supportive conversation. We've developed Ruvo with input from psychologists to create an experience that feels empathetic and understanding."
        },
        {
          question: "Is Ruvo free to use?",
          answer: "Ruvo offers a free tier with basic features and conversation limits. Premium subscription plans provide additional features such as unlimited conversations, advanced memory capabilities, voice customization, and priority support."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "How does Ruvo handle my personal data?",
          answer: "Ruvo takes privacy seriously. Your conversations are encrypted and stored securely. You can delete your conversation history at any time. We never sell your personal data to third parties. See our Privacy Policy for complete details."
        },
        {
          question: "Can I delete my conversation history?",
          answer: "Yes, you can delete individual messages or your entire conversation history at any time through the privacy settings in your account."
        },
        {
          question: "Is Ruvo GDPR compliant?",
          answer: "Yes, Ruvo complies with GDPR regulations for users in the European Union. We provide data portability, the right to be forgotten, and transparent data processing practices."
        }
      ]
    },
    {
      category: "Voice Features",
      questions: [
        {
          question: "What voice options are available?",
          answer: "Ruvo offers a variety of premium voices with different personalities, tones, and accents. You can select your preferred voice from our voice settings menu."
        },
        {
          question: "Can I use voice input instead of typing?",
          answer: "Yes, Ruvo supports voice input on compatible browsers and devices. Simply tap the microphone icon to start speaking instead of typing."
        },
        {
          question: "Why isn't voice recognition working on my device?",
          answer: "Voice recognition requires a compatible browser and microphone access. Make sure you've granted microphone permissions and are using an up-to-date browser like Chrome, Edge, or Safari."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "Ruvo isn't responding to my messages. What should I do?",
          answer: "First, check your internet connection. If you're connected but still experiencing issues, try refreshing the page. If problems persist, you may have reached your conversation limit (for free tier users) or there might be temporary service disruptions."
        },
        {
          question: "How do I update the app?",
          answer: "The web version of Ruvo updates automatically when you refresh the page. For mobile apps, updates are handled through your device's app store."
        },
        {
          question: "What browsers are supported?",
          answer: "Ruvo works best on modern browsers like Google Chrome, Microsoft Edge, Safari, and Firefox. We recommend keeping your browser updated to the latest version for optimal performance."
        }
      ]
    }
  ];

  return (
    <PageLayout 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about Ruvo."
    >
      <div className="space-y-12">
        {faqs.map((category, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, i) => (
                <AccordionItem key={i} value={`item-${index}-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}

        <section className="bg-ruvo-50 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Didn't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Our support team is ready to help with any questions you might have about using Ruvo.
          </p>
          <Link 
            to="/contact" 
            className="bg-gradient-to-r from-ruvo-400 to-ruvo-300 text-white font-medium rounded-full px-6 py-2.5 transition duration-300 shadow-md hover:shadow-lg"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </PageLayout>
  );
};

export default FAQs;
