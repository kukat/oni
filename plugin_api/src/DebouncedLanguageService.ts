import { PromiseFunction, debounce } from "./PromiseDebouncer"

/**
 * Wrapper around language service to assist with debouncing
 * methods that are called frequently
 */
export class DebouncedLanguageService implements Oni.Plugin.LanguageService {

    private _debouncedQuickInfo: PromiseFunction<Oni.Plugin.QuickInfo>
    private _debouncedCompletions: PromiseFunction<Oni.Plugin.CompletionResult>
    private _debouncedFormattingEdits: PromiseFunction<Oni.Plugin.FormattingEditsResponse>
    private _debouncedGetSignatureHelp: PromiseFunction<Oni.Plugin.SignatureHelpResult>

    private _languageService: Oni.Plugin.LanguageService

    constructor(languageService: Oni.Plugin.LanguageService) {
        this._languageService = languageService

        this._debouncedQuickInfo = debounce((context) => this._languageService.getQuickInfo(context))
        this._debouncedGetSignatureHelp = debounce((context) => this._languageService.getSignatureHelp(context))

        this._debouncedCompletions = debounce((context, completionInfo) => this._languageService.getCompletions(context))
        this._debouncedFormattingEdits = debounce((context) => this._languageService.getFormattingEdits(context))
    }

    public getQuickInfo(context: any): Promise<Oni.Plugin.QuickInfo> {
        return this._debouncedQuickInfo(context)
    }

    public getCompletions(position: Oni.EventContext): Promise<Oni.Plugin.CompletionResult> {
        return this._debouncedCompletions(position)
    }

    public getDefinition(context: Oni.EventContext): Promise<Oni.Plugin.GotoDefinitionResponse> {
        return this._languageService.getDefinition(context)
    }

    public getCompletionDetails(position: Oni.EventContext, completionInfo: Oni.Plugin.CompletionInfo): Promise<Oni.Plugin.CompletionInfo> {
        return this._languageService.getCompletionDetails(position, completionInfo)
    }

    public getFormattingEdits(position: Oni.EventContext): Promise<Oni.Plugin.FormattingEditsResponse> {
        return this._debouncedFormattingEdits(position)
    }

    public getSignatureHelp(position: Oni.EventContext): Promise<Oni.Plugin.SignatureHelpResult> {
        return this._debouncedGetSignatureHelp(position)
    }

    public evaluateBlock(position: Oni.EventContext, code: string, line: number): Promise<Oni.Plugin.EvaluationResult> {
        return this._languageService.evaluateBlock(position, code, line)
    }
}
