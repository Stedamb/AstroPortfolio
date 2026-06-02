'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, {
    error: 'Name must be at least 2 characters.',
  }),
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
  subject: z.string().min(2, {
    error: 'Subject must be at least 2 characters.',
  }),
  message: z.string().min(10, {
    error: 'Message must be at least 10 characters.',
  }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!privacyConsent) {
      toast({
        variant: 'destructive',
        title: 'Consent Required',
        description: 'Please accept the privacy policy to send a message.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      toast({
        title: 'Success!',
        description: "Thank you for your message. I'll get back to you soon!",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description:
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="flex-none space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4 mb-4 grow">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="lg:h-full">
                <FormControl>
                  <Textarea
                    placeholder="Your Message"
                    className="h-full min-h-[200px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Checkbox
            id="privacy"
            checked={privacyConsent}
            onCheckedChange={(checked) => setPrivacyConsent(checked === true)}
          />
          <Label
            htmlFor="privacy"
            className="text-muted-foreground cursor-pointer text-xs leading-relaxed"
          >
            I have read and accept the{' '}
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
          </Label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-md cursor-pointer font-normal inline-flex w-full flex-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-linear-to-br from-blue-500/10 to-cyan-500/10 text-foreground/90 shadow-xs hover:text-foreground px-6 py-3 transition-colors duration-200 hover:border-cyan-600 hover:bg-white/20 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          <Mail className="h-5 w-5" />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </Form>
  );
}
