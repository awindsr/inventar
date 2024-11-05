import NextAuth, { User as NextAuthUser } from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from "./utils/supabase/client"



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
     
      const supabase = createClient()
     
      // Check if user exists in Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single()
     
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking user:', fetchError)
        return false
      }
     
      if (!existingUser) {
        // Create new user in Supabase
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([
            {
              email: user.email,
              name: user.name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating user:', createError)
          return false
        }

        // Successfully created user, allow sign in and redirect to onboarding
        return true
      }
     
      // User exists, allow sign in
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Get the latest user data from Supabase
        const supabase = createClient()
        const { data: userData, error } = await supabase
          .from('users')
          .select(`
            id,
            email,
            name,
            organization_id,
            mobile_number
          `)
          .eq('email', user.email)
          .single()

        if (!error && userData) {
          token.userId = userData.id
          token.organizationId = userData.organization_id
          token.mobileNumber = userData.mobile_number
          // Add a flag to indicate if user needs onboarding
          token.needsOnboarding = !userData.organization_id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.organizationId = token.organizationId as string
        session.user.mobileNumber = token.mobileNumber as string | undefined
        // Add the onboarding flag to the session
        session.user.needsOnboarding = token.needsOnboarding as boolean | undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle the redirect after sign in
      if (url.startsWith(baseUrl)) {
        const supabase = createClient()
        
        // Get user data to check if onboarding is needed
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('email', url) // The email will be in the session
          .single()

        // Redirect to onboarding if no organization_id
        if (!userData?.organization_id) {
          return `${baseUrl}/onboarding`
        }
        
        // Otherwise redirect to dashboard
        return `${baseUrl}/dashboard`
      }
      return baseUrl
    }
  },
  pages: {
    signIn: '/',
    newUser: '/onboarding'
  }
})