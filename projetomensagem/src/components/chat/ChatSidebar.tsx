import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, MessageCirclePlus, User } from "lucide-react";
import type { Profile, Conversation } from "@/pages/Chat";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  profile: Profile;
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  onLogout: () => void;
}

const ChatSidebar = ({
  profile,
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateConversation,
  onLogout,
}: ChatSidebarProps) => {
  const getConversationTitle = (conv: Conversation) => {
    if (profile.role === "customer") {
      return conv.support?.full_name || "Aguardando atendente";
    }
    return conv.customer?.full_name || "Cliente";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{profile.full_name}</p>
            <p className="text-xs text-muted-foreground">
              {profile.role === "customer" ? "Cliente" : "Atendente"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        {profile.role === "customer" && (
          <Button onClick={onCreateConversation} className="w-full" size="sm">
            <MessageCirclePlus className="h-4 w-4 mr-2" />
            Nova Conversa
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {profile.role === "customer"
                ? "Nenhuma conversa ainda"
                : "Nenhuma conversa para atender"}
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-colors mb-1",
                  "hover:bg-muted/50",
                  selectedConversation === conv.id && "bg-primary/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {getConversationTitle(conv)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(conv.updated_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
