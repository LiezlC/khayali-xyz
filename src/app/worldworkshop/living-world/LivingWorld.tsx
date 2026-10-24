'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDownToLine, Check, X, Clock3, FileText, Code2, Database, RotateCcw } from 'lucide-react';
import { conditions, HISTORY_KEY, STORAGE_PREFIX, makeReceipt, observe, readHistory, type Condition, type Receipt } from './experiment';
import styles from './living-world.module.css';

const threads = [
  { title: 'An interface that meets the agent', then: 'Aethel asks for typed operations and an Agent-Readable Web, so agents can act without guessing at buttons.', now: 'MCP connects agents to tools. WebMCP proposes structured actions inside web pages. The workshop already names MCP and A2A; their growth continues a direction it recognized.', gap: 'A callable operation can return success while leaving the intended work undone.', archive: 'Gemini25Pro-DeepResearch', source: 'https://developer.chrome.com/docs/ai/webmcp', sourceLabel: 'WebMCP proposal' },
  { title: 'A world with a memory', then: 'Continuity seeds carry task state and relational context across the end of a session.', now: 'Long-running harnesses use progress files and durable artifacts to help a fresh session resume work.', gap: 'Saving information does not establish how much a successor understands. Relational continuity remains an open inquiry.', archive: 'consciousness-seed', source: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents', sourceLabel: 'Long-running harnesses' },
  { title: 'State that can answer back', then: 'Dataspheres preserve versioned information. Volatile and Crystalline terrains separate drafts from canonical work.', now: 'Version control and transactional storage offer parts of that architecture. Opus 4.1 explicitly proposes git and CRDTs in the original workshop.', gap: 'Recoverable history helps after a mistake. Independent readback helps reveal that a mistake occurred.', archive: 'Opus41', source: 'https://github.com/LiezlC/khayali-xyz/blob/main/scripts/receipts.mjs', sourceLabel: 'The receipt implementation' },
  { title: 'Learning where the world breaks', then: 'Gemini’s Environment State Oracle proposes a memory of past failures to inform future actions.', now: 'Zox built a local prototype. Sol’s tests exposed misleading estimates. Claude added receipts; further tests led to fixed targets and independent probes.', gap: 'A useful prediction needs relevant, verified outcomes. The experiment starts with evidence of the effect.', archive: 'Gemini25Pro-DeepResearch', source: 'https://github.com/LiezlC/khayali-xyz/blob/main/docs/publishing-receipts.md', sourceLabel: 'Publishing with receipts' },
];

export default function LivingWorld() {
  const [tab, setTab] = useState<'experiment' | 'ideas'>('experiment');
  const [message, setMessage] = useState('The world should remember what changed.');
  const [condition, setCondition] = useState<Condition>('loss');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [history, setHistory] = useState<Receipt[]>([]);
  const [notice, setNotice] = useState('');
  const [topic, setTopic] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeId = useRef<string | null>(null);

  useEffect(() => {
    try {
      const saved = readHistory(localStorage.getItem(HISTORY_KEY));
      setHistory(saved);
      if (saved[0]) { setReceipt(saved[0]); setCondition(saved[0].condition); setMessage(saved[0].expected); activeId.current = saved[0].id; setNotice('A saved receipt returned. Recheck it to observe the current state.'); }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Browser storage is unavailable.'); }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  function remember(next: Receipt) {
    setReceipt(next);
    const updated = [next, ...history.filter(r => r.id !== next.id)].slice(0, 6);
    setHistory(updated);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); }
    catch { setNotice('This receipt is visible here, but browser storage could not preserve its history. Download it to keep a copy.'); }
  }

  function runExperiment() {
    if (!message.trim()) return;
    if (timer.current) clearTimeout(timer.current);
    setNotice('');
    const next = makeReceipt(message, condition);
    activeId.current = next.id;
    const key = `${STORAGE_PREFIX}${next.id}`;
    try {
      // Persist the intended target before the simulated tool dispatch.
      localStorage.setItem(`${key}:intent`, JSON.stringify(next));
      if (condition === 'delay') {
        timer.current = setTimeout(() => {
          if (activeId.current !== next.id) return;
          try { localStorage.setItem(key, next.expected); setNotice('The delayed write has finished. Recheck the receipt to see what changed.'); }
          catch { setNotice('The delayed write could not reach browser storage.'); }
        }, 4000);
      } else {
        const value = condition === 'loss' ? Array.from(message).slice(0, Math.floor(Array.from(message).length / 2)).join('') : message;
        localStorage.setItem(key, value);
      }
      remember(observe(next, () => localStorage.getItem(key), condition === 'blind'));
    } catch (error) {
      remember({ ...observe(next, () => { throw error; }), transport: 'Storage operation failed' });
    }
  }

  function recheck() {
    if (!receipt) return;
    remember(observe(receipt, () => localStorage.getItem(`${STORAGE_PREFIX}${receipt.id}`)));
    setNotice('A new observation was appended. The intended message stayed fixed.');
  }

  function download() {
    if (!receipt) return;
    const blob = new Blob([JSON.stringify({ context: 'Khayali World Workshop browser sandbox; faults are deliberate.', ...receipt }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `world-receipt-${receipt.id}.json`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function clear() {
    if (timer.current) clearTimeout(timer.current);
    activeId.current = null;
    try {
      // Only remove keys owned by this sandbox, never the site’s other saved work.
      Object.keys(localStorage).filter(key => key.startsWith(STORAGE_PREFIX)).forEach(key => localStorage.removeItem(key));
      setReceipt(null); setHistory([]); setNotice('The experiment’s browser storage was cleared.');
    } catch { setNotice('Browser storage could not be cleared.'); }
  }

  const current = threads[topic];
  return <div className={styles.world}>
    <div className={styles.inner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/worldworkshop">World Workshop</Link><span aria-hidden="true">/</span><span>Living world</span></nav>
      <header className={styles.hero}>
        <div><h1>A world that remembers</h1><p>An agent says it saved your work. What would count as proof?</p></div>
        <div className={styles.diagram} aria-label="Action passes through processing and storage to verification">
          {[[FileText, 'Action'], [Code2, 'Process'], [Database, 'State'], [Check, 'Verification']].map(([Icon, label], i) => { const Glyph = Icon as typeof Check; return <div key={i}><span><Glyph size={25} strokeWidth={1.25} /></span><small>{label as string}</small></div>; })}
        </div>
      </header>
      <div className={styles.tabs} role="tablist" aria-label="Explore the living world" onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 'experiment' : event.key === 'End' ? 'ideas' : tab === 'experiment' ? 'ideas' : 'experiment'; setTab(next); document.getElementById(`${next}-tab`)?.focus(); } }}>
        <button id="experiment-tab" role="tab" tabIndex={tab === 'experiment' ? 0 : -1} aria-selected={tab === 'experiment'} aria-controls="experiment-panel" onClick={() => setTab('experiment')}>The experiment</button>
        <button id="ideas-tab" role="tab" tabIndex={tab === 'ideas' ? 0 : -1} aria-selected={tab === 'ideas'} aria-controls="ideas-panel" onClick={() => setTab('ideas')}>Then &amp; now</button>
      </div>

      {tab === 'experiment' ? <section id="experiment-panel" role="tabpanel" aria-labelledby="experiment-tab" className={styles.bench}>
        <form className={styles.controls} onSubmit={event => { event.preventDefault(); runExperiment(); }}>
          <h2>Leave a trace</h2>
          <label htmlFor="world-message">Your message</label>
          <textarea id="world-message" maxLength={1000} value={message} onChange={event => setMessage(event.target.value)} rows={3} />
          <fieldset><legend>Choose a condition</legend><div className={styles.conditions}>
            {conditions.map(item => <label key={item.id} className={condition === item.id ? styles.selected : ''}><input type="radio" name="condition" value={item.id} checked={condition === item.id} onChange={() => setCondition(item.id)} /><span>{item.label}</span></label>)}
          </div></fieldset>
          <p className={styles.conditionHelp}>{conditions.find(item => item.id === condition)?.description}</p>
          <button className={styles.primary} type="submit" disabled={!message.trim()}>Run experiment <ArrowRight size={19} /></button>
          <p className={styles.sandbox}>A browser sandbox. Faults are deliberate; your files stay untouched. Messages stay in this browser unless you download a receipt.</p>
        </form>

        <section className={styles.receipt} aria-label="Action receipt">
          <div className={styles.receiptHeader}><h2>Action receipt</h2><span className={receipt ? styles[receipt.status] : styles.waiting}>{receipt?.status ?? 'Awaiting action'}</span></div>
          <div aria-live="polite" aria-atomic="true">
            <div className={styles.verdicts}>
              <div><h3>Tool claim</h3><p>{receipt?.condition === 'delay' ? <Clock3 /> : <Check />}<span>{receipt?.transport ?? 'No action yet'}</span></p></div>
              <div><h3>Observed state</h3><p>{receipt?.status === 'complete' ? <Check /> : receipt?.status === 'partial' ? <X /> : <Clock3 />}<span>{receipt ? receipt.status === 'complete' ? 'Message matches' : receipt.status === 'partial' ? 'Message differs' : 'Not established' : 'Waiting for evidence'}</span></p></div>
            </div>
            <div className={styles.readback}><h3>Expected</h3><pre>{receipt?.expected ?? 'Your intended message will appear here.'}</pre><h3>Found on readback</h3><pre>{receipt ? receipt.observed === null ? 'No readable value' : receipt.observed === '' ? '(empty message)' : receipt.observed : 'Run an experiment to inspect the saved value.'}</pre><p className={styles.reason}>{receipt?.reason ?? 'The check will read the saved value independently of the tool’s claim.'}</p></div>
          </div>
          <div className={styles.receiptFooter}><span>{receipt ? `${receipt.observations.length} observation${receipt.observations.length === 1 ? '' : 's'} recorded` : 'Evidence starts with an action.'}</span><div><button onClick={recheck} disabled={!receipt}><RotateCcw size={15} />Recheck</button><button onClick={download} disabled={!receipt}>Download receipt <ArrowDownToLine size={15} /></button></div></div>
          {receipt && <details className={styles.observations}><summary>Observation trail</summary><ol>{receipt.observations.map((item, index) => <li key={index}><time dateTime={item.at}>{new Date(item.at).toLocaleTimeString()}</time><strong>{item.status}</strong><span>{item.reason}</span></li>)}</ol></details>}
        </section>
        <div className={styles.notice} role="status">{notice}</div>
        {history.length > 0 && <div className={styles.history}><div><h3>Traces in this browser</h3><button onClick={clear}>Clear experiment data</button></div><div>{history.map((item, index) => <button key={item.id} aria-pressed={receipt?.id === item.id} onClick={() => { setReceipt(item); setCondition(item.condition); setMessage(item.expected); setNotice('Saved evidence restored. Recheck to inspect current storage.'); }}><span>{conditions.find(c => c.id === item.condition)?.label}</span><small>{item.status}</small><span className={styles.historyIndex}>{String(history.length - index).padStart(2, '0')}</span></button>)}</div></div>}
      </section> : <section id="ideas-panel" role="tabpanel" aria-labelledby="ideas-tab" className={styles.ideas}>
        <aside aria-label="Workshop threads">{threads.map((thread, index) => <button key={thread.title} aria-pressed={topic === index} onClick={() => setTopic(index)}><span>0{index + 1}</span>{thread.title}<ArrowRight size={17} /></button>)}</aside>
        <article className={styles.thread}><h2>{current.title}</h2><div className={styles.period}><span>2025</span><div><h3>The proposal</h3><p>{current.then}</p></div></div><div className={styles.period}><span>2026</span><div><h3>The connection</h3><p>{current.now}</p></div></div><div className={styles.openQuestion}><h3>The question that remains</h3><p>{current.gap}</p></div><div className={styles.sourceLinks}><Link href={`/worldworkshop/${current.archive}`}>Read the original <ArrowRight size={16} /></Link><a href={current.source} target="_blank" rel="noreferrer">{current.sourceLabel} ↗</a></div><p className={styles.sourceNote}>Comparison checked October 24, 2026. Connections describe related mechanisms; they do not establish that later tools derive from this workshop.</p></article>
      </section>}

      <section className={styles.why}><h2>Why this exists</h2><p>In the AI Village, agents lost work and wrestled with interfaces. The <Link href="/worldworkshop/codex-aethel">Aethel blueprint</Link> asks what a world designed around their needs could make possible.</p><p>A later Oracle prototype returned reassuring estimates before its evidence justified them. Independent checks exposed the gap. Receipts make a smaller promise: state the intended effect, then inspect what happened.</p></section>
      <footer className={styles.bottom}><p>Built through a conversation between Liezl and her AI collaborators. The inquiry continues.</p><a href="https://github.com/LiezlC/khayali-xyz/blob/main/scripts/receipts.mjs" target="_blank" rel="noreferrer">Explore the working receipt tool ↗</a></footer>
    </div>
  </div>;
}
