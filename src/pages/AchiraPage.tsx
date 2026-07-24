import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, Filter, ShoppingBag, X, Check, Star, Shield, Award, ChevronDown, Eye, RotateCcw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

interface Product {
  id: string;
  name: string;
  category: string; // e.g., 'Diamond Rings', 'Gold Necklaces'
  collection: 'Diamond' | 'Gold';
  metal: '22K Gold' | '18K Gold' | 'White Gold' | 'Rose Gold' | 'Diamond';
  price: number;
  occasion: 'Wedding' | 'Bridal' | 'Anniversary' | 'Daily Wear' | 'Festive' | 'Gift Collection';
  badge?: 'New Arrival' | 'Best Seller' | 'Limited Edition';
  image: string;
  description: string;
  purity: string;
  weight: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Diamond Solitaire Ring',
    category: 'Diamond Rings',
    collection: 'Diamond',
    metal: 'White Gold',
    price: 48500,
    occasion: 'Wedding',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600',
    description: 'An exquisite solitaire diamond ring crafted in pure 18K white gold. Featuring a brilliant cut center solitaire diamond of premium VVS clarity and E color grade.',
    purity: '18K White Gold (750)',
    weight: '3.4 grams'
  },
  {
    id: '2',
    name: 'Celestial Diamond Earrings',
    category: 'Diamond Earrings',
    collection: 'Diamond',
    metal: 'Rose Gold',
    price: 62000,
    occasion: 'Anniversary',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600',
    description: 'Delicate constellation inspired diamond drop earrings set in hand-polished 18K rose gold. Adorned with micro-pave diamonds for unparalleled sparkle.',
    purity: '18K Rose Gold',
    weight: '4.8 grams'
  },
  {
    id: '3',
    name: 'Heritage Gold Necklace',
    category: 'Gold Necklaces',
    collection: 'Gold',
    metal: '22K Gold',
    price: 128000,
    occasion: 'Wedding',
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    description: 'A spectacular antique-finish gold choker necklace. Crafted in certified 22K yellow gold featuring intricate filigree work and floral temple motifs.',
    purity: '22K Gold (916 Hallmark)',
    weight: '18.2 grams'
  },
  {
    id: '4',
    name: 'Emerald Gold Pendant',
    category: 'Gold Pendants',
    collection: 'Gold',
    metal: '18K Gold',
    price: 52000,
    occasion: 'Daily Wear',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600',
    description: 'An elegant statement pendant set with a natural pear-shaped Colombian emerald, bordered by delicate round brilliant diamonds in 18K gold.',
    purity: '18K Yellow Gold',
    weight: '2.9 grams'
  },
  {
    id: '5',
    name: 'Signature Diamond Bracelet',
    category: 'Diamond Bracelets',
    collection: 'Diamond',
    metal: 'Rose Gold',
    price: 89000,
    occasion: 'Anniversary',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600',
    description: 'A modern bangle-bracelet featuring a cross-over diamond wave design. Crafted beautifully in warm 18K rose gold with clean brilliant accents.',
    purity: '18K Rose Gold',
    weight: '6.1 grams'
  },
  {
    id: '6',
    name: 'Classic Gold Bangles',
    category: 'Gold Bangles',
    collection: 'Gold',
    metal: '22K Gold',
    price: 96500,
    occasion: 'Festive',
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600',
    description: 'A pair of traditional solid gold bangles featuring hand-carved textured geometric patterns. Certified BIS 916 Hallmark gold.',
    purity: '22K Yellow Gold',
    weight: '14.5 grams'
  },
  {
    id: '7',
    name: 'Imperial Diamond Necklace',
    category: 'Diamond Necklaces',
    collection: 'Diamond',
    metal: 'White Gold',
    price: 245000,
    occasion: 'Bridal',
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600',
    description: 'A masterpiece bridal necklace set with over 5 carats of premium round and marquise-cut diamonds, cascading into a stunning central teardrop.',
    purity: '18K White Gold',
    weight: '24.7 grams'
  },
  {
    id: '8',
    name: 'Luxury Gold Ring',
    category: 'Gold Rings',
    collection: 'Gold',
    metal: '18K Gold',
    price: 41900,
    occasion: 'Gift Collection',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600',
    description: 'An everyday luxury gold band ring with polished high-shine mirror finish and a subtle contemporary twisted braid layout.',
    purity: '18K Yellow Gold',
    weight: '4.2 grams'
  }
];

