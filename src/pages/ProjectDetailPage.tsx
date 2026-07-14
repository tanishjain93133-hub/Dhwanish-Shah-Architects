import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Layers, ExternalLink, X, ZoomIn, ChevronLeft, ChevronRight, LayoutGrid, Maximize2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { cn } from '../lib/utils';
import { SafeImage } from '../components/SafeImage';
import { SEO } from '../components/SEO';

const ACHIRA_GALLERY = [
  { image: '/images/drive_1lT_rM9G9pB9t4vHywDCfQy7h5OHwJM41.jpg', text: 'Achira Diamond & Fashion 01' },
  { image: '/images/drive_17OkF3i4Ktbnkjw21ieEtiueXdcppqQhA.jpg', text: 'Achira Diamond & Fashion 06' },
  { image: '/images/drive_1UZf7kEu_LgU7H725aGhIs2oD3r7dxsaL.jpg', text: 'Achira Diamond & Fashion 04' },
  { image: '/images/drive_1Y3QaodVTdx_ksxe5y-mfymZj7Wvi7S5A.jpg', text: 'Achira Diamond & Fashion 05' },
  { image: '/images/drive_1Jm0ZUy_oREO0t6ttfPWcnmf5jSZuWpvF.jpg', text: 'Achira Diamond & Fashion 03' },
  { image: '/images/drive_1v0PzZVJ-f1rEYK4hCyYot3N8KYUN1Q6y.jpg', text: 'Achira Diamond & Fashion 09' },
  { image: '/images/drive_1vvr64lVDD2ffQrI-TCAB2SEE77dWXXw6.jpg', text: 'Achira Diamond & Fashion 10' },
  { image: '/images/drive_1u1DkDx7zmYAYkT-AcmXjNwfO2t9oTB0G.jpg', text: 'Achira Diamond & Fashion 08' },
  { image: '/images/drive_1Eqvv_Ja3NOyxumvWayVBr7tSOr-IWOfp.jpg', text: 'Achira Diamond & Fashion 02' },
  { image: '/images/drive_1o4AABMh5Ic8IFyfppdwKzNWguVJnMw9U.jpg', text: 'Achira Diamond & Fashion 07' },
];

const COMMON_GALLERY = [
  { image: '/images/drive_1zaZHAGa2m57NF8IZXKgQfkCN6--SVy3I.jpg', text: 'Common Project 01' },
  { image: '/images/drive_151kmI4LQypjKjzhQatTQCO-aAXyGuBhE.jpg', text: 'Common Project 02' },
  { image: '/images/drive_1GHRlkdpuKtOVQ9p2t35-pMhmfu9m8KRM.jpg', text: 'Common Project 03' },
  { image: '/images/drive_1H6q1qNWQHacRX-hMgou8B1FiWhRQChA9.jpg', text: 'Common Project 04' },
  { image: '/images/drive_1QLoxtToMtlmg-ipEwkZmSlumXOUQN8xl.jpg', text: 'Common Project 05' },
  { image: '/images/drive_1RAbB85Awvx_M7HDwpeLTHFHe_hVhD5Ei.jpg', text: 'Common Project 06' },
  { image: '/images/drive_1RN58UzcqRVb7YOuGg3ZnHoEAIeCcMHZq.jpg', text: 'Common Project 07' },
  { image: '/images/drive_1VizU1uLT7de9piaTNGn2dJ3PFC1Bqc9h.jpg', text: 'Common Project 08' },
  { image: '/images/drive_1iQmVJffURWt36pHSEUDtBVea6DohwNui.jpg', text: 'Common Project 09' },
  { image: '/images/drive_1ougaUOsunQBGofdyvOBG9Khbgdk0vqUv.jpg', text: 'Common Project 10' },
];

const JD_OFFICE_GALLERY = [
  { image: '/images/drive_1BFzYFW7w2D_fSzHxGGXC0jP_9NLJ1k0O.jpg', text: 'JD Office 03' },
  { image: '/images/drive_1_BEEwFeRswSl-qmhg6cGM3CSVZBNxitc.jpg', text: 'JD Office 01' },
  { image: '/images/drive_1CkRmnq0K-ewBzy-uuVEjirTl0h6cE7BW.jpg', text: 'JD Office 04' },
  { image: '/images/drive_1kMnsmwDnmA2vzMPlAAbgOr9qj2cimKGI.jpg', text: 'JD Office 07' },
  { image: '/images/drive_1kVIA1rr2w9edYSVfXK5zbkjj_flhmByK.jpg', text: 'JD Office 08' },
  { image: '/images/drive_12tqE2lUkckZfNKtOcibIy0UisiJcfyT1.jpg', text: 'JD Office 02' },
  { image: '/images/drive_1Y7u30gzvsxNrgdhMvs6XhsqzlEjpHY2i.jpg', text: 'JD Office 06' },
  { image: '/images/drive_1O52HcsPN87XM4fbK7Geh4MXe4Gd49je-.jpg', text: 'JD Office 05' },
];

