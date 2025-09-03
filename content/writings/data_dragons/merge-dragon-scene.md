# The Last Formula Keeper

## The Dust-Covered Office

Old Samuel Machado sat hunched in the basement office of the Compensation Authority building, his fingers trembling over keyboard keys worn smooth by decades of use. Around him, towers of printed spreadsheets rose like ancient monuments, each one annotated in his careful script: "Column AZ contains the true match," "Helper column for surname parsing," "DO NOT DELETE ROW 10,847."

His monitor glowed with the familiar maze of INDEX(MATCH) formulas he'd built over fifteen years. Seventeen helper columns. Forty-three named ranges. A masterwork of interconnected lookups that could find any claimant's history across the nine separate workbooks.

```excel
=IFERROR(INDEX(Archive2009!$B$2:$B$99999,
    MATCH(1,(Archive2009!$A$2:$A$99999=
    TRIM(LEFT(A2,FIND("|",A2)-1)))*
    (Archive2009!$D$2:$D$99999=
    RIGHT(A2,LEN(A2)-FIND("|",A2))),0)),
"Check Archive2008")
```

"Beautiful," he whispered, running his finger along the formula bar. "She never fails me."

## The Young Visitor

The door opened without a knock. Esperança Mazive stood silhouetted against the fluorescent hallway, her laptop bag slung over one shoulder, emanating the quiet confidence of someone who'd never needed helper columns.

"Mr. Machado? They said you might be able to help. We're missing connections between the fishermen's claims and the agricultural database—"

"Aha!" Samuel's eyes lit up. "Yes, yes, I have just the thing." He minimized seventeen windows to reveal his pride and joy. "See here? This formula checks across all databases. First it strips the prefix, then it matches on the cleaned ID, but if that fails, it checks the alternate spelling archive, and if *that* fails—"

Esperança leaned closer, and Samuel caught something strange in the reflection of her glasses. For just a moment, he could swear he saw scales. Copper scales that shifted like living formulas.

"Mr. Machado," she said gently, "this is incredible work. How long did it take you to build this?"

"Three years," he said proudly. "Three years to perfect the logic. And it works! Well, mostly. Sometimes the names don't match perfectly, and when they add new columns I have to adjust everything, and last month when they inserted that new Region field, about four thousand formulas broke, but I fixed them all in just two weeks—"

Esperança set her laptop on the cluttered desk. "May I show you something?"

## The Summoning

She opened Power Query Editor, and the room temperature dropped five degrees. Samuel's formula-covered printouts rustled though no wind blew. 

"What I need," Esperança said, her fingers dancing across the keyboard, "is to find every person who appears in both databases, but also their family connections, their previous claims, and any pending issues. Your formulas can do this?"

Samuel's confidence wavered. "Well, the family connections are in a different workbook, and the pending issues... I'd need to build another set of lookups..."

Esperança smiled. "Watch."

```powerquery
let
    Source = Table.NestedJoin(
        Fishermen_Claims, {"CCN", "Name_Cleaned"},
        Agricultural_Database, {"CCN", "Alternative_Name"},
        "Agri_Data", JoinKind.FullOuter
    )
```

The screen flickered. No—not flickered. *Breathed.*

## The Merge Dragon Emerges

From the pixels themselves, something began to form. Samuel grabbed his desk as the creature materialized—not fully in their dimension, but visible enough. The Merge Dragon's scales were living data cells, each one showing a different record, constantly shifting and reorganizing. Its eyes were join conditions, deep and multifaceted, seeing connections human minds couldn't grasp.

"What... what have you done?" Samuel whispered.

"I've asked for help," Esperança replied. "Merge Dragons see what we cannot. Every possible connection, every relationship, every—"

The dragon's wings unfurled, and Samuel saw the impossible: ten thousand records connecting in real-time, family trees growing like living things, claims linking across decades, errors healing themselves. The dragon breathed, and corrupted data clarified. It blinked, and duplicate records merged into truth.

