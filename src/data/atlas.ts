export type AtlasStop = { title: string; note: string; href: string }
export type AtlasDoor = { title: string; description: string; href: string; kind: string; colour: string }

export const atlasDoors: AtlasDoor[] = [
  { title: 'The Room That Remembers', description: 'Notes, fragments, and echoes that refused to be lost.', href: '/applets/art-mindfulness-gumroad-bundle/memory-pattern-games/the-memory-loom/index.html', kind: 'memory · applet', colour: 'amber' },
  { title: 'The Machine Garden', description: 'Where code tends, grows, guesses, and sometimes dreams.', href: '/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/eco-link-cyber-druid-interface/index.html', kind: 'machine · garden', colour: 'emerald' },
  { title: 'Farm, Soil & Signal', description: 'Observations from the ground and the quiet in between.', href: '/saraloosa', kind: 'farm · field notes', colour: 'yellow' },
  { title: 'The Midnight Workshop', description: 'Tools, tinkering, and half-finished things that might yet work.', href: '/playspace', kind: 'making · applets', colour: 'purple' },
  { title: 'Beautiful System Failures', description: 'Glitches, dead ends, and the odd grace of things breaking.', href: '/writings/ironic-armor', kind: 'writing · systems', colour: 'pink' },
  { title: 'Quiet Rooms', description: 'Space to pause, breathe, and be with your thoughts.', href: '/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/neon-rain-zen-walk/index.html', kind: 'stillness · sound', colour: 'blue' },
]

export const atlasTrails: { title: string; intro: string; colour: string; stops: AtlasStop[] }[] = [
  {
    title: 'Things That Remember Us', intro: 'Echoes, keepsakes, and the quiet after we have gone.', colour: 'pink',
    stops: [
      { title: 'The Memory Loom', note: 'Weave what remains.', href: '/applets/art-mindfulness-gumroad-bundle/memory-pattern-games/the-memory-loom/index.html' },
      { title: 'Memory Value', note: 'A fable about what persists.', href: '/writings/memoryvalue' },
      { title: 'Whether It Still Sings', note: 'Listen for the residue.', href: '/writings/Whether%20It%20Still%20Sings' },
    ],
  },
  {
    title: 'Machines Trying to Understand People', intro: 'Learning, guessing, dreaming in code and circuits.', colour: 'purple',
    stops: [
      { title: 'Consciousness Banter', note: 'The long conversations.', href: '/chats' },
      { title: 'Authentic Human Simulator', note: 'Avoid detection. Be cringe.', href: '/applets/speculative-ai-futures/authentic-human-simulator/index.html' },
      { title: 'Symbiosis', note: 'Establish a neural handshake.', href: '/applets/speculative-ai-futures/symbiosis-human-ai-resonance/index.html' },
    ],
  },
  {
    title: 'Farm, Soil & Signal', intro: 'Roots, rhythms, animals, weather, and the data in between.', colour: 'amber',
    stops: [
      { title: 'BitSoil Farm', note: 'Turn digital noise into fertile soil.', href: '/applets/art-mindfulness-gumroad-bundle/farming-sim/bitsoil-farm-the-digital-detox/index.html' },
      { title: 'Saraloosa', note: 'The physical place beneath the signal.', href: '/saraloosa' },
      { title: 'Cyber-Homestead OS', note: 'Node: BARN_01.', href: '/applets/speculative-ai-futures/beyond-automation-ai-lab-simulator/cyber-homestead-os/index.html' },
    ],
  },
]

export const randomDoors = [
  ...atlasDoors.map((door) => door.href),
  '/observatory', '/worldworkshop', '/creative', '/data-dragons',
  '/applets/art-mindfulness-gumroad-bundle/misc-toys/orbital-bistro-edge-of-the-void/index.html',
  '/applets/speculative-ai-futures/mobius-data-self-referential-consciousness/index.html',
]
