import React, { useState, useMemo, useEffect } from 'react';
import { calculatePension, formatCurrency, CalculatorInputs } from './lib/calculator';
import { ShieldCheck, Printer, Share2, Check, ArrowLeft, Facebook, Twitter, Linkedin, ChevronDown, ChevronUp, TrendingDown, Info, AlertTriangle, X, MessageCircle, Lock, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-block ml-1.5 align-middle">
      <Info size={14} className="text-[#007185] cursor-help" />
      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-50 w-52 bg-[#131921] text-white text-xs rounded p-2.5 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-200 pointer-events-none shadow-lg font-normal tracking-normal leading-relaxed text-center">
        {text}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#131921] transform rotate-45"></div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-[#3a4553] last:border-0 py-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center text-white text-xs font-bold hover:text-[#00a8e1] transition-colors"
      >
        <span>{question}</span>
        <span className="text-[#00a8e1] ml-4 shrink-0 transition-transform duration-200">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-[#cccccc] text-xs leading-relaxed animate-in slide-in-from-top-1 fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}

const LOCAL_STORAGE_KEY = 'epf_calculator_inputs';
const GATEWAY_STORAGE_KEY = 'epf_gateway_accepted_v2';

const defaultInputs: CalculatorInputs = {
  basicSalary: 15000,
  serviceYears: 20,
  serviceMonths: 0,
  isHigherPension: false,
  dateOfBirth: '1980-01-01',
};

function PrivacyPolicyPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1111]">
      <header className="bg-[#131921] px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <button onClick={onBack} className="text-[#00a8e1] hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Calculator
        </button>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-[15px] leading-relaxed">
        <h1 className="text-3xl font-bold tracking-tight text-[#0f1111] mb-1">Privacy Notice</h1>
        <p className="text-sm text-[#565959] mb-6"><strong>Last Updated: June 4, 2026</strong></p>
        
        <p className="mb-4">At <strong>Prople Consultancy and Services</strong>, we know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how our "I ❤️ EPF Calculator" handles your data.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">Our Commitment: Zero-Data Policy</h2>
        <p className="mb-4">We have designed this tool with a <strong>"Browser-First"</strong> architecture to ensure your financial information belongs to you and you alone.</p>
        
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li><strong>No Data Storage:</strong> We do not collect, store, transmit, or otherwise process any of the data you enter into the calculator (such as your average basic salary, age, or eligible years of service) on our servers.</li>
          <li><strong>Local Execution:</strong> All estimations and mathematical equations are computed entirely within the secure environment of your local web browser (client-side). If you choose to refresh the page or close your browser tab, all input data is permanently erased from active memory.</li>
          <li><strong>No Tracking:</strong> We do not deploy persistent cookies, pixels, or third-party behavioral trackers to profile your personal financial habits, nor do we monitor your specific interactions with this specific calculator tool for marketing purposes.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">External Links and Third-Party Sites</h2>
        <p className="mb-4">Our website interfaces may include hyperlinks providing ease of access to the official Employees' Provident Fund Organisation (EPFO) Member Portal and other supplementary educational resources. Once you click these links and navigate away from our platform, you will be subject to the separate privacy policies and terms of those respective external websites. We highly encourage you to review their policies, as we bear no responsibility for their data practices.</p>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">Updates to this Privacy Notice</h2>
        <p className="mb-4">As our digital services evolve and legal requirements shift, we may periodically revise this notice to reflect such changes. The "Last Updated" date stationed at the top of this document will always indicate when the most recent modifications have been instantiated.</p>
      </main>
      
      <footer className="bg-[#f2f4f8] py-8 text-center text-sm text-[#565959] border-t border-[#eaeded] mt-8">
         <p>© {new Date().getFullYear()} Prople Consultancy and Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

function TermsOfUsePage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1111]">
      <header className="bg-[#131921] px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <button onClick={onBack} className="text-[#00a8e1] hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Calculator
        </button>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-[15px] leading-relaxed">
        <h1 className="text-3xl font-bold tracking-tight text-[#0f1111] mb-1">Terms and Conditions</h1>
        <p className="text-sm text-[#565959] mb-6"><strong>Last Updated: June 4, 2026</strong></p>
        
        <p className="mb-4">Welcome to the "I ❤️ EPF Calculator," operated by <strong>Prople Consultancy and Services</strong>. By accessing or using this website, you agree to the conditions set forth below. Please read them carefully.</p>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">1. Nature of the Service</h2>
        <p className="mb-4">This website operates as an independent, non-official software utility explicitly designed for educational context and personal financial visualization. It operates entirely independently and is <strong>not affiliated with, endorsed by, sponsored by, or connected to the Employees' Provident Fund Organisation (EPFO)</strong> or the Government of India in any capacity.</p>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">2. Accuracy of Estimations</h2>
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li><strong>Projections Only:</strong> The mathematical outputs generated by this digital calculator are strictly intended as <strong>estimates</strong>. These derived figures are formulated utilizing the standard framework established under the Employees' Pension Scheme (EPF).</li>
          <li><strong>External Variances:</strong> Actual, realized pension disbursements are conclusively adjudicated by the EPFO. Such determinations rely heavily upon your authenticated and verified service records, historical monetary contributions, and the binding effects of any contemporary regulatory amendments or judiciary decrees.</li>
          <li><strong>No Guarantee:</strong> Prople Consultancy and Services explicitly disclaims any warranties or assurances regarding the precision, reliability, or completeness of these computational projections. You are strongly advised against issuing binding financial commitments or lifecycle decisions strictly founded upon the metrics dispensed by this digital utility.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">3. Limitation of Liability</h2>
        <p className="mb-4">Under no circumstances shall Prople Consultancy and Services, alongside its respective founders, employees, and software contributors, be adjudged liable for any direct, indirect, incidental, punitive, or consequential fiscal losses, or emotional damages resulting directly or indirectly from the utilization of, or the inability to utilize, this calculation tool. This computational service is distributed strictly on an "as is" and "as available" basis.</p>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">4. Intellectual Property Rights</h2>
        <p className="mb-4">All programmatic code, user interface designs, textual content, and compiled graphical assets comprising this tool stand as the exclusive intellectual property of Prople Consultancy and Services. Unauthorized reproduction, programmatic scraping, uncredited dissemination, or commercial resale of this platform is unequivocally prohibited under applicable copyright parameters.</p>

        <h2 className="text-xl font-bold mt-8 mb-3 text-[#0f1111]">5. Dispute Resolution</h2>
        <p className="mb-4">Any disputes arising out of the application or interpretation of these Terms and Conditions shall be governed by the applicable laws of India, subject to the exclusive jurisdiction of the competent courts.</p>
      </main>
      
      <footer className="bg-[#f2f4f8] py-8 text-center text-sm text-[#565959] border-t border-[#eaeded] mt-8">
         <p>© {new Date().getFullYear()} Prople Consultancy and Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultInputs, ...JSON.parse(saved) };
      } catch (e) {
        return defaultInputs;
      }
    }
    return defaultInputs;
  });
  const [copied, setCopied] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [inflationYears, setInflationYears] = useState(10);
  const [errors, setErrors] = useState<string[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isGatewayAccepted, setIsGatewayAccepted] = useState(() => {
    return localStorage.getItem(GATEWAY_STORAGE_KEY) === 'true';
  });
  const [gatewayChecked, setGatewayChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inputs));
  }, [inputs]);

  const results = useMemo(() => calculatePension(inputs), [inputs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(async () => {
      try {
        const reportElement = document.getElementById('pdf-report-template');
        if (!reportElement) return;
        
        const canvas = await html2canvas(reportElement, {
          scale: 2, // High resolution
          useCORS: true,
          logging: false,
          width: 800,
          windowWidth: 800,
          onclone: (documentClone) => {
             const el = documentClone.getElementById('pdf-report-template');
             if (el) {
                el.classList.remove('hidden');
                el.style.display = 'block';
             }
          }
        });
        
        const imgWidth = 210; // A4 size in mm
        const pageHeight = 297; // A4 size in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        pdf.save('EPF_Estimate_Report.pdf');
      } catch (err) {
        console.error("PDF generation failed", err);
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 150);
  };

  const shareText = `EPF Estimate Summary
Average Basic Salary: ${formatCurrency(inputs.basicSalary)}
Service Duration: ${inputs.serviceYears} Yrs, ${inputs.serviceMonths} Mos
Higher Pension: ${inputs.isHigherPension ? "Opted In" : "Not Opted"}

Estimated Standard Pension (Age 58): ${formatCurrency(results.monthlyPensionAge58)}/month`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getWhatsAppShareUrl = () => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  };
  
  const getTwitterShareUrl = () => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => {
      let newValue: string | number | boolean = value;
      if (type === 'checkbox') newValue = checked;
      else if (type === 'number') newValue = Math.max(0, parseInt(value) || 0);
      
      return {
        ...prev,
        [name]: newValue,
      };
    });
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const dobDate = inputs.dateOfBirth ? new Date(inputs.dateOfBirth) : null;
  const currentAge = dobDate && !isNaN(dobDate.getTime()) ? Math.floor((new Date().getTime() - dobDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null;
  const retirementDate = dobDate && !isNaN(dobDate.getTime()) ? new Date(dobDate.getFullYear() + 58, dobDate.getMonth(), dobDate.getDate()) : null;

  const validateInputs = () => {
    const newErrors: string[] = [];

    if (inputs.basicSalary <= 0) {
      newErrors.push("Average Basic Salary must be greater than zero.");
    }

    if (currentAge !== null) {
      if (currentAge < 15) {
        newErrors.push("Age must be at least 15 to be eligible for EPF contributions.");
      } else if (currentAge >= 58) {
        newErrors.push("You have already reached the standard EPF retirement age of 58.");
      }
      
      const maxPossibleService = currentAge - 15;
      const totalService = inputs.serviceYears + inputs.serviceMonths / 12;

      if (totalService > maxPossibleService && maxPossibleService > 0) {
         newErrors.push(`Service duration (${inputs.serviceYears} yrs, ${inputs.serviceMonths} mos) exceeds the maximum possible working years from age 15 (${maxPossibleService} yrs).`);
      }
    } else {
       newErrors.push("Please provide a valid Date of Birth.");
    }

    if (inputs.serviceYears < 0 || inputs.serviceYears > 40) {
       newErrors.push("Service Years must be between 0 and 40.");
    }
    
    if (inputs.serviceMonths < 0 || inputs.serviceMonths > 11) {
       newErrors.push("Service Months must be between 0 and 11.");
    }
    
    const totalServiceTime = inputs.serviceYears + (inputs.serviceMonths / 12);
    if (totalServiceTime < 0.5) {
       newErrors.push("Total service duration must be at least 6 months.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const proceedToResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setStep(2);
    }
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setErrors([]);
  };

  const handleGatewayAccept = () => {
    if (gatewayChecked) {
      localStorage.setItem(GATEWAY_STORAGE_KEY, 'true');
      setIsGatewayAccepted(true);
    }
  };

  const handleGatewayDecline = () => {
    window.location.href = 'https://www.epfindia.gov.in/';
  };

  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfUsePage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#eaeded] font-sans text-[#0f1111] flex flex-col overflow-x-hidden">
      {/* Header */}
      {step === 1 && (
        <header className="bg-[#131921] px-4 py-3 sticky top-0 z-10 print:hidden text-white flex items-center justify-between">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-white">
                I <Heart className="fill-[#ef4444] text-[#ef4444]" size={22} /> EPF Calculator
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main id="calc-content" className="flex-1 w-full max-w-lg lg:max-w-4xl mx-auto px-4 py-8 print:py-0 print:max-w-full print:bg-white text-[#0f1111]">
        
        {step === 1 && (
          <div className="max-w-lg mx-auto print:hidden">
            <h1 className="text-2xl font-bold mb-4">Calculate Your Pension</h1>
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-[#d5d9d9]">
              <form onSubmit={proceedToResults} className="space-y-5">
                <div>
                  <label className="flex items-center text-sm font-bold text-[#0f1111] mb-1">
                    Date of Birth
                    <InfoTooltip text="Used to calculate your current age and expected retirement date (Age 58)." />
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={inputs.dateOfBirth || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-md border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none transition-shadow text-[#0f1111]"
                    />
                  </div>
                  {currentAge !== null && retirementDate !== null && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#565959]">
                      <span className="font-bold text-[#007185] whitespace-nowrap">Age: {currentAge} yrs</span>
                      <span className="text-[#d5d9d9] font-bold hidden sm:inline">|</span>
                      <span className="break-words">Expected Retirement: <strong className="text-[#0f1111]">{retirementDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</strong></span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-[#0f1111] mb-1">
                    Average Basic Salary (Last 60 Months)
                    <InfoTooltip text="Calculated as the average of your Basic Salary + DA over the 60 months prior to retirement/exit." />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565959]">₹</span>
                    <input
                      type="number"
                      name="basicSalary"
                      value={inputs.basicSalary || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-8 pr-3 py-2 rounded-md border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none transition-shadow text-[#0f1111]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#565959]">
                    Include Basic Salary + DA.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="flex items-center text-sm font-bold text-[#0f1111] mb-1">
                      Service Years
                      <InfoTooltip text="Total number of years you contributed to the EPF scheme." />
                    </label>
                    <input
                      type="number"
                      name="serviceYears"
                      value={inputs.serviceYears || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-md border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none transition-shadow text-[#0f1111]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="flex items-center text-sm font-bold text-[#0f1111] mb-1">
                      Months
                      <InfoTooltip text="Additional months of service. 6 months or more rounds up to a full year in the EPF formula." />
                    </label>
                    <input
                      type="number"
                      name="serviceMonths"
                      value={inputs.serviceMonths || ''}
                      onChange={handleInputChange}
                      max="11"
                      required
                      className="w-full px-3 py-2 rounded-md border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none transition-shadow text-[#0f1111]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group w-full">
                    <div className="relative flex items-start mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        name="isHigherPension"
                        checked={inputs.isHigherPension}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#e77600] cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="flex flex-wrap items-center gap-1 text-sm font-bold text-[#0f1111]">
                        Opted for Higher Pension?
                        <InfoTooltip text="Eligibility for higher pension is subject to specific past contributions and joint-option filings with the EPFO. Our calculator provides an estimate only for those who have successfully exercised this option." />
                      </span>
                      <span className="block text-xs text-[#565959] mt-0.5 break-words">
                        If unchecked, standard wage ceiling (₹15,000) applies.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 mt-4 border-t border-[#d5d9d9]">
                  {errors.length > 0 && (
                    <div className="mb-4 p-4 bg-[#fdf4f4] border border-[#d00000] rounded-md flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-[#c40000] font-bold text-sm">
                         <AlertTriangle size={16} />
                         <span>Please fix the following issues:</span>
                       </div>
                       <ul className="list-disc pl-6 text-[#c40000] text-sm leading-relaxed space-y-1">
                         {errors.map((error, index) => (
                           <li key={index}>{error}</li>
                         ))}
                       </ul>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-2.5 px-4 bg-transparent hover:bg-[#f0f2f2] text-[#0f1111] font-normal text-sm rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#d5d9d9] transition-colors"
                    >
                      Reset
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] py-2.5 px-4 bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-normal text-sm rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#FCD200] transition-colors"
                    >
                      Calculate Pension
                    </button>
                  </div>
                  <p className="text-center text-xs text-[#565959] mt-4 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#007185]"/>
                    All calculations are done securely in your browser.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="print:hidden">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-[#007185] hover:text-[#c40000] hover:underline"
              >
                <ArrowLeft size={16} /> Return to Calculator
              </button>
            </div>

            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-3xl font-bold text-[#0f1111] mb-1">EPF Estimate Summary</h1>
              <p className="text-sm text-[#565959] mb-4">Generated on {new Date().toLocaleDateString()}</p>
              
              <div className="grid grid-cols-3 gap-6 bg-white p-4 rounded-md border border-[#d5d9d9]">
                <div>
                  <p className="text-xs font-bold text-[#565959] uppercase">Avg Basic Salary</p>
                  <p className="font-bold text-lg">{formatCurrency(inputs.basicSalary)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#565959] uppercase">Service Duration</p>
                  <p className="font-bold text-lg">{inputs.serviceYears} Yrs, {inputs.serviceMonths} Mos</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#565959] uppercase">Higher Pension</p>
                  <p className="font-bold text-lg">{inputs.isHigherPension ? "Opted In" : "Not Opted"}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 print:block">
              {/* Input Summary Box */}
              <div className="bg-white p-5 rounded-lg border border-[#d5d9d9] shadow-sm print:hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#0f1111] mb-1 text-base">Your Inputs</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#565959]">Basic Salary:</span>
                        <span className="font-bold">{formatCurrency(inputs.basicSalary)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#565959]">Service:</span>
                        <span className="font-bold">{inputs.serviceYears}Y, {inputs.serviceMonths}M</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#565959]">Higher Pension:</span>
                        <span className="font-bold">{inputs.isHigherPension ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-[#007185] hover:text-[#c40000] text-sm hover:underline font-bold shrink-0"
                  >
                    Edit Inputs
                  </button>
                </div>
              </div>

              {/* Primary Results */}
              <div className="space-y-6 print:mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d5d9d9]">
                  <h2 className="text-xl font-bold text-[#0f1111] mb-4">
                    Estimated Standard Pension (Age 58)
                  </h2>
                  <div className="mb-6">
                    <span className="text-4xl sm:text-5xl font-bold text-[#0f1111]">
                      {formatCurrency(results.monthlyPensionAge58)}
                    </span>
                    <span className="break-words text-base sm:text-lg text-[#565959] ml-1">/ month</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#eaeded] pt-4">
                    <div>
                      <p className="text-xs text-[#565959] mb-0.5">Pensionable Salary</p>
                      <p className="font-bold text-[#0f1111]">{formatCurrency(results.pensionableSalary)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#565959] mb-0.5">Eligible Service</p>
                      <p className="font-bold text-[#0f1111] leading-tight">
                        {results.pensionableService} Years
                        {results.weightageAdded && (
                          <span className="block text-[10px] text-[#007600] mt-0.5 font-bold uppercase tracking-wide">
                            +2 Yr Bonus applied
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* What If Scenarios */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d5d9d9] print:break-inside-avoid">
                  <h3 className="text-lg font-bold text-[#0f1111] mb-2">
                    Retirement Age Projections
                  </h3>
                  <p className="text-sm text-[#565959] mb-4">
                    How your monthly pension adjusts based on when you choose to start claiming it.
                  </p>

                  <div className="space-y-2">
                    {results.whatIfScenarios.map((scenario) => (
                      <div 
                        key={scenario.age} 
                        className={`flex items-center justify-between p-3 rounded border ${scenario.age === 58 ? 'bg-[#f7fafe] border-[#007185]' : 'bg-white border-[#eaeded]'}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className={`font-bold ${scenario.age === 58 ? 'text-[#007185]' : 'text-[#0f1111]'}`}>
                            Age {scenario.age}
                          </span>
                          <span className="text-sm flex-1 text-[#565959]">
                            {scenario.description}
                          </span>
                        </div>
                        <span className="font-bold text-lg text-right">
                          {formatCurrency(scenario.estimatedAmount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inflation Impact Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d5d9d9] print:break-inside-avoid">
                  <h3 className="text-lg font-bold text-[#0f1111] mb-2 flex items-center gap-2">
                    <TrendingDown size={20} className="text-[#c40000]" />
                    Purchasing Power (Inflation Impact)
                  </h3>
                  <p className="text-sm text-[#565959] mb-4">
                    Estimate what your standard pension (Age 58) will actually be worth in the future due to inflation. This helps with realistic long-term planning.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 print:hidden">
                    <div>
                      <label className="flex items-center text-xs font-bold text-[#0f1111] mb-1">
                        Expected Annual Inflation
                        <InfoTooltip text="Based on current CPI trends; future inflation may vary." />
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full pl-3 pr-8 py-2 rounded border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#565959] text-sm">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0f1111] mb-1">
                        Years in the Future
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inflationYears}
                          onChange={(e) => setInflationYears(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full pl-3 pr-12 py-2 rounded border border-[#a6a6a6] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#565959] text-sm">Years</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f7fafe] border border-[#007185] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#0f1111]">Real Value in {inflationYears} years</p>
                      <p className="text-xs text-[#565959]">At {inflationRate}% annual inflation</p>
                    </div>
                    <span className="font-bold text-2xl text-[#c40000] text-left sm:text-right">
                      {formatCurrency(results.monthlyPensionAge58 / Math.pow(1 + (inflationRate/100), inflationYears))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Bottom Bar */}
              <div id="actions-bar" className="bg-[#f0f2f2] p-6 rounded-lg border border-[#d5d9d9] print:hidden">
                <div className="text-center mb-5">
                  <h3 className="font-bold text-[#0f1111] text-lg mb-1">Get Your Report Summary</h3>
                  <p className="text-sm text-[#565959]">Save or share a copy of this projection for your records.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-white hover:bg-[#fafafa] text-[#0f1111] font-bold text-sm rounded shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#a6a6a6] transition-colors"
                  >
                    <Share2 size={18} />
                    Share Estimate
                  </button>
                  <button 
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-75 disabled:cursor-wait text-[#0f1111] font-bold text-sm rounded shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#FCD200] transition-colors"
                  >
                    {isGeneratingPdf ? (
                       <div className="w-4 h-4 border-2 border-[#0f1111] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                       <Printer size={18} />
                    )}
                    {isGeneratingPdf ? 'Generating...' : 'Save as PDF'}
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <p className="text-xs text-[#565959] text-center flex flex-wrap items-center justify-center gap-1.5 bg-white py-1.5 px-3 rounded-xl border border-[#d5d9d9] shadow-[0_1px_1px_rgba(0,0,0,0.05)] w-full max-w-[90%]">
                    <Info size={14} className="text-[#007185] shrink-0" />
                    <span>Tip: A detailed PDF report will be downloaded to your device.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 print:hidden animate-in fade-in duration-200 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-4 border-b border-[#eaeded]">
                <h3 className="font-bold text-[#0f1111] text-lg">Share Estimate</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-[#565959] hover:text-[#0f1111] transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <a 
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-3 rounded-md border border-[#d5d9d9] hover:bg-[#f3fcd4] hover:border-[#86c507] transition-all text-[#0f1111] font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <MessageCircle size={18} />
                  </div>
                  Share on WhatsApp
                </a>
                
                <a 
                  href={getTwitterShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-3 rounded-md border border-[#d5d9d9] hover:bg-[#e8f5fd] hover:border-[#1da1f2] transition-all text-[#0f1111] font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Twitter size={16} fill="currentColor" />
                  </div>
                  Share on X (Twitter)
                </a>

                <div className="flex items-center py-2">
                  <div className="flex-1 border-t border-[#eaeded]"></div>
                  <span className="px-3 text-xs text-[#565959] font-medium uppercase tracking-wide">Or</span>
                  <div className="flex-1 border-t border-[#eaeded]"></div>
                </div>

                <button 
                  onClick={() => {
                    handleCopy();
                    setTimeout(() => setIsShareModalOpen(false), 1500);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-md border border-[#d5d9d9] hover:bg-[#f0f2f2] transition-colors text-[#0f1111] font-medium"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors ${copied ? 'bg-[#e7f4e4] text-[#007600]' : 'bg-[#e3e6e6] text-[#565959]'}`}>
                    {copied ? <Check size={18} className="text-[#007600]" /> : <Share2 size={18} />}
                  </div>
                  {copied ? 'Copied summary!' : 'Copy text summary'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Removed Modals */}

      </main>

      {/* Hidden PDF Report Template */}
      <div id="pdf-report-template" className="hidden w-[800px] p-10 bg-white font-sans text-[#0f1111]">
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 border-[#131921] pb-4 mb-8 pt-4">
          <div>
            <h1 className="text-3xl font-black text-[#131921] tracking-tight">EPF Estimate Report</h1>
            <p className="text-[#565959] font-medium mt-1">Generated specifically for your planning purposes</p>
          </div>
          <div className="text-right">
            <p className="text-[#565959] text-sm font-bold bg-[#f0f2f2] px-3 py-1 rounded">Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</p>
          </div>
        </div>

        {/* 1. Inputs */}
        <div className="min-h-[1122px] flex flex-col justify-start">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#131921] flex items-center gap-2">
             <span className="bg-[#e77600] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm">1</span>
             Your Inputs
          </h2>
          <div className="grid grid-cols-2 gap-4 items-stretch rounded-lg overflow-hidden border border-[#d5d9d9]">
            <div className="bg-[#f7fafe] p-4 border-b border-r border-[#d5d9d9]">
              <p className="text-xs text-[#565959] font-bold uppercase tracking-wider mb-1">Date of Birth</p>
              <p className="font-bold text-[#0f1111] text-lg">{inputs.dateOfBirth ? new Date(inputs.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'}) : 'N/A'}</p>
              {currentAge !== null && <p className="text-sm text-[#007185] font-medium">Estimated current age: {currentAge}</p>}
            </div>
            <div className="bg-[#f7fafe] p-4 border-b border-[#d5d9d9]">
              <p className="text-xs text-[#565959] font-bold uppercase tracking-wider mb-1">Basic Salary</p>
              <p className="font-bold text-[#0f1111] text-lg">{formatCurrency(inputs.basicSalary)}</p>
            </div>
             <div className="bg-[#f7fafe] p-4 border-r border-[#d5d9d9]">
              <p className="text-xs text-[#565959] font-bold uppercase tracking-wider mb-1">Service Duration</p>
              <p className="font-bold text-[#0f1111] text-lg">{inputs.serviceYears} Years, {inputs.serviceMonths} Months</p>
            </div>
            <div className="bg-[#f7fafe] p-4">
              <p className="text-xs text-[#565959] font-bold uppercase tracking-wider mb-1">Higher Pension</p>
              <p className="font-bold text-[#0f1111] text-lg">{inputs.isHigherPension ? 'Opted In' : 'Not Opted'}</p>
            </div>
          </div>
        </div>

        {/* 2. Primary Result */}
        <div className="mb-10 page-break-inside-avoid">
          <h2 className="text-xl font-bold mb-4 text-[#131921] flex items-center gap-2">
             <span className="bg-[#e77600] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm">2</span>
             Estimated Standard Pension <span className="text-[#565959] font-normal text-base">(Age 58)</span>
          </h2>
          <div className="bg-[#f8fbff] p-6 border-l-4 border-[#007185] rounded-r-lg border-y border-r border-[#d5d9d9]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-[#565959] uppercase tracking-wider mb-2">Expected Monthly Pension</p>
                <p className="text-5xl font-black text-[#007185]">{formatCurrency(results.monthlyPensionAge58)}<span className="text-xl text-[#565959] font-medium ml-1">/mo</span></p>
                {results.weightageAdded && (
                  <p className="text-sm text-[#007600] mt-2 font-bold flex items-center gap-1">✓ Includes 2-year bonus for 20+ years service</p>
                )}
              </div>
              <div className="bg-[#ffffff] p-4 rounded-lg border border-[#eaeded] text-center min-w-[200px]">
                <p className="text-xs text-[#565959] font-bold uppercase tracking-wider mb-1">Pensionable Service</p>
                <p className="text-2xl font-black text-[#0f1111]">{results.pensionableService} Yrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Projections */}
        <div className="mb-10 page-break-inside-avoid">
          <h2 className="text-xl font-bold mb-4 text-[#131921] flex items-center gap-2">
             <span className="bg-[#e77600] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm">3</span>
             Retirement Age Projections
          </h2>
          <div className="rounded-lg border border-[#d5d9d9] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f0f2f2] border-b border-[#d5d9d9]">
                  <th className="p-4 text-sm font-bold text-[#0f1111]">Retirement Age</th>
                  <th className="p-4 text-sm font-bold text-[#0f1111] text-right">Estimated Monthly Pension</th>
                </tr>
              </thead>
              <tbody>
                {results.whatIfScenarios.map((scenario, i) => (
                  <tr key={scenario.age} className={`border-b border-[#eaeded] last:border-0 ${scenario.age === 58 ? 'bg-[#f8fbff] font-bold' : ''}`}>
                    <td className="p-4 text-[#0f1111]">
                       Age {scenario.age}
                       {scenario.age < 58 && <span className="ml-3 text-xs font-bold text-[#c40000] bg-[#fdf4f4] border border-[#f5d6d6] px-2.5 py-1 rounded-full">-{(58 - scenario.age) * 4}% Early Penalty</span>}
                       {scenario.age > 58 && <span className="ml-3 text-xs font-bold text-[#007600] bg-[#e7f4e4] border border-[#cce8c4] px-2.5 py-1 rounded-full">+{(scenario.age - 58) * 4}% Deferred Bonus</span>}
                       {scenario.age === 58 && <span className="ml-3 text-xs font-bold text-[#007185] bg-[#eaf4f7] border border-[#cbe5ed] px-2.5 py-1 rounded-full">Standard</span>}
                    </td>
                    <td className={`p-4 text-right text-lg ${scenario.age === 58 ? 'text-[#007185] font-black' : 'text-[#0f1111]'}`}>{formatCurrency(scenario.estimatedAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>

        {/* 4. Inflation */}
        <div className="mb-8 page-break-inside-avoid">
           <h2 className="text-xl font-bold mb-4 text-[#131921] flex items-center gap-2">
             <span className="bg-[#e77600] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm">4</span>
             Purchasing Power (Inflation Impact)
           </h2>
           <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#f7fafe] p-5 rounded-lg border border-[#eaeded]">
               <p className="text-sm font-bold text-[#565959] uppercase tracking-wider mb-1">Assumed Annual Inflation</p>
               <p className="font-bold text-3xl text-[#0f1111]">{inflationRate}%</p>
             </div>
             <div className="bg-[#fdf4f4] p-5 rounded-lg border border-[#f5d6d6]">
               <p className="text-sm font-bold text-[#c40000] uppercase tracking-wider mb-1">Real Value in {inflationYears} Years</p>
               <p className="font-black text-3xl text-[#c40000]">{formatCurrency(results.monthlyPensionAge58 / Math.pow(1 + (inflationRate/100), inflationYears))}</p>
             </div>
           </div>
           <p className="text-sm mt-3 text-[#565959]">Based on the calculated Age 58 pension of <strong className="text-[#0f1111]">{formatCurrency(results.monthlyPensionAge58)}</strong>, its future purchasing power will decrease over time due to inflation.</p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-[#565959] text-xs border-t border-[#eaeded] pt-6 pb-2">
          <p className="font-bold text-sm text-[#0f1111] mb-2">Disclaimer</p>
          <p className="mb-4 text-[#999999] max-w-2xl mx-auto leading-relaxed">This estimation is for educational purposes and is not affiliated with the Employees' Provident Fund Organisation (EPFO) or the Government of India. Actual pension amounts are subject to official verification and records.</p>
          <div className="font-bold text-[#131921] text-sm">
             <p>© {new Date().getFullYear()} Prople Consultancy and Services</p>
             <p className="mt-1 flex items-center justify-center gap-1.5 font-medium">made with <Heart className="fill-[#ef4444] text-[#ef4444]" size={14} /> in India</p>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-[#232f3e] text-white mt-auto print:hidden w-full">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 border-b border-[#3a4553] pb-8">
            {/* Guidance */}
            <div className="md:col-span-2">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-white">Guidance & Concepts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#cccccc] text-xs leading-relaxed mb-8">
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">Last 60 Months Average</h4>
                  <p>The EPFO calculates your pensionable salary as the average of your basic salary plus Dearness Allowance (DA) drawn over the final 60 months of service before exiting.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">Weightage Bonus</h4>
                  <p>If you have completed 20 or more years of eligible service, the government adds a bonus of 2 years to your total service duration calculation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">Maximum Cap</h4>
                  <p>The total pensionable service period cannot exceed 35 years.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">Verify Records</h4>
                  <p>
                    <a href="https://passbook.epfindia.gov.in/MemberPassBook/Login" target="_blank" rel="noopener noreferrer" className="text-[#00a8e1] hover:underline">
                      Visit the official EPFO Member Portal
                    </a> to verify your actual service history and contributions.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-white">Frequently Asked Questions</h3>
                <div className="bg-[#131921] rounded-lg px-4 border border-[#3a4553]">
                  <FAQItem 
                    question="What is a UAN and why do I need it?" 
                    answer="UAN stands for Universal Account Number. It is a unique 12-digit number allotted by the EPFO to every contributing employee. It acts as a permanent identifier that links all your multiple Member IDs across different employers, allowing you to view a consolidated service history."
                  />
                  <FAQItem 
                    question="How can I verify my actual service history?" 
                    answer={
                      <>
                        You can verify your service history by logging into the{' '}
                        <a href="https://passbook.epfindia.gov.in/MemberPassBook/Login" target="_blank" rel="noopener noreferrer" className="text-[#00a8e1] hover:underline">
                          EPFO Member Passbook
                        </a>{' '}
                        using your UAN. Look for the 'Service History' tab, which details your Date of Joining (DOJ) and Date of Exit (DOE) for every employer. This record dictates your eligible service years.
                      </>
                    }
                  />
                  <FAQItem 
                    question="What documents are needed for the Higher Pension Joint Option?"
                    answer={
                      <>
                        For those pursuing the Higher Pension option, common requirements include:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Joint Option Form (submitted under Para 11(3) and 11(4) of EPF).</li>
                          <li>Proof of EPF contribution on actual salary exceeding the statutory wage ceiling.</li>
                          <li>Employer's declaration validating past administrative records.</li>
                        </ul>
                      </>
                    }
                  />
                  <FAQItem 
                    question="Do earlier jobs count if I didn't merge my PF accounts?" 
                    answer="To ensure your total service years are calculated correctly across multiple jobs, you must explicitly transfer your earlier EPF to your current employer account using the unified online portal. Otherwise, your earlier service might be excluded from the pension calculation."
                  />
                </div>
              </div>
            </div>

            {/* Links & Socials */}
            <div>
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-white">Legal & Links</h3>
              <div className="space-y-4 text-xs text-[#cccccc]">
                <div className="bg-[#131921] p-3 rounded border border-[#3a4553]">
                  <p className="flex items-center gap-1.5 text-white font-bold mb-1">
                    <Lock size={14} className="text-[#25D366]" /> Browser-Side Security Promise
                  </p>
                  <p className="leading-relaxed">We never use cookies to track or store your sensitive salary data. All calculations run strictly securely on your local device.</p>
                </div>
                <p>
                   <a href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white font-bold text-[#00a8e1] flex items-center gap-1">
                     <Share2 size={12} /> Official EPFO Portal
                   </a>
                </p>
                <div className="flex flex-col gap-2">
                   <button type="button" onClick={() => setCurrentPage('privacy')} className="hover:underline hover:text-white text-left">Privacy Policy</button>
                   <button type="button" onClick={() => setCurrentPage('terms')} className="hover:underline hover:text-white text-left">Terms and Conditions</button>
                   <a href="mailto:prople.org@gmail.com?subject=I%20%E2%9D%A4%EF%B8%8F%20EPF%20Pension%20Calculator%20App%20Support%20Request" className="hover:underline hover:text-white text-left">Contact Support</a>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-[#cccccc] hover:text-white transition-colors">
                  <Twitter size={18} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-[#cccccc] hover:text-white transition-colors">
                  <Facebook size={18} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-[#cccccc] hover:text-white transition-colors">
                  <Linkedin size={18} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-[11px] text-[#999999] pt-6 border-t border-[#3a4553]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="max-w-4xl text-left leading-relaxed">
                <strong>Disclaimer:</strong> This calculator is an independent estimation tool designed for educational purposes only. It is not affiliated with the Employees' Provident Fund Organisation (EPFO) or the Government of India. Note: Recent legal developments, including High Court rulings on higher pension eligibility, may impact individual pension entitlements. This tool does not account for specific court-ordered interpretations or pending government notifications regarding salary ceilings. Users are advised to verify their eligibility via the official EPFO Member Portal.
              </p>
              <p className="whitespace-nowrap font-medium text-[#cccccc]">
                © {new Date().getFullYear()} Prople Consultancy and Services
              </p>
            </div>
            <div className="text-center text-[#cccccc] font-medium tracking-wide flex items-center justify-center gap-1.5">
              made with <Heart className="fill-[#ef4444] text-[#ef4444]" size={14} /> in India
            </div>
          </div>
        </div>
      </footer>

      {/* Gateway Overlay */}
      {!isGatewayAccepted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div>
              <h2 className="text-2xl font-bold text-[#0f1111] mb-4">Welcome to EPF Calculator</h2>
              <div className="text-[15px] text-[#0f1111] space-y-3 leading-relaxed">
                <p>This website is an independent, non-official tool designed for educational purposes. It is <strong>not affiliated with the EPFO</strong>.</p>
                <p><strong>Zero-Data Policy:</strong> We do not store or transmit your data. All calculations run strictly securely in your browser.</p>
                <p><strong>Estimates Only:</strong> Results are based on standard formulas. Please verify actual records with the official EPFO portal.</p>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group p-3 -mx-3 rounded-md hover:bg-[#f7fafe] transition-colors mt-2">
              <div className="relative flex items-start mt-0.5">
                <input
                  type="checkbox"
                  checked={gatewayChecked}
                  onChange={(e) => setGatewayChecked(e.target.checked)}
                  className="w-5 h-5 accent-[#e77600] cursor-pointer"
                />
              </div>
              <span className="text-[15px] text-[#0f1111] font-medium pt-px">
                I have read and agree to the Privacy Policy and Disclaimer. I acknowledge that this tool generates estimates only.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={handleGatewayDecline}
                className="flex-1 py-3 px-4 bg-white hover:bg-[#f0f2f2] text-[#0f1111] font-medium text-sm rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#d5d9d9] transition-colors"
              >
                I Disagree (Exit)
              </button>
              <button 
                onClick={handleGatewayAccept}
                disabled={!gatewayChecked}
                className="flex-1 py-3 px-4 bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-50 disabled:cursor-not-allowed text-[#0f1111] font-bold text-sm rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-[#FCD200] transition-colors"
              >
                I Agree & Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

