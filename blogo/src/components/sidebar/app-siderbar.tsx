import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { useSession } from '@/contexts/UserContext';

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = useSession();

  const menuItems = [
    {
      title: 'Your Blogs',
      onClick: () => navigate('/blogs'),
    },
    {
      title: 'Your Subscriptions',
      onClick: () => navigate('/subscriptions'),
    },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Basic</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild onClick={item.onClick}>
                    <span className="custom-hyperlink">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/form/blog/new')}>
                  <span className="custom-hyperlink">Write Your own blog</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {`${user?.first_name} ${user?.last_name}`} <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={logOut}>
                  <span className="custom-hyperlink">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
