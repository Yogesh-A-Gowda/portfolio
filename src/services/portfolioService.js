import { supabase } from '../utils/supabaseClient';

export const portfolioService = {
  // 1. Get Skills / Technologies
  async getSkills() {
    if (!supabase) {
      console.warn("Supabase not initialized; returning empty skills list.");
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching skills from Supabase:", error);
      return [];
    }
  },

  // 2. Get Projects
  async getProjects() {
    if (!supabase) {
      console.warn("Supabase not initialized; returning empty projects list.");
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching projects from Supabase:", error);
      return [];
    }
  },

  // 3. Get Experiences
  async getExperiences() {
    if (!supabase) {
      console.warn("Supabase not initialized; returning empty experiences list.");
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching experiences from Supabase:", error);
      return [];
    }
  }
};
