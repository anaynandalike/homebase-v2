import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Camera,
  Check,
  Sparkles,
} from "lucide-react";

const interestOptions = [
  "Hiking",
  "Cooking",
  "Gaming",
  "Music",
  "Photography",
  "Reading",
  "Dancing",
  "Art",
  "Yoga",
  "Basketball",
  "Volunteering",
  "Writing",
  "Coding",
  "Surfing",
  "Hockey",
];

const lookingForOptions = [
  { id: "peer mentor", label: "Peer Mentor", desc: "An upperclassman who's been there" },
  { id: "travel buddy", label: "Travel Buddy", desc: "Someone to share rides home with" },
  { id: "study partner", label: "Study Partner", desc: "Accountability and coffee runs" },
  { id: "friends", label: "Friends", desc: "Good people to hang out with" },
];

const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { user, setUser, completeOnboarding } = useUserStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [university, setUniversity] = useState(user.university);
  const [homeState, setHomeState] = useState(user.homeState);
  const [interests, setInterests] = useState<string[]>(user.interests);
  const [lookingFor, setLookingFor] = useState<string[]>(user.lookingFor);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleLookingFor = (id: string) => {
    setLookingFor((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return name.trim() && university.trim() && homeState;
    if (step === 2) return interests.length > 0;
    if (step === 3) return lookingFor.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 1) setUser({ name, university, homeState });
    if (step === 2) setUser({ interests });
    if (step === 3) setUser({ lookingFor });
    if (step === 4) {
      completeOnboarding();
      navigate("/dashboard");
      return;
    }
    setStep((s) => s + 1);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Home className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Welcome to HomeBase
          </h1>
          <p className="text-warmgray mt-1.5 text-sm">Your home away from home</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-red" : "bg-sand"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-sand/60">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-heading text-xl font-semibold mb-1">
                  Tell us about yourself
                </h2>
                <p className="text-warmgray text-sm mb-6">
                  Let's start with the basics
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/30 focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      University
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g., University of Michigan"
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/30 focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Home State
                    </label>
                    <select
                      value={homeState}
                      onChange={(e) => setHomeState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/30 focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40 transition-all appearance-none"
                    >
                      <option value="">Select your home state</option>
                      {usStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-heading text-xl font-semibold mb-1">
                  What are you into?
                </h2>
                <p className="text-warmgray text-sm mb-6">
                  Select all that apply
                </p>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => {
                    const selected = interests.includes(interest.toLowerCase());
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selected
                            ? "bg-red text-white shadow-sm"
                            : "bg-cream border border-sand text-warmgray hover:border-red/30 hover:text-red"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-heading text-xl font-semibold mb-1">
                  What are you looking for?
                </h2>
                <p className="text-warmgray text-sm mb-6">
                  We'll tailor your experience
                </p>
                <div className="space-y-3">
                  {lookingForOptions.map((option) => {
                    const selected = lookingFor.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleLookingFor(option.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          selected
                            ? "border-red bg-red/5"
                            : "border-sand bg-cream/30 hover:border-red/30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selected ? "border-red bg-red" : "border-sand"
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <div className="font-medium text-charcoal text-sm">
                            {option.label}
                          </div>
                          <div className="text-warmgray text-xs">
                            {option.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-heading text-xl font-semibold mb-1">
                  Add a profile photo
                </h2>
                <p className="text-warmgray text-sm mb-6">
                  Help others recognize you (optional)
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 bg-cream border-2 border-dashed border-sand rounded-full flex flex-col items-center justify-center mb-4 hover:border-red/40 transition-colors cursor-pointer">
                    <Camera className="w-7 h-7 text-warmgray mb-1" />
                    <span className="text-[10px] text-warmgray">Upload</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red/5 rounded-xl border border-red/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-red" />
                    <span className="font-medium text-sm text-red">
                      You're all set!
                    </span>
                  </div>
                  <p className="text-sm text-warmgray">
                    Welcome, <strong>{name}</strong>! We found{" "}
                    <strong>5 students</strong> from {homeState} and{" "}
                    <strong>3 events</strong> this week.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 text-sm text-warmgray hover:text-charcoal transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-red text-white rounded-full font-medium text-sm hover:bg-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 4 ? "Get Started" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