const A_A_WEALTH_GALLERY = [
  { image: '/images/drive_1HitK9MepXCJqmoMaisI3_pUTzvYJZA00.jpg', text: 'A & A Wealth 11' },
  { image: '/images/drive_1NPceFslGWT3fUyWn6AGSqGJPxh0a4j1A.jpg', text: 'A & A Wealth 14' },
  { image: '/images/drive_1JHPhEFvokVoMViai2JRY2C97I_wcZ5Ap.jpg', text: 'A & A Wealth 12' },
  { image: '/images/drive_1QD35D6_0pT2a_j9vYk2IO5-BhrRbXrwc.jpg', text: 'A & A Wealth 16' },
  { image: '/images/drive_1Rg-tzflx4mY1yefb608u77YANq5xeFUk.jpg', text: 'A & A Wealth 17' },
  { image: '/images/drive_1MHk72anDHYgYGtCAuWJx2GWJ02Ts97UC.jpg', text: 'A & A Wealth 13' },
  { image: '/images/drive_1eKA1CHzewmgRmwNRWG_oI2s_fKYrSMDL.jpg', text: 'A & A Wealth 18' },
  { image: '/images/drive_1fsRJBocZlFhIge-FrFCk09hJwHK3Vqpt.jpg', text: 'A & A Wealth 19' },
  { image: '/images/drive_16UwjT1SSzMIS4bVDiB8ZcntJuJcSwtrQ.jpg', text: 'A & A Wealth 10' },
  { image: '/images/drive_1gtqBoeZxA4aXSYVrnm_ldNO2G0aOFjhJ.jpg', text: 'A & A Wealth 20' },
  { image: '/images/drive_14xLpEu59w4M4VNtvc7GaQid9pBAwQfd-.jpg', text: 'A & A Wealth 09' },
  { image: '/images/drive_1z1nVJt04BqT5iYcHD8cbRbvFmKg_flY_.jpg', text: 'A & A Wealth 22' },
  { image: '/images/drive_1O5txCTxKc9EoSV62XE9b09ds8eZtQ61r.jpg', text: 'A & A Wealth 15' },
  { image: '/images/drive_1kxc3WSIA8ddPNzX0dIpJ4FeGhQYu7uH2.jpg', text: 'A & A Wealth 21' },
  { image: '/images/drive_1-yVVcug6KYFWQvXMQntsOJWdJ7skf4Mh.jpg', text: 'A & A Wealth 08' },
];

const IFLAIR_WORKSPACE_GALLERY = [
  { image: '/images/drive_1N8Rh46dRnicb2zSSXZwqrSumYsCm-up9.jpg', text: 'iFlair 03' },
  { image: '/images/drive_1Wi0ySgvW2nXAkjt9VZO_142AScdkhoe5.jpg', text: 'iFlair 04' },
  { image: '/images/drive_1ZfjIAL296LD5uhCuifOGUUhAAFEkFWoB.jpg', text: 'iFlair 07' },
  { image: '/images/drive_16eaYwux7n_VlwXTQR_fu8tskpw3jWwnD.jpg', text: 'iFlair 02' },
  { image: '/images/drive_1w2v0x_u3_eykFh4KxJHv9UdmK4AL_PrY.jpg', text: 'iFlair 12' },
  { image: '/images/drive_1iOJPcTZWDkzZBs0jb1jNwOrGRley_zeQ.jpg', text: 'iFlair 10' },
  { image: '/images/drive_1cCkNNGVuquVa7qJsIwU3DaB3HmLywvn5.jpg', text: 'iFlair 08' },
];

const SAFAL_COMMERCIAL_GALLERY = [
  { image: '/images/drive_1bQaYUlnqM_dPlHGV4XSVuWHgsiwWkvKJ.jpg', text: 'Safal Office 03' },
  { image: '/images/drive_1i2Yqp-lSj_-Jjv7UUTPNFJDn0OhmvOr2.jpg', text: 'Safal Office 05' },
  { image: '/images/drive_1n1BRt7ypqRy_2DlVe1vLwKxtfrSIOAor.jpg', text: 'Safal Office 01' },
  { image: '/images/drive_1jx9ikwitul59OHtWCKjXauAn8yuHGl9D.jpg', text: 'Safal Office 06' },
  { image: '/images/drive_1lD3u17YibjQIBIiRWVuiSFOPZIB58mCa.jpg', text: 'Safal Office 07' },
  { image: '/images/drive_1GqZsuB4FzUy9H9QA2Cnm0_ZPTsVWxnhs.jpg', text: 'Safal Office 08' },
  { image: '/images/drive_1eCEPROlLE1VhRxUILd0_nU5a6H64Dafv.jpg', text: 'Safal Office 04' },
  { image: '/images/drive_1vwNtGPDkZXVNEBl7TLENW0tehdrUN8ht.jpg', text: 'Safal Office 09' },
  { image: '/images/drive_1x4dXgc6hRFY3orI353oZn6N5aqjmkWRt.jpg', text: 'Safal Office 10' },
];

const MINIMALIST_HOME_GALLERY = [
  { image: '/images/drive_1GqZsuB4FzUy9H9QA2Cnm0_ZPTsVWxnhs.jpg', text: 'Minimalist Home 01' },
  { image: '/images/drive_1RtXXuGl-Y2yJ1L9mskY3IU5xL-e07l1I.jpg', text: 'Minimalist Home 02' },
  { image: '/images/drive_1bQaYUlnqM_dPlHGV4XSVuWHgsiwWkvKJ.jpg', text: 'Minimalist Home 03' },
  { image: '/images/drive_1eCEPROlLE1VhRxUILd0_nU5a6H64Dafv.jpg', text: 'Minimalist Home 04' },
  { image: '/images/drive_1i2Yqp-lSj_-Jjv7UUTPNFJDn0OhmvOr2.jpg', text: 'Minimalist Home 05' },
  { image: '/images/drive_1jx9ikwitul59OHtWCKjXauAn8yuHGl9D.jpg', text: 'Minimalist Home 06' },
  { image: '/images/drive_1lD3u17YibjQIBIiRWVuiSFOPZIB58mCa.jpg', text: 'Minimalist Home 07' },
  { image: '/images/drive_1n1BRt7ypqRy_2DlVe1vLwKxtfrSIOAor.jpg', text: 'Minimalist Home 08' },
  { image: '/images/drive_1vwNtGPDkZXVNEBl7TLENW0tehdrUN8ht.jpg', text: 'Minimalist Home 09' },
  { image: '/images/drive_1x4dXgc6hRFY3orI353oZn6N5aqjmkWRt.jpg', text: 'Minimalist Home 10' },
];

