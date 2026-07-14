import React from 'react';
import { motion } from 'motion/react';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from './SafeImage';

const testimonials = [
  {
    name: "Mr Chinten Bhai",
    role: "CEO, Accurate Wealth",
    content: "Honestly, the final result looked almost exactly the same as the 3D design we were shown. Every detail from the lighting and colors to the furniture placement was executed perfectly. The entire process felt smooth and transparent, and seeing the design come to life exactly as imagined was truly satisfying.",
    rating: 4.5,
    image: "/images/drive_16PrfPpHke1l4A_1xsvbVsDIBVI-CqQFh.png",
    projectName: "A & A Wealth",
    projectId: "comm-dsa-04",
    videoLink: "https://youtu.be/2ZEw3Ne2YQI?si=6eOsFa8B42EM9kPu",
    reviewPath: "/aa-wealth-review"
  },
  {
    name: "Mr. Parth Shah",
    role: "Anchor",
    content: "From our very first meeting, we had no clear idea how the house would be planned or designed. But Dhwanish Shah transformed our home beyond our expectations. The entire process felt smooth and budget-friendly, and the final result looked exactly the way we had imagined. Seeing our dream home come to life so beautifully was truly satisfying.",
    rating: 4.8,
    image: "/images/drive_12DLBtHG8UYHWhfPkPKE19bL1GF2tJDHt.jpg",
    projectName: "Subtle Sanctuary",
    projectId: "res-dsa-01",
    videoLink: "https://youtu.be/gJnjnILgxAY?si=Qh0cgFrRHKIN5S5f",
    reviewPath: "/parth-shah-review"
  },
  {
    name: "Mr. Dhrupen Bhai",
    role: "Ahmedabad",
    content: "Initially, we had many doubts about how the home would turn out, but the 3D designs gave us complete clarity and confidence. Every detail was executed perfectly, and the final home looked exactly as we imagined. DSA truly understood our vision and transformed our space beautifully.",
    rating: 4.9,
    image: "/images/drive_1pHtnhAeMf_LnI_bgzKBP9j9Uo-zqmHlG.jpg",
    projectName: "DHS House",
    projectId: "res-dsa-06",
    videoLink: "https://youtu.be/wE6hgUvp0g4?si=kmE1lMVDzxxImoeY",
    reviewPath: "/js-house-review"
  }
];

