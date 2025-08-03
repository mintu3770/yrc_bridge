import { supabase } from '../lib/supabase';

export const authService = {
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            role: userData?.role || 'donor'
          }
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  },

  async getSession() {
    try {
      const { data, error } = await supabase?.auth?.getSession();
      if (error) throw error;
      return data?.session;
    } catch (error) {
      throw error;
    }
  },

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', userId)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};