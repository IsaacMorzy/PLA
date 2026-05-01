import { Metadata } from 'next'
import { getTeamMembers } from '@/lib/cosmic'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/glass-card'

export const metadata: Metadata = {
  title: 'Our Team - PeaceLeague Africa',
  description: 'Meet the team behind PeaceLeague Africa.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()
  
  // Fallback data if no CMS content
  const fallbackMembers = [
    { id: '1', title: 'Sarah Chen', metadata: { role: 'Founder & CEO', bio: '10+ years in fintech, passionate about financial inclusion in Africa.' }},
    { id: '2', title: 'James Okonkwo', metadata: { role: 'CTO', bio: 'Former Solana validator, blockchain architecture expert.' }},
    { id: '3', title: 'Amara Diallo', metadata: { role: 'Director of Operations', bio: 'Extensive experience in NGO management across West Africa.' }},
    { id: '4', title: 'Michael Rodriguez', metadata: { role: 'Head of Partnerships', bio: 'Building bridges between donors and communities.' }},
    { id: '5', title: 'Fatima Al-Hassan', metadata: { role: 'Lead Developer', bio: 'Full-stack engineer focused on scalable systems.' }},
    { id: '6', title: 'Kwame Asante', metadata: { role: 'Community Manager', bio: 'Connecting with campaigners across the continent.' }},
  ]

  const displayTeam = teamMembers.length > 0 ? teamMembers.map(member => ({
    id: member.id,
    title: member.title || 'Team Member',
    metadata: {
      role: member.metadata?.role || '',
      bio: member.metadata?.bio || '',
      image: member.metadata?.image || ''
    }
  })) : fallbackMembers.map(m => ({
    id: m.id,
    title: m.title,
    metadata: {
      role: m.metadata.role,
      bio: m.metadata.bio,
      image: ''
    }
  }))

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('')

  return (
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden page-enter">
      {/* Warm gold mesh background */}
      <div className="fixed inset-0 pointer-events-none bg-mesh opacity-50" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #d4a853 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" 
          style={{ background: 'radial-gradient(circle, #c46d46 0%, transparent 70%)' }} 
        />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <Card variant="gold" className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              A dedicated group of professionals working to transform crowdfunding across Africa.
            </p>
          </Card>
        </section>

        {/* Team Grid - asymmetric layout */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {displayTeam.map((member, index) => (
              <Card 
                key={member.id} 
                variant={index % 3 === 0 ? 'gold' : index % 2 === 0 ? 'default' : 'gradient'} 
                hover 
                className="p-6"
              >
                <CardContent className="flex flex-col items-center text-center">
                  {/* Avatar with gradient border */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#1a1815] flex items-center justify-center">
                        {member.metadata.image ? (
                          <img 
                            src={member.metadata.image} 
                            alt={member.title} 
                            className="w-full h-full object-cover rounded-full" 
                          />
                        ) : (
                          <span className="text-xl font-bold text-[#d4a853]">{getInitials(member.title)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.title}</h3>
                  <p className="text-[#d4a853] text-sm mb-2">{member.metadata.role}</p>
                  <p className="text-white/60 text-sm">{member.metadata.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}