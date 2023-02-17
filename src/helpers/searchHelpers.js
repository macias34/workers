export const handleInput = (event, setSearchInput) =>{
    return setSearchInput(event.target.value.replace(/\s/g, "").toLowerCase())
}
