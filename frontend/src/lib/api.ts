import { createClient } from '@/lib/supabase/server'

const supabase = createClient()

export async function callBackend(endpoint: string, options: any = {}) {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) throw new Error('Not authenticated')

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) throw new Error('API call failed')
  return response.json()
}