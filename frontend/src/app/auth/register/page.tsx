"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Briefcase, Mail, Lock, User, Building, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState<'CANDIDATE' | 'RECRUITER'>('CANDIDATE');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyRole: "",
    phone: "",
    location: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth(); // We log them in immediately after register if the API supports it, or redirect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Backend expects role in body
      const payload = { ...formData, role };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || result.error || "Registration failed.");
      }

      // The backend register endpoint returns { user, tokens } just like login!
      login(result.data); 
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 border rounded-xl bg-card/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join RecruitAI to transform hiring</p>
        </div>

        {/* Role Selector */}
        <div className="flex p-1 bg-background/50 rounded-lg mb-6 border">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'CANDIDATE' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setRole('CANDIDATE')}
          >
            I'm a Candidate
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'RECRUITER' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setRole('RECRUITER')}
          >
            I'm a Recruiter
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          {/* Common Fields */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              name="name" type="text" placeholder="Full Name" 
              className="pl-10 bg-background" value={formData.name} onChange={handleChange} required
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              name="email" type="email" placeholder="Email address" 
              className="pl-10 bg-background" value={formData.email} onChange={handleChange} required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              name="password" type="password" placeholder="Create a Password" 
              className="pl-10 bg-background" value={formData.password} onChange={handleChange} required minLength={6}
            />
          </div>

          {/* Conditional Fields based on Role */}
          <AnimatePresence mode="popLayout">
            {role === 'RECRUITER' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="companyName" type="text" placeholder="Company Name" 
                    className="pl-10 bg-background" value={formData.companyName} onChange={handleChange} required={role === 'RECRUITER'}
                  />
                </div>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="companyRole" type="text" placeholder="Your Job Title (e.g. Hiring Manager)" 
                    className="pl-10 bg-background" value={formData.companyRole} onChange={handleChange} required={role === 'RECRUITER'}
                  />
                </div>
              </motion.div>
            )}

            {role === 'CANDIDATE' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="phone" type="tel" placeholder="Phone Number (Optional)" 
                    className="pl-10 bg-background" value={formData.phone} onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="location" type="text" placeholder="Location (Optional)" 
                    className="pl-10 bg-background" value={formData.location} onChange={handleChange}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