const SUBTLE_SANCTUARY_GALLERY = [
  { image: '/images/drive_1WC-BXDJSfS3GKFozaBavmZkHfrGeWE8k.jpg', text: 'Subtle Sanctuary 01' },
  { image: '/images/drive_1QO4RG4r3lLjHg8LSxlGJgsL27ndNJQDR.jpg', text: 'Subtle Sanctuary 02' },
  { image: '/images/drive_1IvJZ2tMlDc86dsptcjWoTjVBbn2GLJXe.jpg', text: 'Subtle Sanctuary 03' },
  { image: '/images/drive_1cb-sHqV2zBhZm-q_xzutywoL5Mk38mOx.jpg', text: 'Subtle Sanctuary 04' },
  { image: '/images/drive_1xLanKg58lXAAA328ZnD6yl8yvAyOALJH.jpg', text: 'Subtle Sanctuary 05' },
  { image: '/images/drive_1VjfTyEtMHhfE8ISVmigmsRXnT6hq5Kys.jpg', text: 'Subtle Sanctuary 06' },
  { image: '/images/drive_1BARiFPF1WqG6Gn9NG_aY6jQQ3LLCGsNV.jpg', text: 'Subtle Sanctuary 07' },
  { image: '/images/drive_1-xZFO72fjLUBvo95ycdGYB5uHwjiJO9H.jpg', text: 'Subtle Sanctuary 08' },
  { image: '/images/drive_1BNBKIOSfwDEegRlGUvlblYBZr-DZIuWB.jpg', text: 'Subtle Sanctuary 09' },
  { image: '/images/drive_1wi9c6F4T_xObhVU0B-h9zlnGFRir8ZfQ.jpg', text: 'Subtle Sanctuary 10' },
  { image: '/images/drive_1WOJGEjV36yNHc436ycOM8yQoqZZA_KrT.jpg', text: 'Subtle Sanctuary 11' },
  { image: '/images/drive_1JvdV2Oq0F3D9CZThPXoueFh-5jyeB0_P.jpg', text: 'Subtle Sanctuary 12' },
];

const THE_WHITE_HOUSE_GALLERY = [
  { image: '/images/drive_1zaZHAGa2m57NF8IZXKgQfkCN6--SVy3I.jpg', text: 'The White House 01' },
  { image: '/images/drive_151kmI4LQypjKjzhQatTQCO-aAXyGuBhE.jpg', text: 'The White House 02' },
  { image: '/images/drive_18ZAqVZ_dUvWc_Ty2yITX2JVYMpQl0C96.jpg', text: 'The White House 03' },
  { image: '/images/drive_18_7CMiYHoSYBhdpz3wpWKfoQkGwhUvof.jpg', text: 'The White House 04' },
  { image: '/images/drive_1EsMLe08jkprzx3ZDo1GAcmzZH3N-Frpp.jpg', text: 'The White House 05' },
  { image: '/images/drive_1H6q1qNWQHacRX-hMgou8B1FiWhRQChA9.jpg', text: 'The White House 06' },
  { image: '/images/drive_1QLoxtToMtlmg-ipEwkZmSlumXOUQN8xl.jpg', text: 'The White House 07' },
  { image: '/images/drive_1XibxVzxzjgvmI85XDUywtUpJTUus7bzM.jpg', text: 'The White House 08' },
  { image: '/images/drive_1YyyJgCvAd-Q9_dcwhd7A7YLY_MGaTjuF.jpg', text: 'The White House 09' },
  { image: '/images/drive_1iQmVJffURWt36pHSEUDtBVea6DohwNui.jpg', text: 'The White House 10' },
  { image: '/images/drive_1ougaUOsunQBGofdyvOBG9Khbgdk0vqUv.jpg', text: 'The White House 11' },
];

const JS_HOUSE_GALLERY = [
  { image: '/images/drive_10BiKxkWetqJZyJ6PSZ2caGL-ZfxNBFqR.jpg', text: 'JS House 01' },
  { image: '/images/drive_1A-GMMiT7zVSVme_9ANjVRoJpd6cbuNjY.jpg', text: 'JS House 02' },
  { image: '/images/drive_1ATpVoCZUuKvgssfy4TcClIPCA6v8K3yz.jpg', text: 'JS House 03' },
  { image: '/images/drive_1YdIQs-ELSXFpj8ZScb6cQejOWT92J_uQ.jpg', text: 'JS House 04' },
  { image: '/images/drive_1kBeDniq8YscJ_Y9hrfeT9AmRP1-FFg5b.jpg', text: 'JS House 05' },
  { image: '/images/drive_1aCHCMZzRq3yWKp1t2lsYUQoB8VAD9uTf.jpg', text: 'JS House 06' },
  { image: '/images/drive_1Jtygz6yRypusDtlq7NM9vOmUaqaC3T4e.jpg', text: 'JS House 07' },
  { image: '/images/drive_1WabygFuGy0R-tch71dg8WPoVUGGp8w9e.jpg', text: 'JS House 08' },
  { image: '/images/drive_10sHG9fUvsCcHyVbG2_bwNBtsMT9LXrnE.jpg', text: 'JS House 09' },
  { image: '/images/drive_1FBMPFeIONXF8zUrOAYtiScj7zijY5uVA.jpg', text: 'JS House 10' },
  { image: '/images/drive_13Q7hqay2vgWNX89s3LREPa6-6xR39cXr.jpg', text: 'JS House 11' },
  { image: '/images/drive_1WTeS-ivEHtUgCizv4QWCr-0OMg4-h8gT.jpg', text: 'JS House 12' },
  { image: '/images/drive_1SG-kw5nJPKxC0r-Bi5fySQQQTPXJ0DaX.jpg', text: 'JS House 13' },
];

