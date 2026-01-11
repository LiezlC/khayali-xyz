export default function DomainsPage() {
  const domains = [
    {
      title: "ESG & Safeguards",
      href: "/domains/esg-safeguards",
      description: "AI governance in environmental, social, and governance frameworks for extractive industries and development finance",
      color: "from-teal-400 to-blue-500"
    },
    {
      title: "Grievance Systems",
      href: "/domains/grievance-systems",
      description: "Operational grievance mechanisms and accountability in project-affected communities",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Development Rights",
      href: "/domains/development-rights",
      description: "Resettlement, land acquisition, and rights-based approaches in development projects",
      color: "from-cyan-400 to-teal-500"
    },
    {
      title: "Worker Voice",
      href: "/domains/worker-voice",
      description: "Labor management systems, worker representation, and industrial relations",
      color: "from-emerald-400 to-green-500"
    },
    {
      title: "AI Accountability",
      href: "/domains/ai-accountability",
      description: "Pre-action constraints, liability architecture, and safety systems for AI in high-stakes operations",
      color: "from-indigo-400 to-blue-500"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Domains
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Research and analysis across five operational domains where AI accountability meets high-stakes reality.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {domains.map((domain, index) => (
            <a
              key={index}
              href={domain.href}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 hover:border-teal-500 transition-all group"
            >
              <h2 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${domain.color} bg-clip-text text-transparent`}>
                {domain.title}
              </h2>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {domain.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
