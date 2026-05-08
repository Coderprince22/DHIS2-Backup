/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: 'Configuration' | 'Data Management' | 'Analysis' | 'Administration';
  content: string;
  steps?: string[];
  tags?: string[];
}

export interface OrgUnit {
  id: string;
  name: string;
  level: number;
  children?: OrgUnit[];
}

export interface DataElement {
  id: string;
  name: string;
  valueType: string;
  aggregationType: string;
  description: string;
}