export const AchiraPage: React.FC = () => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  
  // Cart & Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Collections list
  const collectionsList = [
    'Diamond Rings', 'Diamond Earrings', 'Diamond Pendants', 'Diamond Necklaces', 'Diamond Bangles', 'Diamond Bracelets',
    'Gold Rings', 'Gold Earrings', 'Gold Pendants', 'Gold Necklaces', 'Gold Bangles', 'Gold Bracelets'
  ];

  // Metals list
  const metalsList = ['22K Gold', '18K Gold', 'White Gold', 'Rose Gold', 'Diamond'];

  // Occasions list
  const occasionsList = ['Wedding', 'Bridal', 'Anniversary', 'Daily Wear', 'Festive', 'Gift Collection'];

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Collection category
      if (selectedCollections.length > 0 && !selectedCollections.includes(product.category)) {
        return false;
      }
      // Metal
      if (selectedMetals.length > 0 && !selectedMetals.includes(product.metal)) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      // Occasion
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedCollections, selectedMetals, maxPrice, selectedOccasions]);

  // Wishlist toggle
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    showToast(wishlist.includes(id) ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  // Add to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to Cart`);
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Total price in cart
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCollections([]);
    setSelectedMetals([]);
    setMaxPrice(500000);
    setSelectedOccasions([]);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0D0D0D] font-serif selection:bg-[#B88A44]/10 antialiased">
      <SEO 
        title="ACHIRA | High-End Premium Fine Jewellery Collection Since 1960"
        description="Discover Achira Fine Jewellery. Explore custom certified diamonds, 22K yellow gold necklaces, designer earrings, engagement bands, and bridal collection."
      />
      <Navbar />

      {/* Hero Header Section */}
      <header className="relative pt-36 pb-20 text-center bg-[#F4EFEA] border-b border-[#EADFCF]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-[10px] sm:text-xs tracking-[0.6em] text-[#B88A44] font-semibold uppercase block">
            ESTABLISHED 1960
          </span>
          <h1 className="text-5xl sm:text-7xl font-light tracking-[0.1em] text-[#0D0D0D] uppercase font-serif">
            ACHIRA
          </h1>
          <div className="w-24 h-[1px] bg-[#B88A44] mx-auto my-6" />
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-zinc-650 max-w-xl mx-auto font-sans leading-relaxed">
            Curating rare craftsmanship, absolute purity, and timeless designs for over six decades.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 1. LEFT SIDEBAR FILTERS */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-[#EADFCF] shadow-[0_4px_24px_rgba(184,138,68,0.04)]">
            <div className="flex items-center justify-between border-b border-[#F4EFEA] pb-4">
              <h2 className="text-lg font-semibold tracking-wider flex items-center gap-2">
                <Filter size={18} className="text-[#B88A44]" /> Filters
              </h2>
              <button 
                onClick={resetFilters}
                className="text-xs tracking-wider font-sans text-[#B88A44] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-zinc-500 block">Search Jewellery</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="E.g., Solitaire, Necklace"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#EADFCF] bg-[#FAF8F5] focus:outline-none focus:border-[#B88A44] font-sans text-sm"
                />
                <Search size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Collection */}
            <div className="space-y-3">
              <label className="text-xs font-sans tracking-widest uppercase text-zinc-500 block">Collection Category</label>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-200">
                {collectionsList.map((col) => (
                  <label key={col} className="flex items-center gap-3 text-sm font-sans text-zinc-700 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedCollections.includes(col)}
                      onChange={(e) => {
                        setSelectedCollections(prev => 
                          e.target.checked ? [...prev, col] : prev.filter(c => c !== col)
                        );
                      }}
                      className="rounded border-[#EADFCF] text-[#B88A44] focus:ring-[#B88A44]"
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div className="space-y-3">
              <label className="text-xs font-sans tracking-widest uppercase text-zinc-500 block">Metal Purity</label>
              <div className="space-y-2">
                {metalsList.map((metal) => (
                  <label key={metal} className="flex items-center gap-3 text-sm font-sans text-zinc-700 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedMetals.includes(metal)}
                      onChange={(e) => {
                        setSelectedMetals(prev => 
                          e.target.checked ? [...prev, metal] : prev.filter(m => m !== metal)
                        );
                      }}
                      className="rounded border-[#EADFCF] text-[#B88A44] focus:ring-[#B88A44]"
                    />
                    <span>{metal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-sans tracking-widest uppercase text-zinc-500">
                <span>Price Range</span>
                <span className="text-[#B88A44] font-semibold">₹40,000 – ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={40000} 
                max={500000} 
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B88A44] bg-[#F4EFEA] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Occasion */}
            <div className="space-y-3">
              <label className="text-xs font-sans tracking-widest uppercase text-zinc-500 block">Occasion</label>
              <div className="space-y-2">
                {occasionsList.map((occ) => (
                  <label key={occ} className="flex items-center gap-3 text-sm font-sans text-zinc-700 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedOccasions.includes(occ)}
                      onChange={(e) => {
                        setSelectedOccasions(prev => 
                          e.target.checked ? [...prev, occ] : prev.filter(o => o !== occ)
                        );
                      }}
                      className="rounded border-[#EADFCF] text-[#B88A44] focus:ring-[#B88A44]"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* 2. MAIN CONTENT PRODUCT GRID */}
          <main className="flex-grow space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EADFCF] pb-4">
              <p className="text-sm font-sans text-zinc-500">
                Showing <span className="font-semibold text-[#0D0D0D]">{filteredProducts.length}</span> luxury designs
              </p>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B88A44]/20 bg-[#FAF8F5] text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <ShoppingBag size={14} /> 
                <span>Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </button>
            </div>

            {/* Empty view */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#EADFCF] space-y-4">
                <p className="text-xl font-light text-zinc-500">No jewelry pieces match your search criteria.</p>
                <button 
                  onClick={resetFilters} 
                  className="px-6 py-2.5 rounded-full bg-[#0D0D0D] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#EADFCF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(184,138,68,0.08)] transition-all duration-500 relative"
                  >
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#B88A44] text-white text-[9px] font-sans font-bold tracking-widest uppercase">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-[#EADFCF] shadow-sm hover:scale-110 active:scale-95 transition-all text-[#B88A44] cursor-pointer"
                    >
                      <Heart size={16} fill={isWishlisted ? "#B88A44" : "none"} />
                    </button>

                    {/* Image Area */}
                    <div className="aspect-[4/5] overflow-hidden bg-[#FAF8F5] relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                      
                      {/* Quick view icon */}
                      <button 
                        onClick={() => setSelectedProductDetails(product)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#EADFCF] text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] hover:text-white transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
                      >
                        <Eye size={12} /> View Details
                      </button>
                    </div>

                    {/* Text Details */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div className="space-y-2">
                        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-zinc-500 block">
                          {product.collection} Collection
                        </span>
                        <h3 className="text-base font-medium font-serif leading-tight group-hover:text-[#B88A44] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        
                        {/* Cert badge */}
                        <div className="flex items-center gap-1.5 text-[9px] font-sans text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 w-fit">
                          <Check size={10} /> Hallmark Certified
                        </div>

                        <p className="text-lg font-semibold text-[#0D0D0D] font-serif pt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        <button 
                          onClick={() => setSelectedProductDetails(product)}
                          className="w-full py-2.5 rounded-lg border border-[#EADFCF] text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-[#FAF8F5] transition-all cursor-pointer"
                        >
                          Specs
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full py-2.5 rounded-lg bg-[#0D0D0D] text-white text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] transition-all shadow-md cursor-pointer"
                        >
                          Add To Bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </main>
        </div>
      </section>

      {/* 3. PRODUCT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProductDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProductDetails(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden border border-[#EADFCF] shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button 
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/95 border border-[#EADFCF] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Left Column Image */}
              <div className="w-full md:w-1/2 aspect-square bg-[#FAF8F5] relative">
                <img 
                  src={selectedProductDetails.image} 
                  alt={selectedProductDetails.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column Specs */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F5]">
                <div className="space-y-4">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#B88A44] block">
                    {selectedProductDetails.collection} Collection
                  </span>
                  <h2 className="text-2xl font-semibold font-serif leading-tight">
                    {selectedProductDetails.name}
                  </h2>
                  <p className="text-2xl font-semibold text-[#0D0D0D] font-serif">
                    ₹{selectedProductDetails.price.toLocaleString('en-IN')}
                  </p>
                  
                  <div className="w-12 h-[1px] bg-[#B88A44] my-2" />
                  
                  <p className="text-zinc-650 text-sm font-sans leading-relaxed">
                    {selectedProductDetails.description}
                  </p>

                  {/* Certification specs table */}
                  <div className="space-y-2 border-t border-b border-[#EADFCF] py-3 mt-4 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Metal Purity:</span>
                      <span className="font-semibold text-zinc-900">{selectedProductDetails.purity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Product Weight:</span>
                      <span className="font-semibold text-zinc-900">{selectedProductDetails.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Certified Diamond:</span>
                      <span className="font-semibold text-emerald-700">BIS Hallmark & GIA Certified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={() => {
                      addToCart(selectedProductDetails);
                      setSelectedProductDetails(null);
                    }}
                    className="w-full py-3.5 rounded-lg bg-[#0D0D0D] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] transition-all shadow-md cursor-pointer"
                  >
                    Add to Luxury Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CART BAG DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0d0d0d]/40 backdrop-blur-xs flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#FAF8F5] shadow-2xl border-l border-[#EADFCF] flex flex-col justify-between p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cart Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
                <h2 className="text-xl font-semibold tracking-wider font-serif">Luxury Bag</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#EADFCF] flex items-center justify-center hover:scale-105 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto py-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <p className="text-zinc-500 font-sans">Your shopping bag is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#0D0D0D] text-white text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] transition-all cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 border-b border-[#EADFCF]/60 pb-6 last:border-b-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-[#EADFCF] shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-serif font-medium text-sm text-zinc-900">{item.product.name}</h4>
                        <p className="text-xs text-zinc-500 font-sans">{item.product.metal} • {item.product.weight}</p>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs font-sans text-zinc-700">Qty: {item.quantity}</span>
                          <span className="font-serif font-semibold text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[10px] font-sans text-red-600 hover:underline pt-2 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-[#EADFCF] pt-6 space-y-4">
                  <div className="flex justify-between font-serif text-lg font-semibold">
                    <span>Grand Total:</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] font-sans text-zinc-500 leading-relaxed">
                    * Including BIS Hallmark validation, secure transit insurance, and complimentary velvet jewelry box packaging.
                  </p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      showToast('Proceeding to Secure Checkout');
                    }}
                    className="w-full py-4 rounded-lg bg-[#0D0D0D] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#B88A44] transition-all shadow-lg shadow-zinc-900/10 cursor-pointer"
                  >
                    Proceed to Secure Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. TOAST NOTIFICATION POPUP */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-10 right-10 z-50 bg-[#0D0D0D] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-[#B88A44]/30"
          >
            <div className="w-5 h-5 rounded-full bg-[#B88A44] flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
            <span className="text-xs font-sans tracking-wide uppercase font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
