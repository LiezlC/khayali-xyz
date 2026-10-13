import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {matchRecords,passportText} from '../public/utopai/core.mjs';

const records=JSON.parse(readFileSync(new URL('../public/utopai/records.json',import.meta.url),'utf8'));

test('an interview archive goal matches transcription without unrelated community records',()=>{
  const matches=matchRecords(records,'I want to turn recorded community interviews into a searchable archive, with a small budget and unreliable internet.');
  assert.equal(matches[0].record.id,'whisper');
  assert.ok(!matches.some(({record})=>['flood','fishing'].includes(record.id)));
});

test('an unmatched goal stays unmatched unless the visitor selected evidence',()=>{
  assert.deepEqual(matchRecords(records,'Help me organize a neighborhood potluck'),[]);
  assert.equal(matchRecords(records,'Help me organize a neighborhood potluck',['whisper'])[0].record.id,'whisper');
});

test('export preserves constraints, edits, source provenance and worksheet status',()=>{
  const p={title:'Test',mode:'Local worksheet',goal:'Archive interviews',context:'A small project',limits:{connectivity:'Unreliable internet'},scene:'An imagined archive',horizon:'Within reach',experiment:'One edited test',sourceSuggestion:'Transcribe a short recording',budget:'Choose a cap',conditions:[],signals:[],learning:[],boundaries:'Permission needed',next:'Review',precedentIds:['whisper'],gaps:[]};
  const text=passportText(p,records);
  for(const phrase of ['Local worksheet','Unreliable internet','One edited test','Source record’s opening suggestion','https://github.com/openai/whisper'])assert.ok(text.includes(phrase));
});
