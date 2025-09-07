"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Eye, 
  Share2, 
  BarChart3, 
  Calendar,
  Users,
  Plus,
  ExternalLink,
  Copy,
  CheckCircle
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
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

  const handleEdit = (formId: string) => {
    router.push(`/builder/${formId}`);
  };

  const handleView = (formId: string) => {
    router.push(`/form/${formId}`);
  };

  const handleViewSubmissions = (formId: string) => {
    router.push(`/submissions/${formId}`);
  };

  const handleShare = async (formId: string) => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(formId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert('Form URL copied to clipboard!');
    }
  };

  const getQuestionCount = (form: Form) => {
    let count = 0;
    form.content?.forEach((page: any) => {
      page.content?.forEach((block: any) => {
        if (['shortText', 'longText', 'email', 'number', 'multipleChoice', 'checkbox'].includes(block.type)) {
          count++;
        }
      });
    });
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Forms</h1>
            <p className="text-gray-600 mt-1">Manage and track your form submissions</p>
          </div>
          <Button 
            onClick={() => router.push('/builder')}
            className="bg-gray-600 hover:bg-gray-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Form
          </Button>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <BarChart3 className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No forms yet</h3>
              <p className="text-gray-600 mb-6">Create your first form to start collecting responses</p>
              <Button onClick={() => router.push('/builder')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Form
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
                        {form.title}
                      </h3>
                      {form.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {form.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{getQuestionCount(form)} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(form.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <Badge 
                      variant={form.is_public ? "default" : "secondary"}
                      className={form.is_public ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {form.is_public ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(form.id)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSubmissions(form.id)}
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Responses
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(form.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(form.id)}
                      className="flex items-center gap-2"
                    >
                      {copiedId === form.id ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                      {copiedId === form.id ? 'Copied!' : 'Share'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}