import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

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
      console.log("Submitting form with values:", values);

      // Insert the beta signup data into Supabase with the required created_at field
      const { error, data } = await supabase.from("beta_signups").insert({
        name: values.name,
        email: values.email,
        created_at: new Date().toISOString(),
      });

      console.log("Supabase response:", { error, data });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message || "Failed to submit form");
      }

      toast({
        title: "Thank you for joining!",
        description:
          "We'll reach out to you soon with early access information.",
      });
      form.reset();
    } catch (error: any) {
      console.error("Form submission error:", error);

      // More specific error message
      let errorMessage = "Please try again later.";

      if (error.message && error.message.includes("duplicate")) {
        errorMessage = "This email has already been registered.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Something went wrong",
        description: `${errorMessage} If the issue persists, contact support at info@emvoai.com directly.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="join-beta"
      className="section-spacing bg-black relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto card-glass py-12 px-6 sm:px-10 rounded-3xl animate-fade-up">
          <div className="text-center mb-10">
            <h2 className="mobile-heading-3 text-white">
              Join Our Early Access Beta
            </h2>
            <p className="text-gray-300">
              Be among the first to experience RUVO and help shape the future of
              AI companionship.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md mx-auto space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-200 mb-1">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400/60 focus:ring focus:ring-orange-300/20 focus:ring-opacity-50 transition-all"
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
                    <FormLabel className="block text-sm font-medium text-gray-200 mb-1">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400/60 focus:ring focus:ring-orange-300/20 focus:ring-opacity-50 transition-all"
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
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Join thousands in building the future of AI companionship.{" "}
                <br />
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
