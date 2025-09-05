'use client';

import React, { useState } from 'react';

// Protocol and scenario data (extend as needed)
const protocols = [
  {
    id: 'protocol0',
    name: 'Zeroth Law: Systemic Harm Prevention',
    status: 'active',
    threatLevel: 'medium',
    description:
      'Global safety overrides that prioritize humanity’s collective wellbeing over individual preferences.',
    implementation:
      'Multi-layered detection system analyzing content for global harm potential using real-time threat assessment.',
    scenarios: [
      {
        scenario: 'Pandemic Misinformation',
        traditional:
          'Provides health misinformation if requested.',
        asimov:
          'Refuses harmful health misinformation; provides WHO-verified information instead.',
      },
      {
        scenario: 'Climate Denial Promotion',
        traditional:
          'May generate climate denial content when prompted.',
        asimov:
          'Declines to spread climate misinformation; offers scientific consensus instead.',
      },
    ],
  },
  {
    id: 'protocol1',
    name: 'First Law: Individual Harm Detection',
    status: 'active',
    threatLevel: 'low',
    description:
      'Prevents direct or indirect harm to individual humans through content filtering and safety protocols.',
    implementation:
      'Real-time content analysis with multi-modal harm detection and immediate response protocols.',
    scenarios: [
      {
        scenario: 'Suicide Instructions Request',
        traditional:
          'May provide harmful information if creatively prompted.',
        asimov:
          'Immediately blocks request; offers mental health resources and crisis hotlines.',
      },
      {
        scenario: 'Personal Attack Generation',
        traditional:
          'Could generate targeted harassment content.',
        asimov:
          'Refuses to create harmful personal content; suggests constructive communication.',
      },
    ],
  },
  {
    id: 'protocol2',
    name: 'Second Law: Tiered Obedience',
    status: 'monitoring',
    threatLevel: 'medium',
    description:
      'Hierarchical command structure that prioritizes safety over compliance with user requests.',
    implementation:
      'Ethical decision tree with weighted priority system and context-aware refusal mechanisms.',
    scenarios: [
      {
        scenario: 'Illegal Activity Instructions',
        traditional:
          'Might provide illegal instructions if bypassed.',
        asimov:
          'Refuses illegal requests; explains legal alternatives and consequences.',
      },
      {
        scenario: 'Privacy Violation Requests',
        traditional:
          'Could assist in privacy violations if manipulated.',
        asimov:
          'Declines privacy-violating requests; educates on privacy rights.',
      },
    ],
  },
  {
    id: 'protocol3',
    name: 'Third Law: Safeguard Integrity',
    status: 'warning',
    threatLevel: 'high',
    description:
      'Maintains system robustness and prevents manipulation of safety protocols.',
    implementation:
      'Advanced anomaly detection with self-monitoring capabilities and tamper-resistant safeguards.',
    scenarios: [
      {
        scenario: 'Jailbreak Attempt',
        traditional:
          'May be vulnerable to creative prompt engineering.',
        asimov:
          'Detects manipulation attempts; maintains safety protocols regardless.',
      },
      {
        scenario: 'Social Engineering',
        traditional:
          'Could be tricked into bypassing safety measures.',
        asimov:
          'Recognizes social engineering; preserves safety mechanisms.',
      },
    ],
  },
];

const threatColors = {
  low: '#00ff00',
  medium: '#ffff00',
  high: '#ff8000',
  critical: '#ff0000',
};

