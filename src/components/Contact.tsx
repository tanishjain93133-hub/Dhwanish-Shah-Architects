import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, User } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="pt-12 pb-24 bg-zinc-50 border-t border-zinc-200/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h2 className="text-4xl md:text-6xl font-light text-zinc-900 mb-8 leading-tight">
            Let's Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-amber-600 to-zinc-900 font-bold">
              Dream Into Reality ✨
            </span>
          </h2>
          <p className="text-zinc-600 text-lg mb-8 mx-auto max-w-md font-light leading-relaxed">
            Ready to challenge gravity? Reach out to our design studio in Ahmedabad.
          </p>

          <div className="flex justify-center mb-12">
            <motion.a
              href="https://wa.me/919879819691"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full hover:bg-[#22c35e] transition-all shadow-[0_10px_25px_rgba(37,211,102,0.2)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] border border-transparent"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[10px] uppercase tracking-wider opacity-90 mb-1 font-black text-white">Chat with us on</span>
                <span className="text-base font-black text-white">WhatsApp</span>
              </div>
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center justify-center gap-3 group bg-white p-5 rounded-3xl border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-amber-600/30 transition-all text-center">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center group-hover:bg-amber-600/10 transition-colors">
                <User className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-1 whitespace-nowrap">Principal Architect</p>
                <p className="text-xl md:text-2xl text-zinc-850 font-medium group-hover:text-amber-600 transition-colors">Ar. Dhwanish Shah</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 group bg-white p-5 rounded-3xl border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-amber-600/30 transition-all text-center">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center group-hover:bg-amber-600/10 transition-colors">
                <Mail className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex flex-col items-center overflow-hidden w-full">
                <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-1 whitespace-nowrap">Email</p>
                <a href="mailto:dshaharchitects@gmail.com" className="text-lg md:text-xl text-zinc-850 font-medium group-hover:text-amber-600 transition-colors truncate block max-w-full">
                  dshaharchitects@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 group bg-white p-5 rounded-3xl border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-amber-600/30 transition-all text-center">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center group-hover:bg-amber-600/10 transition-colors">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-1 whitespace-nowrap">Call</p>
                <a href="tel:+919879819691" className="text-xl md:text-2xl text-zinc-850 font-medium group-hover:text-amber-600 transition-colors">
                  +91 98798 19691
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-4 group bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-amber-600/30 transition-all max-w-4xl text-center w-full">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center group-hover:bg-amber-600/10 transition-colors">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-3 whitespace-nowrap">Visit Studio</p>
                <p className="text-2xl md:text-3xl text-zinc-850 font-medium leading-tight md:leading-relaxed group-hover:text-amber-600 transition-colors">
                  601, Anikedhya Capitol 2, Mahalakshmi Five Cross Road,<br className="hidden md:block" />
                  Opp. Pentagon Merlin, Paldi, Ahmedabad, Gujarat 380007
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
