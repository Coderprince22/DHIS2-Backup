import { 
  setDoc, 
  doc, 
  getDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface ReportData {
  orgUnitId: string;
  orgUnitName: string;
  period: string;
  dataSetId: string;
  dataSetName: string;
  values: Record<string, any>;
  status: 'COMPLETE' | 'INCOMPLETE';
}

export const reportService = {
  async saveReport(report: ReportData) {
    const reportId = `${report.orgUnitId}_${report.period}_${report.dataSetId}`;
    const path = `reports/${reportId}`;
    
    try {
      await setDoc(doc(db, 'reports', reportId), {
        ...report,
        completedBy: auth.currentUser?.email || 'anonymous',
        completedAt: report.status === 'COMPLETE' ? serverTimestamp() : null,
        lastUpdated: serverTimestamp(),
      });
      return reportId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async getReport(orgUnitId: string, period: string, dataSetId: string) {
    const reportId = `${orgUnitId}_${period}_${dataSetId}`;
    const path = `reports/${reportId}`;
    
    try {
      const docSnap = await getDoc(doc(db, 'reports', reportId));
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  }
};