const moreTestimonials = [
  {
    name: "Mr. Chetas Patel",
    role: "Chartered Accountant",
    content: "Working with DSA was a smooth and professional experience from start to finish. The team understood our vision perfectly and transformed our home into a modern, elegant, and comfortable living space. Their attention to detail, material selection, and execution quality truly exceeded our expectations.",
    rating: 4,
    image: "/images/drive_1lu9AvHbFrIOP6DPXEap_3A0t3quM8ibn.jpg",
    projectName: "CP House",
    projectId: "res-dsa-07",
    videoLink: "https://youtu.be/RShwYG0Znao?si=SgVgDsSz6Eyzr0oD",
    reviewPath: "/cp-house-review"
  },
  {
    name: "Mr. Shashan Bhai",
    role: "Ahmedabad",
    content: "We wanted a home that felt warm, comfortable, and exactly the way we imagined. What we loved most about DSA was the transparency throughout the process — from material selection to final execution, everything was handled honestly and professionally. The final result looked exactly like our vision.",
    rating: 5,
    // Google Drive: https://drive.google.com/file/d/11uAgsnf6gVgt0vsGuH64XCXiX5nBU5xg/view?usp=sharing
    image: "/images/drive_11uAgsnf6gVgt0vsGuH64XCXiX5nBU5xg.jpg",
    projectName: "Anchor House",
    projectId: "res-dsa-08",
    videoLink: "https://youtu.be/OONMZxcLYus?si=KagpkB4PpsW0uqzT",
    reviewPath: "/anchor-house",
    style: { objectPosition: "center 65%" }
  },
  {
    name: "Mr. Japan Bhai",
    role: "Ahmedabad",
    content: "We truly love our newly designed office at Shlip Aaron. The DSA team completed a 15-day project in just 7 days while keeping everything within budget. From the warm lighting to the elegant wood detailing, the final office turned out modern, premium, and beautifully designed for our team.",
    rating: 4.7,
    image: "/images/drive_1Y43Nu1oD9H8ibrjbsNX1Dfu6prWNesM4.jpg",
    projectName: "Shlip Aaron",
    projectId: "comm-dsa-07",
    videoLink: "https://youtu.be/PClXJVyL4sE?si=mWC5rs-k2mGcgoVf",
    reviewPath: "https://youtu.be/PClXJVyL4sE?si=mWC5rs-k2mGcgoVf"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-zinc-100/40 border-b border-zinc-200/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-zinc-900"
          >
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-amber-600 to-zinc-900">Testimonials</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Real experiences from homeowners who trusted DSA to transform their spaces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600/10 to-blue-600/10 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white/80 backdrop-blur-xl p-8 sm:p-12 lg:p-10 xl:p-12 rounded-[2.5rem] border border-zinc-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] h-auto lg:h-[800px] flex flex-col justify-between items-center text-center group-hover:border-amber-600/25 transition-all duration-500">
                {/* Top Section */}
                <div className="flex flex-col items-center w-full">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-200 group-hover:border-amber-600 transition-all duration-500 mb-8 flex-shrink-0 relative overflow-hidden group/img">
                    <SafeImage 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center"
                      size="small"
                      style={(testimonial as any).style}
                    />
                    {/* Floating Clickable Link Area inside Image */}
                    {testimonial.videoLink && !(testimonial as any).disableImageLink && (
                      <a 
                        href={testimonial.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20 cursor-pointer"
                      />
                    )}
                  </div>

                  <div className="flex gap-1.5 mb-10">
                    {[...Array(5)].map((_, i) => {
                      const isFull = i < Math.floor(testimonial.rating);
                      const isHalf = i === Math.floor(testimonial.rating) && testimonial.rating % 1 > 0;
                      
                      if (isFull) {
                        return <Star key={i} className="w-[18px] h-[18px] fill-yellow-500 text-yellow-500" />;
                      }
                      if (isHalf) {
                        return (
                          <div key={i} className="relative w-[18px] h-[18px]">
                            <Star className="absolute inset-0 w-[18px] h-[18px] text-zinc-200" />
                            <div className="absolute inset-0 w-[50%] overflow-hidden">
                              <Star className="w-[18px] h-[18px] fill-yellow-500 text-yellow-500" />
                            </div>
                          </div>
                        );
                      }
                      return <Star key={i} className="w-[18px] h-[18px] text-zinc-200" />;
                    })}
                  </div>
                  
                  {/* Fixed-height testimonial content block to absorb varying length of text */}
                  <div className="h-auto lg:h-52 flex items-center justify-center w-full mb-10">
                    <p className="text-zinc-600 text-sm md:text-[16px] leading-[1.8] font-light italic max-w-[270px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[260px] xl:max-w-[295px] mx-auto overflow-y-auto">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center w-full mt-auto">
                  {/* Project Button */}
                  <Link to="/projects" className="mb-5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-52 h-12 rounded-full bg-zinc-50 border border-zinc-200 hover:border-amber-600/50 hover:bg-zinc-50 transition-all duration-300 flex items-center justify-center group/btn cursor-pointer"
                    >
                      <span className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold group-hover/btn:text-zinc-900 transition-colors">
                        {testimonial.projectName}
                      </span>
                    </motion.button>
                  </Link>

                  {testimonial.reviewPath?.startsWith('http') ? (
                    <a 
                      href={testimonial.reviewPath} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-14 block"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-52 h-12 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <div className="w-3 h-3 bg-white flex items-center justify-center" style={{ clipPath: 'polygon(20% 0%, 20% 100%, 100% 50%)' }} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">
                          VIEW
                        </span>
                      </motion.button>
                    </a>
                  ) : (
                    <Link 
                      to={testimonial.reviewPath || `/project/${testimonial.projectId}`} 
                      target={testimonial.reviewPath ? "_blank" : undefined}
                      className="mb-14"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-52 h-12 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <div className="w-3 h-3 bg-white flex items-center justify-center" style={{ clipPath: 'polygon(20% 0%, 20% 100%, 100% 50%)' }} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">
                          VIEW
                        </span>
                      </motion.button>
                    </Link>
                  )}

                  <div className="h-16 flex flex-col justify-center">
                    <h4 className="text-zinc-900 font-bold text-xl tracking-tight leading-tight mb-2">{testimonial.name}</h4>
                    <p className="text-zinc-400 text-xs uppercase tracking-[0.2em]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Testimonials Button */}
        <div className="flex justify-center mt-16">
          <Link to="/testimonials">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 h-14 rounded-full bg-white border border-zinc-200 hover:border-amber-600/50 hover:bg-zinc-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg group cursor-pointer"
            >
              <span className="text-zinc-800 text-xs uppercase tracking-[0.2em] font-bold group-hover:text-amber-600 transition-colors">
                More Testimonials
              </span>
              <ChevronRight size={16} className="text-zinc-500 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};
