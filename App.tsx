
import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, Participant, EventLomba, Gender, User, ParticipantStatus, Announcement, Judge } from './types';
import { BRANCHES, DATA_WILAYAH_SULSEL, DEFAULT_MENU_ACCESS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import RegistrationView from './components/RegistrationView';
import VerificationView from './components/VerificationView';
import BankDataView from './components/BankDataView';
import ScoringView from './components/ScoringView';
import FaceIDView from './components/FaceIDView';
import EventManagementView from './components/EventManagementView';
import AuthView from './components/AuthView';
import ParticipantDashboard from './components/ParticipantDashboard';
import UserManagementView from './components/UserManagementView';
import InfoManagementView from './components/InfoManagementView';
import JudgeBankDataView from './components/JudgeBankDataView';
import JudgeDashboard from './components/JudgeDashboard';
import CloudConfigView from './components/CloudConfigView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  const [menuAccess, setMenuAccess] = useState<Record<string, UserRole[]>>(DEFAULT_MENU_ACCESS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [apiWebhookUrl, setApiWebhookUrl] = useState<string>(localStorage.getItem('emtq_webhook_url') || '');
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 'a1', title: 'Pendaftaran Dewan Hakim dibuka', content: 'Bagi ustadz/ustadzah yang ingin berpartisipasi sebagai dewan hakim, silakan melengkapi profil dan dokumen SK/Sertifikat.', date: '2024-03-15', status: 'Info', targetRegion: 'Provinsi Sulawesi Selatan', authorName: 'Superadmin', isActive: true }
  ]);
  
  const [events, setEvents] = useState<EventLomba[]>([
    { id: 'e1', name: 'MTQ Tingkat Provinsi Sulsel XXXIII', level: 'PROVINSI', year: 2024, startDate: '2024-05-01', endDate: '2024-05-10', referenceDateForAge: '2024-07-01', status: 'OPEN' }
  ]);

  const activeEvent = useMemo(() => events.find(e => e.status === 'OPEN' || e.status === 'ONGOING') || events[0], [events]);

  /**
   * FUNGSI KRUSIAL: Kirim data ke Spreadsheet
   */
  const pushToCloud = async (action: string, payload: any) => {
    if (!apiWebhookUrl) return;
    setSyncStatus('SYNCING');
    try {
      const response = await fetch(apiWebhookUrl, {
        method: 'POST',
        body: JSON.stringify({ action, payload }),
        mode: 'no-cors' // Google Apps Script sering membutuhkan ini untuk POST sederhana
      });
      
      // Note: 'no-cors' tidak memberikan body response, tapi kita asumsikan sukses jika fetch terkirim
      setSyncStatus('SUCCESS');
      setTimeout(() => setSyncStatus('IDLE'), 2000);
    } catch (err) {
      console.error("Cloud Push Error:", err);
      setSyncStatus('ERROR');
    }
  };

  const fetchCloudData = async () => {
    if (!apiWebhookUrl) return;
    setSyncStatus('SYNCING');
    try {
      const cleanUrl = apiWebhookUrl.trim();
      const separator = cleanUrl.includes('?') ? '&' : '?';
      const fullUrl = `${cleanUrl}${separator}action=getInitialData&t=${Date.now()}`;

      const response = await fetch(fullUrl, {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
      });
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      if (data.participants) {
        setParticipants(data.participants.map((p: any) => ({
          ...p,
          id: p.id, nik: p.nik, fullName: p.nama_lengkap, gender: p.gender as Gender,
          branchId: p.cabang_id, status: p.status as ParticipantStatus,
          registrationYear: p.tahun, scores: p.skor || {},
          documents: p.documents || { photo: `https://ui-avatars.com/api/?name=${p.nama_lengkap}&background=10b981&color=fff`, mandate: '', ktp: '', kk: '', ijazah: '' },
          verificationLogs: p.log_verifikasi || []
        })));
      }

      if (data.judges) setJudges(data.judges.map((j: any) => ({
        ...j, fullName: j.nama_hakim, specialization: j.spesialisasi || []
      })));
      
      if (data.events) setEvents(data.events.map((e: any) => ({
        ...e, name: e.nama_event, referenceDateForAge: e.batas_usia
      })));

      if (data.announcements) setAnnouncements(data.announcements.map((a: any) => ({
        ...a, title: a.judul, content: a.konten, authorName: a.author
      })));

      setSyncStatus('SUCCESS');
      setTimeout(() => setSyncStatus('IDLE'), 2000);
    } catch (err) {
      console.error("Sync Error:", err);
      setSyncStatus('ERROR');
    }
  };

  useEffect(() => {
    if (apiWebhookUrl) {
      localStorage.setItem('emtq_webhook_url', apiWebhookUrl.trim());
      fetchCloudData();
    }
  }, [apiWebhookUrl]);

  // WRAPPERS UNTUK AUTO-SYNC
  const handleAddParticipant = (p: Participant) => {
    setParticipants([p, ...participants]);
    pushToCloud('saveParticipant', {
      id: p.id, nik: p.nik, nama_lengkap: p.fullName, gender: p.gender,
      wilayah: p.district, kecamatan: p.subDistrict, cabang_id: p.branchId,
      status: p.status, tahun: p.registrationYear, log_verifikasi: p.verificationLogs
    });
  };

  const handleUpdateParticipant = (p: Participant) => {
    setParticipants(prev => prev.map(item => item.id === p.id ? p : item));
    pushToCloud('saveParticipant', {
      id: p.id, status: p.status, skor: p.scores, log_verifikasi: p.verificationLogs,
      nama_lengkap: p.fullName, wilayah: p.district, kecamatan: p.subDistrict, cabang_id: p.branchId
    });
  };

  const handleUpdateJudge = (j: Judge) => {
    setJudges(prev => prev.map(item => item.id === j.id ? j : item));
    pushToCloud('saveJudge', {
      id: j.id, nik: j.nik, nama_hakim: j.fullName, wilayah: j.district,
      spesialisasi: j.specialization, status: j.isVerified ? 'VERIFIED' : 'PENDING'
    });
  };

  const handleUpdateEvents = (newEvents: EventLomba[]) => {
    setEvents(newEvents);
    // Sync event terakhir yang diubah (simulasi)
    if (newEvents.length > 0) {
      const last = newEvents[newEvents.length-1];
      pushToCloud('saveEvent', {
        id: last.id, nama_event: last.name, level: last.level, tahun: last.year,
        status: last.status, batas_usia: last.referenceDateForAge, mulai: last.startDate, selesai: last.endDate
      });
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.HAKIM) setActiveTab('judge-profile');
    else if (user.role === UserRole.PESERTA) setActiveTab('my-registration');
    else setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    if (!currentUser) return null;
    switch (activeTab) {
      case 'dashboard': return <DashboardView participants={participants} events={events} announcements={announcements} currentUser={currentUser} />;
      case 'users': return <UserManagementView currentUser={currentUser} menuAccess={menuAccess} setMenuAccess={setMenuAccess} />;
      case 'judge-bank': return <JudgeBankDataView currentUser={currentUser} judges={judges} setJudges={setJudges} events={events} />;
      case 'judge-profile': return <JudgeDashboard user={currentUser} judge={judges.find(j => j.nik === currentUser.nik)} onUpdate={handleUpdateJudge} />;
      case 'info-board': return <InfoManagementView currentUser={currentUser} announcements={announcements} setAnnouncements={setAnnouncements} />;
      case 'registration': return <RegistrationView onAdd={handleAddParticipant} participants={participants} currentUser={currentUser} activeEvent={activeEvent} />;
      case 'verification': return <VerificationView participants={participants} onUpdate={handleUpdateParticipant} currentUser={currentUser} />;
      case 'bank-data': return <BankDataView participants={participants} currentUser={currentUser} />;
      case 'scoring': return <ScoringView participants={participants.filter(p => p.status === 'VERIFIED' || p.status === 'WINNER_ADVANCE')} onUpdate={handleUpdateParticipant} currentUser={currentUser} judges={judges} />;
      case 'face-id': return <FaceIDView participants={participants.filter(p => p.status === 'VERIFIED')} />;
      case 'events': return <EventManagementView events={events} setEvents={handleUpdateEvents} currentUser={currentUser} />;
      case 'my-registration': return <ParticipantDashboard user={currentUser} participant={participants.find(p => p.nik === currentUser.nik)} onUpdate={handleUpdateParticipant} activeEvent={activeEvent} />;
      case 'system-config': return <CloudConfigView webhookUrl={apiWebhookUrl} setWebhookUrl={setApiWebhookUrl} onRefreshData={fetchCloudData} />;
      default: return <DashboardView participants={participants} events={events} announcements={announcements} currentUser={currentUser} />;
    }
  };

  if (!currentUser) return <AuthView onLogin={handleLogin} judges={judges} participants={participants} webhookUrl={apiWebhookUrl} setWebhookUrl={setApiWebhookUrl} />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={currentUser.role} menuAccess={menuAccess} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} activeTab={activeTab} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {syncStatus !== 'IDLE' && (
          <div className={`fixed bottom-6 right-6 z-[200] px-6 py-4 rounded-[1.5rem] shadow-2xl border flex items-center space-x-4 animate-in slide-in-from-bottom-10 ${
            syncStatus === 'SYNCING' ? 'bg-white text-slate-600 border-slate-100' :
            syncStatus === 'SUCCESS' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-red-600 text-white border-red-500'
          }`}>
             <i className={`fa-solid ${syncStatus === 'SYNCING' ? 'fa-spinner animate-spin' : syncStatus === 'SUCCESS' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
             <span className="text-xs font-black uppercase tracking-widest">
               {syncStatus === 'SYNCING' ? 'Mengirim ke Cloud...' : syncStatus === 'SUCCESS' ? 'Tersimpan di Spreadsheet' : 'Sinkronisasi Gagal'}
             </span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default App;