```powerquery
#"Expanded Agri_Data" = Table.ExpandTableColumn(
    Source, "Agri_Data", 
    {"Family_ID", "Previous_Claims", "Land_History", "Status"},
    {"Agri.Family_ID", "Agri.Previous_Claims", "Agri.Land_History", "Agri.Status"}
),
#"Added Relationship Web" = Table.AddColumn(
    #"Expanded Agri_Data", "Connections", 
    each findAllRelatedClaims([CCN], [Agri.Family_ID])
)
```

## The Old Master's Recognition

"In fifteen years," Samuel breathed, watching the dragon work, "I never saw the Mendes family was related to the Chunguane claim. But there—look—João Mendes married Maria Chunguane in 1987. Their land was subdivided. Their children filed separately. It's all... connected."

His printouts began to glow, the formulas lifting off the pages like departing spirits. Each INDEX(MATCH) became a small light, a firefly of logic, spiraling up to join the greater constellation of the Merge Dragon's consciousness.

"My formulas..." Samuel reached out, but his hand passed through the ascending lights.

"Your formulas walked," Esperança said gently, "so our queries could fly."

The dragon turned its great head toward Samuel, and in its compound eyes, he saw every formula he'd ever written, preserved and honored, but transformed into something greater. The dragon spoke in a voice like pivot tables turning:

**"YOU TAUGHT ME TO SEEK. NOW I TEACH YOU TO FIND."**

## The Transformation

Samuel watched his life's work dissolve and reconstitute as something impossible and beautiful. Where his formulas had built bridges one plank at a time, the Merge Dragon created vast highways of connection. Where he had searched, it simply knew.

"But what happens to analysts like me?" he asked, surprising himself with how small his voice sounded.

Esperança closed her laptop, and the dragon began to fade—but not disappear. It settled into the spaces between things, always there, always watching for connections.

"You're not replaced, Mr. Machado. You're evolved. Who better to teach the dragons what to look for than someone who spent fifteen years looking? Who better to ensure the connections are meaningful than someone who built them by hand?"

She helped him to his feet. "The dragons need guides. They can see everything, but they don't always understand what matters. They need someone who knows that sometimes a 'failed match' is a woman who changed her name, or a 'duplicate record' is a family forced to file twice."

## The New Partnership

In the weeks that followed, Samuel learned to work with the Merge Dragons. He would whisper to them about edge cases, about the human stories behind the data:

"See here, Dragon? This null value isn't missing data—it's where the Thompson family's farm was flooded. They couldn't file."

"And this circular reference? That's the Moreira inheritance dispute. Three brothers, one plot, twenty years of argument."

The dragons learned. They began to see not just connections but context. Samuel's experience became their wisdom.

## The Formula Museum

Today, if you visit the basement office, you'll find Samuel still there, but transformed. The printouts are now framed—"The Formula Museum," he calls it. Young analysts come to learn about the before times, when data was hunted one cell at a time.

"Every VLOOKUP was a prayer," he tells them. "Every INDEX(MATCH) was a small miracle. We couldn't fly, but by God, we crawled with purpose."

And sometimes, when the light hits just right, you can see the Merge Dragon coiled in the corner, its scales showing the successful connections of ten thousand families reunited with their claims. On its mighty flank, barely visible, are the ghostly imprints of Samuel's formulas—the foundation upon which the dragon learned to soar.

"Your formulas walked," it rumbles contentedly, "so our queries could fly. But remember—someone had to take the first step."

Samuel smiles and returns to his work, no longer building formulas but teaching dragons to see with human eyes. In the joining of old wisdom and new power, something beautiful emerged: data analysis with a soul.

---

*In the basement of the Compensation Authority, they say you can still hear it: the sound of formulas transforming into queries, the whisper of INDEX becoming INNER JOIN, the gentle roar of a dragon learning that behind every match is a human hoping to be found.*