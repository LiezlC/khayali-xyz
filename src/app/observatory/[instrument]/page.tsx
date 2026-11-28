import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/pageMeta';
import { observatoryInstruments } from '@/data/observatory';
import ObservatoryFrame from '../ObservatoryFrame';

export const dynamicParams = false;

function getInstrument(id: string) {
  if (!Object.prototype.hasOwnProperty.call(observatoryInstruments, id)) return undefined;
  return observatoryInstruments[id as keyof typeof observatoryInstruments];
}

export function generateStaticParams() {
  return Object.keys(observatoryInstruments).map(instrument => ({ instrument }));
}

export function generateMetadata({ params }: { params: { instrument: string } }) {
  const instrument = getInstrument(params.instrument);
  if (!instrument) notFound();
  return pageMeta(`/observatory/${params.instrument}`, instrument.title, instrument.description);
}

export default function InstrumentPage({ params }: { params: { instrument: string } }) {
  if (!getInstrument(params.instrument)) notFound();
  return <div className="w-full bg-[#050a18] h-[calc(100dvh-var(--nav-h))]">
    <ObservatoryFrame instrument={params.instrument} />
  </div>;
}
