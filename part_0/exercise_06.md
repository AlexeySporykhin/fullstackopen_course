```mermaid
sequenceDiagram
    participant browser
    participant server    
    Note right of browser: User types text into input field
    Note right of browser: User click "save" (form submit)
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: response with the message {"message":"note created"}
    deactivate server
    Note right of browser: the note is added to the notes list 
    Note right of browser: the form becomes empty
    Note right of browser: the browser renderes updated notes list without refreshing the whole page
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: the browser sends the new note list to the server with content type application/json

