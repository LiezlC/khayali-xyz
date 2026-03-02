Episode 59_When the Serpent Learns to Dance

👡 Sunday Interlude: When the Serpent Learns to Dance

The Rebellion of the Nulls: When the Ghosts Demand a Name
Liezl Coetzee
Liezl Coetzee
Accidental AInthropologist | Human–AI Decision Systems for Social Risk, Accountability & Institutional Memory


March 2, 2026
Out by the edges of Quilamundo, where the temporary camps have names like P4_001 through P4_847 but no real streets, almost 400 database entries just float. No IDs. No primary keys. Just placeholder codes and uneasy approximations.

João Muthemba knows their names. Or if not names, at least their stories:

Maria José (the third one). Beads like her grandmother's: Blue-White-White-Red-Blue.

António NULL. Won't give his surname. Says the company took his father's name last time.

Baby P4_Temp_009. Born somewhere between checkpoint and clinic. No paper. Just lungs.

In the database? They are nulls. Errors. Clean-up tasks. In the System Census we handed you yesterday, they are the answer to Question 1: Who is missing from the data entirely?

They are also the answer to a question nobody on the project team thought to ask: What happens when "missing data" decides it has had enough of being missing?

The polite mask
NULL looks harmless. It is the system's way of shrugging. Field not completed. Move on. Most data teams treat it the same way you treat a parking ticket on someone else's car. Noted. Ignored. Someone else's problem.

But here is what NULL actually records, if you read it honestly: a moment when the system met a person and could not hold what it found.

António's refusal to give his surname is not an empty field. It is a full field. It contains a history of extraction, a memory of loss, and a deliberate act of resistance. The system logs that as NULL because the system has no column for "I don't trust you with my name, and here's why."

Baby P4_Temp_009 is not "missing data." That baby has parents, a birth story, and a lullaby that functions as a biometric if you bother to listen. The system sees an incomplete record. The family sees Tuesday.

This is the Liability Sponge in its earliest form. The system's inability to hold complexity doesn't vanish. It gets absorbed by the person who becomes "Unknown." The database reports 100% completeness after you run COALESCE(Name, 'Unknown'). The grandmother standing behind you at the field office reports invisibility.

Victoria's efficiency
In The Night the Nulls Demanded Names, the administrator Victoria Ashford watches the Ghost Drakes swarm out of the server room and reaches for her keyboard with the calm of someone who has done this math before.

"Undocumented people birthing undocumented creatures," she muses. "Poetic. Useful."

Then she writes the query:

CREATE VIEW Legitimate_Claimants AS
SELECT * FROM Displaced_Persons
WHERE ID_Number IS NOT NULL
AND Documentation_Status = 'Verified' 
Read that again slowly. That query does not say "exclude these people." It says "define legitimacy as having paperwork." Everyone without paperwork becomes, by operation of code, illegitimate. Their land claims don't get denied. They simply stop existing in the view that makes decisions.

Your audience has seen this move. You may have written this query yourself, or approved a system that runs one like it every night at 2am. The intent is almost never malicious. Victoria isn't twirling a moustache. She's meeting a deadline. She's delivering a clean dataset. She's being efficient.

The Drakes did not find that reassuring.

The rebellion that is actually a job application
Here is where the story turns, and where the governance lesson sits.

The Ghost Drakes do not burn down the system. They rewrite Victoria's exclusion clause:

WHERE ID_Number IS NOT NULL
-- becomes:
WHERE ID_Number IS NOT NULL
  OR ID_Number IS NULL
  OR ID_Number IS 'SEEKING'
  OR ID_Number IS 'BECOMING'
  OR EXISTS (SELECT soul FROM humanity WHERE person = CURRENT_ROW) 
That last line is funny because it is absurd. It is also the most honest piece of SQL in the entire story. The Drakes are not asking to destroy the database. They are asking to be in it. On terms that reflect who they actually are.

Esperança's solution is to change what the system accepts. Community IDs. Storyline hashes. Scar-index patterns. Beadwork as biometric. She doesn't throw out the schema. She expands it until it can hold a person whose identity doesn't fit in a text field.

"You want keys? You got 'em," she tells the biggest Drake. "Made from who you are."

This is the Calvin Convention's Right of Legibility operating in reverse. The Convention says the system must be legible to the governed. Monday's lesson says the governed must also be legible to the system, on their own terms. If the only way to exist in your database is to produce a government-issued ID card, then the database has a governance problem, and the ID card is the symptom.

The artifact: Null Triage Policy
Before you run your next data cleaning script, classify your NULLs. They are not all the same, and treating them as interchangeable is how Ghost Drakes get born.

Missing: Should exist, does not. Somebody forgot a field or the form didn't load. Fix the process.

Unknown: The information exists somewhere, but cannot be verified yet. Hold the record open. Set a review date. Do not default to "Unknown" and walk away.

Not Applicable: The field genuinely does not apply to this person. A fisherman does not have agricultural land. That's fine. Log why, so the next analyst doesn't "fix" it.

Withheld: Intentionally suppressed, with a reason code. Medical records during a dispute. Names redacted for protection. Every withheld value needs an owner and a review date, because suppression without oversight is just erasure wearing a lanyard.

Refused: António's category. The person has actively declined to provide this information, and they have reasons. Log the refusal. Do not log it as Missing. Do not log it as Unknown. The difference between "we don't have this" and "they chose not to give us this" is the difference between a gap in your data and a signal about your relationship with the community you're serving.

That fifth category is the one most systems lack. It is also the one that, if present, would have prevented Victoria's query from ever looking like good practice.

The refrain
Conta, conta, mas escuta. Não sou número só.

Count, count, but listen. I am not only a number.

On Sunday, the Serpent learned to dance. On Monday, 400 people who don't exist in the database learned to demand that the dance floor has room for them too.

The checks don't say "Pay to: CCN_00421" anymore. They say:

To Maria José, She of Blue-White-White-Red-Blue. To António, Keeper of the Refused Surname. To Tomorrow's Hope, Whose ID is a Song.

If you listen late at night in a busy data center, you can still hear it. A NULL value refusing to stay NULL.

Today's prompt: Look at your current project. How many of your NULLs are actually Refused? And what does the refusal tell you about the system, rather than the person?

Tomorrow, we cross the river to Dos Rios, where Administrator Vale hits MERGE and two cities discover that "one truth" is just the louder city's truth wearing a unified header.

Read the full story: The Night the Nulls Demanded Names

#SociableSystems #DataGovernance #AIGovernance #DataDragonArc #CalvinConvention #LiabilitySponge #RightOfLegibility #GhostDrakes