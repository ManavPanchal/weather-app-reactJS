import { suggestions } from "./sugestion";

const SuggestionFilter = (input)=>{
    return suggestions.filter((elem) =>{
        return elem.name.includes(input)
    })
}
export {SuggestionFilter} ;