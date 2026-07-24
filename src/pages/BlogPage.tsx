import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, Calendar, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { SEO } from '../components/SEO';

interface BlogPostContent {
  type: 'p' | 'h2' | 'h3' | 'list' | 'link' | 'quote';
  text?: string;
  items?: string[];
  linkText?: string;
  href?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  postTime: string;
  author: string;
  image: string;
  content: BlogPostContent[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'seven-mistakes-building-dream-home',
    title: '7 Mistakes to Avoid While Building Your Dream Home',
    excerpt: 'Building a home? Avoid these costly mistakes.',
    date: 'July 25, 2026',
    postTime: '11:00 AM',
    author: 'Tanish Jain',
    image: '/images/dream-home-mistakes.jpg',
    content: [
      { type: 'p', text: "Building your dream home is one of the biggest investments you'll ever make. A well-planned home not only looks beautiful but also provides comfort, functionality, and long-term value. However, many homeowners make common mistakes that can lead to unnecessary expenses and future problems." },
      { type: 'h3', text: '1. Starting Without Proper Planning' },
      { type: 'p', text: 'Every successful home begins with a detailed architectural plan. Planning room layouts, ventilation, parking, storage, and future expansion saves both time and money.' },
      { type: 'h3', text: '2. Ignoring Natural Light & Ventilation' },
      { type: 'p', text: 'Natural lighting and airflow make your home healthier, brighter, and more energy-efficient.' },
      { type: 'h3', text: '3. Choosing Cheap Materials' },
      { type: 'p', text: 'Quality construction materials ensure durability, safety, and lower maintenance costs over the years.' },
      { type: 'h3', text: '4. Poor Space Utilization' },
      { type: 'p', text: 'Every square foot matters. Smart space planning creates a home that feels larger and more functional.' },
      { type: 'h3', text: '5. Forgetting Waterproofing' },
      { type: 'p', text: 'Water leakage is one of the most common issues in new homes. Proper waterproofing protects your investment.' },
      { type: 'h3', text: '6. Poor Electrical & Plumbing Planning' },
      { type: 'p', text: 'Always plan future electrical points, internet wiring, and plumbing connections before construction begins.' },
      { type: 'h3', text: '7. Not Hiring a Professional Architect' },
      { type: 'p', text: 'A professional architect helps optimize your budget while designing a home that perfectly matches your lifestyle.' },
      { type: 'h3', text: 'Final Thoughts' },
      { type: 'p', text: "A dream home isn't built by chance—it is built through careful planning, quality construction, and expert design. Investing in professional architectural services today can save significant costs in the future." }
    ]
  },
  {
    id: 'minimal-luxury-philosophy',
    title: 'The Philosophy of Minimal Luxury: Creating Homes That Feel Timeless',
    excerpt: 'True luxury isn\'t about spending more—it\'s about creating a home that feels comfortable, functional, and timeless every single day.',
    date: 'July 10, 2026',
    postTime: '01:30 PM',
    author: 'Tanish Jain',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200',
    content: [
      { type: 'h3', text: 'A Home Is More Than Just Four Walls' },
      { type: 'p', text: 'When people think about luxury, they often imagine expensive materials or large spaces. But true luxury isn\'t about spending more—it\'s about creating a home that feels comfortable, functional, and timeless every single day.' },
      { type: 'p', text: 'At Dhwanish Shah Architects, we believe every home should reflect the personality and lifestyle of the people living in it. From thoughtful layouts to natural lighting and carefully selected materials, every detail contributes to a better living experience.' },
      { type: 'p', text: 'If you\'d like to know more about our design philosophy and our team, visit our About Us page.' },
      { type: 'link', linkText: '👉 About Us', href: '/about' },

      { type: 'h3', text: 'Why Modern Homes Feel More Open Today' },
      { type: 'p', text: 'One of the biggest changes in architecture is the shift towards open and connected spaces.' },
      { type: 'p', text: 'Instead of separating every room with walls, modern homes are designed to let spaces flow naturally. A living room connects with the dining area, which opens into a garden or courtyard. This creates a brighter, larger, and more welcoming environment.' },
      { type: 'p', text: 'You can explore some of our completed residential projects in our Projects section.' },
      { type: 'link', linkText: '👉 Explore Projects', href: '/portfolio' },

      { type: 'h3', text: 'Natural Light Changes Everything' },
      { type: 'p', text: 'Walk into any beautifully designed home, and you\'ll immediately notice one thing—natural light.' },
      { type: 'p', text: 'Large windows, skylights, and open courtyards don\'t just make a home look beautiful; they also improve comfort, reduce electricity usage, and make everyday living more enjoyable.' },
      { type: 'p', text: 'Every project at Dhwanish Shah Architects is planned to maximize daylight while maintaining privacy and energy efficiency.' },

      { type: 'h3', text: 'Choosing Materials That Last' },
      { type: 'p', text: 'Good architecture isn\'t only about appearance—it should stand the test of time.' },
      { type: 'p', text: 'We carefully choose materials that combine beauty with durability, including:' },
      { type: 'list', items: ['Natural Wood', 'Marble', 'Stone', 'Glass', 'Exposed Concrete', 'Metal Finishes'] },
      { type: 'p', text: 'These materials create elegant spaces that continue to look beautiful for years.' },
      { type: 'p', text: 'If you\'re interested in how lighting works with these materials, explore our Lights Collection.' },
      { type: 'link', linkText: '👉 Lights Collection', href: '/lights' },

      { type: 'h3', text: 'Every Home Should Tell a Story' },
      { type: 'p', text: 'No two families live the same way, so why should every home look the same?' },
      { type: 'p', text: 'We believe every project should be unique. Before creating a design, we spend time understanding how our clients live, work, entertain guests, and spend time with their families.' },
      { type: 'p', text: 'That\'s why every project we design feels personal instead of repetitive.' },
      { type: 'p', text: 'Take a look at our recent residential and commercial projects to see how every design is tailored to its owner.' },
      { type: 'link', linkText: '👉 View Portfolio', href: '/portfolio' },

      { type: 'h3', text: 'The Details Make the Difference' },
      { type: 'p', text: 'Beautiful architecture isn\'t created only through big ideas.' },
      { type: 'p', text: 'Sometimes the smallest details make the biggest impact:' },
      { type: 'list', items: ['Hidden storage solutions', 'Soft indirect lighting', 'Carefully selected textures', 'Well-planned circulation', 'Seamless indoor-outdoor connections'] },
      { type: 'p', text: 'These thoughtful decisions improve everyday living without drawing unnecessary attention.' },

      { type: 'h3', text: 'What Makes a Timeless Home?' },
      { type: 'p', text: 'A timeless home doesn\'t follow every trend.' },
      { type: 'p', text: 'Instead, it focuses on:' },
      { type: 'list', items: ['✔ Comfortable living', '✔ Natural ventilation', '✔ Functional layouts', '✔ Quality materials', '✔ Clean architectural lines', '✔ Long-lasting design'] },
      { type: 'p', text: 'These principles ensure your home remains beautiful for years to come.' },

      { type: 'h3', text: 'Thinking About Building Your Dream Home?' },
      { type: 'p', text: 'Whether you\'re planning your first home, renovating an existing property, or designing a luxury villa, working with the right architect makes all the difference.' },
      { type: 'p', text: 'Our team works closely with every client—from concept and planning to detailed execution—to create spaces that are both beautiful and practical.' },
      { type: 'p', text: 'If you\'re ready to start your project, we\'d love to hear your ideas.' },
      { type: 'link', linkText: '👉 Contact Us', href: '/contact' },

      { type: 'h3', text: 'You might also enjoy:' },
      { type: 'link', linkText: 'How to Choose the Right Architect for Your Dream Home → /about', href: '/about' },
      { type: 'link', linkText: 'Explore Our Residential & Commercial Projects → /portfolio', href: '/portfolio' },
      { type: 'link', linkText: 'Luxury Lighting Ideas for Modern Homes → /lights', href: '/lights' },
      { type: 'link', linkText: 'Read What Our Clients Say → /testimonials', href: '/testimonials' },

      { type: 'h3', text: 'Final Thoughts' },
      { type: 'p', text: 'Architecture isn\'t just about buildings—it\'s about improving the way people live.' },
      { type: 'p', text: 'At Dhwanish Shah Architects, every project is designed with care, creativity, and attention to detail. We aim to create homes and spaces that remain functional, elegant, and meaningful for generations.' }
    ]
  }
];

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePost, setActivePost] = React.useState<BlogPost | null>(null);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePost) {
      setActivePost(null);
      window.scrollTo({ top: 0 });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <SEO 
        title={activePost ? `${activePost.title} | DSA | Dhwanish Shah Architects` : "Architecture Blog | DSA | Dhwanish Shah Architects"}
        description={activePost ? activePost.excerpt : "Expert advice, design inspiration, construction tips, and modern architecture ideas to help you create timeless homes and inspiring spaces."}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-electric-purple/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-8px] transition-transform cursor-pointer"
          >
            <ArrowLeft size={16} /> {activePost ? "Back to All Blogs" : "Back to Home"}
          </button>

          {!activePost ? (
            <div className="max-w-7xl mx-auto">
              <div className="mb-20">
                <span className="text-neon-cyan text-[10px] font-bold tracking-[0.5em] mb-4 block uppercase border-l-2 border-neon-cyan pl-4">
                  Architecture Blog
                </span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-sans font-bold mb-6 tracking-tight uppercase"
                >
                  Architecture, Interior Design & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">Home Planning Guides</span>
                </motion.h1>
                <p className="text-white/60 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                  Expert advice, design inspiration, construction tips, and modern architecture ideas to help you create timeless homes and inspiring spaces.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      setActivePost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group relative bg-black/30 border border-black/10 rounded-xl overflow-hidden hover:border-neon-cyan/30 cursor-pointer transition-all duration-500 flex flex-col h-full shadow-sm"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <SafeImage 
                        src={post.image} 
                        alt={post.title} 
                        size="medium"
                        className="w-full h-full object-cover brightness-[0.92] group-hover:brightness-[1.05] group-hover:scale-105 transition-all duration-700"
                      />
                      {/* Subtle black gradient only at the bottom behind the image for better readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-mono mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-neon-cyan" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-electric-purple" />
                          {post.postTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-sans font-semibold mb-3 group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <span className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                          <User size={14} className="text-neon-cyan" />
                          {post.author}
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-neon-cyan uppercase group-hover:underline flex items-center gap-1">
                          Read Post <BookOpen size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ) : (
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="text-neon-cyan text-[10px] font-bold tracking-[0.5em] mb-4 block uppercase border-l-2 border-neon-cyan pl-4">
                Architecture Blog
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold mb-6 tracking-tight leading-tight uppercase">
                {activePost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-xs font-mono mb-10 py-4 border-y border-white/5">
                <span className="flex items-center gap-2">
                  <User size={14} className="text-neon-cyan" />
                  By {activePost.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-neon-cyan" />
                  Published {activePost.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-electric-purple" />
                  {activePost.postTime}
                </span>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-12 shadow-2xl border border-white/5">
                <SafeImage 
                  src={activePost.image} 
                  alt={activePost.title} 
                  size="large"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none">
                {activePost.content.map((block, index) => {
                  switch (block.type) {
                    case 'h3':
                      return (
                        <h2 key={index} className="text-xl sm:text-2xl font-sans font-bold text-white mt-12 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
                          {block.text}
                        </h2>
                      );
                    case 'p':
                      return (
                        <p key={index} className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-6">
                          {block.text}
                        </p>
                      );
                    case 'list':
                      return (
                        <ul key={index} className="list-none space-y-3 pl-0 mb-8 mt-4 bg-white/5 p-6 rounded-xl border border-white/5">
                          {block.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base font-light">
                              <span className="text-neon-cyan shrink-0 mt-1">✦</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    case 'link':
                      return (
                        <div key={index} className="my-6">
                          <Link 
                            to={block.href || '#'} 
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/40 transition-all duration-300 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md shadow-neon-cyan/5"
                          >
                            {block.linkText}
                          </Link>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button 
                  onClick={() => {
                    setActivePost(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase hover:translate-x-[-8px] transition-transform cursor-pointer"
                >
                  <ArrowLeft size={16} /> Back to All Blogs
                </button>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-white text-obsidian font-bold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-neon-cyan hover:text-obsidian transition-all duration-300 shadow-lg shadow-white/5"
                >
                  Start Your Dream Project
                </Link>
              </div>
            </motion.article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
