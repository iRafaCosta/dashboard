export default class CreateBudget{
    constructor({name,value}){
        this.id = Math.floor(Math.random() * 100000000)
        this.name = name
        this.value = +value
        this.createdAt = new Date().toDateString()
    }
}