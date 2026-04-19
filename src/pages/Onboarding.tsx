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
  "Hiking", "Cooking", "Gaming", "Music", "Photography", "Reading",
  "Dancing", "Art", "Yoga", "Basketball", "Volunteering", "Writing",
  "Coding", "Surfing", "Hockey",
];

const lookingForOptions = [
  { id: "peer mentor", label: "Peer Mentor", desc: "An upperclassman who's been there" },
  { id: "travel buddy", label: "Travel Buddy", desc: "Someone to share rides home" },
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
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Home className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Welcome to HomeBase
          </h1>
          <p className="text-warmgray mt-1 text-xs">Your home away from home</p>
        </div>

        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-red" : "bg-sand"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand/60">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-heading text-lg font-semibold mb-0.5">
                  Tell us about yourself
                </h2>
                <p className="text-warmgray text-xs mb-5">The basics</p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                      className="w-full px-3 py-2.5 rounded-xl border border-sand bg-cream/30 text-xs focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g., University of Michigan"
                      className="w-full px-3 py-2.5 rounded-xl border border-sand bg-cream/30 text-xs focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal mb-1">
                      Home State
                    </label>
                    <select
                      value={homeState}
                      onChange={(e) => setHomeState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-sand bg-cream/30 text-xs focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40 appearance-none"
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
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-heading text-lg font-semibold mb-0.5">
                  What are you into?
                </h2>
                <p className="text-warmgray text-xs mb-5">Select all that apply</p>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((interest) => {
                    const selected = interests.includes(interest.toLowerCase());
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest.toLowerCase())}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                          selected
                            ? "bg-red text-white"
                            : "bg-cream border border-sand text-warmgray hover:border-red/30"
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
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-heading text-lg font-semibold mb-0.5">
                  What are you looking for?
                </h2>
                <p className="text-warmgray text-xs mb-5">We'll tailor your experience</p>
                <div className="space-y-2">
                  {lookingForOptions.map((option) => {
                    const selected = lookingFor.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleLookingFor(option.id)}
                        className={`w-full flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                          selected
                            ? "border-red bg-red/5"
                            : "border-sand bg-cream/30 hover:border-red/30"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selected ? "border-red bg-red" : "border-sand"
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div>
                          <p className="font-medium text-xs text-charcoal">{option.label}</p>
                          <p className="text-[10px] text-warmgray">{option.desc}</p>
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
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-heading text-lg font-semibold mb-0.5">
                  Profile photo
                </h2>
                <p className="text-warmgray text-xs mb-5">Optional</p>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-cream border-2 border-dashed border-sand rounded-full flex flex-col items-center justify-center mb-3 hover:border-red/40 transition-colors cursor-pointer">
                    <Camera className="w-6 h-6 text-warmgray mb-0.5" />
                    <span className="text-[9px] text-warmgray">Upload</span>
                  </div>
                </div>

                <div className="mt-5 p-3 bg-red/5 rounded-xl border border-red/10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-red" />
                    <span className="font-medium text-xs text-red">You're all set!</span>
                  </div>
                  <p className="text-[11px] text-warmgray">
                    Welcome, <strong>{name}</strong>! We found{" "}
                    <strong>5 students</strong> from {homeState} and{" "}
                    <strong>3 events</strong> this week.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-0.5 text-xs text-warmgray hover:text-charcoal"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-5 py-2 bg-red text-white rounded-full text-xs font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
            >
              {step === 4 ? "Get Started" : "Continue"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
