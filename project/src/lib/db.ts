import { supabase } from './supabase';
import { generateId } from './utils';
import type { User, Target, Action, Step, Task, Obstacle } from '../types';

export const db = {
  // ... (keep existing operations)

  // Message operations
  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        user1:users!conversations_user1_id_fkey(id, name, profile),
        user2:users!conversations_user2_id_fkey(id, name, profile),
        target:targets(id, title),
        messages:messages(*)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createConversation(user1Id: string, user2Id: string, targetId?: string) {
    const { data: existing } = await supabase
      .from('conversations')
      .select()
      .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
      .single();

    if (existing) return existing;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        id: generateId(),
        user1_id: user1Id,
        user2_id: user2Id,
        target_id: targetId || null,
        created_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, profile)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const now = new Date().toISOString();

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: now })
      .eq('id', conversationId);

    // Create message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        id: generateId(),
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        created_at: now,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markMessagesAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('read_at', null);

    if (error) throw error;
  },
};