/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ChevronRight, 
  Search, 
  MapPin, 
  Calendar, 
  ClipboardCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogIn
} from 'lucide-react';
import { 
  MOCK_ORG_UNITS, 
  MOCK_DATA_ELEMENTS, 
  ANC_DATA_ELEMENTS, 
  type ANCDataElement,
  CBMNC_DATA_ELEMENTS,
  CMAM_COMMODITIES,
  CMAM_COLUMNS,
  CMAM_BENEFICIARY_CATEGORIES
} from '../constants';
import { reportService, ReportData } from '../services/reportService';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

const DATA_SETS = [
  { id: 'ds_anc', name: 'ANC Monthly Facility Report' },
  { id: 'ds_cbd', name: 'CBD Supervision Monthly Report' },
  { id: 'ds_cbmnc', name: 'CBMNC Monthly Report' },
  { id: 'ds_cccp', name: 'Cervical Cancer Control Program Monthly Report' },
  { id: 'ds_cmam', name: 'CMAM Stock Sheet Monthly Report' },
  { id: 'ds_epi', name: 'EPI Vaccination Performance and Disease Surveillance (NEW)' },
  { id: 'ds_exposed', name: 'Exposed Child Under 24 Months Follow Up' },
  { id: 'ds_fqi', name: 'Facility Quality Improvement Monthly Reporting Form' },
  { id: 'ds_fp', name: 'Family Planning Monthly Report' },
  { id: 'ds_hbb', name: 'Helping Babies Breathe' },
  { id: 'ds_hmis15', name: 'HMIS 15' },
  { id: 'ds_imci', name: 'IMCI Village Clinic Monthly Consolidation Report' },
  { id: 'ds_kmc', name: 'Kangaroo Mother Care Monthly Reporting Form' },
  { id: 'ds_malaria', name: 'Malaria Health Facility Report' },
  { id: 'ds_maternity', name: 'Maternity Monthly Report' },
  { id: 'ds_ncst', name: 'NCST Monthly Report' },
  { id: 'ds_ombudsman', name: 'Ombudsman Monthly Reporting Form' },
  { id: 'ds_otp', name: 'OTP Monthly Report' },
  { id: 'ds_pnc', name: 'Post Natal Care Clinic Facility Report' },
  { id: 'ds_qoc', name: 'Quality of Care MNH Reporting Form' },
  { id: 'ds_sfp', name: 'SFP Monthly Report' },
  { id: 'ds_sbcc', name: 'Social Behaviour Change and Communication Facility Monthly Reporting Form' },
  { id: 'ds_sti', name: 'STI Monthly Report' },
  { id: 'ds_yfhs', name: 'Youth Friendly Health Services Monthly Report' },
];

