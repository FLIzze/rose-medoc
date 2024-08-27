export interface EventInterface {
    id: number,
    title: string,
    description: string,
    beginning: Date,
    end: Date,
    by: number,
    location: string,
    participants: number[]
}