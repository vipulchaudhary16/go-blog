import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../sidebar/app-siderbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <>
        <SidebarTrigger />
        <div className="w-full">{children}</div>
      </>
    </SidebarProvider>
  );
}
