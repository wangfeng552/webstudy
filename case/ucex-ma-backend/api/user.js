let rt
const a = 2
export default function createUser(request) {
  rt = request
}
export function queryUserList() {
  rt("/ta", {
    params: {
      t: 1
    }
  })
}

export function queryApp() {
  rt("/app")
}

export function queryUserInfo() {
  rt("/test")
}
