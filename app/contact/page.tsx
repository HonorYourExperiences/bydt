"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  organization: z.string().optional(),
  type: z.enum(["parent", "camp", "school", "presenter", "other"]),
  message: z.string().min(20, "Please tell us a bit more about what you're looking for"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "parent",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate sending — in production this would be a server action or API route
    await new Promise((resolve) => setTimeout((resolve), 650));

    console.log("Inquiry submitted:", data);

    toast.success("Thank you. Your inquiry has been received.", {
      description: "We respond within two business days.",
    });

    reset();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-2xl mb-12">
          <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">NEXT STEP</div>
          <h1 className="mb-4">Bring BYDT to Your Program</h1>
          <p className="text-xl text-text-secondary">
            Whether you run a summer camp, a school enrichment program, a library event, or a community space — 
            BYDT can meet children where they are.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 blueprint p-8 rounded-2xl border border-border bg-surface">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name">Your name</label>
              <input id="name" {...register("name")} placeholder="Alex Rivera" />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" {...register("email")} placeholder="you@program.org" />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="organization">Organization or program (optional)</label>
              <input id="organization" {...register("organization")} placeholder="Pine River Summer Camp" />
            </div>
            <div>
              <label htmlFor="type">I am a</label>
              <select id="type" {...register("type")}>
                <option value="parent">Parent</option>
                <option value="camp">Camp director / organizer</option>
                <option value="school">Educator or school administrator</option>
                <option value="presenter">Presenter or program leader</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message">Tell us about the children you serve and what you&apos;re hoping to create</label>
            <textarea
              id="message"
              rows={7}
              {...register("message")}
              placeholder="We're running a 4-week summer program for 40 rising 4th–6th graders and want something more meaningful than a regular craft station..."
            />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full md:w-auto text-base px-10 disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </button>
        </form>

        <div className="mt-12 text-sm text-text-secondary">
          Or email us directly: <a href="mailto:rhoward@buildyourdreamingthings.com" className="underline hover:text-navy">rhoward@buildyourdreamingthings.com</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
