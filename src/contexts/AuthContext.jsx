import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)
        }
        setLoading(false)
      })?.catch((error) => {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
          return;
        }
        setError('Failed to get session');
        setLoading(false);
      });

    // Listen for auth changes - NEVER ASYNC callback
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)  // Fire-and-forget, NO AWAIT
        } else {
          setUser(null)
          setUserProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const fetchUserProfile = (userId) => {
    authService?.getUserProfile(userId)?.then((profile) => {
        setUserProfile(profile);
      })?.catch((error) => {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('NetworkError')) {
          setError('Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.');
          return;
        }
        setError('Failed to load user profile');
      });
  }

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService?.signUp(email, password, userData)
      return data
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        return;
      }
      setError(error?.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService?.signIn(email, password)
      return data
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        return;
      }
      setError(error?.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      await authService?.signOut()
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        setError('Cannot connect to authentication service. Please try again.');
        return;
      }
      setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      const updatedProfile = await authService?.updateUserProfile(user?.id, updates)
      setUserProfile(updatedProfile)
      return updatedProfile
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        setError('Cannot connect to database. Please try again.');
        return;
      }
      setError(error?.message)
      throw error
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}