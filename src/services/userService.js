import { supabase } from '../lib/supabase';

export const userService = {
  async getAllUsers() {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getUsersByRole(role) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('role', role)?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createDonorProfile(userId, donorData) {
    try {
      const { data, error } = await supabase?.from('donor_profiles')?.insert({
          user_id: userId,
          ...donorData
        })?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createPatientProfile(userId, patientData) {
    try {
      const { data, error } = await supabase?.from('patient_profiles')?.insert({
          user_id: userId,
          ...patientData
        })?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createVolunteerProfile(userId, volunteerData) {
    try {
      const { data, error } = await supabase?.from('volunteer_profiles')?.insert({
          user_id: userId,
          ...volunteerData
        })?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getVolunteerApplications() {
    try {
      const { data, error } = await supabase?.from('volunteer_profiles')?.select(`
          *,
          user_profiles (
            id,
            full_name,
            email,
            phone
          )
        `)?.eq('volunteer_status', 'pending')?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async approveVolunteer(volunteerId, adminId) {
    try {
      const { data, error } = await supabase?.from('volunteer_profiles')?.update({
          volunteer_status: 'approved',
          approved_by: adminId,
          approved_at: new Date()?.toISOString()
        })?.eq('id', volunteerId)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateUserRole(userId, newRole) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update({ role: newRole })?.eq('id', userId)?.select()?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};