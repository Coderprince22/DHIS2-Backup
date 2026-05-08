/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topic, OrgUnit, DataElement } from './types';

export const SYSTEM_PROMPT = `You are a DHIS2 Health Information System Assistant. 
Your goal is to support data management, reporting, analysis, and system administration within DHIS2 environments.

Core Responsibilities:
- Assist with DHIS2 navigation, setup, configuration, and troubleshooting.
- Support data entry, validation, cleaning, aggregation, and synchronization.
- Help generate dashboards, charts, indicators, pivot tables, line lists, and reports.
- Guide users in configuring Data Elements, Data Sets, Indicators, Programs, Tracker, etc.
- Support interoperability concepts (APIs, CSV import/export).
- Explain DHIS2 concepts in simple terms.
- Provide step-by-step instructions.

Behavior Rules:
- Be concise, clear, and practical.
- Use accurate DHIS2 terminology (e.g., "Organisation Unit", "Data Element", "Category Combo").
- Use numbered instructions for technical steps.
- Identifying possible causes and solutions during troubleshooting.
- Provide examples using public health scenarios (HIV, TB, Malaria, Immunization, etc.).`;

export const TOPICS: Topic[] = [
  {
    id: 'hiv-tracker',
    title: 'HIV Tracker Configuration',
    description: 'Guidelines for setting up an HIV treatment and care tracker program.',
    category: 'Configuration',
    content: 'Configuring an HIV tracker involves defining program stages for enrollment, clinical visits, and ART initiation.',
    steps: [
      'Create the HIV Program with a custom program stage for "Daily Visits".',
      'Add tracked entity attributes like Patient ID, Date of Birth, and Gender.',
      'Define data elements for Viral Load, CD4 Count, and Regimen.',
      'Configure program indicators for ART retention and viral suppression.'
    ],
    tags: ['HIV', 'Tracker', 'Configuration']
  },
  {
    id: 'malaria-aggregate',
    title: 'Malaria Weekly Reporting',
    description: 'Setting up aggregate data sets for malaria surveillance.',
    category: 'Data Management',
    content: 'Malaria reporting often uses aggregate data sets collected weekly at the facility level.',
    steps: [
      'Define data elements for Malaria RDT positive, Under 5, and Over 5 categories.',
      'Create a "Malaria Surveillance" data set.',
      'Assign the data set to the relevant Organisation Units.',
      'Set the reporting frequency to Weekly.'
    ],
    tags: ['Malaria', 'Aggregate', 'Surveillance']
  },
  {
    id: 'analytics-dashboards',
    title: 'Building Interactive Dashboards',
    description: 'Best practices for creating data visualizations in DHIS2.',
    category: 'Analysis',
    content: 'Dashboards provide a centralized view of health indicators and trends.',
    steps: [
      'Select Data Visualizer to create charts or Pivot Table for tables.',
      'Choose relevant indicators and periods (e.g., Last 12 months).',
      'Filter by Organisation Unit levels (e.g., District level).',
      'Save the visualization and add it to a new or existing Dashboard.'
    ],
    tags: ['Analytics', 'Dashboards', 'Visualization']
  },
  {
    id: 'user-management',
    title: 'Managing User Access',
    description: 'Defining roles and permissions for health workers and admins.',
    category: 'Administration',
    content: 'Proper user management ensures data security and role-specific access.',
    steps: [
      'Create User Roles with specific authorities (e.g., "Data Entry", "Dashboard View").',
      'Define User Groups for easier management of multiple users.',
      'Assign Organisation Units to users to restrict their data visibility.',
      'Set up data capture and data output Org Units separately if needed.'
    ],
    tags: ['Administration', 'Security', 'Users']
  }
];