const JD_BEDROOM_GALLERY = [
  { image: '/images/drive_1_WQe69FYXc7h9LienyBKK-gT7t7RPEiT.jpg', text: 'JD Bedroom 06' },
  { image: '/images/drive_1vDMbD7KuncbmdvOvunK56jqw2CQw8akU.jpg', text: 'JD Bedroom 09' },
  { image: '/images/drive_1QtyrH4BL03_19HDNi4U5L8jdjWxbGmqG.jpg', text: 'JD Bedroom 04' },
  { image: '/images/drive_1GTD1Ig-eWLW41JgPIFW94QHH3sBOX6gb.jpg', text: 'JD Bedroom 02' },
  { image: '/images/drive_1UlOsOlkAnM_Z-ohufO0QsFR1gQ7NzcnK.jpg', text: 'JD Bedroom 01' },
  { image: '/images/drive_1msgYwl4mraO6MAv113fFXBHP0jgEkW7n.jpg', text: 'JD Bedroom 08' },
  { image: '/images/drive_1OIqQK1dHsNWH90MLsNi_TgL24y-qD-67.jpg', text: 'JD Bedroom 03' },
  { image: '/images/drive_1zLZcMS7ehDmOXqZ3xftn68HSZIpPf-eG.jpg', text: 'JD Bedroom 10' },
  { image: '/images/drive_1baQRdM8j6H-uSZvmW8ERAHHU5_FqhMOL.jpg', text: 'JD Bedroom 07' },
  { image: '/images/drive_17DcOSeL0NDn-RTmQu1UJs7FuquZ1hGkl.jpg', text: 'JD Bedroom 05' },
  { image: '/images/drive_1zNL7CP90IA229Yj6BeTWvK_Su_mRzrRj.jpg', text: 'JD Bedroom 11' },
];

const DHS_HOUSE_GALLERY = [
  { image: '/images/drive_14h7b7pMXC-VBaqBlaluV84FMPmJtgsv-.jpg', text: 'DHS House 01' },
  { image: '/images/drive_1xkHElGhMv4jn-CIUb44MF-EULoI7tVN9.jpg', text: 'DHS House 02' },
  { image: '/images/drive_1-o6huBAqCozx-bFOjuEzIhXETffgXmpO.jpg', text: 'DHS House 03' },
  { image: '/images/drive_1XPMjgJV5cm01cNRibpYxvZbUmkUY6NV4.jpg', text: 'DHS House 04' },
  { image: '/images/drive_18wghnSqoU4DceWGwb3OrGqMIb-bCrx_4.jpg', text: 'DHS House 05' },
  { image: '/images/drive_1qlBFCwSljLD0BHKzzcQLvhTz6CMEQ6vK.jpg', text: 'DHS House 06' },
  { image: '/images/drive_1N84kFIXt8RgGocPWEwGaF7Ei2E6TcQCl.jpg', text: 'DHS House 07' },
  { image: '/images/drive_1g-gFVfcAh7GKfJKGu8Ho_mxnW_KBXBRq.jpg', text: 'DHS House 08' },
  { image: '/images/drive_1oEXKw7H8EYCLaSppcS6RwI3cPr16_cPi.jpg', text: 'DHS House 09' },
  { image: '/images/drive_1bVVYnAZbYa0_9IOXRNHIvFMm6VlS8zXj.jpg', text: 'DHS House 10' },
  { image: '/images/drive_1YKi3G5pqqWpgkGck8vVD5lvCX6foAyHp.jpg', text: 'DHS House 11' },
  { image: '/images/drive_1mIw6i3D6_sdoSUAqZwnQvc1P5M_R8t35.jpg', text: 'DHS House 12' },
  { image: '/images/drive_1hQ3vkl0UAq3weXWq3YSLXtC7RgIfmhLh.jpg', text: 'DHS House 13' },
  { image: '/images/drive_1Tp97KZA5hxYBen4rOyf1nICCS9DHi12m.jpg', text: 'DHS House 14' },
  { image: '/images/drive_1yNLwkb9nnoYMjPtrXItN4TGaK4CrfCSi.jpg', text: 'DHS House 15' },
  { image: '/images/drive_1xx9p6jmi5997vpWR9EBJmH1VS_ab2r6S.jpg', text: 'DHS House 16' },
  { image: '/images/drive_1eJdYsvsf6gtdxLiPJ_qoQUuTPDlAcHCu.jpg', text: 'DHS House 17' },
];

const CP_HOUSE_GALLERY = [
  { image: '/images/drive_1-XK2PeqEicXTRsxfKrIE-5xmBX_MXFvt.jpg', text: 'CP House 02' },
  { image: '/images/drive_13T307RnsS1YhLREczMaA3LxGwzKPGd99.jpg', text: 'CP House 04' },
  { image: '/images/drive_13dT40m1keBawrXj_LTFiqHf5L68DurIW.jpg', text: 'CP House 05' },
  { image: '/images/drive_1L7tYlf_OOkys-2kNAs6c6BDGdyxthjgS.jpg', text: 'CP House 07' },
  { image: '/images/drive_14gq8RjKzOQX5GoDxZOu1LYdaitbyFaqT.jpg', text: 'CP House 06' },
  { image: '/images/drive_1WcsfUWRrmZ3_KCXMIssJEjm0p6WzBCld.jpg', text: 'CP House 13' },
  { image: '/images/drive_1OlTdX7oAFnvHokByvAo7CDRtG3Ev0jKh.jpg', text: 'CP House 10' },
  { image: '/images/drive_1dwEydqKIvICW89klojVZKP-fJOftn3Al.jpg', text: 'CP House 16' },
  { image: '/images/drive_1aJ7C0b232vb3czbl0U2dGE2OB0N90IdX.jpg', text: 'CP House 15' },
  { image: '/images/drive_1Tzq0ooCQnYLh-F6ns11Wfy1QK7K3W0jh.jpg', text: 'CP House 01' },
  { image: '/images/drive_1M7c0BZg5Nbhje6pCXcx6ArpwXfzrfpW8.jpg', text: 'CP House 09' },
  { image: '/images/drive_1LIvIFzb6MjxslW3Cn78ocU-0FcZqJflW.jpg', text: 'CP House 08' },
  { image: '/images/drive_1-KS2-GzBFXfm83kIsUHP0MnbRxuKSLEg.jpg', text: 'CP House 12' },
  { image: '/images/drive_11XftRsAgmFH5D7qMo63aC_DJqsgxkg8W.jpg', text: 'CP House 03' },
  { image: '/images/drive_1_dQa9-W2cs1dPXmMbnpArSnl-DG6sIlb.jpg', text: 'CP House 14' },
  { image: '/images/drive_1Ru7DZbc773GZXuWnQv2_v5USMbOhiagQ.jpg', text: 'CP House 11' },
  { image: '/images/drive_1iMqso5DpJgyGsu48KirbsV5PcNaigMYv.jpg', text: 'CP House 17' },
];

