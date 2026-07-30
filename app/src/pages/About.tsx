import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Link } from 'react-router';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To bridge the digital divide by creating awareness about government digital services and welfare schemes, ensuring every citizen can access and benefit from them.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'A digitally empowered India where every citizen is aware of and can easily access government services, leading to inclusive growth and development.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'We believe in transparency, accessibility, and citizen empowerment. Our platform is built on the principles of inclusivity and digital equality for all.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Information',
    description: 'All content is verified from official government sources',
  },
  {
    icon: Globe,
    title: 'Comprehensive Coverage',
    description: 'Covers services and schemes across all ministries',
  },
  {
    icon: Users,
    title: 'Citizen First',
    description: 'Designed with citizen needs as the top priority',
  },
  {
    icon: Zap,
    title: 'Easy Access',
    description: 'Simple, intuitive interface for quick information access',
  },
  {
    icon: Lightbulb,
    title: 'Awareness Building',
    description: 'Interactive quiz to test and improve awareness',
  },
  {
    icon: CheckCircle,
    title: 'Always Updated',
    description: 'Regular updates to keep information current',
  },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
              Building a{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Digitally Aware
              </span>{' '}
              Nation
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Digital Citizen is a comprehensive platform dedicated to spreading awareness about government digital services and welfare schemes among Indian citizens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding -mt-10">
        <div className="page-container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="page-container mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
                Everything You Need to Know
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform provides comprehensive information about digital services and welfare schemes in an easy-to-understand format.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
                Simple Steps to Access Information
              </h2>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { step: '01', title: 'Browse', desc: 'Explore services and schemes by category' },
              { step: '02', title: 'Search', desc: 'Find specific information using filters' },
              { step: '03', title: 'Learn', desc: 'Read detailed information and eligibility' },
              { step: '04', title: 'Apply', desc: 'Visit official portals to apply' },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full">
                      <ArrowRight className="w-6 h-6 text-primary/30" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="page-container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
              Ready to Explore?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Start your journey towards digital empowerment today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:shadow-xl transition-all"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/schemes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Browse Schemes <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
