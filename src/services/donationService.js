import { supabase } from '../lib/supabase';

export const donationService = {
  async createDonationRequest(requestData) {
    try {
      const { data, error } = await supabase?.from('donation_requests')?.insert(requestData)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createDonationOffer(offerData) {
    try {
      const { data, error } = await supabase?.from('donation_offers')?.insert(offerData)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getDonationRequests(filters = {}) {
    try {
      let query = supabase?.from('donation_requests')?.select(`
          *,
          patient_profiles (
            user_profiles (
              full_name,
              email
            )
          )
        `);

      if (filters?.urgency) {
        query = query?.eq('urgency_level', filters?.urgency);
      }
      
      if (filters?.donationType) {
        query = query?.eq('donation_type', filters?.donationType);
      }

      if (filters?.status) {
        query = query?.eq('status', filters?.status);
      }

      const { data, error } = await query?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getDonationOffers(filters = {}) {
    try {
      let query = supabase?.from('donation_offers')?.select(`
          *,
          donor_profiles (
            user_profiles (
              full_name,
              email
            )
          )
        `);

      if (filters?.donationType) {
        query = query?.eq('donation_type', filters?.donationType);
      }

      if (filters?.status) {
        query = query?.eq('status', filters?.status);
      }

      const { data, error } = await query?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getUserDonationRequests(userId) {
    try {
      const { data, error } = await supabase?.from('donation_requests')?.select('*')?.eq('patient_id', userId)?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getUserDonationOffers(userId) {
    try {
      const { data, error } = await supabase?.from('donation_offers')?.select('*')?.eq('donor_id', userId)?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createDonationMatch(matchData) {
    try {
      const { data, error } = await supabase?.from('donation_matches')?.insert(matchData)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateDonationStatus(type, id, status, updates = {}) {
    try {
      const table = type === 'request' ? 'donation_requests' : 'donation_offers';
      const { data, error } = await supabase?.from(table)?.update({ status, ...updates })?.eq('id', id)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getActivityLog(userId = null) {
    try {
      let query = supabase?.from('activity_log')?.select(`
          *,
          user_profiles (
            full_name,
            email
          )
        `);

      if (userId) {
        query = query?.eq('user_id', userId);
      }

      const { data, error } = await query?.order('created_at', { ascending: false })?.limit(50);
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};