export class Content {
    private readonly content: string

    // Getters/Setters
    // Value Object Content
    get value(): string {
        return this.content
    }

    // Validar o Content
    private validateContentLength(content: string): boolean {
        return content.length >= 5 && content.length <= 240
    }

    constructor(content: string) {
        const isContentLengthValid = this.validateContentLength(content)

        if(!isContentLengthValid) {
            throw new Error('Content length error.')
        }

        this.content = content
    }
}

