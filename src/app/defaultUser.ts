import { UserInterface } from "./model/user";

const defaultUser: UserInterface = {
    id: 0,
    uuid: '',
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    color: '',
    pp: new Blob()
}

export default defaultUser;