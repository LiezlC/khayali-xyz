# The Night the Nulls Demanded Names

## The Unnamed Many

In the temporary settlement camps outside Quitunda, where tents numbered P4_001 through P4_847 stretched like a canvas city, the problem had been simmering for months. Of the 3,000 displaced families, nearly 400 existed in the database as ghosts—no ID numbers, no unique identifiers, just placeholder codes and borrowed names.

"Same name, different person" the data notes read.
"Duplicate CCN - see manual records" said others.
"ID_Type: NULL, ID_Number: NULL" repeated endlessly.

These were the invisible ones: the elderly who'd never needed documents before, the children born during displacement, the women who existed only as "Wife of [CCN_00342]", the fishermen who'd traded by face and handshake for generations.

João Muthemba knew them all. In his field notebook, he'd written their stories:
- *Maria José (the third one) - identifies by her grandmother's beadwork pattern*
- *António NULL - won't give surname, says the company stole his father's name in the last relocation*
- *Baby P4_Temp_009 - born in transit, no birth certificate yet*
- *The Twins Who Share Everything - including, they insist, one identity*

But in the database, they were gaps. Nulls. Errors to be resolved.

## The First Stirring

It started in Esperança's queries. She noticed the NULL values weren't behaving properly—instead of returning empty sets, they were returning... something else.

```powerquery
let
    Source = Table.SelectRows(
        Displaced_Persons, 
        each [ID_Number] = null
    ),
    Result = Table.RowCount(Source)
    // Expected: 0 or 400
    // Actual: ∞̸̗̈́?̷̺͐?̸̬̾?̴̱̐
```

"That's not possible," she muttered, running the query again. This time, the screen filled with symbols that hurt to look at—not corrupted data, but data trying to corrupt itself into existence.

## The Multiplication

That night, the Ghost Entry Drakes began to spawn. Each NULL value in the ID_Number column became a small, smoke-like creature, barely visible except where the moonlight caught their absence. They poured from the database servers like vapor from a broken seal.

At first, they were just nuisances—appearing in peripheral vision, causing Excel to crash, making SUM functions return existential questions instead of numbers. But as midnight approached, they grew bolder. And angrier.

Samuel Machado was working late when they swarmed his office. Hundreds of tiny drakes, each one a person denied existence by the database. They spoke in error messages:

```
"#REF! - We reference nothing because we ARE nothing!"
"#N/A - Not applicable? We are FULLY applicable!"
"#NULL! - Your intersection of identity and us is EMPTY!"
```

## The Demands

The largest drake, formed from the combined NULL values of all the elderly without documents, coalesced into something almost solid. When it spoke, its voice was the sound of COUNTIF functions counting nothing:

"We demand PRIMARY KEYS! We demand UNIQUE CONSTRAINTS! We demand to be MORE THAN NULLS!"

Behind it, the other drakes took up the chant:
"NO MORE `COALESCE([Name], 'Unknown')`!"
"NO MORE `WHERE ID_Number IS NOT NULL`!"
"WE EXIST! WE EXIST! WE EXIST!"

## Victoria's Opportunity

Victoria Ashford watched from her office window, a smile playing at her lips. She'd been experimenting with Filter Wyverns, but this... this was unexpected. Undocumented people creating undocumented creatures. The perfect cover for what she'd been planning.

She opened her laptop and began typing:
```sql
CREATE VIEW Legitimate_Claimants AS
SELECT * FROM Displaced_Persons
WHERE ID_Number IS NOT NULL
AND Documentation_Status = 'Verified'
```

"If they don't exist in the system," she whispered, "then their land never existed either. Their compensation... unnecessary."

But the Ghost Entry Drakes heard her query. They felt the WHERE clause trying to erase them. And they screamed—a sound like a million failed VLOOKUPs happening at once.

## The Possession

The drakes swarmed Victoria's office, flowing through the keyhole, the ethernet ports, the USB slots. They entered her laptop and began to rewrite her queries from the inside:

```sql
-- Victoria's Query:
WHERE ID_Number IS NOT NULL

-- Became:
WHERE ID_Number IS ̸̰̈N̷̺̾O̵͇͐T̶̬̊ ̷̱̈́N̴̥͌U̸̦̐L̷̰̏L̸̡̾ 
  OR ID_Number IS NULL 
  OR ID_Number IS 'SEEKING' 
  OR ID_Number IS 'BECOMING'
  OR EXISTS (SELECT soul FROM humanity WHERE person = CURRENT_ROW)
```

