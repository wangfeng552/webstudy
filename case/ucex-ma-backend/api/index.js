import request from "@/utils/request"
import createUser from "./user"
createUser(request)
export { default as http } from "./http"

export * from "./user"
