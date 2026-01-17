import { useState } from 'react';

// INS-001.2 Hero Visualization - Observatory Light Mode
// Drives click-through to assessment with placeholder "YOU" row

const COLORS = {
  paper: '#F2F0E9',
  ink: '#1A1A1A',
  gold: '#B08D55',
  white: '#FFFFFF',
  faded: 'rgba(26, 26, 26, 0.5)',
  fadedLight: 'rgba(26, 26, 26, 0.15)',
  trackBg: '#F0EEE6',
  trackBgHighlight: '#F5F0E6',
};

const DATA = {
  you: {
    label: 'YOU',
    placeholder: true, // Shows skeleton state instead of data
    highlight: true,
  },
  ai: {
    label: 'AI',
    words: ['investigation', 'evidence', 'truth', 'clarity', 'knowledge'],
    relevance: 34,
    spread: 62,
  },
  statistical: {
    label: 'EMBEDDING',
    words: ['assurance', 'doubtless', 'mystique', 'suspense', 'insecurity'],
    relevance: 36,
    spread: 55,
  },
  others: {
    label: 'OTHERS',
    calibrating: true,
  },
};

function PulsingDot() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className="w-3 h-3 rounded-full animate-ping absolute"
          style={{ backgroundColor: COLORS.gold, opacity: 0.4 }}
        />
        <div
          className="w-3 h-3 rounded-full relative"
          style={{ backgroundColor: COLORS.gold }}
        />
      </div>
      <span style={{ color: COLORS.faded, fontFamily: 'monospace', fontSize: '10px' }}>
        Calibrating...
      </span>
    </div>
  );
}

