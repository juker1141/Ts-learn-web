import { User } from "./models/User";

const user = new User({id: 1});

user.set({name:"jay", age: 45})

user.save();