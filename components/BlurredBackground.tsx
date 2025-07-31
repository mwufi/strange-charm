'use client'

interface BlurredBackgroundProps {
  pattern?: 'waves' | 'circles' | 'gradient'
  color?: string
  opacity?: number
}

export default function BlurredBackground({ 
  pattern = 'waves', 
  color = '#3B82F6',
  opacity = 0.3 
}: BlurredBackgroundProps) {
  const patterns = {
    waves: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
          </filter>
        </defs>
        <path
          fill={color}
          fillOpacity={opacity}
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          filter="url(#blur)"
          transform="scale(1, 3)"
        />
        <path
          fill={color}
          fillOpacity={opacity * 0.7}
          d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          filter="url(#blur)"
          transform="translate(0, -100)"
        />
      </svg>
    ),
    circles: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>
        <circle cx="20%" cy="30%" r="150" fill={color} fillOpacity={opacity} filter="url(#blur)" />
        <circle cx="80%" cy="70%" r="200" fill={color} fillOpacity={opacity} filter="url(#blur)" />
        <circle cx="50%" cy="50%" r="180" fill={color} fillOpacity={opacity} filter="url(#blur)" />
      </svg>
    ),
    gradient: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: color, stopOpacity: opacity}} />
            <stop offset="100%" style={{stopColor: color, stopOpacity: opacity * 0.5}} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" filter="url(#blur)" />
      </svg>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {patterns[pattern]}
    </div>
  )
}