export default function DataEntry() {
  const flattenOrgUnits = (units: any[], depth = 0): any[] => {
    let flat: any[] = [];
    units.forEach(unit => {
      flat.push({ ...unit, depth });
      if (unit.children) {
        flat = flat.concat(flattenOrgUnits(unit.children, depth + 1));
      }
    });
    return flat;
  };

  const flatOrgUnits = flattenOrgUnits(MOCK_ORG_UNITS);

  const [user, setUser] = useState<User | null>(null);
  const [selectedOU, setSelectedOU] = useState<string | null>(null);
  const [selectedDataSet, setSelectedDataSet] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2026-04');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'COMPLETE' | 'INCOMPLETE'>('INCOMPLETE');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch report data when selection changes
  useEffect(() => {
    if (user && selectedOU && selectedDataSet && selectedPeriod) {
      loadReport();
    } else {
      setFormValues({});
    }
  }, [user, selectedOU, selectedDataSet, selectedPeriod]);

  const loadReport = async () => {
    if (!selectedOU) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportService.getReport(selectedOU, selectedPeriod, selectedDataSet);
      if (data) {
        setFormValues(data.values || {});
        setStatus(data.status || 'INCOMPLETE');
      } else {
        setFormValues({});
        setStatus('INCOMPLETE');
      }
    } catch (err) {
      console.error("Failed to load report", err);
      // We don't necessarily want to block entry if loading fails
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
    setIsSaved(false);
  };

  const handleSave = async (newStatus?: 'COMPLETE' | 'INCOMPLETE') => {
    if (!user) {
      handleLogin();
      return;
    }
    if (!selectedOU) return;

    const finalStatus = newStatus || status;
    setIsSaving(true);
    setError(null);
    
    const dataSetName = DATA_SETS.find(ds => ds.id === selectedDataSet)?.name || '';
    const orgUnitName = flatOrgUnits.find(ou => ou.id === selectedOU)?.name || '';

    const report: ReportData = {
      orgUnitId: selectedOU,
      orgUnitName,
      period: selectedPeriod,
      dataSetId: selectedDataSet,
      dataSetName,
      values: formValues,
      status: finalStatus
    };

    try {
      await reportService.saveReport(report);
      setStatus(finalStatus);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setError("Failed to save report. Please check your connection.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const currentElements = selectedDataSet === 'ds_anc' 
    ? (ANC_DATA_ELEMENTS as ANCDataElement[]) 
    : selectedDataSet === 'ds_cbmnc'
      ? CBMNC_DATA_ELEMENTS
      : MOCK_DATA_ELEMENTS;

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="p-6 bg-white border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Database className="text-blue-600" />
          Aggregate Data Entry
        </h2>
        <p className="text-sm text-slate-500 mt-1">Efficiently capture routine health data for standard datasets.</p>
      </header>

      <div className="p-6 flex flex-col gap-6 overflow-y-auto">
        {/* Selection Bar */}
        <div className="bg-[#d5e8d4] p-4 border border-[#82b366] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-slate-700 w-32 shrink-0">Organisation Unit</label>
                <select 
                  className="flex-1 bg-white border border-slate-300 px-1 py-1 text-sm outline-none cursor-pointer"
                  onChange={(e) => setSelectedOU(e.target.value)}
                  value={selectedOU || ''}
                >
                  <option value="">Select an Org Unit...</option>
                  {flatOrgUnits.map(ou => (
                    <option key={ou.id} value={ou.id}>
                      {'\u00A0'.repeat(ou.depth * 4)}{ou.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-slate-700 w-32 shrink-0">Data Set</label>
                <select 
                  className="flex-1 bg-white border border-slate-300 px-1 py-1 text-sm outline-none cursor-pointer"
                  onChange={(e) => setSelectedDataSet(e.target.value)}
                  value={selectedDataSet}
                >
                  <option value="">Select a Data Set...</option>
                  {DATA_SETS.map(ds => (
                    <option key={ds.id} value={ds.id}>{ds.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-slate-700 w-32 shrink-0">Period</label>
                <div className="flex-1 flex gap-1">
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 px-1 py-1 text-sm outline-none"
                  >
                    <option value="2026-04">April 2026</option>
                    <option value="2026-03">March 2026</option>
                    <option value="2026-02">February 2026</option>
                    <option value="2026-01">January 2026</option>
                  </select>
                  <button className="px-4 py-1 bg-[#efefef] border border-slate-300 text-[11px] font-medium shadow-sm hover:bg-slate-200 active:bg-slate-300 transition-colors">Prev year</button>
                  <button className="px-4 py-1 bg-[#efefef] border border-slate-300 text-[11px] font-medium shadow-sm hover:bg-slate-200 active:bg-slate-300 transition-colors">Next year</button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end items-end gap-2 pr-4">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <MapPin size={10} /> {selectedOU ? flatOrgUnits.find(ou => ou.id === selectedOU)?.name : 'No selected unit'}
              </span>
            </div>
          </div>
        </div>

        {/* Data Entry Form */}
        {!user ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
               <LogIn size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Sign in Required</h3>
            <p className="text-sm text-slate-500 max-w-xs text-center leading-relaxed mb-6">
              Please sign in with your Google account to access and submit health reports.
            </p>
            <button 
              onClick={handleLogin}
              className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign in with Google
            </button>
          </div>
        ) : selectedOU && selectedDataSet ? (
          <div className="flex flex-col gap-8 pb-12">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-2 text-emerald-700 text-sm animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 size={16} />
                Data saved successfully to synchronization queue
              </div>
            )}

            <div className={`flex flex-col gap-8 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Form Content Rendering */}
              {selectedDataSet === 'ds_anc' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  {[1, 2, 3].map((colNum) => (
                    <div key={colNum} className="space-y-4">
                      {(Object.entries(
                        (currentElements as ANCDataElement[]).filter(de => de.column === colNum).reduce((acc: Record<string, any[]>, de) => {
                          const section = de.section || 'General';
                          if (!acc[section]) acc[section] = [];
                          acc[section].push(de);
                          return acc;
                        }, {})
                      ) as [string, any[]][]).map(([section, elements]) => (
                        <div key={section} className="border border-slate-300 rounded-sm">
                          <div className="bg-slate-300 px-3 py-1.5 border-b border-slate-300">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase">
                              {section.endsWith('_cont') ? '' : section}
                            </h4>
                          </div>
                          <div className="divide-y divide-slate-200">
                            {elements.map((de) => (
                              <div key={de.id} className="flex p-px bg-white">
                                <div className="flex-1 px-3 py-1.5 text-[11px] font-medium text-slate-700 bg-white">
                                  {de.name}
                                </div>
                                <div className="w-24 border-l border-slate-300">
                                  <input 
                                    type="number"
                                    value={formValues[de.id] || ''}
                                    onChange={(e) => handleInputChange(de.id, e.target.value)}
                                    className={`w-full h-full px-2 py-1 text-sm text-center outline-none focus:bg-blue-50 transition-colors ${
                                      de.name.toLowerCase().includes('total') || de.name.toLowerCase().includes('tot.') || de.name.toLowerCase().includes('out of')
                                        ? 'bg-slate-200 font-bold' 
                                        : 'bg-white'
                                    }`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : selectedDataSet === 'ds_cbmnc' ? (
                <div className="max-w-4xl mx-auto w-full space-y-6">
                  <div className="bg-slate-400 px-4 py-2 text-center">
                    <h2 className="text-[11px] font-black text-white uppercase tracking-wider">
                      HEALTH FACILITY CBMNC REPORTING FORM MATERNAL AND NEWBORN
                    </h2>
                  </div>
                  
                  <div className="border border-slate-300 rounded-sm overflow-hidden">
                     <div className="divide-y divide-slate-300">
                        {currentElements.slice(0, 3).map(de => (
                          <div key={de.id} className="flex bg-white">
                            <div className="flex-1 px-4 py-3 text-xs font-bold text-slate-700">{de.name}</div>
                            <div className="w-48 border-l border-slate-300">
                               <input 
                                  type="number"
                                  value={formValues[de.id] || ''}
                                  onChange={(e) => handleInputChange(de.id, e.target.value)}
                                  className="w-full h-full px-3 py-2 text-center outline-none focus:bg-blue-50"
                               />
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="border border-slate-300 rounded-sm overflow-hidden">
                     <div className="bg-slate-200 px-4 py-2 border-b border-slate-300">
                        <h3 className="text-[10px] font-black text-slate-700 uppercase">Item Description</h3>
                     </div>
                     <div className="divide-y divide-slate-300">
                        {currentElements.slice(3).map(de => (
                          <div key={de.id} className="flex bg-white">
                            <div className="flex-1 px-4 py-3 text-xs font-medium text-slate-700">{de.name}</div>
                            <div className="w-48 border-l border-slate-300">
                               <input 
                                  type="number"
                                  value={formValues[de.id] || ''}
                                  onChange={(e) => handleInputChange(de.id, e.target.value)}
                                  className="w-full h-full px-3 py-2 text-center outline-none focus:bg-blue-50"
                               />
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              ) : selectedDataSet === 'ds_cmam' ? (
                <div className="flex flex-col gap-6">
                  <div className="text-center">
                    <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">MONTHLY REPORT STOCK SHEET</h2>
                  </div>

                  <div className="flex items-center gap-2">
                     <label className="text-[10px] font-bold text-slate-700 w-32 border border-slate-300 px-2 py-1 bg-slate-50">No of outreach clinics</label>
                     <input type="number" className="w-24 border border-slate-300 px-2 py-1 text-sm outline-none" />
                  </div>

                  <div className="overflow-x-auto border-t border-l border-slate-300">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                      <thead>
                        <tr className="bg-blue-50 text-[9px] font-black uppercase text-slate-700">
                          <th className="px-3 py-2 border-r border-b border-slate-300 w-48">Commodities</th>
                          <th className="px-3 py-2 border-r border-b border-slate-300 w-24">Packaging & unit</th>
                          {CMAM_COLUMNS.map(col => (
                            <th key={col.id} className="px-3 py-2 border-r border-b border-slate-300 text-center">
                              {col.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {CMAM_COMMODITIES.map(comm => (
                          <tr key={comm.id} className="bg-white">
                            <td className="px-3 py-2 border-r border-b border-slate-300 text-[10px] font-bold">{comm.name}</td>
                            <td className="px-3 py-2 border-r border-b border-slate-300 text-[10px] text-slate-500">{comm.unit}</td>
                            {CMAM_COLUMNS.map(col => (
                              <td key={col.id} className="border-r border-b border-slate-300 p-0">
                                 <input 
                                    type="number"
                                    className={`w-full h-full px-2 py-1 text-xs text-center outline-none focus:bg-blue-50 ${col.id === 'stock_last' ? 'bg-slate-100' : ''}`}
                                 />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col gap-4 max-w-2xl self-end">
                     <div className="flex items-center gap-2">
                        <label className="text-[10px] font-black text-slate-800 uppercase w-32">Reasons for loss</label>
                        <input type="text" className="flex-1 border border-slate-300 px-3 py-1 text-sm outline-none" />
                     </div>

                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-800 uppercase">Beneficiary Numbers</p>
                        <table className="w-full border-t border-l border-slate-300">
                          <thead>
                            <tr className="bg-blue-50 text-[9px] font-black uppercase text-slate-700">
                              <th className="px-3 py-1.5 border-r border-b border-slate-300">Beneficiary category</th>
                              <th className="px-3 py-1.5 border-r border-b border-slate-300 text-center w-24">Male</th>
                              <th className="px-3 py-1.5 border-r border-b border-slate-300 text-center w-24">Female</th>
                              <th className="px-3 py-1.5 border-r border-b border-slate-300 text-center w-24">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {CMAM_BENEFICIARY_CATEGORIES.map(cat => (
                              <tr key={cat.id}>
                                <td className="px-3 py-1.5 border-r border-b border-slate-300 text-[10px] font-bold italic text-slate-600">{cat.name}</td>
                                <td className="border-r border-b border-slate-300 p-0"><input type="number" className="w-full h-full px-2 py-1 text-xs text-center outline-none" /></td>
                                <td className="border-r border-b border-slate-300 p-0"><input type="number" className="w-full h-full px-2 py-1 text-xs text-center outline-none" /></td>
                                <td className="border-r border-b border-slate-300 p-0 bg-slate-50"><input type="number" className="w-full h-full px-2 py-1 text-xs text-center outline-none bg-transparent" /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <th className="px-6 py-3 border-b border-slate-200">Data Element</th>
                          <th className="px-6 py-3 border-b border-slate-200 w-48 text-center">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(
                          currentElements.reduce((acc, de) => {
                            const section = (de as any).section || 'General';
                            if (!acc[section]) acc[section] = [];
                            acc[section].push(de);
                            return acc;
                          }, {} as Record<string, typeof currentElements>)
                        ).map(([section, elements]) => (
                          <React.Fragment key={section}>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <td colSpan={2} className="px-6 py-2.5">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{section}</h4>
                              </td>
                            </tr>
                            {elements.map((de) => (
                              <tr key={de.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 border-b border-slate-100">
                                  <p className="text-sm font-bold text-slate-800">{de.name}</p>
                                </td>
                                <td className="px-6 py-4 border-b border-slate-100">
                                  <input 
                                    type="number"
                                    value={formValues[de.id] || ''}
                                    onChange={(e) => handleInputChange(de.id, e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm text-center outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Common Action Bar - Now below the form */}
            <div className="p-4 bg-[#d5e8d4] border border-[#82b366] flex justify-center gap-1 shadow-sm transition-transform duration-300">
              <div className="max-w-7xl w-full flex items-center gap-1">
                <button 
                  onClick={() => handleSave('COMPLETE')}
                  disabled={isSaving || status === 'COMPLETE'}
                  className={`px-8 py-1 border border-[#aaaaaa] text-sm font-medium transition-colors shadow-sm min-w-[120px] flex items-center justify-center gap-2 ${
                    status === 'COMPLETE' 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-[#efefef] hover:bg-slate-200 active:bg-slate-300 text-slate-700'
                  }`}
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                  {isSaving ? 'Saving...' : 'Complete'}
                </button>
                <button 
                  onClick={() => handleSave('INCOMPLETE')}
                  disabled={isSaving || status === 'INCOMPLETE'}
                  className={`px-8 py-1 border border-[#aaaaaa] text-sm font-medium transition-colors shadow-sm min-w-[120px] ${
                    status === 'INCOMPLETE'
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#efefef] hover:bg-slate-200 active:bg-slate-300 text-slate-700'
                  } ${status === 'COMPLETE' ? 'ring-2 ring-[#82b366] ring-offset-1' : ''}`}
                >
                  Incomplete
                </button>
                <div className="w-px h-6 bg-[#82b366] mx-4 self-center"></div>
                <button className="px-8 py-1 bg-[#efefef] border border-[#aaaaaa] text-sm font-medium hover:bg-slate-200 active:bg-slate-300 transition-colors shadow-sm min-w-[120px]">
                  Run validation
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mb-4">
               <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Selection Required</h3>
            <p className="text-sm text-slate-500 max-w-xs text-center leading-relaxed">
              Please select an Organisation Unit and a Data Set from the selection bar above to start entering data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
