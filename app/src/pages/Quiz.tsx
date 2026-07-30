import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { quizAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Question {
  _id: string;
  question: string;
  options: string[];
  category: string;
  difficulty: string;
  explanation: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const params: any = { limit: 10 };
      if (difficulty !== 'All') params.difficulty = difficulty;
      const res = await quizAPI.getAll(params);
      setQuestions(res.data.questions || []);
      resetQuiz();
    } catch {
      toast.error('Failed to load quiz questions');
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [
      ...answers,
      { questionId: questions[currentIndex]._id, selectedAnswer: selectedAnswer },
    ];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: { questionId: string; selectedAnswer: number }[]) => {
    try {
      const res = await quizAPI.validate({ answers: finalAnswers });
      setResult(res.data);
      setShowResult(true);
    } catch {
      toast.error('Failed to submit quiz');
    }
  };

  const getCitizenTier = (score: number) => {
    if (score >= 80) return { title: 'Responsible Digital Citizen', desc: 'Outstanding! You are highly aware of digital governance, DigiLocker, and online safety.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (score >= 60) return { title: 'Digital Safety Practitioner', desc: 'Good job! You understand most digital services but should review OTP and phishing safety.', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (score >= 40) return { title: 'Digital Citizen Learner', desc: 'Keep learning! Read our Cyber Safety and Services guides to protect yourself online.', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { title: 'Digital Safety Beginner', desc: 'Start your digital awareness journey today by reading our step-by-step service guides.', color: 'text-red-600 bg-red-50 border-red-200' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-12 gradient-hero text-white">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
              Citizen Awareness Assessment
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-3">
              How Digital-Smart Are You?
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Test your knowledge on OTP safety, DigiLocker, UMANG, official government portals, and cyber scams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="section-padding">
        <div className="page-container mx-auto max-w-3xl">
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Difficulty Pills */}
              {answers.length === 0 && currentIndex === 0 && !selectedAnswer && (
                <div className="mb-6 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Difficulty:</span>
                  {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        difficulty === d
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Progress</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                {questions.length > 0 && currentQ && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{currentQ.category}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                        {currentQ.difficulty}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mb-6 leading-snug">
                      {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => {
                        const isChosen = selectedAnswer === index;
                        return (
                          <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={`w-full p-4 rounded-xl text-left transition-all ${
                              isChosen
                                ? 'bg-primary/10 border-2 border-primary shadow-sm'
                                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                            } ${selectedAnswer !== null && !isChosen ? 'opacity-50' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                  isChosen ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span className="text-sm font-semibold text-gray-800">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Educational Instant Explanation */}
                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1"
                      >
                        <div className="font-bold text-sm flex items-center gap-1.5 text-primary">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Educational Insight</span>
                        </div>
                        <p className="leading-relaxed text-slate-700">
                          {currentQ.explanation || 'Always verify information on official government portals ending with .gov.in'}
                        </p>
                      </motion.div>
                    )}

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleNext}
                        disabled={selectedAnswer === null}
                        className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2 disabled:opacity-50 font-bold"
                      >
                        {currentIndex < questions.length - 1 ? (
                          <>Next Question <ArrowRight className="w-4 h-4" /></>
                        ) : (
                          <>Finish Assessment <CheckCircle className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {questions.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700">No questions available</h3>
                </div>
              )}
            </motion.div>
          ) : (
            /* Results View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-200 text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto text-white shadow-xl">
                  <Trophy className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-serif">Assessment Completed!</h2>
                  {result && (
                    <div className={`mt-4 p-4 rounded-2xl border max-w-lg mx-auto ${getCitizenTier(result.score).color}`}>
                      <span className="text-xs uppercase tracking-wider font-extrabold block">Your Citizen Tier</span>
                      <h3 className="text-xl font-bold mt-0.5">{getCitizenTier(result.score).title}</h3>
                      <p className="text-xs mt-1 leading-relaxed">{getCitizenTier(result.score).desc}</p>
                    </div>
                  )}
                </div>

                <div className="text-5xl font-extrabold text-primary">
                  {result?.score}%
                </div>
                <p className="text-sm text-gray-600">
                  You answered {result?.correctAnswers} out of {result?.totalQuestions} questions correctly
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <Target className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-base font-bold text-gray-900">{result?.totalQuestions}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Total</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-base font-bold text-emerald-700">{result?.correctAnswers}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Correct</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200">
                    <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <div className="text-base font-bold text-red-700">
                      {result?.totalQuestions - result?.correctAnswers}
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Incorrect</div>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="btn-primary px-8 py-3.5 text-sm inline-flex items-center gap-2 font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Quiz Again
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
