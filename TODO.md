- UI for REPL
    - Include buffer name when sending result up
    - LiveEvaluationService needs to coalesce results, push out per-buffer
    - Associate the 'LiveCodeBlock' object (startLine/endLine) with the results from the buffer
    - Buffer enter event from NeovimInstance?
    - Objects - get by highlighted variable name
    - Errors
    - Output

- Create scrollbars
    - Create scrollbar component
        - When rendering, check size and compare to viewport size
    - For Menu/AutoComplete, need to fix viewport
        const viewPortReducer = viewportReducer(NEXT_ACTION, PREVIOUS_ACTION)
        Object.assign({}, s, {
            viewport: viewportReducer(action, viewportSize, itemCount, currentViewport)
        })

        viewport:
            viewStartIndex
            selectedIndex
        - Start moving reducers out
    - Menu
    - Autocomplete

- Syntax highlighting - only update if item changed

- Startup UI if NeoVim not found
    - Landing page design

- Animation/Performance: 
    - No flicker on quickinfo/autocomplete
        - For quickinfo & parameter help - send up if there are no results to clear, as opposed to clearing on set cursor position
    - Factor to always show
    - Why are there problems if it is always showing?

- Animation/Performance: Optimistic Typing
- Animation: Cursor velocity
    - Create variable
    - Refactor cursor to component
    - Use 'particle style' animation
- Animation: Scroll
    - Start moving canvas up

- Good README example: - TSLint by Palantir

- Use JS to apply changes to an entire file
    - Remove all semicolons

- Preview mode
    - Markdown
    - React

- Easy: Move 'ROADMAP.md'
- Issue: QuickInfo opening too high
- Issue: AutoComplete opening too low
- Issue: Argument on signature help
- Issue: Update binaries

- Documentation: Configuration
    - Where configuration files are stored
    - Using init.vim
        - Check and see if init.vim is actually being picked up
    - Configuration variables

- Tasks provider
    - QuickOpen - Ctrl-SHIFT-P mode
    - npm tasks
    - allow plugins to call Oni.editor.registerTask(id, label, detail, fileScope, () => { ... })
    - allow plugins to call Oni.editor.executeShellCommand(..)
    - QuickOpen.registerTask(plugin, label, detail, fileScope)
        - callback to pluginmanage
    - output window
        - rightbelow 20new
            -20new = number of lines
        - set nomodifiable
        - create as scratch buffer: http://vim.wikia.com/wiki/Vim_buffer_FAQ
    - Include tasks in QuickOpen

- Scroll bars

- Left gutter
    - Git status
    - Marks
    - Investigate bringing in signs to expand left gutter

- LaunchService
    - Create test plugin to exercise this functionality
    - Launch command: editor.launch
    - Use find-parent-dir module to search upward
    - Implement this functionality in a plugin
    - Oni.registerCommand("editor.launch", () => { Oni.editor.executeShellCommand(...) })
    - Use mapping to bind to editor.launch
    - F5 launch
        .oni/launch.json
    - F5 -> editor.launch
    - GetLaunchOptions(..)
    - Launch(launchOption)

- Sample language service plugin
    - Refactor the common prefix-resolution to a helper method in Oni
    - F5 Launch
    - Documentation  - generate from Oni.d.ts

- Keybindings
    - Use 'OniExecute'

- Update app menu
    - Open keybindings
    - Open config file

- <C-p> working in insert mode
    - Render popupmenu

- Find-in-files
- Find usages

- Syntax highlighting - optimize syntax highlighter
    - Make it a 'pull' so it can be enabled via config file
    - Only highlight appropriate lines
    - Make sure to not continuously redefine - only define new entries
    - Update syntax when going back to normal mode
    - Use document highlights in insert mode while typing

- Language Service: Rename

- REPL support
    - Can map back to sourcemap using this: https://github.com/evanw/node-source-map-support
    - Some interesting stuff here too: http://stackoverflow.com/questions/3919134/is-there-a-way-to-wrap-all-javascript-methods-with-a-function
    - REPL.watch(val)
    - Decorators - @run(..)
    - ts.transpileModule(source, { compilerOptions: { } }
        - Add 'REPL' service
        - Show UI for 'transpilation' region
        - Send transpilation region from client -> plugin
        - Gutter UI: Show result / rich image
    - UI to show overlays in gutter
        - One off as well as proof of concept
    - live-eval-file

- Add command to easily edit config file


- Errors + Quick Info
    - Add field for errors in quick info
    - Factor current error state management from overlay to service
    - When opening QuickInfo, check if there is an error at current position, and add
    - Remove slide out error detail

    - editor.errors.next/editor.errors.prev <- ErrorManager
    - ]e - OniExecute("editor.errors.next")

- Config file
    - Watch for changes
    - Implement command to edit
    - Add menu item for edit command

