export interface ProjectImageItem {
  id: string;
  src: string;
  alt: string;
  category: "Residential" | "Commercial";
  description: string;
  gallery?: string[];
  specs: {
    location: string;
    area: string;
    year: string;
    architect: string;
    materials: string[];
  };
}

export const PROJECTS_IMAGES: ProjectImageItem[] = [
  {
    id: "comm-dsa-04",
    src: "/images/1JHPhEFvokVoMViai2JRY2C97I_wcZ5Ap.jpg",
    alt: "A & A Wealth",
    category: "Commercial",
    description: "A & A Wealth is a modern commercial office space designed to create a professional yet comfortable working environment. The project features elegant interiors, premium materials, warm lighting, and smart space planning that together give the office a sophisticated and welcoming feel.",
    gallery: [
      "/images/1HitK9MepXCJqmoMaisI3_pUTzvYJZA00.jpg",
      "/images/1JHPhEFvokVoMViai2JRY2C97I_wcZ5Ap.jpg",
      "/images/1QD35D6_0pT2a_j9vYk2IO5-BhrRbXrwc.jpg",
      "/images/1eKA1CHzewmgRmwNRWG_oI2s_fKYrSMDL.jpg",
      "/images/1Rg-tzflx4mY1yefb608u77YANq5xeFUk.jpg",
      "/images/1gtqBoeZxA4aXSYVrnm_ldNO2G0aOFjhJ.jpg",
      "/images/16UwjT1SSzMIS4bVDiB8ZcntJuJcSwtrQ.jpg",
      "/images/1O5txCTxKc9EoSV62XE9b09ds8eZtQ61r.jpg"
    ],
    specs: {
      location: "Financial District, Milan",
      area: "4,200 SQ. FT.",
      year: "2025",
      architect: "DSA Commerce Studio",
      materials: ["Absolute Gilded Brass", "Travertine", "Fluted Smoked Glass"]
    }
  },
  {
    id: "res-dsa-02",
    src: "/images/1zaZHAGa2m57NF8IZXKgQfkCN6--SVy3I.jpg",
    alt: "The White House",
    category: "Residential",
    description: "The White House is a modern architectural masterpiece featuring clean lines, minimal aesthetics, and functional design tailored for luxury living.",
    gallery: [
      "/images/151kmI4LQypjKjzhQatTQCO-aAXyGuBhE.jpg",
      "/images/1H6q1qNWQHacRX-hMgou8B1FiWhRQChA9.jpg",
      "/images/1XibxVzxzjgvmI85XDUywtUpJTUus7bzM.jpg",
      "/images/1-muYkqhKVHIFcPnOTRMuHckfveopxo9M.jpg",
      "/images/1zaZHAGa2m57NF8IZXKgQfkCN6--SVy3I.jpg",
      "/images/white-house-custom-1.jpg",
      "/images/white-house-custom-2.jpg",
      "/images/white-house-custom-3.jpg",
      "/images/white-house-custom-4.jpg",
      "/images/white-house-custom-5.jpg"
    ],
    specs: {
      location: "Beverly Hills, USA",
      area: "12,400 SQ. FT.",
      year: "2024",
      architect: "DSA Residential Villa Group",
      materials: ["Poured Solid Chalk Concrete", "White Thassos Marble", "Extra-clear Optiwhite Glazing"]
    }
  },
  {
    id: "res-dsa-11",
    src: "/images/shah-residence-custom-4.jpg",
    alt: "Shah Residence",
    category: "Residential",
    description: "Shah Residence is a premium modern luxury apartment showcasing an exquisite entrance lobby with warm custom lighting, artificial grass accent walls, elegant fluted wooden paneling, and plush leather armchairs that exude cozy sophistication.",
    gallery: [
      "/images/shah-residence-custom-1.jpg",
      "/images/shah-residence-custom-2.jpg",
      "/images/shah-residence-custom-3.jpg",
      "/images/shah-residence-custom-4.jpg",
      "/images/shah-residence-custom-5.jpg"
    ],
    specs: {
      location: "Mumbai, India",
      area: "3,500 SQ. FT.",
      year: "2026",
      architect: "DSA India Studio",
      materials: ["Custom Fluted Oak Panels", "Earthy Grass Accents", "Bespoke Leather Armchairs", "Digital Smart Access", "Polished Marble Floor"]
    }
  },
  {
    id: "res-dsa-10",
    src: "/images/1T8U7brn4ddyC2AvlBXLJe_Q6lR9r8gEB.jpg",
    alt: "Serene Sanctuary",
    category: "Residential",
    description: "Serene Sanctuary is an elegant luxury residential interior showcasing magnificent spatial design, sophisticated bespoke fittings, warm lighting, and a modern minimal layout that provides the ultimate cozy and premium comfort.",
    gallery: [
      "/images/serene-sanctuary-custom-1.jpg",
      "/images/serene-sanctuary-custom-2.jpg",
      "/images/serene-sanctuary-custom-3.jpg",
      "/images/serene-sanctuary-custom-4.jpg",
      "/images/serene-sanctuary-custom-5.jpg",
      "/images/serene-sanctuary-custom-6.jpg",
      "/images/serene-sanctuary-custom-7.jpg",
      "/images/serene-sanctuary-custom-8.jpg",
      "/images/serene-sanctuary-custom-9.jpg",
      "/images/serene-sanctuary-custom-10.jpg"
    ],
    specs: {
      location: "Kyoto Outskirts, Japan",
      area: "6,800 SQ. FT.",
      year: "2025",
      architect: "DSA Kyoto Branch",
      materials: ["Hinoki Cedar Timber", "Honed Charcoal Limestone", "Washi Paper Panels"]
    }
  },
  {
    id: "comm-dsa-06",
    src: "/images/1w2v0x_u3_eykFh4KxJHv9UdmK4AL_PrY.jpg",
    alt: "iFlair",
    category: "Commercial",
    description: "iFlair is a modern commercial office space designed with clean interiors, smart workspace planning, and contemporary aesthetics to create a comfortable and productive working environment.",
    gallery: [
      "/images/1N8Rh46dRnicb2zSSXZwqrSumYsCm-up9.jpg",
      "/images/1Wi0ySgvW2nXAkjt9VZO_142AScdkhoe5.jpg",
      "/images/1ZfjIAL296LD5uhCuifOGUUhAAFEkFWoB.jpg",
      "/images/16eaYwux7n_VlwXTQR_fu8tskpw3jWwnD.jpg",
      "/images/1cCkNNGVuquVa7qJsIwU3DaB3HmLywvn5.jpg",
      "/images/11TbTFOKmmDw5GgkEcUPklEkQgWW9u06Z.jpg",
      "/images/1iOJPcTZWDkzZBs0jb1jNwOrGRley_zeQ.jpg",
      "/images/1w2v0x_u3_eykFh4KxJHv9UdmK4AL_PrY.jpg"
    ],
    specs: {
      location: "Silicon Valley, USA",
      area: "15,500 SQ. FT.",
      year: "2024",
      architect: "DSA Corporate HQ Division",
      materials: ["Brushed Blue Titanium", "Cast Micro-top Plaster", "Acoustic Soft Felt Elements"]
    }
  },
  {
    id: "comm-dsa-01",
    src: "/images/1yNArVeNijD0ZdMs_b6gVzA4cDGZQrNDa.jpg",
    alt: "Achira Diamond & Fashion",
    category: "Commercial",
    description: "Achira Diamond & Fashion is a premium boutique commercial project designed with a focus on sophisticated interiors, efficient layout, and modern lighting to create a professional business environment.",
    gallery: [
      "/images/1yNArVeNijD0ZdMs_b6gVzA4cDGZQrNDa.jpg",
      "/images/1vvr64lVDD2ffQrI-TCAB2SEE77dWXXw6.jpg",
      "/images/1C7Bw37-kUIkM7oQJrlKeGKbZMD0yfRr0.jpg",
      "/images/1o4AABMh5Ic8IFyfppdwKzNWguVJnMw9U.jpg",
      "/images/1ggEm1IJLa8pvLEOiE6WIjwW8GQWwvRte.jpg",
      "/images/1Y3QaodVTdx_ksxe5y-mfymZj7Wvi7S5A.jpg",
      "/images/1Jm0ZUy_oREO0t6ttfPWcnmf5jSZuWpvF.jpg",
      "/images/1Eqvv_Ja3NOyxumvWayVBr7tSOr-IWOfp.jpg",
      "/images/1u1DkDx7zmYAYkT-AcmXjNwfO2t9oTB0G.jpg"
    ],
    specs: {
      location: "Antwerp, Belgium",
      area: "3,100 SQ. FT.",
      year: "2025",
      architect: "DSA High-End Retail Unit",
      materials: ["Velvet Obsidian Plaster", "Gilded Bronze Rails", "Laser-cut Onyx Displays"]
    }
  },
  {
    id: "res-dsa-04",
    src: "/images/1ATpVoCZUuKvgssfy4TcClIPCA6v8K3yz.jpg",
    alt: "JS House",
    category: "Residential",
    description: "JS House is a modern residential interior designed with warm textures, elegant furniture, and a clean contemporary layout to create a comfortable and inviting living experience.",
    gallery: [
      "/images/js-house-custom-1.jpg",
      "/images/js-house-custom-2.jpg",
      "/images/js-house-custom-3.jpg",
      "/images/js-house-custom-4.jpg",
      "/images/js-house-custom-5.jpg",
      "/images/js-house-custom-6.jpg",
      "/images/js-house-custom-7.jpg",
      "/images/js-house-custom-8.jpg",
      "/images/js-house-custom-9.jpg",
      "/images/js-house-custom-10.jpg"
    ],
    specs: {
      location: "Gold Coast, Australia",
      area: "7,500 SQ. FT.",
      year: "2024",
      architect: "DSA Sydney Studio",
      materials: ["Brushed Spotted Gum Teak", "Calacatta Gold Marble", "Matte Steel Frames"]
    }
  },
  {
    id: "comm-dsa-02",
    src: "/images/1_BEEwFeRswSl-qmhg6cGM3CSVZBNxitc.jpg",
    alt: "JD Office",
    category: "Commercial",
    description: "A premium JD office designed with elegant interiors, warm lighting, and modern detailing to create a professional yet luxurious workspace. The space combines comfort, sophistication, and functionality for a refined office experience.",
    gallery: [
      "/images/1BFzYFW7w2D_fSzHxGGXC0jP_9NLJ1k0O.jpg",
      "/images/1O52HcsPN87XM4fbK7Geh4MXe4Gd49je-.jpg",
      "/images/1_BEEwFeRswSl-qmhg6cGM3CSVZBNxitc.jpg",
      "/images/1CkRmnq0K-ewBzy-uuVEjirTl0h6cE7BW.jpg",
      "/images/12tqE2lUkckZfNKtOcibIy0UisiJcfyT1.jpg",
      "/images/1kMnsmwDnmA2vzMPlAAbgOr9qj2cimKGI.jpg",
      "/images/1kVIA1rr2w9edYSVfXK5zbkjj_flhmByK.jpg",
      "/images/1Y7u30gzvsxNrgdhMvs6XhsqzlEjpHY2i.jpg"
    ],
    specs: {
      location: "Mayfair, London",
      area: "5,800 SQ. FT.",
      year: "2025",
      architect: "DSA UK Branch",
      materials: ["Fumed English Oak", "Portoro Gold Marble", "Suede Wall Paneling"]
    }
  },
  {
    id: "res-dsa-06",
    src: "/images/1XPMjgJV5cm01cNRibpYxvZbUmkUY6NV4.jpg",
    alt: "DHS House",
    category: "Residential",
    description: "DHS House is a modern residential interior designed with clean lines, premium materials, and warm lighting to create a sophisticated and welcoming home environment.",
    gallery: [
      "/images/dhs-house-custom-1.jpg",
      "/images/dhs-house-custom-2.jpg",
      "/images/dhs-house-custom-3.jpg",
      "/images/dhs-house-custom-4.jpg",
      "/images/dhs-house-custom-5.jpg"
    ],
    specs: {
      location: "Hamptons, New York",
      area: "9,600 SQ. FT.",
      year: "2025",
      architect: "DSA NYC Office",
      materials: ["White Rift Oak Wood", "Nero Marquina Marble", "Danish Wool Fabrics"]
    }
  },
  {
    id: "res-dsa-01",
    src: "/images/1YRacy3CF6ZIjb3PAPMFWdHpSqILycUCs.jpg",
    alt: "Subtle Sanctuary",
    category: "Residential",
    description: "This home interior combines simplicity, functionality, and modern design with soft color tones, spacious layouts, and refined finishes for comfortable everyday living.",
    gallery: [
      "/images/1WC-BXDJSfS3GKFozaBavmZkHfrGeWE8k.jpg",
      "/images/1YRacy3CF6ZIjb3PAPMFWdHpSqILycUCs.jpg",
      "/images/1cb-sHqV2zBhZm-q_xzutywoL5Mk38mOx.jpg",
      "/images/1QO4RG4r3lLjHg8LSxlGJgsL27ndNJQDR.jpg",
      "/images/1BARiFPF1WqG6Gn9NG_aY6jQQ3LLCGsNV.jpg",
      "/images/1VjfTyEtMHhfE8ISVmigmsRXnT6hq5Kys.jpg",
      "/images/1-xZFO72fjLUBvo95ycdGYB5uHwjiJO9H.jpg",
      "/images/1BNBKIOSfwDEegRlGUvlblYBZr-DZIuWB.jpg",
      "/images/1JvdV2Oq0F3D9CZThPXoueFh-5jyeB0_P.jpg"
    ],
    specs: {
      location: "Trastevere, Milan",
      area: "2,200 SQ. FT.",
      year: "2024",
      architect: "DSA Italy Residential Studio",
      materials: ["Venetian Terrazzo", "Raw French Linens", "Powder-coated Soft Alum"]
    }
  },
  {
    id: "comm-dsa-05",
    src: "/images/1bQaYUlnqM_dPlHGV4XSVuWHgsiwWkvKJ.jpg",
    alt: "Safal",
    category: "Commercial",
    description: "Safal is a modern commercial project designed with efficient space planning and premium detailing to create a professional business environment.",
    gallery: [
      "/images/1bQaYUlnqM_dPlHGV4XSVuWHgsiwWkvKJ.jpg",
      "/images/1i2Yqp-lSj_-Jjv7UUTPNFJDn0OhmvOr2.jpg",
      "/images/1n1BRt7ypqRy_2DlVe1vLwKxtfrSIOAor.jpg",
      "/images/1jx9ikwitul59OHtWCKjXauAn8yuHGl9D.jpg",
      "/images/1eCEPROlLE1VhRxUILd0_nU5a6H64Dafv.jpg",
      "/images/1lD3u17YibjQIBIiRWVuiSFOPZIB58mCa.jpg",
      "/images/1RtXXuGl-Y2yJ1L9mskY3IU5xL-e07l1I.jpg",
      "/images/1vwNtGPDkZXVNEBl7TLENW0tehdrUN8ht.jpg",
      "/images/1x4dXgc6hRFY3orI353oZn6N5aqjmkWRt.jpg"
    ],
    specs: {
      location: "Zurich, Switzerland",
      area: "8,200 SQ. FT.",
      year: "2023",
      architect: "DSA Zurich Office",
      materials: ["Alpine Pine Structural Pillars", "Brushed Zinc Plating", "Cast Terrazzo Floor"]
    }
  },
  {
    id: "res-dsa-08",
    src: "/images/1fQxUcOX6Xya8S1QgM-SEPknvST3Z-XPV.jpg",
    alt: "Anchor House",
    category: "Residential",
    description: "Anchor House is a modern residential interior designed with warm tones, elegant wall detailing, and comfortable seating to create a calm and welcoming living space.",
    gallery: [
      "/images/1jyyq5qsWmffsEPw3XTZ3n0zscrWFS9zh.jpg",
      "/images/1N-2KEYobllj08RJwrnPILbo4LqfQX3qZ.jpg",
      "/images/1fQxUcOX6Xya8S1QgM-SEPknvST3Z-XPV.jpg",
      "/images/1UX7UD9LYciKhOU1lZAFGJhXZqTU9ZHhj.jpg",
      "/images/1u1nBzdpWoc4yf0rsy9OzePYANYPfpwOn.jpg",
      "/images/1ybviARSsIUzcw9PBQshjJWhgT7pX-fKj.jpg",
      "/images/1RTuBOAay5eORqBGCF75beMzxvFP9oVVA.jpg",
      "/images/1f9c0oNatpygcipVjuBuTEn6JukHXPiXT.jpg",
      "/images/1Ky7LbQVVv1HY7zykjsWSOg-6DEA67f3W.jpg"
    ],
    specs: {
      location: "Cape Town, South Africa",
      area: "11,500 SQ. FT.",
      year: "2024",
      architect: "DSA Cape Town Studio",
      materials: ["Sandblasted local Granites", "Smoked Walnut Wood", "Raw Brass Cast Joints"]
    }
  },
  {
    id: "res-dsa-07",
    src: "/images/1L7tYlf_OOkys-2kNAs6c6BDGdyxthjgS.jpg",
    alt: "CP House",
    category: "Residential",
    description: "CP House home interior combines simplicity and elegance through minimal design, soft color tones, and smart space planning for a modern everyday lifestyle.",
    gallery: [
      "/images/1-XK2PeqEicXTRsxfKrIE-5xmBX_MXFvt.jpg",
      "/images/13T307RnsS1YhLREczMaA3LxGwzKPGd99.jpg",
      "/images/1L7tYlf_OOkys-2kNAs6c6BDGdyxthjgS.jpg",
      "/images/1Tzq0ooCQnYLh-F6ns11Wfy1QK7K3W0jh.jpg",
      "/images/1OlTdX7oAFnvHokByvAo7CDRtG3Ev0jKh.jpg",
      "/images/1M7c0BZg5Nbhje6pCXcx6ArpwXfzrfpW8.jpg",
      "/images/1LIvIFzb6MjxslW3Cn78ocU-0FcZqJflW.jpg",
      "/images/11XftRsAgmFH5D7qMo63aC_DJqsgxkg8W.jpg",
      "/images/1Ru7DZbc773GZXuWnQv2_v5USMbOhiagQ.jpg",
      "/images/1WcsfUWRrmZ3_KCXMIssJEjm0p6WzBCld.jpg",
      "/images/1_dQa9-W2cs1dPXmMbnpArSnl-DG6sIlb.jpg"
    ],
    specs: {
      location: "Ojai, California",
      area: "4,600 SQ. FT.",
      year: "2025",
      architect: "DSA LA Signature Team",
      materials: ["Earthy Rammed Clay Walls", "Hand-oiled Cedarwood", "Oxidized Copper Trim"]
    }
  },
  {
    id: "res-dsa-05",
    src: "/images/1QtyrH4BL03_19HDNi4U5L8jdjWxbGmqG.jpg",
    alt: "JD Bedroom",
    category: "Residential",
    description: "Designed with a balance of luxury and comfort, this JD Bedroom offers modern interiors, rich textures, and a peaceful ambiance perfect for everyday relaxation.",
    gallery: [
      "/images/1QtyrH4BL03_19HDNi4U5L8jdjWxbGmqG.jpg",
      "/images/1UlOsOlkAnM_Z-ohufO0QsFR1gQ7NzcnK.jpg",
      "/images/1GTD1Ig-eWLW41JgPIFW94QHH3sBOX6gb.jpg",
      "/images/11XiSS1qKDUtcl2-J1PhJ_UzQQ2eniFJP.jpg",
      "/images/1_WQe69FYXc7h9LienyBKK-gT7t7RPEiT.jpg",
      "/images/1OIqQK1dHsNWH90MLsNi_TgL24y-qD-67.jpg",
      "/images/17DcOSeL0NDn-RTmQu1UJs7FuquZ1hGkl.jpg",
      "/images/1zLZcMS7ehDmOXqZ3xftn68HSZIpPf-eG.jpg",
      "/images/1zNL7CP90IA229Yj6BeTWvK_Su_mRzrRj.jpg"
    ],
    specs: {
      location: "Monaco Shore, France",
      area: "1,800 SQ. FT.",
      year: "2025",
      architect: "DSA France Branch",
      materials: ["Silk Wall Coverings", "Brushed Bronze Fixtures", "Bespoke Onyx Bed Platform"]
    }
  },
  {
    id: "res-dsa-09",
    src: "/images/1FpP771cL8vy2eMZZwTwtBGFve-Ip_sGU.jpg",
    alt: "Shela House",
    category: "Residential",
    description: "Shela House is a modern residential interior designed with clean lines, warm lighting, and elegant finishes that create a calm and welcoming living experience.",
    gallery: [
      "/images/1v6qalvsM3Qea36VXgliizpmmhqogNXId.jpg",
      "/images/1A7n2KoNaNadZKVmfg8rAfJLm45iip4Ki.jpg",
      "/images/1FpP771cL8vy2eMZZwTwtBGFve-Ip_sGU.jpg",
      "/images/1egyW-7Pk2mNGz2x_Yew2TvgZsTzTZhye.jpg",
      "/images/1lSfBE5V_CdMKRaEKH7K6WcJvOPpxPorW.jpg",
      "/images/1uJkc_WYTa2QKKj2wXn2Ru6ZAixQQ1dHP.jpg",
      "/images/1CwpouFmp3RkObvO8v0kStEZr5Qho1upO.jpg",
      "/images/1VmORiXXnSwLwAMa6ZFZNUyFSeODRuJvZ.jpg",
      "/images/1UfmiDAau64UhaDRwp63ecE7kzN41Ha-F.jpg"
    ],
    specs: {
      location: "Vancouver, Canada",
      area: "8,900 SQ. FT.",
      year: "2024",
      architect: "DSA Vancouver Division",
      materials: ["Douglas Fir Structural Beams", "Basalt Stone Tile", "High-exposure Glass Slabs"]
    }
  },
  {
    id: "comm-dsa-07",
    src: "/images/10bqHIbfF1VJqrGk1I_iC9AyLh_aKscph.jpg",
    alt: "Shlip Aaron",
    category: "Commercial",
    description: "Shlip Aaron is a premium commercial office space featuring state-of-the-art office interiors, modern materials, sophisticated lighting designs, and highly functional workspace planning.",
    gallery: [
      "/images/10bqHIbfF1VJqrGk1I_iC9AyLh_aKscph.jpg",
      "/images/1W3WQQZozxeLqmqfLGkhsrE2YFcShJycD.jpg",
      "/images/shlip-aaron-custom-1.jpg",
      "/images/shlip-aaron-custom-2.jpg",
      "/images/shlip-aaron-custom-3.jpg",
      "/images/shlip-aaron-custom-4.jpg",
      "/images/shlip-aaron-custom-5.jpg"
    ],
    specs: {
      location: "Stockholm, Sweden",
      area: "21,000 SQ. FT.",
      year: "2025",
      architect: "DSA Scandinavian Studio",
      materials: ["Acoustic Timber Micro-slats", "Zero-grade Recycled Steel", "Nordic White Ash"]
    }
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "t1",
    quote: "DSA's premium grasp of space is absolutely pristine. Each office has a professional vibe coupled with incredible material integrity.",
    author: "Elena Rostov",
    role: "Collector & Devotee",
    project: "iFlair Commercial Client"
  }
];
