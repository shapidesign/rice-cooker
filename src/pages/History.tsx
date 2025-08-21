import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { CookingSession } from "../entities/CookingSession";
import { format } from "date-fns";
import RiceLogo from "../components/RiceLogo";

export default function History() {
  const [sessions, setSessions] = useState<CookingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<CookingSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setIsLoading(true);
    const data = await CookingSession.list('-created_date', 20);
    setSessions(data);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return '✅';
      case 'active': return '🔄';
      case 'cancelled': return '❌';
      default: return '❓';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return 'DONE';
      case 'active': return 'COOKING';
      case 'cancelled': return 'STOPPED';
      default: return 'UNKNOWN';
    }
  };

  if (isLoading) {
    return (
      <div className="pixel-font text-pixel-dark text-center min-h-48">
        <div className="text-xs blink-animation">LOADING HISTORY...</div>
      </div>
    );
  }

  return (
    <div className="pixel-font text-pixel-dark min-h-60">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to={createPageUrl("Home")} 
              className="retro-button px-2 py-1 text-xs min-h-8">
          ← BACK
        </Link>
        <div className="text-xs font-bold text-center break-words">COOKING LOG</div>
        <div className="text-xs">{sessions.length}</div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center">
          <div className="text-2xl mb-6">📝</div>
          <div className="text-xs mb-6 break-words">NO COOKING HISTORY</div>
          <Link 
            to={createPageUrl("RiceSelection")}
            className="retro-button px-4 py-3 text-xs inline-block transition-colors min-h-12"
          >
            <div className="break-words">START COOKING</div>
          </Link>
        </div>
      ) : (
        <>
          {/* Session List */}
          {!selectedSession && (
            <div className="space-y-3 mb-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className="retro-button p-3 cursor-pointer transition-colors min-h-16"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <RiceLogo type={session.rice_type.split(' ')[1] || session.rice_type} size="small" />
                      <div className="text-xs font-bold break-words">
                        {session.rice_type.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-xs break-words">
                      {getStatusIcon(session.status)} {getStatusText(session.status)}
                    </div>
                  </div>
                  <div className="text-xs break-words">
                    {session.rice_amount}g rice • {session.water_amount}ml water
                  </div>
                  <div className="text-xs mt-1 opacity-70 break-words">
                    {format(new Date(session.created_date), 'MMM d, HH:mm')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Session Detail */}
          {selectedSession && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="retro-button px-2 py-1 text-xs min-h-8"
                >
                  ← BACK TO LIST
                </button>
                <div className="text-xs break-words">
                  {getStatusIcon(selectedSession.status)} {getStatusText(selectedSession.status)}
                </div>
              </div>

              <div className="pixel-border bg-pixel-cream p-4">
                <div className="text-xs font-bold mb-4 break-words">COOKING DETAILS</div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-bold break-words">RICE TYPE:</div>
                    <div className="break-words hyphens-auto">{selectedSession.rice_type.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="font-bold break-words">RICE AMOUNT:</div>
                    <div className="break-words">{selectedSession.rice_amount}g</div>
                  </div>
                  <div>
                    <div className="font-bold break-words">WATER:</div>
                    <div className="break-words">{selectedSession.water_amount}ml</div>
                  </div>
                  <div>
                    <div className="font-bold break-words">COOK TIME:</div>
                    <div className="break-words">{selectedSession.cooking_time} min</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-pixel-brown">
                  <div className="font-bold break-words">STARTED:</div>
                  <div className="break-words">{format(new Date(selectedSession.created_date), 'MMM d, yyyy HH:mm')}</div>
                  
                  {selectedSession.completed_at && (
                    <div className="mt-2">
                      <div className="font-bold break-words">COMPLETED:</div>
                      <div className="break-words">{format(new Date(selectedSession.completed_at), 'MMM d, yyyy HH:mm')}</div>
                    </div>
                  )}
                </div>
              </div>

              {selectedSession.status === 'completed' && (
                <div className="pixel-border bg-pixel-brown text-pixel-cream p-3 text-center">
                  <div className="text-xs mb-2 break-words">🎉 COOKING SUCCESS!</div>
                  <div className="text-xs break-words">TOTAL SESSIONS: {sessions.filter(s => s.status === 'completed').length}</div>
                </div>
              )}
            </div>
          )}

          {/* Summary Stats */}
          {!selectedSession && (
            <div className="pixel-border bg-pixel-cream p-4">
              <div className="text-xs font-bold mb-3 break-words">📊 STATISTICS</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="break-words">TOTAL SESSIONS:</div>
                  <div className="font-bold">{sessions.length}</div>
                </div>
                <div>
                  <div className="break-words">COMPLETED:</div>
                  <div className="font-bold">{sessions.filter(s => s.status === 'completed').length}</div>
                </div>
                <div>
                  <div className="break-words">TOTAL RICE:</div>
                  <div className="font-bold">{sessions.reduce((sum, s) => sum + s.rice_amount, 0)}g</div>
                </div>
                <div>
                  <div className="break-words">SUCCESS RATE:</div>
                  <div className="font-bold">
                    {sessions.length > 0 ? Math.round((sessions.filter(s => s.status === 'completed').length / sessions.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
