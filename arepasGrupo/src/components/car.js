const car = ( state = {fetchedSpendings: []},action) => {
    switch (action.type) {
        case 'shop':
    
            return {
                ...state,
                fetchedSpendings: [...state.fetchedSpendings, action.id],
              }

        default: 
        return state;
    }
}

export default car;