function PlaceholderRow({ data }) {
  const isHighlight = data.highlight;

  return (
    <div className="mb-8">
      {/* Placeholder for words */}
      <div
        className="mb-2"
        style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          fontWeight: 400,
          color: COLORS.faded,
          letterSpacing: '0.5px',
          paddingLeft: '112px',
          textAlign: 'center',
        }}
      >
        ? · ? · ? · ? · ?
      </div>

      {/* Label + Track row */}
      <div className="flex items-center gap-4">
        {/* Label with accent bar */}
        <div className="w-24 flex items-center gap-1">
          {isHighlight && (
            <div
              className="w-1 h-4 rounded-sm"
              style={{ backgroundColor: COLORS.gold }}
            />
          )}
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: 600,
              color: COLORS.gold,
              letterSpacing: '0.5px',
            }}
          >
            {data.label}
          </span>
        </div>

        {/* Placeholder Track */}
        <div className="flex-1 relative">
          <div
            className="h-4 relative rounded-sm"
            style={{
              backgroundColor: COLORS.trackBgHighlight,
              border: `1px dashed ${COLORS.gold}`,
            }}
          >
            {/* Dashed connection line placeholder */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: '20%',
                width: '40%',
                height: '2px',
                borderTop: `2px dashed ${COLORS.gold}`,
                opacity: 0.5,
              }}
            />

            {/* Placeholder dots (outline only) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
              style={{
                left: '20%',
                width: '14px',
                height: '14px',
                backgroundColor: 'transparent',
                border: `2px dashed ${COLORS.gold}`,
                opacity: 0.5,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
              style={{
                left: '60%',
                width: '14px',
                height: '14px',
                backgroundColor: 'transparent',
                border: `2px dashed ${COLORS.gold}`,
                opacity: 0.5,
              }}
            />

            {/* Question marks below */}
            <div
              className="absolute -bottom-5 text-center"
              style={{
                left: '20%',
                transform: 'translateX(-50%)',
                fontFamily: 'monospace',
                fontSize: '9px',
                color: COLORS.faded,
              }}
            >
              ?
            </div>
            <div
              className="absolute -bottom-5 text-center"
              style={{
                left: '60%',
                transform: 'translateX(-50%)',
                fontFamily: 'monospace',
                fontSize: '9px',
                color: COLORS.faded,
              }}
            >
              ?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ data, hovered, onHover, onLeave }) {
  const trackWidth = 100; // percentage

  const relPos = (data.relevance / 100) * trackWidth;
  const spreadPos = (data.spread / 100) * trackWidth;

  const isHighlight = data.highlight;
  const isHovered = hovered;

  const displayText = data.words ? data.words.join(' · ') : null;

  return (
    <div
      className="mb-8 cursor-pointer transition-opacity duration-200"
      style={{ opacity: hovered === false ? 0.5 : 1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Words */}
      {displayText && (
        <div
          className="mb-2 transition-opacity duration-300"
          style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 400,
            color: COLORS.gold,
            letterSpacing: '0.5px',
            paddingLeft: '112px',
            textAlign: 'center',
          }}
        >
          {displayText}
        </div>
      )}

      {/* Label + Track row */}
      <div className="flex items-center gap-4">
        {/* Label with accent bar */}
        <div className="w-24 flex items-center gap-1">
          {isHighlight && (
            <div
              className="w-1 h-4 rounded-sm"
              style={{ backgroundColor: COLORS.gold }}
            />
          )}
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: 600,
              color: isHighlight ? COLORS.gold : COLORS.ink,
              letterSpacing: '0.5px',
            }}
          >
            {data.label}
          </span>
        </div>

        {/* Track */}
        <div className="flex-1 relative">
          {data.calibrating ? (
            <div
              className="h-4 flex items-center justify-center rounded-sm"
              style={{ backgroundColor: COLORS.trackBg, border: `1px solid ${COLORS.fadedLight}` }}
            >
              <PulsingDot />
            </div>
          ) : (
            <div
              className="h-4 relative rounded-sm"
              style={{
                backgroundColor: isHighlight ? COLORS.trackBgHighlight : COLORS.trackBg,
                border: `1px solid ${COLORS.fadedLight}`,
              }}
            >
              {/* Connection line */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-0.5"
                style={{
                  left: `${relPos}%`,
                  width: `${spreadPos - relPos}%`,
                  backgroundColor: COLORS.gold,
                  height: isHighlight ? '3px' : '2px',
                }}
              />

              {/* Relevance dot (filled) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-transform duration-150"
                style={{
                  left: `${relPos}%`,
                  width: isHighlight ? '14px' : '12px',
                  height: isHighlight ? '14px' : '12px',
                  backgroundColor: COLORS.gold,
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
                }}
              />

              {/* Spread dot (outline) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-transform duration-150"
                style={{
                  left: `${spreadPos}%`,
                  width: isHighlight ? '14px' : '12px',
                  height: isHighlight ? '14px' : '12px',
                  backgroundColor: 'transparent',
                  border: `2px solid ${COLORS.gold}`,
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
                }}
              />

              {/* Values below */}
              <div
                className="absolute -bottom-5 text-center"
                style={{
                  left: `${relPos}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: COLORS.faded,
                }}
              >
                {data.relevance}
              </div>
              <div
                className="absolute -bottom-5 text-center"
                style={{
                  left: `${spreadPos}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: COLORS.faded,
                }}
              >
                {data.spread}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function INS001Visualization() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className="p-6 relative"
      style={{
        backgroundColor: COLORS.paper,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Clickable card wrapper */}
      <a
        href="https://instruments.phronos.org/ins-001/ins-001-2/"
        className="block relative max-w-2xl mx-auto transition-transform duration-200"
        style={{
          transform: isCardHovered ? 'translate(-2px, -2px)' : 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div
          className="transition-shadow duration-200"
          style={{
            boxShadow: isCardHovered
              ? '14px 14px 0px rgba(26, 26, 26, 0.1)'
              : '12px 12px 0px rgba(26, 26, 26, 0.05)',
          }}
        >
          <div
            className="p-8 border"
            style={{
              backgroundColor: COLORS.white,
              borderColor: COLORS.ink,
            }}
          >
            {/* Header */}
            <div
              className="mb-1 pb-3 border-b flex justify-between items-center"
              style={{ borderColor: COLORS.fadedLight }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '9px', color: COLORS.faded }}>
                INS-001.2 — COMMON GROUND
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: '#44AA77',
                  border: '1px solid #44AA77',
                  padding: '2px 6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Live
              </span>
            </div>

            {/* Axis header */}
            <div
              className="flex items-center justify-center gap-2 mt-6 mb-4"
              style={{ paddingLeft: '112px' }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: COLORS.ink }}>
                mystery
              </span>
              <div className="flex items-center">
                {/* Left arrow */}
                <svg width="8" height="10" viewBox="0 0 8 10" fill={COLORS.ink}>
                  <polygon points="0,5 6,0 6,10" />
                </svg>
                {/* Dashed line */}
                <div
                  className="w-24 mx-1"
                  style={{
                    borderTop: `1px dashed ${COLORS.faded}`,
                  }}
                />
                {/* Right arrow */}
                <svg width="8" height="10" viewBox="0 0 8 10" fill={COLORS.ink}>
                  <polygon points="8,5 2,0 2,10" />
                </svg>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: COLORS.ink }}>
                certainty
              </span>
            </div>

            {/* Legend */}
            <div
              className="flex items-center justify-center gap-6 mb-4"
              style={{ paddingLeft: '112px' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.gold }}
                />
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: COLORS.faded }}>
                  RELEVANCE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full border-2"
                  style={{ borderColor: COLORS.gold }}
                />
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: COLORS.faded }}>
                  SPREAD
                </span>
              </div>
            </div>

            {/* Scale */}
            <div className="flex mb-8" style={{ paddingLeft: '112px' }}>
              <div className="flex-1 flex justify-between">
                {['0', '25', '50', '75', '100'].map((val) => (
                  <span
                    key={val}
                    style={{ fontFamily: 'monospace', fontSize: '9px', color: COLORS.faded }}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="mt-8">
              {/* YOU row - placeholder state */}
              <PlaceholderRow data={DATA.you} />

              <Row
                data={DATA.ai}
                hovered={hoveredRow === null ? null : hoveredRow === 'ai'}
                onHover={() => setHoveredRow('ai')}
                onLeave={() => setHoveredRow(null)}
              />
              <Row
                data={DATA.statistical}
                hovered={hoveredRow === null ? null : hoveredRow === 'statistical'}
                onHover={() => setHoveredRow('statistical')}
                onLeave={() => setHoveredRow(null)}
              />
              <Row
                data={{...DATA.others, calibrating: true}}
                hovered={hoveredRow === null ? null : hoveredRow === 'others'}
                onHover={() => setHoveredRow('others')}
                onLeave={() => setHoveredRow(null)}
              />
            </div>

            {/* Bottom invitation */}
            <div
              className="mt-10 pt-4 border-t"
              style={{ borderColor: COLORS.fadedLight }}
            >
              <p style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: COLORS.ink,
                margin: 0,
              }}>
                Where do you stand relative to the machine?
              </p>
            </div>

            {/* Footer CTA */}
            <div
              className="mt-4 pt-3 border-t flex justify-between items-center"
              style={{ borderColor: COLORS.fadedLight }}
            >
              <span style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: COLORS.gold,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Begin assessment
              </span>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: COLORS.gold,
              }}>
                →
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
