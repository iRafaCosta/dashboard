export const TYPE = [
    "Entrada",
    "Saída"
]

export default class CreateTransaction{
    constructor({name,value,type}){
        this.id = Math.floor(Math.random() * 10000000)
        this.name = name
        this.value = value
        this.createdAt = new Date().toDateString()
        this.type = type
    }
}