- Improved terminal
    - create Terminal service
    - create terminal entry window
    - shelljs: https://www.npmjs.com/package/shelljs
    - node-shell-quote: https://github.com/substack/node-shell-quote

- Animation: QuickOpen - blur 

- Formatting: Add option to remove multiple blank lines in row

- Performance: Scrolling

- Background image
    - Edges not being rendered
    - Canvas hiding on resize

- Ease-of-use / fun
    - Katas
    - Achievements
    - VimTutor enhancements
        - Konami code / game

- Multiple Oni instances
    - Force single instance
    - Proper routing of messages in main
    - Show context menu in bottom right to open different sessions
    - Quick switch between them
    - Good exercises here: https://github.com/steveshogren/10-minute-vim-exercises/blob/master/book_sample_delimited_edits.md

- NeoVim as window component
    - Just use for text boxes for the short-term
        - Start insert mode
    - Standalone instances of neovim
    - Manage splits externally
        - Use 'cabbrev' to override sp/vsp/rightbelow/etc
    - Simplifies overlay management, because there is only ever one buffer per window
        - Concern: Performance when opening, multiple neovim processes
    - Reuse pluginmanager between instances
    - Rename 'NeovimInstance' to 'NeovimProcess'
    - Move index to be 'Neovim'
    - Window Management
        - Editor.activeWindow.neovim
        - Introduce 'activeWindow' concept without multiple windows
    - Direct input to activeWindow
    - Formalize layers 
        - Move canvas inside 'neovim-container'
        - Move background behind neovim-container
        - Move overlay-ui on top
    - Factor to react component

- Load time for window splits, if using standalone instance of neovim?

- Animation: Background video? 

- Better error message when starting with vim error
    - Neovim bug: https://github.com/neovim/neovim/issues/3901
    - Simulate error
    - Event on error
        - Check node client for that

- Overlay concept
    - Host in webview vs browser window?
    - What would API look like for this?
    - Git changes
    - Handling error messages
    - Minimap
    - Scrollbar
    - Filetype overlay

- Markdown preview mode
    - Side-by-side? Pane view?

- Welcome page
    - Overlay plugin

- Pane
    - Assumptions around sizing / positions

- File explorer
    - Fast nav hook up?

- Allow multiple language services / completion providers

- Fast nav through chrome

- Broken keys
    - VolumeUp/VolumeDown
    - ScrollLock

- Type signature help
- Scroll bar
    - Minimap
    - git changes
    - errors

- CTRL+Shift+P - command palette
- Preview window

- REPL support
    - Run functions locally
    - How to hook up to build?Meta

- General pane integration
    - Host plugins as webview browserwindow

- File explorer integration
    - Webview pane?
- Performance
    - DOM Renderer
- Enhanced syntax highlighting

- <C-P> further work
    - Git detection
        - Handle case when git is not available, fallback to readdir approach

    - Scrollbar / integration with C-n
    - Extending pinned concept - use time or ordering to remove from MRU


- Update metadata
    - Dictionary instead of array
    - capabilities: {
        completionProvider: {
            resolveProvider: true,
            }
        },
        signatureHelpProvider: {
            triggerCharacters: [(]
        }

- Can we stabilize the language service by waiting to write?
    - Is the process actually crashing?
    - Ability to add logging: https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29
    - Logging here: http://stackoverflow.com/questions/34881343/node-js-detect-a-child-process-exit

- Fix UI for completion

- Start hooking up TypeScript language service - bring over typescript completion plugin

- Continue investigating performance

- Bound commands
    - KeyBindings
        - Get bound command (key press)
    - CommandManager
        - Pluginmanager - subscribeToCommand("editor.gotoDefinition")

- Plugin manifest
    - engine property: "oni": "^0.0.1"
    - oni
        "typescript": {
            "subscriptions": [
                "buffer-update"
            ],
            "languageService": [
                "quick-info": true,
                "goto-definition": true,
                "completion-provider": true,
            ]
        }
    - activationEvents
    - contributes
        - language service
            - quick info
            - goto definition
            - completion
            - syntax highlighting
        - debugger
        - unit test mapping
            - relevant tests for a code block
        - REPL
            - execute highlighted code
            - execute general code
        - 'Notebook' view
            - Show components live
        - code coverage

- Features
    - Cycle open windows
    - CTRL-p open window

- Implement single main but multiple browser windows, for quick re-open

- Performance: Start-up time: Minification of bundle.js 

- Add function to map text edits based on previously applied edits

- Overlay fixes
    - Config variable to show overlay
    - Find repro for the overlay to shift
    - Better way to get windows: 
        - window.neovim._neovim.getWindows(function() { console.dir(arguments) })
        - window.neovim._neovim.winGetPosition(window.derp, function() { console.dir(arguments) })

- AutoComplete: fuzzy matching
