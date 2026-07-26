import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form State Management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare data for Web3Forms
    const payload = {
      ...formData,
      access_key: "aaf833fe-c70c-49ae-8b46-22db3beccb9b", // <-- PASTE YOUR KEY HERE
      subject: `New Portfolio Inquiry from ${formData.name}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Clear form
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5 z-20 flex justify-center"
    >
      <div className="max-w-4xl w-full px-6 md:px-16 flex flex-col md:flex-row gap-16">
        
        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            05 // Get In Touch
          </h3>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
            Let's Build <br/> <span className="text-gray-600">Together.</span>
          </h2>
          <p className="text-gray-400 font-sans text-base leading-relaxed mb-8">
            Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-col gap-2">
            <span className="text-white font-sans text-sm tracking-widest uppercase">Email</span>
            <a href="mailto:swarajdalvi0@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              swarajdalvi0@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center mb-4">
                  <span className="text-green-500 text-xl">✓</span>
                </div>
                <h3 className="text-white font-heading text-xl">Message Sent!</h3>
                <p className="text-gray-400 text-sm mt-2">I will get back to you soon.</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-sans tracking-widest uppercase text-gray-400">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Leonardo DiCaprio"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-sans tracking-widest uppercase text-gray-400">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-sans tracking-widest uppercase text-gray-400">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-2 w-full py-4 bg-white text-black font-sans text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};