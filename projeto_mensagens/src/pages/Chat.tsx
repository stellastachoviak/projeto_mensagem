import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export interface Profile {
  id: string;
  full_name: string;
  role: "customer" | "support";
  avatar_url: string | null;
  is_online: boolean;
  last_seen: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  support_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  customer?: Profile;
  support?: Profile;
}

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth and get profile
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
      return;
    }

    setProfile(data);
    loadConversations(userId, data.role);
  };

  const loadConversations = async (userId: string, role: "customer" | "support") => {
    const query = supabase
      .from("conversations")
      .select(`
        *,
        customer:profiles!conversations_customer_id_fkey(*),
        support:profiles!conversations_support_id_fkey(*)
      `)
      .order("updated_at", { ascending: false });

    if (role === "customer") {
      query.eq("customer_id", userId);
    } else {
      query.or(`support_id.eq.${userId},support_id.is.null`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading conversations:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as conversas",
        variant: "destructive",
      });
      return;
    }

    setConversations(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const createConversation = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("conversations")
      .insert({ customer_id: user.id })
      .select()
      .single();

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar conversa",
        variant: "destructive",
      });
      return;
    }

    if (data && profile) {
      loadConversations(user.id, profile.role);
      setSelectedConversation(data.id);
    }
  };

  if (!user || !profile) return null;

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        profile={profile}
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onCreateConversation={createConversation}
        onLogout={handleLogout}
      />
      <ChatWindow
        conversationId={selectedConversation}
        currentUserId={user.id}
        userRole={profile.role}
      />
    </div>
  );
};

export default Chat;