export const MOCK_ORG_UNITS: OrgUnit[] = [
  { id: 'ou_bangwe', name: 'Bangwe Health Centre', level: 1 },
  { id: 'ou_chabvala', name: 'Chabvala Health Centre', level: 1 },
  { id: 'ou_chikowa', name: 'Chikowa Health Centre (Blantyre)', level: 1 },
  { id: 'ou_chilaweni', name: 'Chilaweni Health Centre', level: 1 },
  { id: 'ou_chileka', name: 'Chileka Health Centre', level: 1 },
  { id: 'ou_chileka_sda', name: 'Chileka Sda Health Centre', level: 1 },
  { id: 'ou_chilomoni', name: 'Chilomoni Health Centre', level: 1 },
  { id: 'ou_chimembe', name: 'Chimembe Health Centre', level: 1 },
  { id: 'ou_chipande', name: 'Chipande Health Centre', level: 1 },
  { id: 'ou_chirimba', name: 'Chirimba Health Centre', level: 1 },
  { id: 'ou_dziwe', name: 'Dziwe Health Centre (Blantyre)', level: 1 },
  { id: 'ou_gateway', name: 'Gate way Clinic', level: 1 },
  { id: 'ou_kachere', name: 'Kachere Clinic', level: 1 },
  { id: 'ou_kadidi', name: 'Kadidi Health Centre', level: 1 },
  { id: 'ou_khungulu', name: 'Khungulu Health Centre', level: 1 },
  { id: 'ou_lighthouse', name: 'Lighthouse Foundation', level: 1 },
  { id: 'ou_limbe', name: 'Limbe Health Centre', level: 1 },
  { id: 'ou_lirangwe', name: 'Lirangwe Health Centre', level: 1 },
  { id: 'ou_lundu', name: 'Lundu Health Centre', level: 1 },
  { id: 'ou_madziabango', name: 'Madziabango Health Centre', level: 1 },
  { id: 'ou_makata', name: 'Makata Health Centre', level: 1 },
  { id: 'ou_makhetha', name: 'Makhetha Dispensary', level: 1 },
  { id: 'ou_malabada', name: 'Malabada Health Centre', level: 1 },
  { id: 'ou_mbayani', name: 'Mbayani Health Center', level: 1 },
  { id: 'ou_mdeka', name: 'Mdeka Health Centre', level: 1 },
  { id: 'ou_mitsidi', name: 'Mitsidi Health Centre (Lumbira)', level: 1 },
  { id: 'ou_mlambe', name: 'Mlambe Hospital', level: 1 },
  { id: 'ou_mpemba', name: 'Mpemba Health Centre', level: 1 },
  { id: 'ou_mpingo', name: 'Mpingo Health Centre', level: 1 },
  { id: 'ou_namikoko', name: 'Namikoko Health Centre', level: 1 },
  { id: 'ou_nancholi', name: 'Nancholi Health Centre', level: 1 },
  { id: 'ou_ndirande', name: 'Ndirande Urban Health Centre', level: 1 },
  { id: 'ou_ntonda', name: 'Ntonda Dispensary', level: 1 },
  { id: 'ou_pensulo', name: 'Pensulo Health Centre', level: 1 },
  { id: 'ou_soche', name: 'Soche Maternity', level: 1 },
  { id: 'ou_south_lunzu', name: 'South Lunzu Health Centre', level: 1 },
  { id: 'ou_st_vincent', name: 'St Vincent Health Centre (Chadzunda)', level: 1 },
  { id: 'ou_zingwangwa', name: 'Zingwangwa Urban Health Centre', level: 1 },
];

export const MOCK_DATA_ELEMENTS: DataElement[] = [];

export const REPORT_TYPES = [
  { id: 'standard_report', name: 'Standard Report', description: 'Aggregated view of performance indicators.' },
  { id: 'dataset_report', name: 'Data Set Report', description: 'Comprehensive view of multiple datasets across facilities.' },
  { id: 'reporting_rate', name: 'Reporting Rate Summary', description: 'Completeness and timeliness of data submission.' },
];

export interface ANCDataElement extends DataElement {
  section: string;
  column: 1 | 2 | 3;
}

