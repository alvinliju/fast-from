'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/server'

export default function Auth() {
  const [email, setEmail] = useState('')
  const supabase = createClient()

  const signInWithEmail = async (e) => {
    e.preventDefault()
    await supabase.auth.signInWithOtp({ email })
    alert('Check your email!')
  }

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  }

  const signOut = () => supabase.auth.signOut()

  return (
    <div>
      <form onSubmit={signInWithEmail}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required 
        />
        <button type="submit">Sign In</button>
      </form>
      
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}