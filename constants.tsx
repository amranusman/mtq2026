
import { Branch, UserRole, MenuDefinition, User } from './types';

export const SULSEL_REGENCY_LIST = [
  "Kabupaten Bantaeng", "Kabupaten Barru", "Kabupaten Bone", "Kabupaten Bulukumba", 
  "Kabupaten Enrekang", "Kabupaten Gowa", "Kabupaten Jeneponto", "Kabupaten Kepulauan Selayar", 
  "Kabupaten Luwu", "Kabupaten Luwu Timur", "Kabupaten Luwu Utara", "Kabupaten Maros", 
  "Kabupaten Pangkajene dan Kepulauan", "Kabupaten Pinrang", "Kabupaten Sidenreng Rappang", 
  "Kabupaten Sinjai", "Kabupaten Soppeng", "Kabupaten Takalar", "Kabupaten Tana Toraja", 
  "Kabupaten Toraja Utara", "Kabupaten Wajo", "Kota Makassar", "Kota Palopo", "Kota Parepare"
];

export const INITIAL_ADMIN_USERS: User[] = SULSEL_REGENCY_LIST.map((regency, index) => ({
  id: `adm-reg-${index}`,
  username: regency.toLowerCase().replace(/kabupaten |kota | /g, ""),
  fullName: `Admin ${regency}`,
  role: UserRole.ADMIN_KABUPATEN,
  region: regency,
  avatar: `https://ui-avatars.com/api/?name=Admin+${regency.replace(/ /g, "+")}&background=random`,
  whatsapp: "628"
}));

