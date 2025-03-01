import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../sidebar/app-siderbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen">
        {/* Sticky Header (Replaces SidebarTrigger) */}
        <div className="sticky top-0 w-full bg-white shadow-md p-4 z-10">
          <SidebarTrigger />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
