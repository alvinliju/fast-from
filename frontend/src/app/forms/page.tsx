// components/FormList.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Share, Trash2 } from 'lucide-react';

interface Form {
  id: string;
  title: string;
  description?: string;
  content: any; // Add this to get the form structure
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
      const response = await fetch('http://localhost:3001/api/forms', {
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

  const handleEdit = (formId: string) => {
    router.push(`/builder/${formId}`);
  };

  const handleView = (formId: string) => {
    router.push(`/form/${formId}`);
  };

  const handleShare = (formId: string) => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Form URL copied to clipboard!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <Button onClick={() => router.push('/builder')}>
          Create New Form
        </Button>
      </div>
      
      <div className="grid gap-4">
        {forms.map((form) => (
          <div key={form.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{form.title}</h3>
                <p className="text-gray-600 mt-1">{form.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    form.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.is_public ? 'Public' : 'Private'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(form.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(form.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleView(form.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare(form.id)}>
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}