export const BRANCHES: Branch[] = [
  // --- SENI BACA AL-QUR'AN ---
  { 
    id: 'tartil', 
    name: 'Seni Baca Al-Qur\'an - Golongan Tartil', 
    maxAge: { years: 12, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },
  { 
    id: 'tilawah_anak', 
    name: 'Seni Baca Al-Qur\'an - Tilawah Anak-anak', 
    maxAge: { years: 14, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },
  { 
    id: 'tilawah_remaja', 
    name: 'Seni Baca Al-Qur\'an - Tilawah Remaja', 
    maxAge: { years: 24, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },
  { 
    id: 'tilawah_dewasa', 
    name: 'Seni Baca Al-Qur\'an - Tilawah Dewasa', 
    maxAge: { years: 40, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },
  { 
    id: 'qiraat_murottal_remaja', 
    name: 'Seni Baca Al-Qur\'an - Qira\'at Murattal Remaja', 
    maxAge: { years: 24, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },
  { 
    id: 'qiraat_murottal_dewasa', 
    name: 'Seni Baca Al-Qur\'an - Qira\'at Murattal Dewasa', 
    maxAge: { years: 40, months: 11, days: 29 }, 
    scoringFields: ['Tajwid', 'Fashahah', 'Lagu', 'Suara'], 
    tieBreakerOrder: ['Tajwid', 'Fashahah', 'Lagu'] 
  },

  // --- HAFALAN AL-QUR'AN (HIFZH) ---
  { 
    id: 'hifzh_1_juz', 
    name: 'Hafalan Al-Qur\'an - 1 Juz dan Tilawah', 
    maxAge: { years: 15, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid', 'Fashahah', 'Tilawah (Lagu/Suara)'], 
    tieBreakerOrder: ['Tahfizh', 'Tajwid', 'Fashahah'] 
  },
  { 
    id: 'hifzh_5_juz', 
    name: 'Hafalan Al-Qur\'an - 5 Juz dan Tilawah', 
    maxAge: { years: 20, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid', 'Fashahah', 'Tilawah (Lagu/Suara)'], 
    tieBreakerOrder: ['Tahfizh', 'Tajwid', 'Fashahah'] 
  },
  { 
    id: 'hifzh_10_juz', 
    name: 'Hafalan Al-Qur\'an - 10 Juz', 
    maxAge: { years: 22, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid', 'Fashahah'], 
    tieBreakerOrder: ['Tahfizh', 'Tajwid', 'Fashahah'] 
  },
  { 
    id: 'hifzh_20_juz', 
    name: 'Hafalan Al-Qur\'an - 20 Juz', 
    maxAge: { years: 22, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid', 'Fashahah'], 
    tieBreakerOrder: ['Tahfizh', 'Tajwid', 'Fashahah'] 
  },
  { 
    id: 'hifzh_30_juz', 
    name: 'Hafalan Al-Qur\'an - 30 Juz', 
    maxAge: { years: 22, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid', 'Fashahah'], 
    tieBreakerOrder: ['Tahfizh', 'Tajwid', 'Fashahah'] 
  },

  // --- TAFSIR AL-QUR'AN ---
  { 
    id: 'tafsir_arab', 
    name: 'Tafsir Al-Qur\'an - Golongan Bahasa Arab', 
    maxAge: { years: 22, months: 11, days: 29 }, 
    scoringFields: ['Tahfizh', 'Tajwid/Fashahah', 'Tafsir (Materi)', 'Bahasa'], 
    tieBreakerOrder: ['Tafsir (Materi)', 'Tahfizh', 'Tajwid/Fashahah'] 
  },

  // --- FAHMIL & SYARHIL ---
  { 
    id: 'fahmil_quran', 
    name: 'Fahmil Qur\'an (MFQ) - Beregu', 
    maxAge: { years: 18, months: 11, days: 29 }, 
    scoringFields: ['Babak Paket', 'Babak Rebutan'], 
    tieBreakerOrder: ['Babak Rebutan', 'Babak Paket'] 
  },
  { 
    id: 'syarhil_quran', 
    name: 'Syarhil Qur\'an (MSQ) - Beregu', 
    maxAge: { years: 18, months: 11, days: 29 }, 
    scoringFields: ['Bidang Syarahan (Materi)', 'Bidang Tilawah', 'Bidang Retorika/Terjemah'], 
    tieBreakerOrder: ['Bidang Syarahan (Materi)', 'Bidang Retorika/Terjemah', 'Bidang Tilawah'] 
  },

  // --- SENI KALIGRAFI AL-QUR'AN (MKQ) ---
  { 
    id: 'kaligrafi_naskah', 
    name: 'Seni Kaligrafi Al-Qur\'an - Golongan Naskah', 
    maxAge: { years: 34, months: 11, days: 29 }, 
    scoringFields: ['Kebenaran Kaidah', 'Keindahan Khath', 'Kebersihan/Kerapihan'], 
    tieBreakerOrder: ['Kebenaran Kaidah', 'Keindahan Khath', 'Kebersihan/Kerapihan'] 
  },
  { 
    id: 'kaligrafi_mushaf', 
    name: 'Seni Kaligrafi Al-Qur\'an - Golongan Hiasan Mushaf', 
    maxAge: { years: 34, months: 11, days: 29 }, 
    scoringFields: ['Kebenaran Kaidah', 'Keindahan Khath', 'Unsur Seni Lukis/Ornament', 'Kebersihan'], 
    tieBreakerOrder: ['Kebenaran Kaidah', 'Keindahan Khath', 'Unsur Seni Lukis/Ornament'] 
  },
  { 
    id: 'kaligrafi_dekorasi', 
    name: 'Seni Kaligrafi Al-Qur\'an - Golongan Dekorasi', 
    maxAge: { years: 34, months: 11, days: 29 }, 
    scoringFields: ['Kebenaran Kaidah', 'Keindahan Khath', 'Unsur Seni Lukis/Ornament', 'Kebersihan'], 
    tieBreakerOrder: ['Kebenaran Kaidah', 'Keindahan Khath', 'Unsur Seni Lukis/Ornament'] 
  },
  { 
    id: 'kaligrafi_kontemporer', 
    name: 'Seni Kaligrafi Al-Qur\'an - Golongan Kontemporer', 
    maxAge: { years: 34, months: 11, days: 29 }, 
    scoringFields: ['Unsur Seni Lukis', 'Keindahan Aliran Khath', 'Kekayaan Imajinasi', 'Kebersihan'], 
    tieBreakerOrder: ['Unsur Seni Lukis', 'Keindahan Aliran Khath', 'Kekayaan Imajinasi'] 
  },

  // --- KARYA TULIS ILMIAH AL-QUR'AN ---
  { 
    id: 'ktiq', 
    name: 'Karya Tulis Ilmiah Al-Qur\'an (KTIQ)', 
    maxAge: { years: 24, months: 11, days: 29 }, 
    scoringFields: ['Bobot Materi', 'Kaidah Penulisan', 'Originalitas', 'Presentasi/Tanya Jawab'], 
    tieBreakerOrder: ['Bobot Materi', 'Originalitas', 'Presentasi/Tanya Jawab'] 
  }
];

export const DATA_WILAYAH_SULSEL: Record<string, Record<string, string[]>> = {
  "Kabupaten Luwu Utara": { 
    "Masamba": ["Baliase", "Bone", "Kappuna", "Lantang Tallang", "Masamba", "Pincara", "Radda", "Rompu", "Sepakat", "Tamboke"],
    "Baebunta": ["Baebunta", "Balerante", "Maroangin", "Meli", "Palandan", "Rante Sapa", "Sassa", "Tarobok"],
    "Baebunta Selatan": ["Beringin Jaya", "Lara", "Lemo", "Mukti Jaya", "Polewali", "Suka Maju", "Tete Uri"],
    "Sabbang": ["Bakalalan", "Batu Alang", "Bone Subur", "Dandawasu", "Malimbu", "Pararra", "Sabbang", "Salama", "Tulung Indah"],
    "Sabbang Selatan": ["Buangin", "D'Pattapa", "Kalotok", "Kampung Baru", "Maleku", "Pompaniki", "Taba", "Terpedana"],
    "Sukamaju": ["Kaluku", "Ketulungan", "Lampuawa", "Mulyorejo", "Sukamaju", "Sumberejo", "Tambak Bahari", "Tulung Sari"],
    "Sukamaju Selatan": ["Banyuwangi", "Lino", "Muryana", "Pae-Pae", "Rawamangun", "Subur", "Sukamaju Selatan", "Wonokerto"],
    "Bone-Bone": ["Bantimurung", "Bone-Bone", "Mekar Jaya", "Patoloan", "Sidoraharjo", "Sidomukti", "Sukadamai", "Tamuku"],
    "Tanalili": ["Bungo Adoi", "Karondang", "Munte", "Patila", "Rampindo", "Sidobinangun", "Sido Dadi", "Sumberejo"],
    "Malangke": ["Benteng", "Girikusuma", "Malangke", "Pettalandung", "Salekoe", "Takkalala", "Tingkara", "Tolada"],
    "Malangke Barat": ["Arusu", "Cenning", "Kalitata", "Limbong Wara", "Pao", "Pobela", "Waetuwo", "Wara"],
    "Mappedeceng": ["Benteng", "Cendana Putih", "Mappedeceng", "Mekar Jaya", "Sumber Harapan", "Sumber Wangi", "Ujung Mattajang"],
    "Rampi": ["Bada", "Dodolo", "Lampi", "Onondowa", "Rampi", "Sulaku", "Tedeboe"],
    "Seko": ["Beroppa", "Embonatana", "Hoyo", "Lodang", "Padang Balua", "Padang Raya", "Seko", "Taloto", "Tirobali"],
    "Rongkong": ["Bajo", "Limbong", "Minanga", "Pengkajoang", "Rongkong", "Rante Mario", "Salurante"]
  },
  "Kabupaten Bantaeng": { "Bantaeng": ["Karatuang"], "Bissappu": ["Bonto Atu"] },
  "Kabupaten Bone": { "Ajangale": ["Amessangeng"], "Tanete Riattang": ["Biru"] },
  "Kota Makassar": { 
    "Biringkanaya": ["Bakung", "Berua", "Bulurokeng", "Daya", "Katimbang", "Paccerakkang", "Pai", "Sudiang", "Sudiang Raya"], 
    "Rappocini": ["Balla Parang", "Banta-Bantaeng", "Bonto Makkio", "Buakana", "Karunrung", "Kassi-Kassi", "Mapala", "Minasa Upa", "Rappocini"] 
  }
};

export const MENU_DEFINITION: MenuDefinition[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
  { id: 'users', label: 'Manajemen User', icon: 'fa-users-gear' },
  { id: 'judge-bank', label: 'Bank Data Hakim', icon: 'fa-gavel' },
  { id: 'info-board', label: 'Papan Informasi', icon: 'fa-chalkboard-user' },
  { id: 'judge-profile', label: 'Profil Hakim', icon: 'fa-user-tie' },
  { id: 'my-registration', label: 'Data Saya', icon: 'fa-user-gear' },
  { id: 'registration', label: 'Pendaftaran', icon: 'fa-user-plus' },
  { id: 'verification', label: 'Verifikasi Berkas', icon: 'fa-user-check' },
  { id: 'scoring', label: 'Penilaian Hakim', icon: 'fa-award' },
  { id: 'bank-data', label: 'Bank Data MTQ', icon: 'fa-database' },
  { id: 'face-id', label: 'Presensi Face ID', icon: 'fa-camera-retro' },
  { id: 'events', label: 'Manajemen Event', icon: 'fa-calendar-days' },
  { id: 'system-config', label: 'Konfigurasi Cloud', icon: 'fa-server' },
];

export const DEFAULT_MENU_ACCESS: Record<string, UserRole[]> = {
  'dashboard': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN, UserRole.ADMIN_KECAMATAN, UserRole.PESERTA, UserRole.HAKIM, UserRole.PANITERA],
  'users': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN],
  'judge-bank': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN],
  'info-board': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN],
  'judge-profile': [UserRole.HAKIM],
  'my-registration': [UserRole.PESERTA],
  'registration': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN, UserRole.ADMIN_KECAMATAN],
  'verification': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN, UserRole.ADMIN_KECAMATAN],
  'scoring': [UserRole.HAKIM, UserRole.PANITERA, UserRole.SUPERADMIN],
  'bank-data': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI, UserRole.ADMIN_KABUPATEN, UserRole.ADMIN_KECAMATAN],
  'face-id': [UserRole.SUPERADMIN, UserRole.PANITERA, UserRole.HAKIM],
  'events': [UserRole.SUPERADMIN, UserRole.ADMIN_PROVINSI],
  'system-config': [UserRole.SUPERADMIN],
};
