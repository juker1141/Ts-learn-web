import { User } from "./models/User";

const user = new User({id: 1, name: "john", age: 234});

user.on("save", () => {
  console.log(user)
})

user.save()