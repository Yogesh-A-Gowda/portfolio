import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const parsePointsText = (text) => {
  if (!text) return [];
  const lines = text.split('\n');
  const parsed = [];
  for (let line of lines) {
    let cleaned = line.trim();
    if (!cleaned) continue;
    // Remove leading bullet characters like •, -, *, or list numbers like 1., 2.
    cleaned = cleaned.replace(/^([•\-\*]|\d+\.)\s*/, '').trim();
    if (cleaned) {
      parsed.push(cleaned);
    }
  }
  return parsed;
};

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Active Tab: 'projects' | 'skills' | 'experiences'
  const [activeTab, setActiveTab] = useState('projects');

  // Lists Data
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Form States - Projects
  const [projectForm, setProjectForm] = useState({ id: null, name: '', description: '', image: '', source_code_link: '', tags: [], sort_order: 1 });
  const [newTag, setNewTag] = useState({ name: '', color: 'blue-text-gradient' });

  // Form States - Skills
  const [skillForm, setSkillForm] = useState({ id: null, name: '', icon: '' });

  // Form States - Experiences
  const [experienceForm, setExperienceForm] = useState({ id: null, title: '', company_name: '', icon: '', icon_bg: '#1d1836', date: '', points: [], sort_order: 1 });
  const [newPoint, setNewPoint] = useState('');

  // 1. Check current session
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch data once logged in
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  const fetchData = async () => {
    if (!supabase) return;
    try {
      setLoading(true);
      if (activeTab === 'projects') {
        const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } else if (activeTab === 'skills') {
        const { data, error } = await supabase.from('skills').select('*').order('name', { ascending: true });
        if (error) throw error;
        setSkills(data || []);
      } else if (activeTab === 'experiences') {
        const { data, error } = await supabase.from('experiences').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        if (error) throw error;
        setExperiences(data || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auth Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    try {
      setLoading(true);
      setMessage('');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setMessage(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  // Image Upload Handler to Supabase Storage
  const handleImageUpload = async (e, type) => {
    if (!supabase) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setMessage('Uploading image...');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      if (type === 'project') {
        setProjectForm(prev => ({ ...prev, image: publicUrl }));
      } else if (type === 'skill') {
        setSkillForm(prev => ({ ...prev, icon: publicUrl }));
      } else if (type === 'experience') {
        setExperienceForm(prev => ({ ...prev, icon: publicUrl }));
      }
      
      setMessage('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      setMessage(`Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Projects CRUD Actions
  // ==========================================
  const saveProject = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    try {
      setLoading(true);
      setMessage('');
      
      // Auto-add tag if they typed one but forgot to click "Add"
      let finalTags = [...projectForm.tags];
      if (newTag.name.trim()) {
        finalTags.push({ name: newTag.name.trim(), color: newTag.color });
        setNewTag({ name: '', color: 'blue-text-gradient' });
      }

      const { id, name, description, image, source_code_link, sort_order } = projectForm;

      if (!name || !description || !image) {
        throw new Error("Name, Description, and Image are required!");
      }

      if (id) {
        // Update
        const { error } = await supabase.from('projects').update({ name, description, image, source_code_link, tags: finalTags, sort_order: sort_order || 1 }).eq('id', id);
        if (error) throw error;
        setMessage("Project updated successfully!");
      } else {
        // Insert
        const { error } = await supabase.from('projects').insert([{ name, description, image, source_code_link, tags: finalTags, sort_order: sort_order || 1 }]);
        if (error) throw error;
        setMessage("Project created successfully!");
      }

      setProjectForm({ id: null, name: '', description: '', image: '', source_code_link: '', tags: [], sort_order: 1 });
      fetchData();
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setMessage("Project deleted successfully!");
      fetchData();
    } catch (err) {
      setMessage(`Delete failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (!newTag.name) return;
    setProjectForm(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }));
    setNewTag({ name: '', color: 'blue-text-gradient' });
  };

  const removeTag = (indexToRemove) => {
    setProjectForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // ==========================================
  // Skills CRUD Actions
  // ==========================================
  const saveSkill = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    try {
      setLoading(true);
      setMessage('');
      const { id, name, icon } = skillForm;

      if (!name || !icon) {
        throw new Error("Name and Icon image are required!");
      }

      if (id) {
        const { error } = await supabase.from('skills').update({ name, icon }).eq('id', id);
        if (error) throw error;
        setMessage("Skill updated successfully!");
      } else {
        const { error } = await supabase.from('skills').insert([{ name, icon }]);
        if (error) throw error;
        setMessage("Skill created successfully!");
      }

      setSkillForm({ id: null, name: '', icon: '' });
      fetchData();
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      setMessage("Skill deleted successfully!");
      fetchData();
    } catch (err) {
      setMessage(`Delete failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Experiences CRUD Actions
  // ==========================================
  const saveExperience = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    try {
      setLoading(true);
      setMessage('');

      // Auto-add point if they typed/pasted one but forgot to click "Add"
      let finalPoints = [...experienceForm.points];
      if (newPoint.trim()) {
        const parsed = parsePointsText(newPoint);
        finalPoints = [...finalPoints, ...parsed];
        setNewPoint('');
      }

      const { id, title, company_name, icon, icon_bg, date, sort_order } = experienceForm;

      if (!title || !company_name || !icon || !date) {
        throw new Error("Title, Company, Icon, and Date are required!");
      }

      if (id) {
        const { error } = await supabase.from('experiences').update({ title, company_name, icon, icon_bg, date, points: finalPoints, sort_order: sort_order || 1 }).eq('id', id);
        if (error) throw error;
        setMessage("Experience updated successfully!");
      } else {
        const { error } = await supabase.from('experiences').insert([{ title, company_name, icon, icon_bg, date, points: finalPoints, sort_order: sort_order || 1 }]);
        if (error) throw error;
        setMessage("Experience created successfully!");
      }

      setExperienceForm({ id: null, title: '', company_name: '', icon: '', icon_bg: '#1d1836', date: '', points: [], sort_order: 1 });
      fetchData();
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) throw error;
      setMessage("Experience deleted successfully!");
      fetchData();
    } catch (err) {
      setMessage(`Delete failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addPoint = () => {
    if (!newPoint) return;
    const parsed = parsePointsText(newPoint);
    setExperienceForm(prev => ({
      ...prev,
      points: [...prev.points, ...parsed]
    }));
    setNewPoint('');
  };

  const removePoint = (indexToRemove) => {
    setExperienceForm(prev => ({
      ...prev,
      points: prev.points.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Render Warning if Supabase is not configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-primary flex flex-col justify-center items-center p-6 text-white">
        <div className="max-w-md w-full bg-tertiary rounded-2xl p-8 border border-red-500 shadow-card text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Supabase Offline</h2>
          <p className="text-secondary mb-6 leading-relaxed">
            Supabase client is not initialized. Please add the following to your <code className="bg-black-100 px-2 py-1 rounded">.env</code> file:
          </p>
          <pre className="bg-black-200 p-4 rounded-xl text-left text-sm text-green-400 overflow-x-auto mb-6">
            VITE_SUPABASE_URL=your_supabase_url<br />
            VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
          </pre>
          <p className="text-xs text-secondary font-medium">
            Once environment variables are specified, restart your dev server.
          </p>
        </div>
      </div>
    );
  }

  // Render Login Panel
  if (!session) {
    return (
      <div className="min-h-screen bg-primary flex flex-col justify-center items-center p-6 text-white">
        <div className="max-w-md w-full bg-tertiary rounded-2xl p-8 border border-white-100/10 shadow-card">
          <h2 className="text-3xl font-bold text-center mb-2">Admin Dashboard</h2>
          <p className="text-secondary text-center text-sm mb-8">Access restricted to authenticated owners</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black-100 border border-white-100/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black-100 border border-white-100/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
            </div>

            {message && (
              <p className="text-sm font-medium text-red-400 text-center">{message}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard Console
  return (
    <div className="min-h-screen bg-primary text-white p-6 md:p-12 pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-tertiary p-6 rounded-2xl border border-white-100/5">
          <div>
            <h1 className="text-3xl font-bold">Admin Console</h1>
            <p className="text-secondary text-sm">Welcome, {session.user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-all text-sm"
          >
            Logout Dashboard
          </button>
        </div>

        {message && (
          <div className="bg-black-100 border border-purple-500/20 p-4 rounded-xl mb-6 text-sm font-medium text-purple-300">
            {message}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-white-100/10 mb-8 gap-6">
          {['projects', 'skills', 'experiences'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-bold text-lg capitalize transition-all border-b-2 ${
                activeTab === tab 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-secondary hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: Dynamic Form */}
          <div className="lg:col-span-5 bg-tertiary p-6 rounded-2xl border border-white-100/5 h-fit">
            
            {/* PROJECTS FORM */}
            {activeTab === 'projects' && (
              <form onSubmit={saveProject} className="space-y-5">
                <h2 className="text-xl font-bold mb-2">{projectForm.id ? "Edit Project" : "Add Project"}</h2>
                
                <div>
                  <label className="block text-xs font-semibold mb-1">Project Name</label>
                  <input 
                    type="text" 
                    value={projectForm.name} 
                    onChange={e => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Description (HTML allowed)</label>
                  <textarea 
                    value={projectForm.description} 
                    onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm h-28" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Sort Order (1 = Top)</label>
                    <input 
                      type="number" 
                      value={projectForm.sort_order || 1} 
                      onChange={e => setProjectForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Github / Repo Link</label>
                    <input 
                      type="url" 
                      value={projectForm.source_code_link} 
                      onChange={e => setProjectForm(prev => ({ ...prev, source_code_link: e.target.value }))}
                      className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Image / Screenshot</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'project')}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white file:hover:bg-purple-500 cursor-pointer"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Or paste direct image URL (e.g. Cloudinary)"
                    value={projectForm.image}
                    onChange={e => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm mt-2 focus:outline-none focus:border-purple-500" 
                  />
                  {projectForm.image && (
                    <img src={projectForm.image} alt="preview" className="mt-3 h-20 w-full object-cover rounded-lg border border-white-100/10" />
                  )}
                </div>

                {/* Tags Section */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projectForm.tags.map((tag, idx) => (
                      <span key={idx} className="bg-black-100 px-3 py-1 rounded-full text-xs font-medium border border-white-100/5 flex items-center gap-1.5">
                        <span className={tag.color}>#{tag.name}</span>
                        <button type="button" onClick={() => removeTag(idx)} className="text-red-500 font-bold hover:text-red-400">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Tag name"
                      value={newTag.name}
                      onChange={e => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-black-100 border border-white-100/10 rounded-lg p-2 text-xs flex-1"
                    />
                    <select 
                      value={newTag.color} 
                      onChange={e => setNewTag(prev => ({ ...prev, color: e.target.value }))}
                      className="bg-black-100 border border-white-100/10 rounded-lg p-2 text-xs"
                    >
                      <option value="blue-text-gradient">Blue</option>
                      <option value="green-text-gradient">Green</option>
                      <option value="pink-text-gradient">Pink</option>
                      <option value="orange-text-gradient">Orange</option>
                      <option value="yellow-text-gradient">Yellow</option>
                    </select>
                    <button type="button" onClick={addTag} className="px-3 bg-purple-600 rounded-lg text-xs font-bold hover:bg-purple-500">Add</button>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-sm transition-all">Save Project</button>
                  {projectForm.id && (
                    <button type="button" onClick={() => setProjectForm({ id: null, name: '', description: '', image: '', source_code_link: '', tags: [] })} className="px-4 bg-gray-600 rounded-lg text-sm hover:bg-gray-500">Cancel</button>
                  )}
                </div>
              </form>
            )}

            {/* SKILLS FORM */}
            {activeTab === 'skills' && (
              <form onSubmit={saveSkill} className="space-y-5">
                <h2 className="text-xl font-bold mb-2">{skillForm.id ? "Edit Skill" : "Add Skill"}</h2>
                
                <div>
                  <label className="block text-xs font-semibold mb-1">Skill Name</label>
                  <input 
                    type="text" 
                    value={skillForm.name} 
                    onChange={e => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Icon Image</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'skill')}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white file:hover:bg-purple-500 cursor-pointer"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Or paste direct icon URL (e.g. Cloudinary)"
                    value={skillForm.icon}
                    onChange={e => setSkillForm(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm mt-2 focus:outline-none focus:border-purple-500" 
                  />
                  {skillForm.icon && (
                    <img src={skillForm.icon} alt="preview" className="mt-3 h-14 w-14 object-contain rounded-lg bg-black-100 p-2 border border-white-100/10" />
                  )}
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-sm transition-all">Save Skill</button>
                  {skillForm.id && (
                    <button type="button" onClick={() => setSkillForm({ id: null, name: '', icon: '' })} className="px-4 bg-gray-600 rounded-lg text-sm hover:bg-gray-500">Cancel</button>
                  )}
                </div>
              </form>
            )}

            {/* EXPERIENCES FORM */}
            {activeTab === 'experiences' && (
              <form onSubmit={saveExperience} className="space-y-5">
                <h2 className="text-xl font-bold mb-2">{experienceForm.id ? "Edit Experience" : "Add Experience"}</h2>
                
                <div>
                  <label className="block text-xs font-semibold mb-1">Role Title</label>
                  <input 
                    type="text" 
                    value={experienceForm.title} 
                    onChange={e => setExperienceForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={experienceForm.company_name} 
                    onChange={e => setExperienceForm(prev => ({ ...prev, company_name: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Duration (e.g. Sept 2023 - Present)</label>
                  <input 
                    type="text" 
                    value={experienceForm.date} 
                    onChange={e => setExperienceForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Sort Order (1 = Top)</label>
                    <input 
                      type="number" 
                      value={experienceForm.sort_order || 1} 
                      onChange={e => setExperienceForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm h-10 focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Icon Bg Color</label>
                    <input 
                      type="color" 
                      value={experienceForm.icon_bg} 
                      onChange={e => setExperienceForm(prev => ({ ...prev, icon_bg: e.target.value }))}
                      className="w-full bg-black-100 border border-white-100/10 rounded-lg p-1.5 h-10 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Company Logo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'experience')}
                      className="text-xs w-full file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white file:hover:bg-purple-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Or paste direct logo URL (e.g. Cloudinary)"
                    value={experienceForm.icon}
                    onChange={e => setExperienceForm(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full bg-black-100 border border-white-100/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-purple-500" 
                  />
                </div>
                {experienceForm.icon && (
                  <div className="flex items-center gap-3 bg-black-100 p-2.5 rounded-lg border border-white-100/10">
                    <span className="text-xs">Logo preview:</span>
                    <img src={experienceForm.icon} alt="logo preview" className="h-10 w-10 object-contain rounded-full" style={{ backgroundColor: experienceForm.icon_bg }} />
                  </div>
                )}

                {/* Points Section */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Bullet Points</label>
                  <ul className="list-disc ml-5 space-y-1.5 text-xs text-secondary mb-3">
                    {experienceForm.points.map((pt, idx) => (
                      <li key={idx} className="flex justify-between items-start gap-3">
                        <span className="flex-1">{pt}</span>
                        <button type="button" onClick={() => removePoint(idx)} className="text-red-500 hover:text-red-400 font-bold">Delete</button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <textarea 
                      placeholder="Add experience point details..."
                      value={newPoint}
                      onChange={e => setNewPoint(e.target.value)}
                      className="bg-black-100 border border-white-100/10 rounded-lg p-2 text-xs flex-1 h-16"
                    />
                    <button type="button" onClick={addPoint} className="px-4 bg-purple-600 rounded-lg text-xs font-bold hover:bg-purple-500 h-fit py-2 align-bottom">Add</button>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-sm transition-all">Save Experience</button>
                  {experienceForm.id && (
                    <button type="button" onClick={() => setExperienceForm({ id: null, title: '', company_name: '', icon: '', icon_bg: '#1d1836', date: '', points: [] })} className="px-4 bg-gray-600 rounded-lg text-sm hover:bg-gray-500">Cancel</button>
                  )}
                </div>
              </form>
            )}

          </div>

          {/* RIGHT PANEL: List of items */}
          <div className="lg:col-span-7 bg-tertiary p-6 rounded-2xl border border-white-100/5">
            <h2 className="text-xl font-bold mb-6 capitalize">{activeTab} Items</h2>
            
            {loading && <p className="text-secondary text-sm">Loading items...</p>}
            
            {!loading && activeTab === 'projects' && projects.length === 0 && (
              <p className="text-secondary text-sm">No projects found. Add your first project using the form!</p>
            )}

            {!loading && activeTab === 'projects' && (
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-black-100 p-4 rounded-xl border border-white-100/5 flex gap-4 items-start justify-between">
                    <img src={proj.image} alt={proj.name} className="h-16 w-20 object-cover rounded-lg border border-white-100/10 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base truncate">{proj.name}</h3>
                      <p className="text-xs text-secondary line-clamp-2 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }}></p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setProjectForm(proj)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-lg"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteProject(proj.id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && activeTab === 'skills' && skills.length === 0 && (
              <p className="text-secondary text-sm">No skills found. Add your first skill using the form!</p>
            )}

            {!loading && activeTab === 'skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((sk) => (
                  <div key={sk.id} className="bg-black-100 p-3 rounded-xl border border-white-100/5 flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={sk.icon} alt={sk.name} className="h-10 w-10 object-contain rounded bg-black-200 p-1 flex-shrink-0" />
                      <h3 className="font-bold text-sm truncate">{sk.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSkillForm(sk)}
                        className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-xs font-semibold rounded-lg"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteSkill(sk.id)}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-xs font-semibold rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && activeTab === 'experiences' && experiences.length === 0 && (
              <p className="text-secondary text-sm">No work experiences found. Add your first experience using the form!</p>
            )}

            {!loading && activeTab === 'experiences' && (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-black-100 p-4 rounded-xl border border-white-100/5 flex gap-4 items-start justify-between">
                    <img src={exp.icon} alt={exp.company_name} className="h-12 w-12 object-contain rounded-full flex-shrink-0" style={{ backgroundColor: exp.icon_bg || exp.iconBg }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base">{exp.title}</h3>
                      <h4 className="text-xs text-purple-400 font-semibold">{exp.company_name} — <span className="text-secondary font-normal">{exp.date}</span></h4>
                      <p className="text-xs text-secondary mt-1 line-clamp-1">{exp.points?.[0] || 'No points'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setExperienceForm(exp)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-lg"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteExperience(exp.id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
