import { Content } from "./content"

// Configurando o Jest (testes)
describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('Você recebeu uma solicitação de amizade!')
    
        expect(content).toBeTruthy() // Se for valor verdadeiro => sem ser false, 0, '', null, undefined, and NaN
    })
    
    it('should not be able to create a notification content with less than 5 characters', () => {
        expect(() => new Content('aaa')).toThrow() // Espera dar erro
    })
    
    it('should not be able to create a notification content with more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow() // Espera dar erro
    })

})