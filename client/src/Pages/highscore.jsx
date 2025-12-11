import React, { useState, useEffect } from 'react';
import "../index.css";


export default function HighscoresPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/highscores');
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API endpoint not returning JSON. Check your API configuration.');
      }
      
      const data = await response.json();
      const sorted = Array.isArray(data) ? data.sort((a, b) => b.score - a.score) : [data];
      setScores(sorted);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message + ' (Using mock data for demonstration)');
      
      const mockScores = [
        { id: 1, playerName: "Alice", score: 15000, levelId: 5, createdAt: "2025-01-10T14:30:00.000Z" },
        { id: 2, playerName: "Bob", score: 12500, levelId: 4, createdAt: "2025-01-09T18:45:00.000Z" },
        { id: 3, playerName: "Charlie", score: 10200, levelId: 4, createdAt: "2025-01-08T12:15:00.000Z" },
        { id: 4, playerName: "Diana", score: 8900, levelId: 3, createdAt: "2025-01-07T09:20:00.000Z" },
        { id: 5, playerName: "Eve", score: 7500, levelId: 3, createdAt: "2025-01-06T16:00:00.000Z" }
      ];
      setScores(mockScores);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const getRankIcon = (index) => {
    if (index === 0) return <i class="fa-solid fa-trophy"></i>;
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="highscore-container">
      <div className="highscore-content">
        {/* Header */}
        <div className="highscore-header">
          <div className="highscore-title-wrapper">
            <i class="fa-solid fa-trophy"></i>
            <h1 className="highscore-title">Highscores</h1>
            <i class="fa-solid fa-trophy"></i>

          </div>
          <div className="highscore-button-group">
            <button
              onClick={fetchScores}
              disabled={loading}
              className="highscore-btn highscore-btn-refresh"
            >
              <i className={`fas fa-sync-alt ${loading ? 'spin' : ''}`}></i>
              Refresh
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="highscore-btn highscore-btn-home"
            >
              <i className="fas fa-home"></i>
              Home
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-text">
            Loading scores...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-box">
            <p className="error-title">Error loading scores</p>
            <p className="error-message">{error}</p>
          </div>
        )}

        {/* Scores List */}
        {!loading && !error && scores.length > 0 && (
          <div className="scores-list">
            {scores.map((score, index) => (
              <div
                key={score.id}
                className={`score-card ${index < 3 ? 'top-3' : ''}`}
              >
                <div className="rank-icon">
                  {getRankIcon(index) || <div className="rank-number">{index + 1}</div>}
                </div>

                <div className="player-info">
                  <p className="player-name">{score.playerName}</p>
                  <p className="player-level">Level {score.levelId}</p>
                </div>

                <div className="score-info">
                  <div className="score-value">{score.score.toLocaleString()}</div>
                  <div className="score-date">{formatDate(score.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Scores */}
        {!loading && !error && scores.length === 0 && (
          <div className="no-scores-box">
            No scores yet. Be the first to play!
          </div>
        )}
      </div>
    </div>
  );
}