const ANCHOR_HOUSE_GALLERY = [
  { image: '/images/drive_1jyyq5qsWmffsEPw3XTZ3n0zscrWFS9zh.jpg', text: 'Anchor House 01' },
  { image: '/images/drive_1rq3SNAeWfGz6hnnrxzP7D5I2ieC7YnKA.jpg', text: 'Anchor House 11' },
  { image: '/images/drive_1UX7UD9LYciKhOU1lZAFGJhXZqTU9ZHhj.jpg', text: 'Anchor House 06' },
  { image: '/images/drive_1Q1acrIupIQ9GCs794TI1iUupjTGA2GBc.jpg', text: 'Anchor House 03' },
  { image: '/images/drive_1N-2KEYobllj08RJwrnPILbo4LqfQX3qZ.jpg', text: 'Anchor House 02' },
  { image: '/images/drive_1fQxUcOX6Xya8S1QgM-SEPknvST3Z-XPV.jpg', text: 'Anchor House 01' },
  { image: '/images/drive_1u1nBzdpWoc4yf0rsy9OzePYANYPfpwOn.jpg', text: 'Anchor House 12' },
  { image: '/images/drive_1ybviARSsIUzcw9PBQshjJWhgT7pX-fKj.jpg', text: 'Anchor House 13' },
  { image: '/images/drive_1R86eCEAlF7dCFwYBYvrm6_HoaadQvbIm.jpg', text: 'Anchor House 04' },
  { image: '/images/drive_1f9c0oNatpygcipVjuBuTEn6JukHXPiXT.jpg', text: 'Anchor House 08' },
  { image: '/images/drive_1Ky7LbQVVv1HY7zykjsWSOg-6DEA67f3W.jpg', text: 'Anchor House 09' },
  { image: '/images/drive_1VxvCk0NgIIE9Cwn8V9WyA8t-GEKIvY8o.jpg', text: 'Anchor House 07' },
];

const SHELA_HOUSE_GALLERY = [
  { image: '/images/drive_1v6qalvsM3Qea36VXgliizpmmhqogNXId.jpg', text: 'Shela House 12' },
  { image: '/images/drive_1FpP771cL8vy2eMZZwTwtBGFve-Ip_sGU.jpg', text: 'Shela House 03' },
  { image: '/images/drive_1A7n2KoNaNadZKVmfg8rAfJLm45iip4Ki.jpg', text: 'Shela House 01' },
  { image: '/images/drive_1nZrTa5mHbMUJH8AzgkUXHcvWVAyOJ5w8.jpg', text: 'Shela House 09' },
  { image: '/images/drive_1egyW-7Pk2mNGz2x_Yew2TvgZsTzTZhye.jpg', text: 'Shela House 07' },
  { image: '/images/drive_1ypESvxpWtpNWPtPEMOEfZcGaWPCW3jHS.jpg', text: 'Shela House 13' },
  { image: '/images/drive_1lSfBE5V_CdMKRaEKH7K6WcJvOPpxPorW.jpg', text: 'Shela House 08' },
  { image: '/images/drive_1ttFAyDlfliiyrR1PL6-E4Cs9-_wB46B_.jpg', text: 'Shela House 10' },
  { image: '/images/drive_1uJkc_WYTa2QKKj2wXn2Ru6ZAixQQ1dHP.jpg', text: 'Shela House 11' },
  { image: '/images/drive_1CwpouFmp3RkObvO8v0kStEZr5Qho1upO.jpg', text: 'Shela House 02' },
  { image: '/images/drive_1_YQJg8HPBwCQKx-h6UKQ4zKHCm8eSFfM.jpg', text: 'Shela House 06' },
  { image: '/images/drive_1VmORiXXnSwLwAMa6ZFZNUyFSeODRuJvZ.jpg', text: 'Shela House 05' },
  { image: '/images/drive_1UfmiDAau64UhaDRwp63ecE7kzN41Ha-F.jpg', text: 'Shela House 04' },
];

const SHLIP_AARON_GALLERY = [
  { image: '/images/drive_10bqHIbfF1VJqrGk1I_iC9AyLh_aKscph.jpg', text: 'Shlip Aaron 01' },
  { image: '/images/drive_1W3WQQZozxeLqmqfLGkhsrE2YFcShJycD.jpg', text: 'Shlip Aaron 02' },
  { image: '/images/drive_1hLLKbRkEReJrsKZTUt-WcNRZ-2jKmJXu.jpg', text: 'Shlip Aaron 03' },
  { image: '/images/drive_1nCDhbW97MEx7Teo-E8-0FM74rds5iXr6.jpg', text: 'Shlip Aaron 04' },
  { image: '/images/drive_1EBDT9KSQ0tVHiK9YAPSf2V41Rkbmk_nV.jpg', text: 'Shlip Aaron 05' },
  { image: '/images/drive_1JB_YIBJWi0WTA9orjsZ7CkZ4idWl_czY.jpg', text: 'Shlip Aaron 06' },
  { image: '/images/drive_1f3UEQQ1VViht-LPMzcJ1YR4XnJe3FEM1.jpg', text: 'Shlip Aaron 07' },
  { image: '/images/drive_1sN2oH3O1ZuOl6CPssgOQXNVWE-gAe6Yf.jpg', text: 'Shlip Aaron 08' },
  { image: '/images/drive_12vmmKtDJg-KxJPSbW3wTTg8gOxsrMFwa.jpg', text: 'Shlip Aaron 09' },
];

