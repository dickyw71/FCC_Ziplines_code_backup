Simon game states:
- Off
- Ready to play
- Start Game
- Play button sequence
- Monitoring reply button sequence
-   

State Transitions:
Monitoring Reply
    OnCorrectlyCompletedSequence  ->  Increament Button Sequence length then [Play next button sequence]


Store button sequence in on a stack (array).
Randomly select the next button colour and push onto the stack.

Inputs: 
Player RED, GREEN, BLUE & YELLOW button presses
Strict button
On/Off
Start

Outputs:
Sequence number display
RED, GREEN, BLUE & YELLOW button sounds
   simonSound1   E   - Blue lower right
   simonSound2   C#  - Yellow lower left
   simonSound3   A   - Red upper right
   simonSound4   E   - Green upper left (1 Octave lower than Blue)
RED, GREEN, BLUE & YELLOW button lamps
Strict On lamp
On/Off lamp
Victory sound
Sequence error sound 

