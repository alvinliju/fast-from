"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Edit3, 
  BarChart3,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';

interface Form {
  id: string;
  title: string;
  description?: string;
  content: any;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export default function FormList() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (formId: string, currentState: boolean) => {
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms/${formId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_public: !currentState })
      });

      if (response.ok) {
        setForms(forms.map(form => 
          form.id === formId ? { ...form, is_public: !currentState } : form
        ));
      }
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form? This cannot be undone.')) {
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setForms(forms.filter(form => form.id !== formId));
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-12">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold text-black mb-1">Your forms</h1>
            <p className="text-gray-600">
              {forms.length} {forms.length === 1 ? 'form' : 'forms'}, sorted by most recent
            </p>
          </div>
          <Button 
            onClick={() => router.push('/builder')}
            className="bg-black hover:bg-gray-900 text-white h-10 px-4 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New form
          </Button>
        </div>

        {forms.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 mb-6">No forms yet. Create your first one to get started.</p>
            <Button 
              onClick={() => router.push('/builder')}
              className="bg-black hover:bg-gray-900 text-white"
            >
              Create your first form
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {forms.map((form) => (
              <div 
                key={form.id}
                className="group py-4 px-4 -mx-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-medium text-black">
                    {form.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Published</span>
                      <Switch 
                        checked={form.is_public}
                        onCheckedChange={() => handlePublishToggle(form.id, form.is_public)}
                      />
                    </div>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Updated {formatDate(form.updated_at)}</span>
                  {form.is_public && (
                    <>
                      <span>•</span>
                      <span className="text-green-600">Live</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => router.push(`/builder/${form.id}`)}
                    className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>

                  <button 
                    onClick={() => router.push(`/submissions/${form.id}`)}
                    className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
                  >
                    <BarChart3 className="w-4 h-4" />
                    View responses
                  </button>

                  <button 
                    onClick={() => window.open(`/form/${form.id}`, '_blank')}
                    className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open form
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}