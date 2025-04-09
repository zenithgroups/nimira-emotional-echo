
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const BetaSignupSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    try {
      // Using Formspree to send the form data
      const response = await fetch("https://formspree.io/f/nimiraai@zohomail.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          _subject: "New Nimira Beta Signup",
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Thank you for joining!",
          description: "We'll reach out to you soon with early access information.",
        });
        form.reset();
      } else {
        // Handle non-OK responses specifically
        const errorData = await response.json().catch(() => ({}));
        console.error("Form submission error response:", errorData);
        
        throw new Error(errorData.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support at nimiraai@zohomail.in directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="join-beta" className="section-spacing relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nimira-400/10 via-nimira-300/5 to-nimira-200/10 z-0"></div>
      <div className="absolute top-20 left-10 w-60 h-60 bg-nimira-400/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-nimira-300/10 rounded-full blur-3xl z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto glass py-12 px-6 sm:px-10 rounded-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Early Access Beta</h2>
            <p className="text-gray-600">
              Be among the first to experience Nimira and help shape the future of AI companionship.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md mx-auto space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nimira-400 focus:ring focus:ring-nimira-300/20 focus:ring-opacity-50 transition-all"
                        placeholder="Your name"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nimira-400 focus:ring focus:ring-nimira-300/20 focus:ring-opacity-50 transition-all"
                        placeholder="your.email@example.com"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-button flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Join thousands in building the future of AI companionship. <br />
                We'll never share your information with third parties.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default BetaSignupSection;