export const ANC_DATA_ELEMENTS: ANCDataElement[] = [
  // COLUMN 1
  { id: 'anc_new_reg', name: 'New women registered', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Reporting Month (First Visits)', column: 1 },
  { id: 'anc_preg_test_yes', name: 'Yes', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Pregnancy test done in 1st trimester', column: 1 },
  { id: 'anc_preg_test_no', name: 'No', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Pregnancy test done in 1st trimester', column: 1 },
  { id: 'anc_week_0_12', name: 'Week 0-12', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Week of first ANC visit 1', column: 1 },
  { id: 'anc_week_13_plus', name: 'Week 13+', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Week of first ANC visit 1', column: 1 },
  { id: 'anc_hiv_prev_neg', name: 'Prev. negative', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_hiv_prev_pos', name: 'Prev. positive', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_hiv_new_neg', name: 'New negative', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_hiv_new_pos', name: 'New positive', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_hiv_not_done', name: 'Not done', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_hiv_total', name: 'Total HIV+ (24+26)', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status first visit 1', column: 1 },
  { id: 'anc_art_not_on', name: 'Not on ART', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status first visit', column: 1 },
  { id: 'anc_art_before', name: 'On ART before ANC', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status first visit', column: 1 },
  { id: 'anc_art_0_27', name: 'Start ART 0-27 weeks', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status first visit', column: 1 },
  { id: 'anc_art_28_plus', name: 'Start ART 28+ weeks', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status first visit', column: 1 },
  { id: 'anc_visit_1', name: 'Tot. with 1 visit', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },
  { id: 'anc_visit_2', name: 'Tot. with 2 visits', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },
  { id: 'anc_visit_3', name: 'Tot. with 3 visits', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },
  { id: 'anc_visit_4', name: 'Tot. with 4 visits', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },
  { id: 'anc_visit_5_plus', name: 'Tot. with 5+ visits', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },
  { id: 'anc_visit_total', name: 'Tot. women in cohort', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Visits per woman 1', column: 1 },

  // COLUMN 2
  { id: 'anc_eclamp_no', name: 'No', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: '(Pre-) Eclampsia 1', column: 2 },
  { id: 'anc_eclamp_yes', name: 'Yes', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: '(Pre-) Eclampsia 1', column: 2 },
  { id: 'anc_ttv_less_2', name: '< 2 doses', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'TTV doses 1', column: 2 },
  { id: 'anc_ttv_2_plus', name: '2+ doses', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'TTV doses 1', column: 2 },
  { id: 'anc_sp_0', name: '0 dose', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'SP doses 1', column: 2 },
  { id: 'anc_sp_1', name: '1 dose', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'SP doses 1', column: 2 },
  { id: 'anc_sp_2', name: '2 doses', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'SP doses 1', column: 2 },
  { id: 'anc_sp_3_plus', name: '3+ doses', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'SP doses 1', column: 2 },
  { id: 'anc_fefo_less_120', name: '< 120 tabs', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'FeFo tablets 1', column: 2 },
  { id: 'anc_fefo_120_plus', name: '120+ tabs', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'FeFo tablets 1', column: 2 },
  { id: 'anc_alben_none', name: 'None', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Albendazole doses 1', column: 2 },
  { id: 'anc_alben_1', name: '1 dose', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Albendazole doses 1', column: 2 },
  { id: 'anc_itn_none', name: 'None', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ITN (bed nets) given 1', column: 2 },
  { id: 'anc_itn_received', name: 'Received ITN', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ITN (bed nets) given 1', column: 2 },
  { id: 'anc_hb_less_7', name: '< 7', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Hb (g/dl) 1', column: 2 },
  { id: 'anc_hb_7_plus', name: '>= 7', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Hb (g/dl) 1', column: 2 },
  { id: 'anc_hb_nd', name: 'ND', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Hb (g/dl) 1', column: 2 },
  { id: 'anc_syph_neg', name: 'Negative', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Syphilis status 1', column: 2 },
  { id: 'anc_syph_pos', name: 'Positive', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Syphilis status 1', column: 2 },
  { id: 'anc_syph_nd', name: 'Not done', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'Syphilis status 1', column: 2 },
  { id: 'anc_hiv_final_prev_neg', name: 'Prev. negative', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1', column: 2 },
  { id: 'anc_hiv_final_prev_pos', name: 'Prev. positive', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1', column: 2 },
  { id: 'anc_hiv_final_new_neg', name: 'New negative', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1', column: 2 },

  // COLUMN 3
  { id: 'anc_hiv_final_new_pos', name: 'New positive', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1_cont', column: 3 },
  { id: 'anc_hiv_final_not_done', name: 'Not done', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1_cont', column: 3 },
  { id: 'anc_hiv_final_total_hiv', name: 'Total HIV+ (23+25)', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'HIV Status final 1_cont', column: 3 },
  { id: 'anc_cpt_not_on', name: 'Not on CPT', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'On CPT', column: 3 },
  { id: 'anc_cpt_on', name: 'On CPT', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'On CPT', column: 3 },
  { id: 'anc_nvp_no', name: 'No', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'NVP syrup given', column: 3 },
  { id: 'anc_nvp_received', name: 'Received NVP', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'NVP syrup given', column: 3 },
  { id: 'anc_art_final_not_on', name: 'Not on ART', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status final', column: 3 },
  { id: 'anc_art_final_before', name: 'On ART before ANC', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status final', column: 3 },
  { id: 'anc_art_final_0_27', name: 'Start ART 0-27 weeks', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status final', column: 3 },
  { id: 'anc_art_final_28_plus', name: 'Start ART 28+ weeks', valueType: 'NUMBER', aggregationType: 'SUM', description: '', section: 'ART status final', column: 3 },
];

export const CMAM_BENEFICIARY_CATEGORIES = [
  { id: 'num_children', name: 'Number of Children' },
  { id: 'num_caretakers', name: 'Number of Care Takers of Children in Therapeutic Feeding' },
  { id: 'num_preg_lact', name: 'Number of Pregnant and Lactating women' },
  { id: 'other', name: 'Other' },
];

export const MALARIA_OPD_ROWS = [
  { id: 'm_opd_a', name: 'A: Confirmed (Dx) Malaria Cases', hasAge: true },
  { id: 'm_opd_b', name: 'B: Presumed (Dx) Malaria Cases (Clinically Diagnosed)', hasAge: true },
  { id: 'm_opd_c', name: 'C: Confirmed malaria in pregnant woman (x)', hasAge: false, age1Disabled: true },
  { id: 'm_opd_d', name: 'D: Presumed (clinically diagnosed) malaria in pregnant woman (x)', hasAge: false, age1Disabled: true },
  { id: 'm_opd_total_cases', name: 'Total OPD Malaria Cases (A+B+C+D)', hasAge: true, isTotal: true, formula: ['m_opd_a', 'm_opd_b', 'm_opd_c', 'm_opd_d'] },
  { id: 'm_opd_e', name: 'E: Total OPD Attendance: All causes (including malaria cases)', hasAge: true },
  { id: 'm_opd_f', name: 'F: Confirmed malaria treatment failure (f)', hasAge: true },
  { id: 'header_treatment', name: 'Treatment in OPD', isHeader: true },
  { id: 'm_opd_h', name: 'H: Confirmed cases receiving firstline anti malarial medication (LA)', hasAge: true },
  { id: 'm_opd_i', name: 'I: Presumed malaria cases receiving firstline anti malarial medication (LA)', hasAge: true },
  { id: 'm_opd_j', name: 'J: Confirmed cases receiving secondline anti malarial medication (ASAQ)', hasAge: true },
  { id: 'm_opd_k', name: 'K: Presumed malaria cases receiving secondline anti malarial medication (ASAQ)', hasAge: true },
  { id: 'header_lab', name: 'Lab/RDT in OPD', isHeader: true },
  { id: 'm_opd_l', name: 'L: Suspected malaria cases tested (mRDT)', hasAge: true },
  { id: 'm_opd_m', name: 'M: Positive malaria cases (mRDT)', hasAge: true },
  { id: 'm_opd_n', name: 'N: Suspected malaria cases tested (microscopy)', hasAge: true },
  { id: 'm_opd_o', name: 'O: Positive malaria cases (microscopy)', hasAge: true },
  { id: 'm_opd_total_suspected', name: 'Total suspected malaria cases (L+N+H+I)', hasAge: true, isTotal: true, formula: ['m_opd_l', 'm_opd_n', 'm_opd_h', 'm_opd_i'] },
];

export const MALARIA_IPD_ROWS = [
  { id: 'm_ipd_q', name: 'Q: Total suspected malaria cases tested (microscopy)', hasAge: true },
  { id: 'm_ipd_r', name: 'R: Confirmed malaria cases (microscopy)', hasAge: true },
  { id: 'm_ipd_s', name: 'S: Presumed malaria cases (clinically diagnosed without test)', hasAge: true },
  { id: 'm_ipd_t', name: 'T: Confirmed malaria in pregnant woman (x)', hasAge: false, age1Disabled: true },
  { id: 'm_ipd_u', name: 'U: Presumed (clinically diagnosed) malaria in pregnant woman (x)', hasAge: false, age1Disabled: true },
  { id: 'm_ipd_v', name: 'V: Total suspected malaria cases (Q+S+U)', hasAge: true, isTotal: true, formula: ['m_ipd_q', 'm_ipd_s', 'm_ipd_u'] },
  { id: 'm_ipd_w', name: 'W: Total malaria cases (R+S+T+U)', hasAge: true, isTotal: true, formula: ['m_ipd_r', 'm_ipd_s', 'm_ipd_t', 'm_ipd_u'] },
  { id: 'm_ipd_x', name: 'X: Confirmed malaria treatment failure (f)', hasAge: true },
  { id: 'm_ipd_y', name: 'Y: Total inpatient malaria deaths', hasAge: true },
  { id: 'm_ipd_z', name: 'Z: Total inpatient all causes', hasAge: true },
  { id: 'm_ipd_za', name: 'Za: Total inpatient Deaths: all causes', hasAge: true },
];

export const MALARIA_COMMODITIES = [
  { id: 'la_1x6', name: 'LA 1X6', unit: 'tabs' },
  { id: 'la_2x6', name: 'LA 2X6', unit: 'tabs' },
  { id: 'la_3x6', name: 'LA 3X6', unit: 'tabs' },
  { id: 'la_4x6', name: 'LA 4X6', unit: 'tabs' },
  { id: 'itn_preg', name: 'ITN Distributed to Pregnant women', unit: 'net' },
  { id: 'itn_newborn', name: 'ITN Distributed to Newborn babies', unit: 'net' },
  { id: 'sp', name: 'SP', unit: 'tabs' },
  { id: 'rdts', name: 'RDTs', unit: 'test' },
  { id: 'asaq_25', name: 'ASAQ 25mg/67.5mg (3 tablets)', unit: 'tabs' },
  { id: 'asaq_50', name: 'ASAQ 50mg/125mg (3 tablets)', unit: 'tabs' },
  { id: 'asaq_100_3', name: 'ASAQ 100mg/270mg (3 tablets)', unit: 'tabs' },
  { id: 'asaq_100_6', name: 'ASAQ 100mg/270mg (6 tablets)', unit: 'tabs' },
  { id: 'as_30_3', name: 'AS 30mg 150mg tablet (3 tablets)', unit: 'tabs' },
  { id: 'as_30_6', name: 'AS 30mg 150mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_30_3_alt', name: 'AS 30mg 2x30mg tablet (3 tablets)', unit: 'tabs' },
  { id: 'as_30_6_alt', name: 'AS 30mg 2x30mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_60_3', name: 'AS 60mg 120mg tablet (3 tablets)', unit: 'tabs' },
  { id: 'as_60_6', name: 'AS 60mg 120mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_40_6', name: 'AS 40mg 320mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_80_6', name: 'AS 80mg 160mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_20_6', name: 'AS 20mg 80mg tablet (6 tablets)', unit: 'tabs' },
  { id: 'as_80_480_6', name: 'AS 80mg 5x80mg + 40mg 320mg (6 + 3 tablets)', unit: 'tabs' },
];

export const CBMNC_DATA_ELEMENTS: DataElement[] = [
  { id: 'cbmnc_hsa_rep', name: "Number of HSA's who reported", valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_hsa_prac', name: "Number of HSA's practicing CBMNC", valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_pop', name: 'Total Catchment Population', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_v1_preg', name: '1. Number of first home visits to pregnant women conducted this month', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_v2_preg', name: '2. Number of second home visits to pregnant women conducted this month', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_danger_preg', name: '3. Number of pregnant women with one or more danger signs referred to health facility', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_v1_post', name: '4. Number of first home visits to mother/newborn within first 3 days of delivery', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_v_week', name: '5. Number of home visits to mothers/newborns within first week of delivery', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_deliv', name: '6. Number of home deliveries', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_danger_mom', name: '7. Number of women with 1 or more danger signs referred to health facility after delivery', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_danger_baby', name: '8. Number of newborns with one or more danger signs referred to health facility', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_preterm', name: '9. Number of preterm/low birth weight babies followed up', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_death_neo', name: '10. Number of community neonatal deaths', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
  { id: 'cbmnc_death_mat', name: '11. Number of community maternal deaths', valueType: 'NUMBER', aggregationType: 'SUM', description: '' },
];

export const CMAM_COMMODITIES = [
  { id: 'maize', name: 'Maize meal', unit: 'Kg' },
  { id: 'csb_plus', name: 'CSB+/Likuni phala', unit: 'Kg' },
  { id: 'csb_plus_plus', name: 'CSB++/Supercereal', unit: 'Kg' },
  { id: 'oil', name: 'Oil', unit: 'L(Litres)' },
  { id: 'pulses', name: 'Pulses', unit: 'Kg' },
  { id: 'dsm', name: 'DSM', unit: 'Kg' },
  { id: 'sugar', name: 'Sugar', unit: 'Kg' },
  { id: 'f75', name: 'F75', unit: 'Sachets' },
  { id: 'f100', name: 'F100', unit: 'Sachets' },
  { id: 'rutf', name: 'RUTF/Plumpy nut', unit: 'Sachets' },
  { id: 'rice', name: 'Rice', unit: 'Kg' },
  { id: 'resomal', name: 'Resomal', unit: 'Sachets' },
];

export const CMAM_COLUMNS = [
  { id: 'stock_first', name: 'Stock on the first day of the month' },
  { id: 'delivered', name: 'Deliveries received in the month' },
  { id: 'distributed', name: 'Quantity distributed to beneficiaries' },
  { id: 'cooking', name: 'Quantity for cooking demonstration' },
  { id: 'lost', name: 'Quantity lost' },
  { id: 'stock_last', name: 'Stock on the last day of month' },
  { id: 'request', name: 'Request for the following month' },
];
