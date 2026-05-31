import { supabase } from '../utils/supabaseClient';
import { technologies, projects as staticProjects, experiences as staticExperiences } from '../constants';

export const portfolioService = {
  // 1. Get Skills / Technologies
  async getSkills() {
    if (!supabase) {
      console.log("Supabase not initialized; returning static skills.");
      return technologies;
    }
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        return data;
      }
      return technologies; // Fallback if table is empty
    } catch (error) {
      console.error("Error fetching skills from Supabase:", error);
      return technologies;
    }
  },

  // 2. Get Projects
  async getProjects() {
    if (!supabase) {
      console.log("Supabase not initialized; returning static projects.");
      return staticProjects;
    }
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data;
      }
      return staticProjects; // Fallback if table is empty
    } catch (error) {
      console.error("Error fetching projects from Supabase:", error);
      return staticProjects;
    }
  },

  // 3. Get Experiences
  async getExperiences() {
    if (!supabase) {
      console.log("Supabase not initialized; returning static experiences.");
      return staticExperiences;
    }
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        // Supabase stores points as JSON array, mapping is 1-to-1
        return data;
      }
      return staticExperiences; // Fallback if table is empty
    } catch (error) {
      console.error("Error fetching experiences from Supabase:", error);
      return staticExperiences;
    }
  }
};