const SERENE_SANCTUARY_GALLERY = [
  { image: '/images/drive_1QsttHHUU30BpKnsi4q0B7PflkFSSS-tC.jpg', text: 'Serene Sanctuary 09' },
  { image: '/images/drive_1mTB7CQQg8MkgoiS-Qa7h6o_tCfVlFEmf.jpg', text: 'Serene Sanctuary 05' },
  { image: '/images/drive_17jjex-QSnNd4raemP2w1lGnXyqZVXxH2.jpg', text: 'Serene Sanctuary 04' },
  { image: '/images/drive_1T8U7brn4ddyC2AvlBXLJe_Q6lR9r8gEB.jpg', text: 'Serene Sanctuary 06' },
  { image: '/images/drive_1F3pCKJ3AoRscrUBLCp7lq3CuVY6H9qgW.jpg', text: 'Serene Sanctuary 16' },
  { image: '/images/drive_1-z9QVSJHey4ihF6Pwnj26-KEnj-wKPUV.jpg', text: 'Serene Sanctuary 10' },
  { image: '/images/drive_1ae_z_ULFQn1kTQfpqTa3Vt-_7WILK8IE.jpg', text: 'Serene Sanctuary 02' },
  { image: '/images/drive_1ufZRa6G33BpKrYEXXOKOTHq-vQ5xN6PR.jpg', text: 'Serene Sanctuary 07' },
  { image: '/images/drive_1NoW7gqqjOV3Dz2aODL-nmgCU9FcPWcHy.jpg', text: 'Serene Sanctuary 19' },
  { image: '/images/drive_1kB8bKqSplggAku-hV9hXCH1--RAFnbxE.jpg', text: 'Serene Sanctuary 08' },
  { image: '/images/drive_1sEw3qv5oIFw8YwQtmPo5Tn6BB464yj1g.jpg', text: 'Serene Sanctuary 03' },
  { image: '/images/drive_1IxkAoyKkM9OVsFTMjLW8KPJOrCFBP9JC.jpg', text: 'Serene Sanctuary 18' },
  { image: '/images/drive_1TBIGzQIPLtYWcfJ16sodp_0ZSuc95Zqj.jpg', text: 'Serene Sanctuary 13' },
  { image: '/images/drive_1xa_ABORBe2sCrNePoc21R677hot-dV_a.jpg', text: 'Serene Sanctuary 11' },
  { image: '/images/drive_1NwhwZ0nGjvRJsBdTN4cdislcgS9PApia.jpg', text: 'Serene Sanctuary 14' },
  { image: '/images/drive_1tQ60KEteymlGcigB7chyC2Kx2_SsxPVY.jpg', text: 'Serene Sanctuary 12' },
  { image: '/images/drive_1IG8nb4fwVTieQAbDhM1y_K1QHyDY7Dme.jpg', text: 'Serene Sanctuary 17' },
  { image: '/images/drive_1-VJp1Hn1NrhjIisZ6Y8WI23s0HPvrdEh.jpg', text: 'Serene Sanctuary 01' },
  { image: '/images/drive_1fRywdtBR8KPW3elUsh2gVq1DDGUKaCZO.jpg', text: 'Serene Sanctuary 15' },
];