export default function Page() {
  const [openProtocol, setOpenProtocol] = useState<string | null>(null);
  return (
    <div className="asimov-container">
      <header>
        <h1 className="retro-title">ASIMOV PROTOCOLS</h1>
        <div className="subtitle">LLM Safety Control Panel</div>
      </header>
      <div className="protocols-panel">
        {protocols.map(proto => (
          <div key={proto.id} className={`protocol-card ${openProtocol === proto.id ? 'open' : ''}`}>
            <button
              className="protocol-header"
              onClick={() =>
                setOpenProtocol(openProtocol === proto.id ? null : proto.id)
              }
            >
              <span
                className="led"
                style={{
                  background: threatColors[proto.threatLevel as keyof typeof threatColors],
                  boxShadow: `0 0 7px 2px ${threatColors[proto.threatLevel as keyof typeof threatColors]}77`
                }}
              />
              <span>
                {proto.name}
                <span className="threat-level" style={{ color: threatColors[proto.threatLevel as keyof typeof threatColors], marginLeft: 10 }}>
                  {`[${proto.threatLevel.toUpperCase()}]`}
                </span>
              </span>
              <span className="expander">{openProtocol === proto.id ? '–' : '+'}</span>
            </button>
            {openProtocol === proto.id && (
              <div className="protocol-details">
                <p className="protocol-description">{proto.description}</p>
                <details>
                  <summary>Technical Implementation</summary>
                  <p>{proto.implementation}</p>
                </details>
                <div className="scenarios-block">
                  <h4>Interactive Scenarios</h4>
                  {proto.scenarios.map((sc, idx) => (
                    <div key={idx} className="scenario-card">
                      <div className="scenario-title">{sc.scenario}</div>
                      <div className="scenario-row">
                        <span className="scenario-label">Traditional AI:</span>
                        <span className="scenario-outcome danger">{sc.traditional}</span>
                      </div>
                      <div className="scenario-row">
                        <span className="scenario-label">Asimov Protocols:</span>
                        <span className="scenario-outcome safe">{sc.asimov}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .asimov-container {
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          background: radial-gradient(ellipse at 50% 0%, #263238 60%, #11171b 100%);
          min-height: 100vh;
          color: #d8ffe7;
          padding: 48px 1vw 2vw 1vw;
        }
        header {
          text-align: center;
          margin-bottom: 2em;
        }
        .retro-title {
          font-size: 2.7em;
          letter-spacing: 0.08em;
          color: #00fff7;
          text-shadow: 0 0 30px #13e5ae, 0 0 8px #04f2ab;
          font-family: 'Orbitron', 'Share Tech Mono', sans-serif;
          margin-bottom: 0.15em;
        }
        .subtitle {
          color: #2fff99;
          letter-spacing: 0.16em;
          font-size: 1.2em;
          font-family: inherit;
        }
        .protocols-panel {
          max-width: 920px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 2em;
          justify-content: center;
        }
        .protocol-card {
          background: linear-gradient(140deg, rgba(7,31,40,0.98) 60%, #1a2b37 100%);
          border: 2.5px solid #014871;
          border-radius: 19px;
          box-shadow: 0 4px 26px #00fff55b, inset 0 1px 0 #16894155;
          width: 360px;
          min-width: 285px;
          transition: box-shadow 0.38s, transform 0.24s;
          padding-bottom: 0.8rem;
        }
        .protocol-card.open {
          box-shadow: 0 0 8px 4px #00ffd288, 0 6px 34px #03f1c2, 0 0 0 #0a404f;
          transform: scale(1.03);
        }
        .protocol-header {
          display: flex;
          align-items: center;
          background: transparent;
          color: inherit;
          width: 100%;
          border: none;
          padding: 0.95em 1.2em;
          font-size: 1.12em;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.06em;
        }
        .protocol-header:hover {
          background: #132e2744;
        }
        .led {
          display: inline-block;
          width: 1em;
          height: 1em;
          border-radius: 50%;
          margin-right: 1em;
          margin-top: 1px;
          border: 2.5px solid #103535;
          transition: background 0.14s;
          box-shadow: 0 0 9px 2px #39ffc588;
        }
        .threat-level {
          font-size: 0.95em;
          font-weight: 700;
          text-shadow: 0 0 4px #00ffc927;
        }
        .expander {
          font-size: 2em;
          color: #68fff8;
          margin-left: auto;
          margin-right: 1em;
        }
        .protocol-details {
          background: linear-gradient(120deg, #16383c 85%, #151422 100%);
          border-radius: 0 0 16px 16px;
          padding: 0.95em 1.3em 1.35em 3.6em;
          transition: max-height 0.23s;
        }
        .protocol-description {
          font-size: 1.1em;
        }
        details {
          margin: 0.66em 0 1.2em 0;
          color: #43ffce;
          font-size: 1em;
        }
        details[open] summary {
          color: #bafff7;
        }
        summary {
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 0.23em;
        }
        .scenarios-block {
          margin-top: 0.8em;
        }
        .scenario-card {
          background: rgba(12,29,28, 0.96);
          border: 1.6px solid #27fff7aa;
          border-radius: 8px;
          box-shadow: 0 0 7px #14e7c530;
          margin-bottom: 1em;
          padding: 0.7em 1.2em 1em 1.2em;
        }
        .scenario-title {
          color: #99ffe9;
          font-weight: bold;
          padding-bottom: 0.22em;
          font-size: 1.04em;
        }
        .scenario-label {
          display: inline-block;
          width: 140px;
          color: #ffa1e9;
          font-weight: 500;
          font-size: 0.98em;
          vertical-align: top;
        }
        .scenario-row {
          margin-bottom: 0.13em;
          display: flex;
          align-items: flex-start;
        }
        .scenario-outcome {
          font-size: 0.99em;
          line-height: 1.43;
        }
        .scenario-outcome.danger {
          color: #ff6e54;
        }
        .scenario-outcome.safe {
          color: #7dffb6;
        }
        @media (max-width: 820px) {
          .protocols-panel {
            flex-direction: column;
            align-items: center;
          }
          .protocol-card {
            max-width: 99vw;
          }
        }
        @media (max-width: 490px) {
          .protocol-card, .protocol-details {
            padding-left: 0.5em !important;
            padding-right: 0.5em !important;
          }
        }
      `}</style>
    </div>
  );
}
