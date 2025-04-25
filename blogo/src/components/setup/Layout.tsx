import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../sidebar/app-siderbar';
import { useNavigate } from 'react-router';
import { useHeader } from '@/contexts/HeaderContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { headerTitle } = useHeader();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen">
        <div className="sticky top-0 w-full bg-white shadow-md p-4 z-10 flex items-center">
          <div className="flex items-center">
            <SidebarTrigger />
            <span onClick={() => navigate(-1)} className="px-3 py-1 cursor-pointer transition">
              ← Back
            </span>
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semi-bold text-gray-600">
            {headerTitle}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
