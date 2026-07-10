// Content source of truth for the /guides SEO section. Plain data (no React
// or Workers imports) so both the frontend pages and the sitemap Pages
// Function can import it without pulling in incompatible runtimes.

export const GUIDES = [
  {
    slug: 'accessible-ferries-yasawa',
    title: 'Accessible Ferries to the Yasawa & Mamanuca Islands | FijiBoundless',
    description: "A wheelchair user's guide to Yasawa and Mamanuca ferry travel from Port Denarau — gangway gradients, tide timing, and which boats offer real step-free boarding.",
    h1: 'Accessible Ferries to the Yasawa & Mamanuca Islands',
    intro: [
      "Almost every Yasawa and Mamanuca island trip starts at Port Denarau Marina, where catamarans and smaller transfer boats load passengers onto floating pontoons rather than a fixed pier. That distinction matters: pontoon gradient changes with the tide, so the same ferry that's an easy step-free roll-on at high tide can be a genuinely steep ramp two hours later. Nothing about this is standardised across operators, so the practical answer to \"is it accessible\" is almost always \"it depends on the tide and which crew is on duty.\"",
      "For wheelchair users, the realistic expectation is assisted boarding rather than independent step-free access — most crews will lift or support a manual wheelchair aboard on request, but this is customary goodwill rather than a guaranteed, staffed service. Power wheelchairs add complexity because of weight, and outer-island resorts like Musket Cove or Castaway often use a second, smaller runabout for the final leg from the main ferry, which rarely has any boarding aid at all.",
      "FijiBoundless tracks this at the facility level rather than assuming a whole route is or isn't accessible: Port Denarau Marina and Vuda Point Marina both carry verified notes on gangway conditions and staff assistance, updated as conditions change. Check the specific terminal before you book, not just the resort at the other end.",
    ],
    faqs: [
      {
        q: 'Are Yasawa Flyer ferries wheelchair accessible?',
        a: "Standard practice on Fiji's inter-island catamarans is manual crew assistance rather than a built-in ramp or hoist. Step-free boarding depends heavily on tide and pontoon setup at Port Denarau, so check the terminal's current verification notes before booking.",
      },
      {
        q: "What's the best time of day to board with a wheelchair?",
        a: 'Boarding is generally easier close to high tide, when the pontoon gangway lies flatter. Low tide can steepen the walkway significantly at Port Denarau and similar floating-dock terminals.',
      },
      {
        q: 'Can a power wheelchair be transported inter-island?',
        a: 'Most operators can carry a power wheelchair as stowed luggage, but getting the passenger themselves onto the vessel is the harder part. Confirm chair weight, dimensions, and battery type with the ferry operator in advance.',
      },
      {
        q: 'Do outer island resorts have their own accessible tenders?',
        a: 'Some, like Musket Cove, use small runabouts for the final leg from the main ferry drop-off. These rarely have ramps, so expect an assisted lift-in with one or two crew members.',
      },
    ],
    facilityQueries: [
      { label: 'Ferry & marina access points', params: { category: 'ferry', division: 'Western' } },
    ],
    searchLink: '/search?category=ferry&division=Western',
  },
  {
    slug: 'nadi-airport-accessibility',
    title: 'Nadi International Airport Accessibility Guide | FijiBoundless',
    description: 'Everything wheelchair users need to know about Nadi International Airport: accessible toilets, terminal layout, parking, and getting to your hotel.',
    h1: 'Nadi International Airport Accessibility Guide',
    intro: [
      "Nadi International Airport's Terminal 1 handles the large majority of Fiji's international arrivals, and structurally it's one of the more manageable airports in the Pacific for wheelchair users: the terminal is essentially single-level, with ramped kerbside access at both departures and arrivals, so there are no internal stairs to navigate between check-in, security, and the gates.",
      "The accessible toilet near the main arrivals concourse has been verified on FijiBoundless with a 90cm door and grab rails on both sides, and doesn't require a radar key — useful to know if you're arriving without one. Accessible parking is available close to the terminal entrance, and taxi/shuttle pickup is a short, flat distance from the doors.",
      "The part that varies is aircraft boarding itself: whether you get an aerobridge or need an ambulift onto the tarmac depends on the airline, the aircraft, and the gate assigned that day. Requesting wheelchair assistance through your airline at booking, or at minimum 48 hours ahead, is the single most useful thing you can do before you land.",
    ],
    faqs: [
      {
        q: 'Does Nadi Airport have wheelchair-accessible toilets?',
        a: 'Yes. Terminal 1 has a verified accessible toilet near the main arrivals concourse with a 90cm door and grab rails on both sides. No radar key is required.',
      },
      {
        q: 'Is there step-free access throughout the terminal?',
        a: 'Terminal 1 is essentially single-level with ramped kerbside access, so most wheelchair users move through check-in, security, and arrivals without encountering stairs.',
      },
      {
        q: 'How do I arrange airport wheelchair assistance in Fiji?',
        a: 'Request it directly through your airline at booking, or at least 48 hours before departure. Ground handling agents at Nadi provide ambulift and aisle-chair service for jet bridge boarding.',
      },
      {
        q: "What's the best way to get from the airport to Denarau or Nadi town?",
        a: 'A pre-booked accessible taxi or resort shuttle is most reliable — public buses in the area are rarely step-free.',
      },
    ],
    facilityQueries: [
      { label: 'Accessible toilets near Nadi', params: { category: 'toilet', division: 'Western' } },
    ],
    searchLink: '/search?category=toilet&division=Western',
  },
  {
    slug: 'accessible-hotels-denarau',
    title: 'Wheelchair Accessible Hotels on Denarau Island, Fiji | FijiBoundless',
    description: 'Compare verified accessible hotels on Denarau Island — door widths, pool hoists, and roll-in showers at Sheraton, Hilton, Westin, Radisson and more.',
    h1: 'Wheelchair Accessible Hotels on Denarau Island',
    intro: [
      "Denarau Island is Fiji's main resort strip, and it's also the most consistently accessible base in the country: the island is compact and largely flat, with a free shuttle bus looping between resorts and Port Denarau Marina, which removes a lot of the unpredictability that comes with getting around elsewhere in Fiji.",
      "The international chain resorts here — Sheraton, Westin, Hilton, and Radisson Blu among them — have generally made real investment in accessibility: step-free entry, wider doorways in adapted rooms, and pool hoist equipment are common, though availability and staff readiness can still vary day to day. It's worth confirming and requesting pool hoist access ahead of arrival rather than assuming it, and always book an accessible room category specifically rather than a standard room.",
      "Roll-in or roll-under showers tend to be limited to the adapted room categories rather than the norm across a whole property, so this is one of the details worth checking on each hotel's individual FijiBoundless listing before you commit.",
    ],
    faqs: [
      {
        q: 'Which Denarau hotels have pool hoists?',
        a: 'Several international chain resorts on Denarau — Sheraton, Westin, Hilton, and Radisson Blu among them — have pool hoist equipment. Availability and staffing can vary, so confirm and request it be readied ahead of arrival.',
      },
      {
        q: 'Are Denarau resorts easy to get around without a car?',
        a: "Yes. Denarau Island is compact and largely flat, with a free shuttle bus looping between resorts and Port Denarau Marina, making it one of the more manageable bases in Fiji for wheelchair users.",
      },
      {
        q: 'Do any Denarau hotels have roll-in showers?',
        a: 'Some adapted rooms at the larger chain resorts include roll-in or roll-under showers. Standard rooms typically do not, so always request an accessible room category specifically when booking.',
      },
      {
        q: 'Is Denarau better for accessibility than Nadi town?',
        a: "Generally yes. Denarau's purpose-built resort infrastructure and shuttle system make it more predictable than central Nadi, where footpaths and older buildings are less consistent.",
      },
    ],
    facilityQueries: [
      { label: 'Denarau hotels', params: { category: 'hotel', division: 'Western' }, clientFilter: f => f.town_or_area === 'Denarau' },
    ],
    searchLink: '/search?category=hotel&division=Western',
  },
  {
    slug: 'vanua-levu-accessibility-guide',
    title: 'Vanua Levu Accessibility Guide: Savusavu & Labasa | FijiBoundless',
    description: "Planning an accessible trip to Vanua Levu? A practical guide to Savusavu and Labasa's terrain, ferries, hotels, and all-terrain wheelchair options.",
    h1: 'Vanua Levu Accessibility Guide',
    intro: [
      "Vanua Levu is Fiji's second-largest island and a genuinely different kind of trip from the Nadi–Denarau resort strip: far less built up, hillier, and with a fraction of the paved footpaths. Savusavu, the main tourism town, is a dive and eco-tourism hub with a scattering of resorts along the coast; Labasa, on the north side, is more of a working sugarcane town than a visitor base.",
      "Getting there is itself a decision worth planning around. Most travellers fly into Savusavu or Labasa airport from Nadi or Suva on small domestic aircraft; the alternative is an overnight ferry, which involves manual boarding assistance at both ends and is a longer, less predictable option for wheelchair users.",
      "Once on the island, expect uneven footpaths and sloped terrain in the town centres, offset by some genuinely well-adapted resorts — including at least one property purpose-built with accessible bungalows. Labasa has little dedicated tourism accessibility infrastructure and is best treated as a day visit rather than a base. An all-terrain or all-terrain-adjacent wheelchair makes a real difference for anything beyond resort grounds.",
    ],
    faqs: [
      {
        q: 'How do you get to Vanua Levu?',
        a: 'Most travellers fly into Savusavu or Labasa airport from Nadi or Suva. The alternative is an overnight ferry, which involves manual boarding assistance at both ends and is a longer, less predictable option for wheelchair users.',
      },
      {
        q: 'Is Savusavu wheelchair friendly?',
        a: "Savusavu's town centre has some uneven footpaths and hilly terrain, but several resorts along the coast — including purpose-built accessible bungalows — offer a genuinely comfortable base.",
      },
      {
        q: 'What about Labasa?',
        a: 'Labasa is more of a working town than a tourist base. Accessibility infrastructure is inconsistent, so most visitors treat it as a day visit rather than a place to stay.',
      },
      {
        q: 'Do I need an all-terrain wheelchair on Vanua Levu?',
        a: 'For anything beyond resort grounds — village visits, waterfalls, market streets — an all-terrain or all-terrain-adjacent wheelchair makes a real difference given the unpaved and sloped terrain common across the island.',
      },
    ],
    facilityQueries: [
      { label: 'Vanua Levu facilities', params: { division: 'Northern' }, clientFilter: f => f.island === 'Vanua Levu' },
    ],
    searchLink: '/search?division=Northern',
  },
  {
    slug: 'sensory-friendly-fiji-resorts',
    title: 'Sensory-Friendly Resorts in Fiji: Quiet, Low-Stimulation Stays | FijiBoundless',
    description: 'Find Fiji resorts rated for sensory-friendly travel — lower noise levels, quiet hours, and calmer environments for neurodivergent guests.',
    h1: 'Sensory-Friendly Resorts in Fiji',
    intro: [
      "Not every accessibility need is about mobility. Nightly meke shows, pool bars with live music, and crowded buffet restaurants are a selling point for some travellers and a genuine barrier for others — particularly neurodivergent guests or anyone sensitive to noise, crowding, or unpredictable environments.",
      "FijiBoundless verifiers score every facility on a 1–5 sensory-friendly rating alongside a separate noise-level rating, and log specific quiet-hours windows or low-lighting options where they exist. A 4 or 5 sensory-friendly rating generally means a calmer, more predictable stay — this tends to favour smaller boutique and eco-lodge properties set away from a resort's main entertainment strip, though it isn't an absolute rule.",
      "Beyond picking the right property, booking a garden-view or end-of-row room away from pool bars, travelling outside Fiji's peak December–January season, and using the AI Concierge to filter specifically by sensory sensitivity are the most reliable ways to reduce surprises once you arrive.",
    ],
    faqs: [
      {
        q: 'What does "sensory-friendly rating" mean on FijiBoundless?',
        a: "It's a 1–5 field our verifiers assess on-site, covering ambient noise, crowding, and predictability of the environment. A 4 or 5 generally means a calmer, lower-stimulation stay.",
      },
      {
        q: 'Are big international resorts less sensory-friendly?',
        a: 'Not always, but larger resorts with nightly entertainment, pool bars, and meke shows tend to score lower on noise than smaller boutique or eco-lodges set away from the main strip.',
      },
      {
        q: 'Do any resorts offer quiet hours or low-lighting rooms?',
        a: 'A handful of properties in our database log specific quiet-hours windows and low-lighting options. Look for those fields on the facility page rather than assuming from marketing photos.',
      },
      {
        q: 'What else helps a sensory-sensitive trip go smoothly?',
        a: 'Booking end-of-row or garden-view rooms away from pool bars, travelling outside Fiji\'s peak December–January season, and using the AI Concierge to filter specifically by noise sensitivity.',
      },
    ],
    facilityQueries: [
      { label: 'Higher sensory-friendly rated hotels', params: { category: 'hotel' }, clientFilter: f => f.sensory_friendly_rating >= 4 },
    ],
    searchLink: '/search?category=hotel',
  },
  {
    slug: 'all-terrain-wheelchair-northern-fiji',
    title: 'All-Terrain Wheelchair Access in Northern Fiji | FijiBoundless',
    description: 'Where to find all-terrain wheelchair access across Vanua Levu and Taveuni — beaches, waterfalls, and village paths in Fiji\'s Northern Division.',
    h1: 'All-Terrain Wheelchair Access in Northern Fiji',
    intro: [
      "Northern Fiji — Vanua Levu and Taveuni — is far more rural than the Nadi–Denarau resort corridor, and a standard indoor wheelchair struggles quickly once you're off a resort's paved paths. Coral sand, grass, and laterite roads are the norm rather than the exception, which makes an all-terrain wheelchair, fitted with wide, low-pressure or track-style wheels, genuinely necessary rather than a nice-to-have.",
      "Coverage of all-terrain equipment is patchier here than in the Western Division: beach resorts and eco-lodges around Savusavu and Taveuni are the most likely to have equipment on-site or accessible nearby, but it's far from universal, so checking the specific all-terrain flag on each facility's FijiBoundless listing before travelling matters more here than almost anywhere else in the country.",
      "Attractions like Taveuni's Bouma waterfalls involve genuinely steep, uneven trail sections that even an all-terrain chair can't fully resolve — the practical approach for those sites is usually to treat the accessible section as a viewpoint rather than expecting full trail completion.",
    ],
    faqs: [
      {
        q: 'What is an all-terrain wheelchair?',
        a: "A wheelchair fitted with wide, low-pressure or track-style wheels designed for sand, grass, and uneven ground. Standard indoor wheelchairs struggle on Northern Fiji's unsealed paths.",
      },
      {
        q: 'Which Northern Fiji locations suit all-terrain chairs?',
        a: "Beach resorts and eco-lodges around Savusavu and Taveuni are the most likely to have all-terrain equipment on-site or nearby. Check each facility's page for the all-terrain wheelchair flag before travelling.",
      },
      {
        q: 'Can I bring my own all-terrain wheelchair on inter-island flights?',
        a: 'Yes, most domestic carriers accept mobility equipment, but always declare dimensions and battery type (if powered) at booking, since the small aircraft used on Northern routes have limited cargo space.',
      },
      {
        q: 'Is Taveuni easier than Vanua Levu for all-terrain access?',
        a: "Both islands have similarly rugged terrain outside resort grounds. Taveuni's attractions like Bouma's waterfalls involve genuinely steep, uneven trails that even all-terrain chairs can't fully resolve, so treat trail sections as viewpoint-only.",
      },
    ],
    facilityQueries: [
      { label: 'All-terrain wheelchair facilities', params: { division: 'Northern' }, clientFilter: f => f.all_terrain_wheelchair === 1 },
    ],
    searchLink: '/search?division=Northern',
  },
  {
    slug: 'accessible-village-stays-fiji',
    title: 'Accessible Village Stays in Fiji Under the Tourism Bill | FijiBoundless',
    description: 'A guide to visiting and staying in traditional Fijian villages accessibly — sevusevu protocol, terrain realities, and which villages are assessed.',
    h1: 'Accessible Village Stays in Fiji',
    intro: [
      "A traditional village stay is one of the most authentic experiences Fiji offers, and one of the least assessed for accessibility. Villages typically involve sevusevu — the customary presentation of kava to elders before entry — which is a social protocol rather than a physical barrier, but it does mean visits need to be pre-arranged, which is actually useful: it gives hosts time to plan an accessible route and let you know what to expect.",
      "Physically, most villages have grass, dirt, or gravel paths connecting homes, with communal living spaces that weren't built with wheelchairs in mind. An all-terrain chair or an assisted mobility plan is usually necessary, and this varies enormously from village to village depending on terrain and how developed the paths are.",
      "FijiBoundless verifies villages as data becomes available from community members and tourism partners, as part of the same certification framework the Tourism Bill 2026 established for accessible facilities more broadly — but coverage is still limited compared to hotels and resorts. Always contact the village tourism committee or a licensed cultural tour operator directly to confirm what's realistic for your specific mobility needs before booking.",
    ],
    faqs: [
      {
        q: 'What is sevusevu and does it affect accessibility planning?',
        a: "Sevusevu is the customary presentation of kava to village elders before entering. It's a social protocol, not a physical barrier, but it does mean visits should be pre-arranged rather than spontaneous, giving hosts time to plan accessible routes.",
      },
      {
        q: 'Are village paths wheelchair accessible?',
        a: 'Most traditional villages have grass, dirt, or gravel paths between homes, which are difficult for standard wheelchairs. An all-terrain chair or assisted mobility plan is usually needed.',
      },
      {
        q: 'Which villages have been assessed for accessibility?',
        a: "Coverage is still limited — FijiBoundless verifies villages as data becomes available from community and partner sources. Check individual village listings for the latest verification status before booking.",
      },
      {
        q: 'How do I arrange an accessible village visit?',
        a: 'Contact the village tourism committee or a licensed cultural tour operator directly, explain specific mobility needs in advance, and confirm whether transport to and within the village can accommodate a wheelchair.',
      },
    ],
    facilityQueries: [
      { label: 'Village stays', params: { category: 'village' } },
    ],
    searchLink: '/search?category=village',
  },
  {
    slug: 'port-denarau-accessibility',
    title: 'Port Denarau Marina Accessibility Guide | FijiBoundless',
    description: 'Accessibility at Port Denarau Marina — ferry terminal gangways, shops, restaurants, and tide-dependent boarding for Yasawa and Mamanuca transfers.',
    h1: 'Port Denarau Marina Accessibility Guide',
    intro: [
      "Port Denarau is the retail, dining, and ferry hub for the whole Denarau resort strip, and structurally it's one of the more accessible precincts in Fiji: the main plaza, shops, and restaurants sit on a flat, paved surface with no meaningful step-free barriers between them.",
      "The one variable worth planning around is the floating pontoon system used for ferry boarding to the Yasawas and Mamanucas. Because the pontoons float, the gangway gradient changes with the tide — flatter near high tide, noticeably steeper near low tide. This is the single biggest factor in how smooth or difficult boarding will be on any given day.",
      "Accessible toilet facilities are available within the main terminal building near the ferry check-in counters, and while boarding assistance from ferry staff is common on request, it isn't formally standardised across operators — mention mobility needs when booking, then again at check-in on the day itself.",
    ],
    faqs: [
      {
        q: 'Is Port Denarau Marina wheelchair accessible?',
        a: 'The main plaza, shops, and restaurants at Port Denarau are largely flat and step-free. The main challenge is the floating pontoon system used for ferry boarding, where the gangway gradient changes with the tide.',
      },
      {
        q: 'What time should I arrive for a ferry with a wheelchair?',
        a: 'Arrive at least 45–60 minutes early. This gives staff time to arrange assistance and lets you assess the pontoon gradient before the general boarding rush.',
      },
      {
        q: 'Are there accessible toilets at Port Denarau?',
        a: 'Yes, the marina precinct has accessible toilet facilities within the main terminal building near the ferry check-in counters.',
      },
      {
        q: 'Can I get assistance from ferry staff at Port Denarau?',
        a: "Most operators provide informal boarding assistance on request, but it isn't guaranteed or standardised. Mention mobility needs when booking, and again at check-in on the day.",
      },
    ],
    facilityQueries: [
      { label: 'Port Denarau ferry & marina access', params: { category: 'ferry', division: 'Western' } },
      { label: 'Denarau hotels nearby', params: { category: 'hotel', division: 'Western' }, clientFilter: f => f.town_or_area === 'Denarau' },
    ],
    searchLink: '/search?category=ferry&division=Western',
  },
  {
    slug: 'fiji-accessible-beaches',
    title: 'Accessible Beaches in Fiji: Beach Wheelchairs & Firm Sand | FijiBoundless',
    description: 'Find Fiji beaches with beach wheelchairs, firm sand access, and all-terrain wheelchair availability — from Natadola to the Yasawas.',
    h1: 'Accessible Beaches in Fiji',
    intro: [
      "Fiji's beaches vary a lot more than travel photos suggest — some are firm coral sand that a standard wheelchair can cross reasonably well, others are soft and deep enough that even an all-terrain chair works hard. Tide matters too: sand is generally firmer near low tide, while the soft, dry sand above the high-tide line is consistently the hardest section for any wheeled mobility device to cross.",
      "A number of resorts and a handful of public beaches keep a beach wheelchair on-site — an oversized-tyre chair designed specifically to roll over sand without sinking, usually available free to guests or through a lifeguard hut. Availability changes over time and isn't always well publicised, so FijiBoundless tracks a beach_wheelchair_available flag at the facility level rather than assuming from a resort's general reputation.",
      "Natadola Beach is currently one of the best-documented examples, with both a beach wheelchair and all-terrain wheelchair access noted — though as with anywhere, it's worth verifying current status before you make the trip, since equipment availability can shift.",
    ],
    faqs: [
      {
        q: 'What is a beach wheelchair?',
        a: 'A wheelchair with oversized balloon tyres designed to roll over sand without sinking. Several resorts and a few public beaches in Fiji keep one on-site, usually free to guests or via the lifeguard hut.',
      },
      {
        q: 'Which Fiji beaches have beach wheelchairs available?',
        a: "Availability changes over time and by season. Check each beach's facility page on FijiBoundless for the current beach_wheelchair_available status rather than relying on general reputation.",
      },
      {
        q: 'Is Natadola Beach wheelchair accessible?',
        a: "Natadola is one of Fiji's most accessible beaches on record, with both beach wheelchair and all-terrain wheelchair access noted, though conditions can vary — verify current status before visiting.",
      },
      {
        q: 'Does tide affect beach accessibility?',
        a: 'Yes, significantly. Sand is generally firmer and easier to cross near low tide, while soft, dry sand above the high-tide line is the hardest section for any wheeled mobility device.',
      },
    ],
    facilityQueries: [
      { label: 'Accessible beaches', params: { category: 'beach' } },
    ],
    searchLink: '/search?category=beach',
  },
  {
    slug: 'nadi-accessible-toilets-map',
    title: 'Accessible Toilets in Nadi, Fiji: Verified Map & List | FijiBoundless',
    description: 'A verified list of wheelchair-accessible toilets in Nadi — airport, town market, Denarau, and Wailoaloa Beach, with door widths and grab rail details.',
    h1: 'Accessible Toilets in Nadi',
    intro: [
      "Most trip planning focuses on hotels and attractions, but a surprisingly common source of stress for wheelchair travellers is simply finding an accessible public toilet outside a hotel room. Nadi has fewer verified options than its size suggests, which makes knowing exactly where they are before you set out genuinely useful.",
      "The most reliable option is Nadi International Airport Terminal 1, with a verified accessible toilet near arrivals, a 90cm door, and no radar key required. Port Denarau Marina's terminal building also has accessible facilities near the ferry check-in counters. Nadi Town Market has one too, though the most recent community verification flagged a steep ramp due for resurvey — worth checking the latest status before relying on it. A public toilet also exists at Wailoaloa Beach, though it currently lacks a formal accessible path from the car park.",
      "This list changes as facilities are maintained, repaired, or occasionally close — FijiBoundless relies on traveller and community verification submissions to keep it current, so if something has changed since your visit, reporting it helps the next traveller.",
    ],
    faqs: [
      {
        q: 'Are there public accessible toilets in Nadi town itself?',
        a: 'Yes, though limited — Nadi Town Market has a verified accessible toilet, though community reports note a steep ramp that\'s due for resurvey. Most other public toilets in town are not step-free.',
      },
      {
        q: 'What about the airport?',
        a: 'Nadi International Airport Terminal 1 has a verified accessible toilet near arrivals with a 90cm door and no radar key required.',
      },
      {
        q: 'Is there an accessible toilet at Wailoaloa Beach?',
        a: 'A public toilet exists at Wailoaloa Beach, but at last community verification it lacked a formal accessible path from the car park to the facility — check the latest status before relying on it.',
      },
      {
        q: "How do I report a toilet that's changed since it was last verified?",
        a: 'Use the "Submit a Verification" link on any facility page, or the community verification form, to log an update. FijiBoundless relies on traveller and community reports to keep this map current.',
      },
    ],
    facilityQueries: [
      { label: 'Verified accessible toilets in Nadi', params: { category: 'toilet', division: 'Western' } },
    ],
    searchLink: '/search?category=toilet&division=Western',
  },
  {
    slug: 'fiji-accessible-transport',
    title: 'Accessible Transport in Fiji: The Complete 2026 Guide | FijiBoundless',
    description: 'Everything on accessible transport in Fiji — the only wheelchair-lift vehicle in the country, airport assistance, ferry realities, and what to pre-book before you land.',
    h1: 'Accessible Transport in Fiji: The Complete 2026 Guide',
    intro: [
      "Ground transport is the single biggest planning gap for wheelchair users visiting Fiji, and it's worth knowing the honest picture before you arrive: as far as our research has identified, Tourist Transport Fiji (TTF) operates the only wheelchair-lift vehicle in the country — a Toyota van fitted with a Braun 250kg lift, based at Port Denarau and serving all major hotels plus the cruise ship wharf. It's a single unit rather than a fleet, so book it well ahead of arrival rather than assuming availability on short notice.",
      "Rosie Holidays runs a broader accessible vehicle fleet for airport transfers and island tours, which is worth confirming as a second option alongside TTF, particularly if your dates don't line up with TTF's van. Outside of these two operators, standard taxis and resort shuttles in Fiji are rarely wheelchair accessible, so don't plan around finding one on arrival.",
      "At Nadi International Airport, aircraft boarding assistance (ambulift or aisle chair) is arranged through your airline rather than through ground transport operators — request it at booking or at least 48 hours ahead. Inter-island transport is a different picture again: ferries and catamarans board via crew-assisted manual lifting rather than a mechanical lift, and gangway conditions are tide-dependent at floating-pontoon terminals like Port Denarau. Power wheelchair users should confirm chair weight and dimensions with any operator, whether it's a road transfer or a boat, well before travel — this is the detail most likely to cause a booking to fall through at the last minute.",
    ],
    faqs: [
      {
        q: 'Is there a wheelchair accessible taxi in Fiji?',
        a: "Not in the way you might expect from other countries. Standard taxis in Fiji are not wheelchair accessible. Tourist Transport Fiji (TTF) operates the only wheelchair-lift vehicle we've identified, and Rosie Holidays runs an accessible vehicle fleet — both need to be pre-booked rather than hailed.",
      },
      {
        q: 'Can I get a wheelchair lift vehicle from Nadi airport?',
        a: "Yes — Tourist Transport Fiji's lift-equipped van is based at Port Denarau and serves Nadi Airport transfers, along with major hotels and the cruise wharf. Book ahead, since it's a single vehicle rather than a fleet.",
      },
      {
        q: 'How do I book accessible transport between islands?',
        a: "Inter-island transport is by boat or small aircraft rather than road vehicle, so 'accessible transport' there means confirming assisted boarding with the ferry or airline directly. Neither TTF nor Rosie Holidays operate boats themselves — they're for transfers on Viti Levu.",
      },
      {
        q: 'Are Fiji ferries wheelchair accessible?',
        a: 'Generally via crew-assisted manual boarding rather than a mechanical lift or ramp. Gangway conditions at floating-pontoon terminals change with the tide. See our dedicated ferry accessibility guide for terminal-by-terminal detail.',
      },
      {
        q: 'What transport is available for power wheelchair users?',
        a: "The same operators — TTF and Rosie Holidays — but confirm your chair's weight and dimensions when booking, since vehicle lifts and ramps have real capacity limits. For inter-island travel, declare weight and battery type to the ferry or airline in advance.",
      },
    ],
    facilityQueries: [
      { label: 'Accessible transport operators', params: { category: 'transport' } },
    ],
    searchLink: '/search?category=transport',
  },
  {
    slug: 'coral-coast-accessibility',
    title: 'Coral Coast Fiji Accessibility Guide 2026 | FijiBoundless',
    description: 'The Coral Coast accessibility guide: Shangri-La Yanuca Island, InterContinental Natadola, The Warwick Fiji, and Natadola Beach — what to expect and how far it is from Nadi.',
    h1: 'Coral Coast Fiji Accessibility Guide 2026',
    intro: [
      "The Coral Coast — the stretch of Queens Road running southeast from Nadi through Sigatoka and Korolevu — is home to some of Fiji's best-documented accessible resorts, and it's a genuinely different experience from Denarau: fewer resorts, a longer drive, but in places a noticeably higher standard of accessible infrastructure.",
      "Shangri-La Yanuca Island Fiji is the standout: every room is wheelchair accessible with walk-in showers, ramps are built into every wing rather than added afterward, a dedicated beach wheelchair is kept on site, and the resort is connected to the mainland by a causeway — no boat transfer required, which removes a variable that complicates so many other island properties. Further along, InterContinental Fiji Golf Resort & Spa at Natadola Bay has level concrete pathways throughout the grounds, ramps built in alongside every staircase, and lifts to the lobby and main restaurant. The Warwick Fiji offers a more modest but still genuine option: two accessible Garden View rooms on the ground floor near the lift, with walk-in showers and support railings.",
      "Natadola Beach itself, a short distance from the InterContinental, is consistently cited as Fiji's most accessible public beach, with a maintained pathway from the car park down to the sand. The Coral Coast is roughly 45–90 minutes' drive from Nadi International Airport depending on exactly where you're headed — Sigatoka and Natadola are the closer end, Korolevu further on — so factor that into transfer planning, especially if you're booking through Tourist Transport Fiji or Rosie Holidays.",
    ],
    faqs: [
      {
        q: 'What is the most accessible resort on the Coral Coast?',
        a: 'Shangri-La Yanuca Island Fiji, by a clear margin in the research we\'ve reviewed — every room is wheelchair accessible, with ramps built into every wing and a dedicated beach wheelchair, and it\'s reached by causeway rather than boat.',
      },
      {
        q: 'Is Natadola Beach wheelchair accessible?',
        a: "Yes — it's specifically documented as having a maintained accessible pathway from the car park to the sand, and is widely cited as Fiji's most accessible public beach.",
      },
      {
        q: 'How far is the Coral Coast from Nadi airport?',
        a: "Roughly 45–90 minutes by road depending on the exact resort — Sigatoka and Natadola are the closer end of the Coral Coast, Korolevu and beyond are further. Factor this into any pre-booked accessible transfer.",
      },
      {
        q: 'Which Coral Coast resorts have beach wheelchairs?',
        a: 'Shangri-La Yanuca Island keeps a dedicated beach wheelchair on site, and InterContinental Natadola Bay also has beach wheelchairs available on request. Confirm current availability directly before you travel.',
      },
    ],
    facilityQueries: [
      { label: 'Coral Coast hotels', params: { category: 'hotel', division: 'Western' }, clientFilter: f => ['Coral Coast', 'Natadola'].includes(f.town_or_area) || f.island === 'Yanuca Island' },
      { label: 'Beaches', params: { category: 'beach', division: 'Western' }, clientFilter: f => f.town_or_area === 'Natadola' },
    ],
    searchLink: '/search?division=Western&category=hotel',
  },
  {
    slug: 'accessible-resorts-mamanuca-islands',
    title: 'Accessible Resorts in the Mamanuca Islands: 2026 Guide | FijiBoundless',
    description: 'Which Mamanuca Islands resorts are genuinely accessible — VOMO, Plantation Island, Likuliku, and Castaway Island — and what boat transfer involves for wheelchair users.',
    h1: 'Accessible Resorts in the Mamanuca Islands',
    intro: [
      "The Mamanuca Islands are Fiji's classic postcard resort chain, and nearly every one of them is reached the same way regardless of budget: a fast catamaran from Port Denarau, or in some cases a scenic seaplane transfer. Both involve a level of assisted, non-mechanical boarding that's worth planning around rather than being surprised by — catamarans use gangway boarding with crew assistance rather than a ramp or lift, and seaplane transfers involve being carried or assisted onto a floating dock and then the aircraft itself.",
      "Within that shared logistics picture, accessibility on the ground varies a lot by resort. VOMO Island Fiji reopened in April 2026 after a full renovation, which is worth knowing since post-renovation properties sometimes have upgraded accessible pathways not yet reflected in older reviews. Plantation Island Resort was still working toward a late-2026 reopening as of our last research pass, so treat any accessibility claims there as provisional until it's confirmed open again. Likuliku Lagoon Resort completed a multi-million dollar upgrade with an adults-only, overwater-and-beachfront layout — boat transfer from Denarau applies here as with the others. Castaway Island Fiji is a longer-established Mamanuca property with resort buggies on sand paths rather than fully step-free grounds.",
      "The practical takeaway: before booking any Mamanuca resort, ask specifically how the boat or seaplane transfer will handle your mobility equipment, whether crew can lift you and your chair safely, and what happens if conditions are too rough on the day. This is the single most important question for this island group — resort-side accessibility is often good, but the transfer is the part most travellers underestimate.",
    ],
    faqs: [
      {
        q: 'Can wheelchair users visit the Mamanuca Islands?',
        a: "Yes, but transfer logistics matter more here than at any mainland resort. Boarding a catamaran or seaplane involves assisted, non-mechanical boarding — plan around that rather than assuming a ramp or lift will be available.",
      },
      {
        q: 'Is the South Sea Cruises catamaran wheelchair accessible?',
        a: "Boarding is via gangway with crew assistance rather than a dedicated wheelchair ramp or lift. Gangway gradient depends on tide and terminal — see our Port Denarau and ferry accessibility guides for more detail.",
      },
      {
        q: 'Which Mamanuca resort is best for mobility needs?',
        a: 'Based on available research, Likuliku Lagoon Resort and the newly renovated VOMO Island Fiji are the strongest current options, though always reconfirm specifics directly with the resort before booking, since accessibility features can change with renovations.',
      },
      {
        q: 'Can I take a power wheelchair on a Fiji ferry?',
        a: "Most operators can carry a power wheelchair as stowed equipment, but declare its weight, dimensions, and battery type well in advance — this is the detail most likely to cause a problem on the day if it's left unconfirmed.",
      },
    ],
    facilityQueries: [
      { label: 'Mamanuca Islands resorts', params: { category: 'hotel', division: 'Western' }, clientFilter: f => f.town_or_area === 'Mamanuca Group' },
    ],
    searchLink: '/search?division=Western&category=hotel',
  },
  {
    slug: 'suva-accessibility-guide',
    title: "Suva Accessibility Guide: Fiji's Capital for All Travellers | FijiBoundless",
    description: "An accessibility guide to Suva, Fiji's capital — the Fiji Museum's ramps and audio guides, Holiday Inn Suva, Albert Park, and getting into the city from either airport.",
    h1: "Suva Accessibility Guide: Fiji's Capital for All Travellers",
    intro: [
      "Suva is a working capital city rather than a resort strip, and that changes the accessibility picture: footpaths, kerb cuts, and building access vary block by block in a way they don't on a purpose-built resort island. The good news is that the city's standout cultural attraction is also its most accessible: the Fiji Museum, set in the quiet grounds of Thurston Gardens, is the only major cultural attraction in Fiji with confirmed ramp access and audio guides for vision-impaired visitors — a genuinely rare combination in the region.",
      "Holiday Inn Suva sits centrally on Victoria Parade with confirmed accessible rooms and lift access to all floors, making it a practical base for exploring the city centre, Albert Park, and the waterfront without needing a vehicle for every trip. Suva's municipal market and older government buildings are far more mixed — narrow aisles, uneven older flooring, and inconsistent ramp provision are common, so treat those as places to visit with an assisted plan rather than assuming independent access.",
      "Getting to Suva depends on where you're arriving from: Nausori Airport, about 45 minutes northeast of the city, handles most domestic flights into the capital, while travellers connecting from Nadi International Airport face a genuinely long road transfer of three to four hours down the Queens or Kings Road. For a short Suva visit, flying into Nausori is usually the more manageable option; for a longer Fiji itinerary that includes Suva as one stop among several, factor the drive time into your accessible transport booking well ahead.",
    ],
    faqs: [
      {
        q: 'Is Suva accessible for wheelchair users?',
        a: "Partially, and it varies block by block — Suva is a working city rather than a purpose-built resort area. Central spots like the Fiji Museum and Holiday Inn Suva are confirmed accessible; older government buildings and the municipal market are far more mixed.",
      },
      {
        q: 'What is the most accessible attraction in Suva?',
        a: 'The Fiji Museum in Thurston Gardens — the only major cultural attraction in Fiji with confirmed ramp access and audio guides for vision-impaired visitors, in a quiet, low-noise setting.',
      },
      {
        q: 'Is Nausori Airport accessible?',
        a: "Nausori handles most domestic flights into Suva and is the more practical arrival point for a Suva-focused visit compared to the three-to-four-hour road transfer from Nadi International Airport. Confirm ground assistance directly with your domestic carrier when booking.",
      },
      {
        q: 'Are there accessible restaurants in Suva city centre?',
        a: 'A handful of central options report step-free entry, though provision is inconsistent across the city. Check individual facility listings for current verification status before relying on any single venue.',
      },
    ],
    facilityQueries: [
      { label: 'Suva facilities', params: { division: 'Central' }, clientFilter: f => f.town_or_area === 'Suva' },
    ],
    searchLink: '/search?division=Central',
  },
  {
    slug: 'fiji-airways-accessibility',
    title: 'Fiji Airways Accessibility Guide 2026 | FijiBoundless',
    description: 'Flying Fiji Airways with a disability — wheelchair assistance booking, aisle chairs, seating requests, mobility equipment, and service animals.',
    h1: 'Fiji Airways Accessibility Guide',
    intro: [
      "Fiji Airways is the national carrier and the airline most travellers use to reach Nadi, whether flying in from Los Angeles, Sydney, Auckland, or connecting onward to Suva, Savusavu, or Taveuni. Requesting wheelchair assistance is done through the airline directly rather than through any third party — at booking, through the \"special assistance\" option in manage-my-booking, or by phone. The general rule across most airlines including Fiji Airways is to request at least 48 hours before departure, though earlier is always safer for anything beyond basic assistance.",
      "On the aircraft itself, an aisle chair is used to transfer passengers who can't walk to their seat, since standard wheelchairs don't fit down the aisle of any commercial aircraft. If you use a power wheelchair, it typically travels as checked mobility equipment in the cargo hold — declare the battery type (spillable, non-spillable, or lithium) when booking, since this affects handling requirements and occasionally requires advance notice for the specific aircraft type. Domestic legs to Savusavu, Taveuni, or Suva often use smaller aircraft (ATR turboprops), which have tighter aisle and door dimensions than the international 737/A350 fleet — worth confirming assistance separately for each leg of a multi-flight itinerary rather than assuming it carries over automatically.",
      "Seating requests for extra legroom or specific rows suited to a transfer are best made directly with the airline rather than through a general online travel agent, since agent-booked tickets sometimes don't carry special-assistance flags through to the airline's own systems. Service animals are generally accepted with the correct documentation arranged in advance — check Fiji's biosecurity import requirements for animals separately, since these apply regardless of the animal's working status.",
    ],
    faqs: [
      {
        q: 'How do I request wheelchair assistance with Fiji Airways?',
        a: "Request it through the airline directly — via the special assistance option when booking, through manage-my-booking, or by phone — at least 48 hours before departure. If you booked through a travel agent, it's worth confirming the request actually reached the airline's own system.",
      },
      {
        q: 'Can I bring my own wheelchair on Fiji Airways?',
        a: 'Yes. Manual wheelchairs are commonly accepted as checked mobility equipment at no extra charge; power wheelchairs need the battery type declared at booking (spillable, non-spillable, or lithium) since this affects handling.',
      },
      {
        q: 'Does Fiji Airways allow service animals?',
        a: "Generally yes with correct documentation arranged in advance, but check Fiji's biosecurity import requirements for animals separately — these apply regardless of the animal's working status.",
      },
      {
        q: 'What seating options exist for reduced mobility?',
        a: "Extra-legroom or aisle-adjacent seating suited to a transfer can be requested directly with the airline. Domestic legs on smaller ATR aircraft have tighter dimensions than international flights, so confirm assistance separately for each leg of a multi-flight itinerary.",
      },
    ],
    facilityQueries: [
      { label: 'Ground transport after landing', params: { category: 'transport' } },
    ],
    searchLink: '/search?category=transport',
  },
  {
    slug: 'fiji-cruise-ship-accessibility',
    title: 'Cruise Ship Accessibility in Fiji: Port & Tender Guide 2026 | FijiBoundless',
    description: 'Which Fiji cruise ports allow direct ship-to-shore access and which require a tender boat — the single biggest accessibility factor for cruise passengers.',
    h1: 'Cruise Ship Accessibility in Fiji: Port & Tender Guide',
    intro: [
      "The single biggest accessibility factor for a Fiji cruise call isn't the destination itself — it's whether the ship can dock directly at a wharf or has to anchor offshore and ferry passengers in on tender boats. Deep-water ports like Suva and Lautoka allow direct berth alongside a wharf, meaning passengers can walk or wheel straight off the ship onto solid ground — by far the more manageable option for wheelchair users and anyone with limited mobility.",
      "Smaller island stops common on South Pacific itineraries — places like Dravuni Island or other Lau and Yasawa group anchorages — typically require a tender: a small boat that ferries passengers from the ship to shore, often involving steps down from the ship's platform and an assisted transfer into a rocking tender that can't accommodate a wheelchair in most cases. This is worth treating as a hard constraint rather than a minor inconvenience — some passengers with mobility equipment choose to stay aboard on tender days rather than attempt the transfer, which is a completely reasonable call.",
      "Cruise lines have dedicated accessibility or special-needs desks and strongly prefer advance notice — ideally at booking, and again a few weeks before departure — so they can flag which excursions and ports are genuinely workable for your specific equipment and needs. Shore excursions booked through the cruise line usually list accessibility information more reliably than independently-booked local tours, though neither should be taken as a guarantee without a direct call to confirm.",
    ],
    faqs: [
      {
        q: 'Do Fiji cruise ports have wheelchair accessible tenders?',
        a: "Generally no — tender boats used at anchorage ports typically can't accommodate a wheelchair, and the transfer involves steps and an assisted boarding into a small, moving boat. This is the main reason to check each port's docking type before booking.",
      },
      {
        q: 'Which Fiji ports allow direct ship-to-shore access?',
        a: 'Suva and Lautoka are deep-water ports that allow direct berth alongside a wharf, letting passengers disembark without a tender. Smaller island stops on South Pacific itineraries usually require tenders instead.',
      },
      {
        q: 'How do I arrange accessible shore excursions in Fiji?',
        a: "Book through the cruise line's own excursion desk where possible — their listings tend to carry more reliable accessibility detail than independently-booked local tours — and confirm specifics directly rather than relying on a general description.",
      },
      {
        q: 'Should I contact the cruise line before booking a Fiji itinerary?',
        a: "Yes. Cruise lines have dedicated accessibility desks and prefer advance notice, ideally at booking and again a few weeks before departure, so they can flag which specific ports and excursions are workable for your equipment and needs.",
      },
    ],
    facilityQueries: [
      { label: 'Ferry & marina access points', params: { category: 'ferry' } },
    ],
    searchLink: '/search?category=ferry',
  },
  {
    slug: 'fiji-travel-insurance-disability',
    title: 'Travel Insurance for Disabled Travellers to Fiji | FijiBoundless',
    description: "What disabled travellers need to know about Fiji travel insurance — declaring pre-existing conditions, mobility equipment cover, and medical evacuation for outer islands.",
    h1: 'Travel Insurance for Disabled Travellers to Fiji',
    intro: [
      "Travel insurance is worth planning as carefully as flights and accommodation when travelling to Fiji with a disability, and the details matter more here than in many destinations because of how spread out and remote parts of the country are. The first, most important step is declaring any pre-existing condition honestly at the time of buying the policy — insurers can and do decline claims where a condition wasn't disclosed, even if the actual claim is unrelated to it, so this isn't a step worth skipping to save on premium.",
      "Mobility equipment cover is a separate and often underestimated detail. Many standard travel policies cap 'baggage' claims at a level that wouldn't come close to replacing a wheelchair, and some explicitly exclude mobility aids from standard baggage cover altogether, treating them instead as 'assistive devices' requiring a specific rider or higher declared value. If your policy doesn't clearly address this, it's worth a call to the insurer before you travel, not after something breaks in transit.",
      "Medical evacuation cover deserves particular attention for a Fiji trip specifically. Suva and Lautoka have Fiji's main hospitals with the most comprehensive care; outer islands and smaller centres have far more limited facilities, and a serious medical event on Taveuni, Kadavu, or a remote Lau island could genuinely require evacuation to Suva or even to Australia or New Zealand. Confirm your policy's evacuation limit is high enough to cover this realistically — this is one area where it's worth paying more for a policy that actually reflects Fiji's geography rather than a generic low-cost option.",
    ],
    faqs: [
      {
        q: 'Does travel insurance cover wheelchair damage in Fiji?',
        a: 'It depends entirely on the policy. Standard baggage cover often caps claims well below a wheelchair\'s value, or excludes mobility aids from standard cover altogether. Check whether your policy treats mobility equipment as an "assistive device" requiring a specific rider before you travel.',
      },
      {
        q: 'Do I need medical evacuation cover for outer islands?',
        a: "Strongly worth having. Suva and Lautoka have Fiji's main hospitals; outer islands and smaller centres have far more limited facilities, and a serious medical event there could require evacuation to Suva or overseas. Confirm your policy's evacuation limit realistically covers this.",
      },
      {
        q: 'Should I declare a pre-existing disability for travel insurance?',
        a: "Yes, always, and honestly. Insurers can decline claims — including unrelated ones — where a pre-existing condition wasn't disclosed at the time of purchase.",
      },
      {
        q: 'What happens if my mobility equipment breaks in Fiji?',
        a: "This depends on your policy's specific mobility equipment or assistive device coverage — check the claim process and any required documentation (like a police or venue report) before you travel, since gathering this after the fact in a remote location is much harder.",
      },
    ],
    facilityQueries: [],
    searchLink: '/search',
  },
]

export function getGuide(slug) {
  return GUIDES.find(g => g.slug === slug) || null
}
