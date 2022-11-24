const logged = (
  state = {
    id: 0,
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    BirthofDate: "",
    RegisterDate: "",
    Address: "",
    PhoneNumber: "",
    log: false,
  },
  action
) => {
  switch (action.type) {
    case "log":
      return { ...state,log: true,
        id:action.id,
        Email: action.Email,
        Password : action.Password,
        FirstName: action.FirstName,
        LastName: action.LastName,
        BirthofDate: action.BirthofDate,
        RegisterDate: action.RegisterDate,
        Address: action.Address,
        PhoneNumber: action.PhoneNumber
      };

    case "logout":
      return [...state.log, false];

    default:
      return state;
  }
};

export default logged;
