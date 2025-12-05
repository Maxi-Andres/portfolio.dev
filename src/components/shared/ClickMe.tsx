import { useState, useEffect, useRef } from 'react'
import { IconInfoCircle } from '@tabler/icons-react'

const GlobalCounter = () => {
  const [globalCount, setGlobalCount] = useState(0)
  const [personalCount, setPersonalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sparkles, setSparkles] = useState([])
  const [buttonScale, setButtonScale] = useState(1)
  const [counterGlow, setCounterGlow] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const ABACUS_INSTANCE = 'https://v2.jasoncameron.dev/abacus'
  const NAMESPACE = 'default'
  const KEY = 'collective-waste'

  const eventSourceRef = useRef(null)
  const lastAnimationTimeRef = useRef(0)

  useEffect(() => {
    // Load personal count from localStorage
    const saved = parseInt(localStorage.getItem('personal-clicks') || '0')
    setPersonalCount(saved)

    // Fetch initial global count
    fetchCurrentCount()

    // Setup SSE stream
    setupEventSource()

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  function setupEventSource() {
    try {
      const eventSource = new EventSource(`${ABACUS_INSTANCE}/stream/${NAMESPACE}/${KEY}`)
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        console.log('SSE Connection opened')
      }

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received SSE data:', data)
          
          setGlobalCount(prevCount => {
            if (data.value !== undefined && data.value > prevCount) {
              const now = Date.now()
              if (now - lastAnimationTimeRef.current > 75) {
                triggerStreamAnimation()
                lastAnimationTimeRef.current = now
              }
              return data.value
            }
            return prevCount
          })
        } catch (error) {
          console.error('Stream parse error:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE error:', error)
        eventSource.close()
        
        // Reconectar después de 5 segundos
        setTimeout(() => {
          if (eventSourceRef.current === eventSource) {
            setupEventSource()
          }
        }, 5000)
      }
    } catch (error) {
      console.error('Failed to setup EventSource:', error)
    }
  }

  async function fetchCurrentCount() {
    try {
      const response = await fetch(`${ABACUS_INSTANCE}/get/${NAMESPACE}/${KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      console.log('Fetch response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Initial count:', data.value)
        setGlobalCount(data.value || 0)
      } else if (response.status === 404) {
        setGlobalCount(0)
      }
    } catch (error) {
      console.error('Failed to fetch count:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function triggerStreamAnimation() {
    setCounterGlow(true)
    setTimeout(() => setCounterGlow(false), 600)

    if (sparkles.length < 10) {
      const id = Date.now() + Math.random()
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      setSparkles(prev => [...prev, { id, x, y }])

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id))
      }, 2000)
    }
  }

  async function handleClick() {
    setButtonScale(0.95)
    setTimeout(() => setButtonScale(1), 150)

    // Update personal count
    const newPersonalCount = personalCount + 1
    setPersonalCount(newPersonalCount)
    localStorage.setItem('personal-clicks', newPersonalCount.toString())

    // Optimistic update
    setGlobalCount(prev => prev + 1)
    triggerStreamAnimation()

    try {
      const response = await fetch(`${ABACUS_INSTANCE}/hit/${NAMESPACE}/${KEY}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      console.log('Hit response:', response.status)
      
      if (!response.ok) {
        throw new Error('Failed to register click')
      }
    } catch (error) {
      console.error('Failed to register click:', error)
      // Revert optimistic update
      setGlobalCount(prev => prev - 1)
    }
  }

  return (
    <div className="backdrop-blur-md border border-neutral-800 rounded-2xl p-6 overflow-hidden 
    hover:border-neutral-600 transition-all duration-300 relative flex flex-col">
      <div className="flex justify-end mb-2">
        <button 
          className="text-neutral-400 hover:text-white transition-colors relative"
          onClick={() => setShowInfo(!showInfo)}
        >
          <IconInfoCircle stroke={1.5} />
          {showInfo && (
            <div className="absolute top-8 right-0 w-56 bg-[#1e1e2e]/95 border border-neutral-700 rounded-lg p-3 text-xs text-neutral-300 z-10 backdrop-blur-md shadow-xl">
              <p className="mb-2 text-left">
                A real-time global counter tracking every click from everyone visiting this site. Completely pointless, yet oddly satisfying.
              </p>
              <p className="text-neutral-500 text-[10px]">
                Powered by <a href="https://v2.jasoncameron.dev/abacus/" target="_blank" rel="noopener" className="text-[#89b4fa] hover:underline">Abacus</a>
              </p>
            </div>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 relative">
        <div className="text-[#89b4fa] mb-3 text-4xl font-bold relative">
          {isLoading ? (
            <span className="opacity-50">---</span>
          ) : (
            <div className="relative inline-block">
              <span className={`transition-all duration-300 ${counterGlow ? 'scale-110' : ''}`}>
                {globalCount.toLocaleString()}
              </span>
              <div className="absolute inset-0 pointer-events-none">
                {sparkles.map(sparkle => (
                  <div
                    key={sparkle.id}
                    className="absolute text-sm font-bold text-[#89b4fa] animate-sparkle"
                    style={{ 
                      left: `${sparkle.x - 50}%`, 
                      top: `${sparkle.y - 50}%`
                    }}
                  >
                    +1
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleClick}
          disabled={isLoading}
          className="bg-[#89b4fa] hover:bg-[#89b4fa]/90 active:bg-[#89b4fa]/80 text-[#181825] rounded-xl px-6 py-3 font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ transform: `scale(${buttonScale})` }}
        >
          CLICK ME
        </button>

        <p className="text-neutral-500 mt-6 text-xs">
          you've clicked {personalCount} time{personalCount === 1 ? '' : 's'}
        </p>
      </div>

      <style>{`
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
          }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default GlobalCounter