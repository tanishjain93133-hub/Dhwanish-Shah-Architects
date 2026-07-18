import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Stepper, { Step } from './Stepper';
import { SafeImage } from './SafeImage';

interface InquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquireModal: React.FC<InquireModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto pt-16 md:items-center md:pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-3xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl z-20 my-auto"
          >
            <div className="relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

            <Stepper
              initialStep={1}
              onFinalStepCompleted={() => {
                setTimeout(onClose, 2000);
              }}
              nextButtonText="Continue"
              backButtonText="Back"
              showCompleteButton={false}
            >
              <Step>
                <div className="text-center py-4">
                  <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-white mb-4">
                    Welcome to <span className="text-neon-cyan font-normal">DSA!</span>
                  </h2>
                  <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm mx-auto">
                    We're excited to help you transform your vision into an architectural masterpiece.
                  </p>
                </div>
              </Step>

              <Step>
                <div className="text-center py-2 relative">
                  <h2 className="text-2xl md:text-4xl font-light text-white mb-2 leading-tight">
                    Ready to design your <span className="text-neon-cyan">dream home</span> with DSA?
                  </h2>
                  <div className="w-full max-h-[160px] aspect-[2.5/1] rounded-2xl overflow-hidden mb-3 border border-white/10 shadow-2xl bg-white/5 relative group">
                    <SafeImage 
                      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
                      alt="Dream Home" 
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                  </div>
                  <p className="text-white/40 font-medium tracking-widest text-[10px] uppercase mb-4">
                    Check out the next step!
                  </p>

                  <motion.a
                    href="https://wa.me/919879819691"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full hover:bg-[#22c35e] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] mx-auto border border-white/10"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[9px] uppercase tracking-wider opacity-90 mb-1 font-black">Chat with us on</span>
                      <span className="text-sm font-black text-white">WhatsApp</span>
                    </div>
                  </motion.a>
                </div>
              </Step>

            </Stepper>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