const PROJECTS_DATA = [
  {
    id: 'res-dsa-01',
    title: 'Subtle Sanctuary',
    subtitle: 'Synchronicity with Nature',
    description: 'This home interior combines simplicity, functionality, and modern design with soft color tones, spacious layouts, and refined finishes for comfortable everyday living',
    fullStory: 'This home interior combines simplicity, functionality, and modern design with soft color tones, spacious layouts, and refined finishes for comfortable everyday living',
    metadata: [
      { label: 'Location', value: 'Udaipur, Rajasthan', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2023', icon: <Calendar size={16} /> },
      { label: 'Area', value: '18,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: SUBTLE_SANCTUARY_GALLERY
  },
  {
    id: 'res-dsa-02',
    title: 'The White House',
    subtitle: 'The White Residential',
    description: 'The White House is a modern architectural masterpiece featuring clean lines, minimal aesthetics, and functional design tailored for luxury living.',
    fullStory: 'The White House is a modern architectural masterpiece featuring clean lines, minimal aesthetics, and functional design tailored for luxury living.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '12,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: THE_WHITE_HOUSE_GALLERY
  },
  {
    id: 'res-dsa-10',
    title: 'Serene Sanctuary',
    subtitle: 'Luxe Residential Living',
    heroImage: '/images/drive_1T8U7brn4ddyC2AvlBXLJe_Q6lR9r8gEB.jpg',
    description: 'Serene Sanctuary is an elegant luxury residential interior showcasing magnificent spatial design, sophisticated bespoke fittings, warm lighting, and a modern minimal layout that provides the ultimate cozy and premium comfort.',
    fullStory: 'Serene Sanctuary is designed to offer the ultimate cozy and premium comfort. Every corner is meticulously crafted to integrate warm ambient lighting with elegant material structures, premium wood bespoke accents, and highly functional layouts optimized for luxury everyday living. It represents a classic architectural balance between high-end modern sophistication and serene physical tranquility.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '11,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: SERENE_SANCTUARY_GALLERY
  },
  {
    id: 'comm-dsa-01',
    title: 'Achira Diamond & Fashion',
    subtitle: 'Boutique Commercial',
    description: 'Achira Diamond & Fashion is a premium boutique commercial project designed with a focus on sophisticated interiors, efficient layout, and modern lighting to create a professional business environment.',
    fullStory: 'Achira Diamond & Fashion is a premium boutique commercial project designed with a focus on sophisticated interiors, efficient layout, and modern lighting to create a professional business environment.',
    metadata: [
      { label: 'Location', value: 'Ahmedabad, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '3,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: ACHIRA_GALLERY
  },
  {
    id: 'comm-dsa-04',
    title: 'A & A Wealth',
    subtitle: 'Wealth Management',
    description: 'A & A Wealth is a modern commercial office space designed to create a professional yet comfortable working environment. The project features elegant interiors, premium materials, warm lighting, and smart space planning that together give the office a sophisticated and welcoming feel.',
    fullStory: 'A & A Wealth is a modern commercial office space designed to create a professional yet comfortable working environment. The project features elegant interiors, premium materials, warm lighting, and smart space planning that together give the office a sophisticated and welcoming feel.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '120,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: A_A_WEALTH_GALLERY
  },
  {
    id: 'comm-dsa-05',
    title: 'Safal',
    subtitle: 'Commercial Excellence',
    description: 'Safal is a modern commercial project designed with efficient space planning and premium detailing to create a professional business environment.',
    fullStory: 'Safal is a modern commercial project designed with efficient space planning and premium detailing to create a professional business environment.',
    metadata: [
      { label: 'Location', value: 'Ahmedabad, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '12,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: SAFAL_COMMERCIAL_GALLERY
  },
  {
    id: 'comm-dsa-06',
    title: 'iFlair',
    subtitle: 'Strategic Design',
    description: 'iFlair is a modern commercial office space designed with clean interiors, smart workspace planning, and contemporary aesthetics to create a comfortable and productive working environment.',
    fullStory: 'iFlair is a modern commercial office space designed with clean interiors, smart workspace planning, and contemporary aesthetics to create a comfortable and productive working environment.',
    metadata: [
      { label: 'Location', value: 'Ahmedabad, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '15,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: IFLAIR_WORKSPACE_GALLERY
  },
  {
    id: 'res-dsa-03',
    title: 'Aesthetic Elevation',
    subtitle: 'Vertical Statement',
    description: 'An exploration of verticality and shadow play.',
    fullStory: 'Aesthetic Elevation defines a new silhouette for the neighborhood.',
    metadata: [
      { label: 'Location', value: 'Delhi, India', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2023', icon: <Calendar size={16} /> },
      { label: 'Area', value: '8,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Concept', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: COMMON_GALLERY
  },
  {
    id: 'res-dsa-04',
    title: 'JS House',
    subtitle: 'JS Residential',
    description: 'JS House is a modern residential interior designed with warm textures, elegant furniture, and a clean contemporary layout to create a comfortable and inviting living experience.',
    fullStory: 'JS House is a modern residential interior designed with warm textures, elegant furniture, and a clean contemporary layout to create a comfortable and inviting living experience.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '8,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: JS_HOUSE_GALLERY
  },
  {
    id: 'res-dsa-05',
    title: 'JD Bedroom',
    subtitle: 'JS House Residential',
    description: 'JS House Designed with a balance of luxury and comfort, this JD Bedroom offers modern interiors, rich textures, and a peaceful ambiance perfect for everyday relaxation.',
    fullStory: 'JS House Designed with a balance of luxury and comfort, this JD Bedroom offers modern interiors, rich textures, and a peaceful ambiance perfect for everyday relaxation.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '5,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: JD_BEDROOM_GALLERY
  },
  {
    id: 'res-dsa-06',
    title: 'DHS House',
    subtitle: 'DHS Residential',
    description: 'DHS House is a modern residential interior designed with clean lines, premium materials, and warm lighting to create a sophisticated and welcoming home environment.',
    fullStory: 'DHS House is a modern residential interior designed with clean lines, premium materials, and warm lighting to create a sophisticated and welcoming home environment.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '1,200 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: DHS_HOUSE_GALLERY
  },
  {
    id: 'res-dsa-07',
    title: 'CP House',
    subtitle: 'CP Residential',
    description: 'JS House This home interior combines simplicity and elegance through minimal design, soft color tones, and smart space planning for a modern everyday lifestyle.',
    fullStory: 'JS House This home interior combines simplicity and elegance through minimal design, soft color tones, and smart space planning for a modern everyday lifestyle.',
    metadata: [
      { label: 'Location', value: 'Ahmedabad, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '9,200 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: CP_HOUSE_GALLERY
  },
  {
    id: 'res-dsa-08',
    title: 'Anchor House',
    subtitle: 'Anchor Residential',
    description: 'Anchor House is a modern residential interior designed with warm tones, elegant wall detailing, and comfortable seating to create a calm and welcoming living space',
    fullStory: 'Anchor House is a modern residential interior designed with warm tones, elegant wall detailing, and comfortable seating to create a calm and welcoming living space',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '6,800 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: ANCHOR_HOUSE_GALLERY
  },
  { id: 'comm-dsa-02', title: 'JD Office', subtitle: 'Tactile Experience', description: 'A premium JD office designed with elegant interiors, warm lighting, and modern detailing to create a professional yet luxurious workspace. The space combines comfort, sophistication, and functionality for a refined office experience.', fullStory: 'A premium JD office designed with elegant interiors, warm lighting, and modern detailing to create a professional yet luxurious workspace. The space combines comfort, sophistication, and functionality for a refined office experience.', metadata: [], galleryItems: JD_OFFICE_GALLERY },
  {
    id: 'res-dsa-09',
    title: 'Shela House',
    subtitle: 'Shela Residential',
    description: 'Shela House is a modern residential interior designed with clean lines, warm lighting, and elegant finishes that create a calm and welcoming living experience.',
    fullStory: 'Shela House is a modern residential interior designed with clean lines, warm lighting, and elegant finishes that create a calm and welcoming living experience.',
    metadata: [
      { label: 'Location', value: 'Surat, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '7,500 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: SHELA_HOUSE_GALLERY
  },
  {
    id: 'comm-dsa-07',
    title: 'Shlip Aaron',
    subtitle: 'Commercial Workspace',
    description: 'Shlip Aaron is a premium commercial office space featuring state-of-the-art office interiors, modern materials, sophisticated lighting designs, and highly functional workspace planning.',
    fullStory: 'Shlip Aaron is a premium commercial office space featuring state-of-the-art office interiors, modern materials, sophisticated lighting designs, and highly functional workspace planning.',
    metadata: [
      { label: 'Location', value: 'Ahmedabad, Gujarat', icon: <MapPin size={16} /> },
      { label: 'Year', value: '2024', icon: <Calendar size={16} /> },
      { label: 'Area', value: '10,000 sq.ft', icon: <Layers size={16} /> },
      { label: 'Status', value: 'Completed', icon: <ExternalLink size={16} /> },
    ],
    galleryItems: SHLIP_AARON_GALLERY
  }
];

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  
  const project = PROJECTS_DATA.find(p => p.id === id) || PROJECTS_DATA[0];
  const [viewMode, setViewMode] = React.useState<'case-study' | 'gallery'>('gallery');

  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode]);

  useEffect(() => {
    // Handling initial scroll and hash routing
    if (location.hash === '#gallery') {
      setViewMode('gallery');
    } else if (location.hash === '#casestudy') {
      setViewMode('case-study');
    }
  }, [location.hash]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const stackData = sessionStorage.getItem('nav-history-stack');
    const stack = stackData ? JSON.parse(stackData) : [];
    if (stack.length > 1) {
      navigate(-1);
    } else {
      navigate('/projects');
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <SEO 
        title={`${project?.title || 'Project'} | Luxury Architectural Design | DSA`}
        description={project?.description || `Discover ${project?.title || 'a luxury project'}, a custom architectural masterpiece designed by Dhwanish Shah Architects (DSA).`}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Header Section */}
        <div className={cn("max-w-7xl mx-auto px-6 transition-all duration-700", viewMode === 'gallery' ? "opacity-0 invisible h-0 pointer-events-none" : "opacity-100 visible mb-20")}>
          <a 
            href="/projects" 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-10px] transition-transform cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </a>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-neon-cyan text-[10px] font-bold tracking-[0.5em] mb-4 block uppercase border-l-2 border-neon-cyan pl-4">
                Case Study
              </span>
              <h1 className="text-5xl md:text-7xl font-sans font-bold leading-tight mb-8">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'text-gradient' : ''}>{word} </span>
                ))}
              </h1>
              <p className="text-white/80 text-xl font-light leading-relaxed mb-10 max-w-xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y border-white/10 mb-10">
                {project.metadata.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-white/40 uppercase text-[9px] font-bold tracking-widest">
                       {item.icon} {item.label}
                    </div>
                    <div className="text-xs font-medium text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6">
                <button 
                  className={cn(
                    "px-10 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all bg-white text-obsidian shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  )}
                >
                  Gallery
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="aspect-square rounded-3xl overflow-hidden glass border border-white/10"
            >
              <SafeImage 
                src={(project as any).heroImage || project.galleryItems[0].image} 
                alt={project.title} 
                loading="lazy"
                objectFit="cover"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Navigation Info */}
        {viewMode === 'gallery' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-8 left-8 md:top-32 md:left-24 z-50 flex items-center gap-6"
          >
            <a 
              href="/projects"
              onClick={handleBack}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-obsidian flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all group cursor-pointer"
              title="Back to Projects"
            >
              <ArrowLeft size={20} className="md:size-6 group-hover:-translate-x-1 transition-transform" />
            </a>
            <div className="hidden lg:block">
              <span className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase block mb-1">Project</span>
              <h4 className="text-white text-sm font-bold tracking-widest uppercase">{project.title}</h4>
            </div>
          </motion.div>
        )}

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Infinite 3D Stack Gallery Section */}
              <section id="gallery" className="py-40 bg-black overflow-hidden border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6 mb-24 flex justify-between items-end relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-neon-cyan text-[10px] font-black tracking-[1em] uppercase block mb-4">Experiential Gallery</span>
                    <h2 className="text-white text-4xl md:text-6xl font-display font-thin tracking-tight uppercase">
                      Spatial <span className="text-gradient font-bold">Chronology</span>
                    </h2>
                  </motion.div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                     {project.galleryItems.map((item, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.05 }}
                         className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer group relative shadow-2xl"
                         onClick={() => setSelectedImage(item.image)}
                       >
                         <SafeImage 
                           src={item.image} 
                           alt={item.text}
                           loading="lazy"
                           size="medium"
                           objectFit="cover"
                           className="w-full h-full transition-all duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                            <span className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">{item.text}</span>
                            <div className="w-8 h-[1px] bg-neon-cyan" />
                         </div>
                       </motion.div>
                     ))}
                   </div>
                </div>
              </section>
            </motion.div>
        </AnimatePresence>

        {/* Lightbox / Zoom Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-10 md:p-20 overflow-hidden"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-8 left-8 text-white/50 hover:text-neon-cyan flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase transition-all z-10 group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Gallery
              </button>
              
              <button 
                className="absolute top-8 right-8 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X size={20} />
              </button>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-[95vw] max-h-[85vh] md:max-w-7xl md:max-h-[90vh] w-full h-full flex items-center justify-center p-4">
                  <SafeImage 
                     src={selectedImage} 
                     alt="Spatial View"
                     size="large"
                     objectFit="contain"
                     className="w-full h-full rounded-xl shadow-[0_0_100px_rgba(0,255,255,0.2)] border border-white/10 pointer-events-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <section className="py-24 bg-obsidian/50 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl md:text-5xl font-light text-white mb-12">Interested in a similar vision?</h3>
            <Link to="/#contact">
              <button className="px-12 py-5 bg-white text-obsidian text-[10px] font-bold tracking-[0.4em] uppercase rounded-full hover:bg-neon-cyan hover:text-white transition-all shadow-xl">
                Start a Conversation
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
