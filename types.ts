
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN_PROVINSI = 'ADMIN_PROVINSI',
  ADMIN_KABUPATEN = 'ADMIN_KABUPATEN',
  ADMIN_KECAMATAN = 'ADMIN_KECAMATAN',
  ADMIN_DESA = 'ADMIN_DESA',
  
  VERIFIKATOR_PROVINSI = 'VERIFIKATOR_PROVINSI',
  VERIFIKATOR_KABUPATEN = 'VERIFIKATOR_KABUPATEN',
  VERIFIKATOR_KECAMATAN = 'VERIFIKATOR_KECAMATAN',
  
  VERIFIKATOR = 'VERIFIKATOR', 
  HAKIM = 'HAKIM',
  PANITERA = 'PANITERA',
  PESERTA = 'PESERTA'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  region?: string;
  avatar?: string;
  nik?: string;
  whatsapp?: string;
}

export enum Gender {
  PUTRA = 'Laki-laki',
  PUTRI = 'Perempuan'
}

export type ParticipantStatus = 
  | 'PENDING_KECAMATAN' 
  | 'PENDING_KABUPATEN' 
  | 'PENDING_PROVINSI' 
  | 'VERIFIED' 
  | 'REJECTED' 
  | 'WINNER_ADVANCE';

export interface VerificationLog {
  id: string;
  level: string;
  verifier: string;
  timestamp: string;
  action: 'APPROVED' | 'REJECTED' | 'ACCESS_OPENED' | 'ACCESS_CLOSED';
  note?: string;
}

export interface Branch {
  id: string;
  name: string;
  maxAge: {
    years: number;
    months: number;
    days: number;
  };
  scoringFields: string[];
  tieBreakerOrder: string[]; 
}

export interface Participant {
  id: string;
  nik: string;
  fullName: string;
  gender: Gender;
  birthPlace: string;
  birthDate: string;
  address: string;
  domicileSince: string;
  district: string;
  subDistrict: string;
  village: string;
  branchId: string;
  status: ParticipantStatus;
  isEditAccessOpen?: boolean;
  documents: {
    mandate: string;
    ktp: string;
    kk: string;
    ijazah: string;
    photo: string;
  };
  ageAtEvent: string;
  registrationYear: number;
  scores?: Record<string, number>;
  verificationLogs?: VerificationLog[];
}

export interface Judge {
  id: string;
  nik: string;
  fullName: string;
  gender: Gender;
  specialization: string[];
  district: string;
  address: string;
  whatsapp: string;
  avatar: string;
  documents: {
    certificate: string;
    sk: string;
    ktp: string;
  };
  isVerified: boolean;
  assignedEventId?: string;
}

export interface EventLomba {
  id: string;
  name: string;
  level: 'KECAMATAN' | 'KABUPATEN' | 'PROVINSI';
  year: number;
  startDate: string;
  endDate: string;
  referenceDateForAge: string; 
  status: 'OPEN' | 'ONGOING' | 'COMPLETED';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  status: 'Urgent' | 'Penting' | 'Info';
  targetRegion: string;
  authorName: string;
  isActive: boolean;
}

export interface MenuDefinition {
  id: string;
  label: string;
  icon: string;
}