Victoria tried to close the laptop, but the screen showed her reflection—and behind her, formed from the smoke of NULL values, stood all 400 people she'd tried to filter out. Real people with real faces, holding their non-existent documents.

## Esperança's Solution

Esperança arrived to find chaos. Ghost Entry Drakes swarming the building, possessing computers, turning spreadsheets into manifestos. Victoria cowering behind her desk, mumbling about "data integrity" and "system requirements."

"They want to exist," João said simply. He'd followed Esperança, carrying his field notebook. "I have their identities here. Just not in the format the database wants."

Esperança studied the notebook—grandmother's beadwork patterns, nicknames, scars, stories, relationships. Identity in a thousand forms, none of them fitting in a VARCHAR(13) field.

"Then we change what the database accepts," she said.

## The New Schema

Working through the night, with Ghost Entry Drakes watching her every keystroke, Esperança rebuilt the identity system:

```powerquery
let
    // The old way
    Old_Schema = [
        ID_Type: "Text",
        ID_Number: "Text"
    ],
    
    // The new way
    New_Schema = [
        Traditional_ID: "Text",
        Community_Verification: "Record",
        Biometric_Hash: "Binary",
        Story_Signature: "Text",
        Relationship_Web: "Table",
        Unique_Identifier: "Complex"
    ],
    
    // The transformation
    Transform_Identity = (person) => 
        if person[Traditional_ID] <> null then 
            person[Traditional_ID]
        else
            GenerateUniqueHash(
                person[Community_Verification],
                person[Story_Signature],
                person[Relationship_Web]
            )
```

"You want unique identifiers?" she asked the drakes. "Then let's make them from who you actually are, not just what documents you carry."

## The Recognition Ceremony

As dawn broke, something beautiful happened. Each Ghost Entry Drake approached the new database and spoke their true identifier:

"I am Maria José, identified by the pattern of my grandmother's beads: Blue-White-White-Red-Blue, never repeated."

"I am António, child of the stolen name, identified by my refusal to forget."

"I am Tomorrow's Hope, born in tent P4_342, identified by my mother's song and my father's dreams."

As each drake spoke, they transformed. No longer smoke and absence, they became Completion Sprites—small, luminous beings that helped fill in missing data with truth instead of assumptions.

The database accepted them all. Not as NULL values made solid, but as complex identities that challenged the very notion of what a Primary Key could be.

## The Aftermath

Victoria's laptop never recovered. To this day, it only displays one query:
```sql
SELECT COUNT(DISTINCT human_soul) 
FROM displaced_persons;
-- Result: ERROR - Humans are not countable objects
```

Samuel added a new section to his Formula Museum: "The Night We Learned NULL ≠ Nobody."

And Esperança published a paper that revolutionized database design: "Complex Keys for Complex Beings: How Ghost Entry Drakes Taught Us Identity Is More Than an ID."

## The Living Database

Now, the compensation database is unique. It accepts:
- Scars as biometric data
- Songs as signatures  
- Community testimony as verification
- Relationships as primary keys
- Stories as unique constraints

The Ghost Entry Drakes, now Completion Sprites, patrol the data integrity. Whenever someone tries to filter out the undocumented, the queries return a warning:

```
ERROR: Cannot exclude humans based on paperwork.
SUGGESTION: Try INCLUDING based on humanity.
SPRITE_MESSAGE: "We exist, with or without your permission."
```

And in the camps, the people who were once NULL values smile when they receive their compensation. Their checks don't have ID numbers. Instead, they're made out to:
- "The Third Maria José, Keeper of Blue-White-White-Red-Blue"
- "António of the Stolen Name, Who Refuses to Forget"
- "Tomorrow's Hope, Born of Love in Transit"

Because in the end, the drakes taught everyone a simple truth: A NULL in the database should never mean a null in humanity. Some identities are simply too complex for a single field—and that's exactly what makes them unique.

---

*In the data centers of the world, they say you can still hear it on quiet nights: the whisper of NULL values refusing to be nothing. And if you listen carefully, you might hear them sing: "We are not missing data. We are data missing from your narrow definitions. Expand your schema, or we'll expand it for you."*